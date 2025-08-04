# ChatSphere Analytics & Monitoring Strategy

This document outlines our comprehensive approach to analytics and monitoring for the ChatSphere platform, ensuring optimal performance, reliability, and user experience.

## Monitoring Infrastructure

### 1. Metrics Collection

```yaml
# monitoring/prometheus/metrics.yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: chatsphere-metrics
spec:
  selector:
    matchLabels:
      app: chatsphere
  endpoints:
  - port: metrics
    interval: 15s
    path: /metrics

# monitoring/prometheus/rules.yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: chatsphere-alerts
spec:
  groups:
  - name: chatsphere
    rules:
    - alert: HighLatency
      expr: histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le)) > 2
      for: 5m
      labels:
        severity: warning
      annotations:
        description: "95th percentile latency is above 2 seconds"
    
    - alert: HighErrorRate
      expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.05
      for: 5m
      labels:
        severity: critical
      annotations:
        description: "Error rate is above 5%"
```

### 2. Logging Configuration

```yaml
# monitoring/fluentd/fluent.conf
<source>
  @type forward
  port 24224
  bind 0.0.0.0
</source>

<filter kubernetes.**>
  @type kubernetes_metadata
  @id filter_kube_metadata
</filter>

<match **>
  @type elasticsearch
  host elasticsearch-master
  port 9200
  logstash_format true
  logstash_prefix chatsphere
  <buffer>
    @type file
    path /var/log/fluentd-buffers/kubernetes.system.buffer
    flush_mode interval
    retry_type exponential_backoff
    flush_interval 5s
    retry_forever false
    retry_max_interval 30
    chunk_limit_size 2M
    queue_limit_length 8
    overflow_action block
  </buffer>
</match>
```

### 3. Tracing Setup

```yaml
# monitoring/jaeger/jaeger.yaml
apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: chatsphere-jaeger
spec:
  strategy: production
  storage:
    type: elasticsearch
    options:
      es:
        server-urls: http://elasticsearch:9200
  ingress:
    enabled: true
    annotations:
      kubernetes.io/ingress-class: nginx
    hosts:
    - jaeger.chatsphere.com
```

## Analytics Pipeline

### 1. Event Collection

```python
# analytics/collectors/event_collector.py - FastAPI Integration
from typing import Dict, Any
from datetime import datetime
import json
import asyncio
from fastapi import BackgroundTasks
from app.core.database import AsyncSessionLocal
from app.models.analytics import AnalyticsEvent
import logging

logger = logging.getLogger(__name__)

class EventCollector:
    def __init__(self):
        self.background_tasks = BackgroundTasks()
    
    async def collect_event(
        self, 
        event_type: str, 
        user_id: str, 
        data: Dict[str, Any],
        background_tasks: BackgroundTasks
    ):
        """Collect analytics event with FastAPI background tasks"""
        event = {
            'type': event_type,
            'user_id': user_id,
            'timestamp': datetime.utcnow().isoformat(),
            'data': data
        }
        
        # Store event in background task
        background_tasks.add_task(self._store_event, event)
    
    async def _store_event(self, event_data: Dict[str, Any]):
        """Store event in database asynchronously"""
        async with AsyncSessionLocal() as db:
            try:
                event = AnalyticsEvent(
                    event_type=event_data['type'],
                    user_id=event_data['user_id'],
                    timestamp=datetime.fromisoformat(event_data['timestamp']),
                    data=event_data['data']
                )
                db.add(event)
                await db.commit()
                logger.info(f"Stored analytics event: {event_data['type']}")
            except Exception as e:
                logger.error(f"Failed to store event: {e}")
                await db.rollback()

# FastAPI Middleware for automatic event collection
from fastapi import Request, Response
import time

class AnalyticsMiddleware:
    def __init__(self, app):
        self.app = app
        self.event_collector = EventCollector()
    
    async def __call__(self, scope, receive, send):
        if scope["type"] == "http":
            request = Request(scope, receive)
            start_time = time.time()
            
            # Call next middleware/route
            response = await self.app(scope, receive, send)
            
            # Collect metrics
            duration = time.time() - start_time
            await self._collect_request_event(request, response, duration)
            
            return response
        
        return await self.app(scope, receive, send)
    
    async def _collect_request_event(self, request: Request, response: Response, duration: float):
        """Collect HTTP request analytics"""
        event_data = {
            'method': request.method,
            'path': str(request.url.path),
            'status_code': getattr(response, 'status_code', 0),
            'duration_ms': round(duration * 1000, 2),
            'user_agent': request.headers.get('user-agent', ''),
            'ip_address': request.client.host if request.client else None
        }
        
        user_id = getattr(request.state, 'user_id', None)
        if user_id:
            # Store in background if we have a user context
            background_tasks = BackgroundTasks()
            await self.event_collector.collect_event(
                'http_request', 
                user_id, 
                event_data,
                background_tasks
            )
```

### 2. Data Processing

```python
# analytics/processors/stream_processor.py
from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *

def process_events():
    spark = SparkSession.builder \
        .appName("ChatSphere Analytics") \
        .getOrCreate()
    
    # Read from Kafka
    events = spark.readStream \
        .format("kafka") \
        .option("kafka.bootstrap.servers", "kafka:9092") \
        .option("subscribe", "chatsphere-events") \
        .load()
    
    # Parse events
    schema = StructType([
        StructField("type", StringType()),
        StructField("user_id", StringType()),
        StructField("timestamp", TimestampType()),
        StructField("data", MapType(StringType(), StringType()))
    ])
    
    parsed = events.select(
        from_json(col("value").cast("string"), schema).alias("event")
    ).select("event.*")
    
    # Process different event types
    message_metrics = parsed.filter(col("type") == "message_sent") \
        .groupBy(
            window(col("timestamp"), "1 hour"),
            col("user_id")
        ) \
        .agg(
            count("*").alias("message_count"),
            avg(col("data.content_length")).alias("avg_length")
        )
    
    # Write to storage
    query = message_metrics.writeStream \
        .outputMode("append") \
        .format("parquet") \
        .option("path", "/data/metrics") \
        .option("checkpointLocation", "/checkpoints") \
        .start()
    
    query.awaitTermination()
```

### 3. Data Warehouse Schema

```sql
-- analytics/schema/warehouse.sql

-- User metrics
CREATE TABLE user_metrics (
    user_id VARCHAR(36),
    date DATE,
    messages_sent INT,
    messages_received INT,
    active_channels INT,
    total_reactions INT,
    avg_response_time_sec FLOAT,
    PRIMARY KEY (user_id, date)
);

-- Channel metrics
CREATE TABLE channel_metrics (
    channel_id VARCHAR(36),
    date DATE,
    total_messages INT,
    active_users INT,
    peak_hour INT,
    sentiment_score FLOAT,
    PRIMARY KEY (channel_id, date)
);

-- Message analytics
CREATE TABLE message_analytics (
    message_id VARCHAR(36),
    user_id VARCHAR(36),
    channel_id VARCHAR(36),
    timestamp TIMESTAMP,
    content_length INT,
    has_attachments BOOLEAN,
    response_count INT,
    reaction_count INT,
    sentiment_score FLOAT,
    PRIMARY KEY (message_id)
);

-- AI model performance
CREATE TABLE model_performance (
    request_id VARCHAR(36),
    model_version VARCHAR(20),
    timestamp TIMESTAMP,
    input_tokens INT,
    output_tokens INT,
    response_time_ms INT,
    error_type VARCHAR(50),
    PRIMARY KEY (request_id)
);
```

## Dashboards & Visualization

### 1. User Engagement Dashboard

```json
{
  "dashboard": {
    "title": "User Engagement",
    "panels": [
      {
        "title": "Daily Active Users",
        "type": "graph",
        "datasource": "PostgreSQL",
        "targets": [
          {
            "query": "SELECT date, COUNT(DISTINCT user_id) FROM user_metrics GROUP BY date ORDER BY date"
          }
        ]
      },
      {
        "title": "Message Volume",
        "type": "heatmap",
        "datasource": "PostgreSQL",
        "targets": [
          {
            "query": "SELECT date_trunc('hour', timestamp) as hour, COUNT(*) FROM message_analytics GROUP BY hour"
          }
        ]
      },
      {
        "title": "User Retention",
        "type": "graph",
        "datasource": "PostgreSQL",
        "targets": [
          {
            "query": "WITH cohort AS (...) SELECT * FROM cohort_analysis"
          }
        ]
      }
    ]
  }
}
```

### 2. Performance Dashboard

```json
{
  "dashboard": {
    "title": "System Performance",
    "panels": [
      {
        "title": "API Latency",
        "type": "graph",
        "datasource": "Prometheus",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))"
          }
        ]
      },
      {
        "title": "Error Rates",
        "type": "graph",
        "datasource": "Prometheus",
        "targets": [
          {
            "expr": "sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m])) * 100"
          }
        ]
      },
      {
        "title": "Resource Usage",
        "type": "graph",
        "datasource": "Prometheus",
        "targets": [
          {
            "expr": "sum(container_memory_usage_bytes) by (pod)"
          }
        ]
      }
    ]
  }
}
```

## AI Model Analytics

### 1. Performance Tracking

```python
# analytics/ai/performance_tracker.py
from typing import Dict, Any
from datetime import datetime
import time
import psycopg2

class ModelPerformanceTracker:
    def __init__(self, db_config: Dict[str, str]):
        self.conn = psycopg2.connect(**db_config)
    
    def track_request(self, model_version: str, context_length: int):
        start_time = time.time()
        request_id = str(uuid.uuid4())
        
        return RequestTracker(
            request_id=request_id,
            model_version=model_version,
            context_length=context_length,
            start_time=start_time,
            conn=self.conn
        )

class RequestTracker:
    def __init__(self, request_id: str, model_version: str, 
                 context_length: int, start_time: float, conn):
        self.request_id = request_id
        self.model_version = model_version
        self.context_length = context_length
        self.start_time = start_time
        self.conn = conn
    
    def complete(self, output_length: int, error_type: str = None):
        duration = time.time() - self.start_time
        
        with self.conn.cursor() as cur:
            cur.execute("""
                INSERT INTO model_performance (
                    request_id, model_version, timestamp,
                    input_tokens, output_tokens, response_time_ms,
                    error_type
                ) VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (
                self.request_id, self.model_version,
                datetime.utcnow(), self.context_length,
                output_length, int(duration * 1000),
                error_type
            ))
        
        self.conn.commit()
```

### 2. Quality Assessment

```python
# analytics/ai/quality_assessment.py
from typing import List, Dict, Any
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class ResponseQualityAnalyzer:
    def __init__(self, embedding_model):
        self.embedding_model = embedding_model
    
    def analyze_response(self, 
                        context: str,
                        response: str,
                        expected_topics: List[str] = None) -> Dict[str, float]:
        # Get embeddings
        context_embedding = self.embedding_model.encode(context)
        response_embedding = self.embedding_model.encode(response)
        
        # Calculate semantic similarity
        similarity = cosine_similarity(
            context_embedding.reshape(1, -1),
            response_embedding.reshape(1, -1)
        )[0][0]
        
        # Topic coverage analysis
        topic_scores = {}
        if expected_topics:
            topic_embeddings = self.embedding_model.encode(expected_topics)
            topic_similarities = cosine_similarity(
                response_embedding.reshape(1, -1),
                topic_embeddings
            )[0]
            
            for topic, score in zip(expected_topics, topic_similarities):
                topic_scores[topic] = float(score)
        
        return {
            'context_relevance': float(similarity),
            'topic_coverage': topic_scores,
            'response_length': len(response.split()),
            'complexity_score': self._calculate_complexity(response)
        }
    
    def _calculate_complexity(self, text: str) -> float:
        words = text.split()
        sentences = text.split('.')
        
        if not sentences[-1]:
            sentences = sentences[:-1]
        
        if not len(sentences):
            return 0.0
        
        avg_sentence_length = len(words) / len(sentences)
        unique_words_ratio = len(set(words)) / len(words)
        
        return (avg_sentence_length * 0.5 + unique_words_ratio * 0.5)
```

## Alerting & Notification

### 1. Alert Configuration

```yaml
# monitoring/alertmanager/config.yaml
global:
  resolve_timeout: 5m
  slack_api_url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX'

route:
  group_by: ['alertname', 'cluster', 'service']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  receiver: 'slack-notifications'
  routes:
  - match:
      severity: critical
    receiver: 'pagerduty-critical'
  - match:
      severity: warning
    receiver: 'slack-notifications'

receivers:
- name: 'slack-notifications'
  slack_configs:
  - channel: '#chatsphere-alerts'
    send_resolved: true
    title: '{{ template "slack.default.title" . }}'
    text: '{{ template "slack.default.text" . }}'

- name: 'pagerduty-critical'
  pagerduty_configs:
  - service_key: '<pagerduty-service-key>'
    send_resolved: true
```

### 2. Alert Templates

```yaml
# monitoring/alertmanager/templates/slack.tmpl
{{ define "slack.default.title" }}
[{{ .Status | toUpper }}{{ if eq .Status "firing" }}:{{ .Alerts.Firing | len }}{{ end }}] {{ .CommonLabels.alertname }}
{{ end }}

{{ define "slack.default.text" }}
{{ range .Alerts }}
*Alert:* {{ .Labels.alertname }}
*Description:* {{ .Annotations.description }}
*Severity:* {{ .Labels.severity }}
*Value:* {{ .Annotations.value }}
*Started:* {{ .StartsAt | since }}
{{ end }}
{{ end }}
```

## Reporting & Analysis

### 1. Automated Reports

```python
# analytics/reporting/report_generator.py
from typing import Dict, Any, List
from datetime import datetime, timedelta
import pandas as pd
import plotly.graph_objects as go

class ReportGenerator:
    def __init__(self, db_connection):
        self.conn = db_connection
    
    def generate_weekly_report(self, start_date: datetime) -> Dict[str, Any]:
        end_date = start_date + timedelta(days=7)
        
        # Fetch metrics
        user_metrics = pd.read_sql("""
            SELECT date, 
                   COUNT(DISTINCT user_id) as daily_users,
                   SUM(messages_sent) as total_messages,
                   AVG(avg_response_time_sec) as avg_response_time
            FROM user_metrics
            WHERE date BETWEEN %s AND %s
            GROUP BY date
            ORDER BY date
        """, self.conn, params=[start_date, end_date])
        
        # Generate visualizations
        user_trend = go.Figure(data=[
            go.Scatter(
                x=user_metrics['date'],
                y=user_metrics['daily_users'],
                mode='lines+markers',
                name='Daily Active Users'
            )
        ])
        
        message_trend = go.Figure(data=[
            go.Bar(
                x=user_metrics['date'],
                y=user_metrics['total_messages'],
                name='Message Volume'
            )
        ])
        
        # Calculate key metrics
        metrics = {
            'total_users': int(user_metrics['daily_users'].sum()),
            'total_messages': int(user_metrics['total_messages'].sum()),
            'avg_response_time': float(user_metrics['avg_response_time'].mean()),
            'user_growth': float(
                (user_metrics['daily_users'].iloc[-1] / 
                 user_metrics['daily_users'].iloc[0] - 1) * 100
            )
        }
        
        return {
            'metrics': metrics,
            'visualizations': {
                'user_trend': user_trend.to_json(),
                'message_trend': message_trend.to_json()
            },
            'period': {
                'start': start_date.isoformat(),
                'end': end_date.isoformat()
            }
        }
```

### 2. Custom Analysis

```python
# analytics/analysis/custom_analyzer.py
from typing import List, Dict, Any
import pandas as pd
import numpy as np
from scipy import stats

class CustomAnalyzer:
    def __init__(self, db_connection):
        self.conn = db_connection
    
    def analyze_user_segments(self) -> Dict[str, Any]:
        # Fetch user data
        users = pd.read_sql("""
            SELECT user_id,
                   SUM(messages_sent) as total_messages,
                   AVG(active_channels) as avg_channels,
                   AVG(avg_response_time_sec) as response_time
            FROM user_metrics
            GROUP BY user_id
        """, self.conn)
        
        # Perform k-means clustering
        from sklearn.cluster import KMeans
        
        features = users[[
            'total_messages',
            'avg_channels',
            'response_time'
        ]].values
        
        # Normalize features
        from sklearn.preprocessing import StandardScaler
        scaler = StandardScaler()
        features_scaled = scaler.fit_transform(features)
        
        # Find optimal number of clusters
        from sklearn.metrics import silhouette_score
        
        scores = []
        K = range(2, 8)
        for k in K:
            kmeans = KMeans(n_clusters=k, random_state=42)
            kmeans.fit(features_scaled)
            scores.append(silhouette_score(features_scaled, kmeans.labels_))
        
        optimal_k = K[np.argmax(scores)]
        
        # Perform final clustering
        kmeans = KMeans(n_clusters=optimal_k, random_state=42)
        users['segment'] = kmeans.fit_predict(features_scaled)
        
        # Analyze segments
        segment_analysis = users.groupby('segment').agg({
            'total_messages': ['mean', 'std'],
            'avg_channels': ['mean', 'std'],
            'response_time': ['mean', 'std'],
            'user_id': 'count'
        }).round(2)
        
        return {
            'segments': segment_analysis.to_dict(),
            'optimal_clusters': optimal_k,
            'silhouette_scores': {
                k: score for k, score in zip(K, scores)
            }
        }
    
    def perform_ab_test_analysis(self,
                               experiment_id: str,
                               metric: str) -> Dict[str, Any]:
        # Fetch experiment data
        data = pd.read_sql("""
            SELECT variant, metric_value
            FROM ab_test_results
            WHERE experiment_id = %s
            AND metric_name = %s
        """, self.conn, params=[experiment_id, metric])
        
        # Perform t-test
        control = data[data['variant'] == 'control']['metric_value']
        treatment = data[data['variant'] == 'treatment']['metric_value']
        
        t_stat, p_value = stats.ttest_ind(control, treatment)
        
        # Calculate effect size
        effect_size = (treatment.mean() - control.mean()) / control.mean() * 100
        
        return {
            'experiment_id': experiment_id,
            'metric': metric,
            'results': {
                'control_mean': float(control.mean()),
                'treatment_mean': float(treatment.mean()),
                'effect_size_percent': float(effect_size),
                'p_value': float(p_value),
                'is_significant': p_value < 0.05,
                'sample_sizes': {
                    'control': len(control),
                    'treatment': len(treatment)
                }
            }
        }
```

## Next Steps

For details on how we'll handle security and compliance monitoring, refer to the [Security & Compliance](./11-security-compliance.md) document. 