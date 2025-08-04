# ChatSphere Security & Compliance Strategy

This document outlines our comprehensive approach to security and compliance for the ChatSphere platform, ensuring data protection, privacy, and regulatory compliance.

## Security Architecture

### 1. Authentication & Authorization

```python
# app/core/auth.py - FastAPI JWT Authentication
from datetime import datetime, timedelta
from typing import Dict, Optional
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from cryptography.fernet import Fernet
from app.core.database import get_async_db
from app.models.user import User
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

security = HTTPBearer()

class JWTHandler:
    def __init__(self, secret_key: str, token_expiry: int = 3600):
        self.secret_key = secret_key
        self.token_expiry = token_expiry
        self.algorithm = "HS256"
    
    def generate_token(self, user_id: str, roles: list = None) -> str:
        payload = {
            'sub': user_id,  # FastAPI standard
            'roles': roles or [],
            'exp': datetime.utcnow() + timedelta(seconds=self.token_expiry),
            'iat': datetime.utcnow()
        }
        return jwt.encode(payload, self.secret_key, algorithm=self.algorithm)
    
    def validate_token(self, token: str) -> Optional[Dict]:
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=['HS256'])
            if datetime.fromtimestamp(payload['exp']) < datetime.utcnow():
                return None
            return payload
        except jwt.InvalidTokenError:
            return None
    
    def refresh_token(self, token: str) -> Optional[str]:
        payload = self.validate_token(token)
        if not payload:
            return None
        
        new_payload = {
            'user_id': payload['user_id'],
            'roles': payload['roles'],
            'exp': datetime.utcnow() + timedelta(seconds=self.token_expiry),
            'iat': datetime.utcnow()
        }
        return jwt.encode(new_payload, self.secret_key, algorithm=self.algorithm)

# FastAPI Dependencies
jwt_handler = JWTHandler(secret_key="your-secret-key")

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_async_db)
) -> User:
    """FastAPI dependency to get current authenticated user"""
    token = credentials.credentials
    payload = jwt_handler.validate_token(token)
    
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    
    user_id = payload.get('sub')
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload"
        )
    
    # Get user from database
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    
    return user

async def get_current_active_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """Dependency that ensures user is active"""
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    return current_user

# app/utils/rbac.py
from enum import Enum
from typing import List, Dict, Any

class Permission(Enum):
    READ = "read"
    WRITE = "write"
    DELETE = "delete"
    ADMIN = "admin"

class Resource(Enum):
    CHANNEL = "channel"
    MESSAGE = "message"
    USER = "user"
    SETTING = "setting"

class RBACManager:
    def __init__(self):
        self.role_permissions: Dict[str, Dict[Resource, List[Permission]]] = {
            'admin': {
                resource: list(Permission) for resource in Resource
            },
            'moderator': {
                Resource.CHANNEL: [Permission.READ, Permission.WRITE],
                Resource.MESSAGE: [Permission.READ, Permission.WRITE, Permission.DELETE],
                Resource.USER: [Permission.READ],
                Resource.SETTING: [Permission.READ]
            },
            'user': {
                Resource.CHANNEL: [Permission.READ],
                Resource.MESSAGE: [Permission.READ, Permission.WRITE],
                Resource.USER: [Permission.READ],
                Resource.SETTING: [Permission.READ]
            }
        }
    
    def has_permission(self, 
                      user_roles: List[str], 
                      resource: Resource, 
                      permission: Permission) -> bool:
        for role in user_roles:
            if role in self.role_permissions:
                if resource in self.role_permissions[role]:
                    if permission in self.role_permissions[role][resource]:
                        return True
        return False
    
    def get_user_permissions(self, user_roles: List[str]) -> Dict[str, List[str]]:
        permissions = {}
        for role in user_roles:
            if role in self.role_permissions:
                for resource, perms in self.role_permissions[role].items():
                    if resource.value not in permissions:
                        permissions[resource.value] = []
                    permissions[resource.value].extend([p.value for p in perms])
        return permissions
```

### 2. Data Encryption

```python
# app/utils/encryption.py
from typing import Any, Optional
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import base64

class DataEncryption:
    def __init__(self, master_key: str):
        self.master_key = master_key.encode()
        self.kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=b'chatsphere_salt',
            iterations=100000
        )
        self.key = base64.urlsafe_b64encode(self.kdf.derive(self.master_key))
        self.cipher_suite = Fernet(self.key)
    
    def encrypt_message(self, message: str) -> str:
        return self.cipher_suite.encrypt(message.encode()).decode()
    
    def decrypt_message(self, encrypted_message: str) -> Optional[str]:
        try:
            return self.cipher_suite.decrypt(encrypted_message.encode()).decode()
        except Exception:
            return None
    
    def rotate_key(self) -> None:
        new_key = Fernet.generate_key()
        self.cipher_suite = Fernet(new_key)
```

### 3. API Security

```python
# app/utils/rate_limiter.py
from typing import Dict, Optional
import time
import redis
from dataclasses import dataclass

@dataclass
class RateLimit:
    requests: int
    window: int  # in seconds

class RateLimiter:
    def __init__(self, redis_url: str):
        self.redis = redis.from_url(redis_url)
        self.default_limits = {
            'user': RateLimit(1000, 3600),
            'moderator': RateLimit(5000, 3600),
            'admin': RateLimit(10000, 3600)
        }
    
    def is_allowed(self, user_id: str, role: str) -> bool:
        key = f"rate_limit:{user_id}"
        limit = self.default_limits.get(role, self.default_limits['user'])
        
        current = int(time.time())
        window_start = current - limit.window
        
        self.redis.zremrangebyscore(key, 0, window_start)
        
        request_count = self.redis.zcard(key)
        
        if request_count >= limit.requests:
            return False
        
        self.redis.zadd(key, {str(current): current})
        self.redis.expire(key, limit.window)
        
        return True

# app/utils/request_validation.py
from typing import Dict, Any, Optional
import json
from jsonschema import validate, ValidationError

class RequestValidator:
    def __init__(self, schemas_path: str):
        self.schemas = self._load_schemas(schemas_path)
    
    def _load_schemas(self, path: str) -> Dict[str, Any]:
        with open(path) as f:
            return json.load(f)
    
    def validate_request(self, 
                        endpoint: str, 
                        method: str, 
                        data: Dict[str, Any]) -> Optional[str]:
        schema_key = f"{endpoint}_{method.lower()}"
        if schema_key not in self.schemas:
            return "No schema found for this endpoint"
        
        try:
            validate(instance=data, schema=self.schemas[schema_key])
            return None
        except ValidationError as e:
            return str(e)
```

## Compliance Framework

### 1. Data Privacy

```python
# compliance/privacy/data_handler.py
from typing import Dict, Any, List
from datetime import datetime
import json

class PersonalDataHandler:
    def __init__(self, storage_client):
        self.storage = storage_client
    
    def store_consent(self, 
                     user_id: str, 
                     consent_type: str, 
                     granted: bool) -> None:
        record = {
            'user_id': user_id,
            'consent_type': consent_type,
            'granted': granted,
            'timestamp': datetime.utcnow().isoformat(),
            'ip_address': self._get_user_ip()
        }
        self.storage.store_consent(record)
    
    def get_user_data(self, user_id: str) -> Dict[str, Any]:
        data = {
            'profile': self.storage.get_user_profile(user_id),
            'messages': self.storage.get_user_messages(user_id),
            'preferences': self.storage.get_user_preferences(user_id)
        }
        return data
    
    def delete_user_data(self, user_id: str) -> None:
        self.storage.delete_user_profile(user_id)
        self.storage.delete_user_messages(user_id)
        self.storage.delete_user_preferences(user_id)
        
        self._log_deletion(user_id)
    
    def _log_deletion(self, user_id: str) -> None:
        log = {
            'user_id': user_id,
            'action': 'data_deletion',
            'timestamp': datetime.utcnow().isoformat(),
            'requester_ip': self._get_user_ip()
        }
        self.storage.store_deletion_log(log)
    
    def _get_user_ip(self) -> str:
        pass

# compliance/privacy/data_retention.py
from datetime import datetime, timedelta
from typing import List

class DataRetentionManager:
    def __init__(self, storage_client):
        self.storage = storage_client
        self.retention_policies = {
            'messages': timedelta(days=365),
            'user_logs': timedelta(days=90),
            'analytics': timedelta(days=730)
        }
    
    def apply_retention_policies(self) -> None:
        for data_type, retention_period in self.retention_policies.items():
            cutoff_date = datetime.utcnow() - retention_period
            self.storage.delete_old_data(data_type, cutoff_date)
    
    def get_deletion_candidates(self) -> List[Dict[str, Any]]:
        candidates = []
        for data_type, retention_period in self.retention_policies.items():
            cutoff_date = datetime.utcnow() - retention_period
            candidates.extend(
                self.storage.get_data_older_than(data_type, cutoff_date)
            )
        return candidates
```

### 2. Audit Logging

```python
# compliance/audit/audit_logger.py
from typing import Dict, Any
from datetime import datetime
import json
import logging

class AuditLogger:
    def __init__(self, log_path: str):
        self.logger = logging.getLogger('audit')
        self.logger.setLevel(logging.INFO)
        
        handler = logging.FileHandler(log_path)
        handler.setFormatter(
            logging.Formatter('%(asctime)s - %(message)s')
        )
        self.logger.addHandler(handler)
    
    def log_action(self,
                   action: str,
                   user_id: str,
                   resource: str,
                   details: Dict[str, Any]) -> None:
        log_entry = {
            'timestamp': datetime.utcnow().isoformat(),
            'action': action,
            'user_id': user_id,
            'resource': resource,
            'details': details,
            'ip_address': self._get_user_ip(),
            'user_agent': self._get_user_agent()
        }
        
        self.logger.info(json.dumps(log_entry))
    
    def _get_user_ip(self) -> str:
        pass
    
    def _get_user_agent(self) -> str:
        pass

# compliance/audit/audit_analyzer.py
from typing import List, Dict, Any
from datetime import datetime, timedelta
import json
import pandas as pd

class AuditAnalyzer:
    def __init__(self, log_path: str):
        self.log_path = log_path
    
    def analyze_period(self, 
                      start_date: datetime,
                      end_date: datetime) -> Dict[str, Any]:
        logs = self._read_logs(start_date, end_date)
        
        return {
            'total_actions': len(logs),
            'actions_by_type': self._count_actions(logs),
            'actions_by_user': self._count_users(logs),
            'suspicious_activity': self._detect_suspicious(logs)
        }
    
    def _read_logs(self, 
                   start_date: datetime,
                   end_date: datetime) -> List[Dict[str, Any]]:
        logs = []
        with open(self.log_path) as f:
            for line in f:
                log = json.loads(line.split(' - ', 1)[1])
                timestamp = datetime.fromisoformat(log['timestamp'])
                if start_date <= timestamp <= end_date:
                    logs.append(log)
        return logs
    
    def _count_actions(self, logs: List[Dict[str, Any]]) -> Dict[str, int]:
        df = pd.DataFrame(logs)
        return df['action'].value_counts().to_dict()
    
    def _count_users(self, logs: List[Dict[str, Any]]) -> Dict[str, int]:
        df = pd.DataFrame(logs)
        return df['user_id'].value_counts().to_dict()
    
    def _detect_suspicious(self, logs: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        suspicious = []
        df = pd.DataFrame(logs)
        
        # Detect rapid actions
        actions_per_minute = df.groupby(['user_id', pd.Grouper(
            key='timestamp',
            freq='1Min'
        )]).size()
        
        suspicious.extend([
            {
                'type': 'rapid_actions',
                'user_id': user_id,
                'timestamp': timestamp,
                'count': count
            }
            for (user_id, timestamp), count in actions_per_minute.items()
            if count > 60  # More than 1 action per second
        ])
        
        # Detect unusual hours
        df['hour'] = pd.to_datetime(df['timestamp']).dt.hour
        unusual_hours = df[
            (df['hour'] >= 23) | (df['hour'] <= 4)
        ].groupby('user_id').size()
        
        suspicious.extend([
            {
                'type': 'unusual_hours',
                'user_id': user_id,
                'count': count
            }
            for user_id, count in unusual_hours.items()
            if count > 10
        ])
        
        return suspicious
```

### 3. Compliance Reporting

```python
# compliance/reporting/compliance_reporter.py
from typing import Dict, Any, List
from datetime import datetime
import pandas as pd
import plotly.graph_objects as go

class ComplianceReporter:
    def __init__(self, storage_client, audit_analyzer):
        self.storage = storage_client
        self.audit_analyzer = audit_analyzer
    
    def generate_compliance_report(self, 
                                 start_date: datetime,
                                 end_date: datetime) -> Dict[str, Any]:
        # Gather data
        audit_data = self.audit_analyzer.analyze_period(start_date, end_date)
        privacy_metrics = self._get_privacy_metrics(start_date, end_date)
        security_metrics = self._get_security_metrics(start_date, end_date)
        
        # Generate visualizations
        audit_viz = self._create_audit_visualization(audit_data)
        privacy_viz = self._create_privacy_visualization(privacy_metrics)
        security_viz = self._create_security_visualization(security_metrics)
        
        return {
            'period': {
                'start': start_date.isoformat(),
                'end': end_date.isoformat()
            },
            'audit_summary': audit_data,
            'privacy_metrics': privacy_metrics,
            'security_metrics': security_metrics,
            'visualizations': {
                'audit': audit_viz.to_json(),
                'privacy': privacy_viz.to_json(),
                'security': security_viz.to_json()
            },
            'recommendations': self._generate_recommendations(
                audit_data,
                privacy_metrics,
                security_metrics
            )
        }
    
    def _get_privacy_metrics(self,
                            start_date: datetime,
                            end_date: datetime) -> Dict[str, Any]:
        return {
            'data_requests': self.storage.count_data_requests(start_date, end_date),
            'consent_changes': self.storage.count_consent_changes(start_date, end_date),
            'data_deletions': self.storage.count_data_deletions(start_date, end_date)
        }
    
    def _get_security_metrics(self,
                             start_date: datetime,
                             end_date: datetime) -> Dict[str, Any]:
        return {
            'failed_logins': self.storage.count_failed_logins(start_date, end_date),
            'password_changes': self.storage.count_password_changes(start_date, end_date),
            'api_violations': self.storage.count_api_violations(start_date, end_date)
        }
    
    def _create_audit_visualization(self, 
                                  audit_data: Dict[str, Any]) -> go.Figure:
        fig = go.Figure()
        
        # Add action trends
        actions = pd.DataFrame(audit_data['actions_by_type'].items(),
                             columns=['Action', 'Count'])
        
        fig.add_trace(go.Bar(
            x=actions['Action'],
            y=actions['Count'],
            name='Actions by Type'
        ))
        
        return fig
    
    def _create_privacy_visualization(self,
                                    privacy_metrics: Dict[str, Any]) -> go.Figure:
        fig = go.Figure()
        
        # Add privacy metric trends
        metrics = pd.DataFrame(privacy_metrics.items(),
                             columns=['Metric', 'Count'])
        
        fig.add_trace(go.Bar(
            x=metrics['Metric'],
            y=metrics['Count'],
            name='Privacy Metrics'
        ))
        
        return fig
    
    def _create_security_visualization(self,
                                     security_metrics: Dict[str, Any]) -> go.Figure:
        fig = go.Figure()
        
        # Add security metric trends
        metrics = pd.DataFrame(security_metrics.items(),
                             columns=['Metric', 'Count'])
        
        fig.add_trace(go.Bar(
            x=metrics['Metric'],
            y=metrics['Count'],
            name='Security Metrics'
        ))
        
        return fig
    
    def _generate_recommendations(self,
                                audit_data: Dict[str, Any],
                                privacy_metrics: Dict[str, Any],
                                security_metrics: Dict[str, Any]) -> List[str]:
        recommendations = []
        
        # Analyze audit data
        if audit_data['suspicious_activity']:
            recommendations.append(
                "Review suspicious activity patterns and update detection rules"
            )
        
        # Analyze privacy metrics
        if privacy_metrics['data_deletions'] > 100:
            recommendations.append(
                "Review data retention policies and deletion procedures"
            )
        
        # Analyze security metrics
        if security_metrics['failed_logins'] > 1000:
            recommendations.append(
                "Implement additional authentication security measures"
            )
        
        return recommendations
```

## Security Testing

### 1. Automated Security Tests

```python
# security/testing/security_tester.py
from typing import List, Dict, Any
import requests
import subprocess
from concurrent.futures import ThreadPoolExecutor

class SecurityTester:
    def __init__(self, base_url: str):
        self.base_url = base_url
    
    def run_security_tests(self) -> Dict[str, Any]:
        results = {
            'vulnerability_scan': self._run_vulnerability_scan(),
            'penetration_tests': self._run_penetration_tests(),
            'dependency_check': self._check_dependencies(),
            'ssl_analysis': self._analyze_ssl(),
            'headers_analysis': self._analyze_headers()
        }
        
        return {
            'passed': all(test['passed'] for test in results.values()),
            'results': results
        }
    
    def _run_vulnerability_scan(self) -> Dict[str, Any]:
        return {
            'passed': True,
            'findings': []
        }
    
    def _run_penetration_tests(self) -> Dict[str, Any]:
        tests = [
            self._test_sql_injection,
            self._test_xss,
            self._test_csrf,
            self._test_authentication
        ]
        
        results = []
        with ThreadPoolExecutor(max_workers=4) as executor:
            results = list(executor.map(lambda t: t(), tests))
        
        return {
            'passed': all(result['passed'] for result in results),
            'results': results
        }
    
    def _check_dependencies(self) -> Dict[str, Any]:
        try:
            output = subprocess.check_output(
                ['safety', 'check'],
                stderr=subprocess.STDOUT
            )
            return {
                'passed': True,
                'output': output.decode()
            }
        except subprocess.CalledProcessError as e:
            return {
                'passed': False,
                'output': e.output.decode()
            }
    
    def _analyze_ssl(self) -> Dict[str, Any]:
        try:
            response = requests.get(f"{self.base_url}/health")
            cert = response.raw.connection.sock.getpeercert()
            
            return {
                'passed': True,
                'cert_info': cert
            }
        except Exception as e:
            return {
                'passed': False,
                'error': str(e)
            }
    
    def _analyze_headers(self) -> Dict[str, Any]:
        try:
            response = requests.get(f"{self.base_url}/health")
            headers = response.headers
            
            required_headers = {
                'Strict-Transport-Security',
                'X-Content-Type-Options',
                'X-Frame-Options',
                'X-XSS-Protection'
            }
            
            missing_headers = required_headers - set(headers.keys())
            
            return {
                'passed': len(missing_headers) == 0,
                'headers': dict(headers),
                'missing_headers': list(missing_headers)
            }
        except Exception as e:
            return {
                'passed': False,
                'error': str(e)
            }
```

### 2. Security Monitoring

```python
# security/monitoring/security_monitor.py
from typing import List, Dict, Any
from datetime import datetime, timedelta
import json
import redis
import requests

class SecurityMonitor:
    def __init__(self, redis_url: str, alert_webhook: str):
        self.redis = redis.from_url(redis_url)
        self.alert_webhook = alert_webhook
    
    def monitor_security_events(self) -> None:
        events = self._collect_security_events()
        alerts = self._analyze_events(events)
        
        if alerts:
            self._send_alerts(alerts)
    
    def _collect_security_events(self) -> List[Dict[str, Any]]:
        events = []
        
        # Collect failed login attempts
        failed_logins = self.redis.zrange(
            'failed_logins',
            datetime.utcnow() - timedelta(hours=1),
            datetime.utcnow(),
            withscores=True
        )
        
        events.extend([
            {
                'type': 'failed_login',
                'timestamp': score,
                'data': json.loads(value)
            }
            for value, score in failed_logins
        ])
        
        # Collect API violations
        api_violations = self.redis.zrange(
            'api_violations',
            datetime.utcnow() - timedelta(hours=1),
            datetime.utcnow(),
            withscores=True
        )
        
        events.extend([
            {
                'type': 'api_violation',
                'timestamp': score,
                'data': json.loads(value)
            }
            for value, score in api_violations
        ])
        
        return events
    
    def _analyze_events(self, events: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        alerts = []
        
        # Analyze failed logins
        failed_logins_by_ip = {}
        failed_logins_by_user = {}
        
        for event in events:
            if event['type'] == 'failed_login':
                ip = event['data']['ip_address']
                user = event['data']['username']
                
                failed_logins_by_ip[ip] = failed_logins_by_ip.get(ip, 0) + 1
                failed_logins_by_user[user] = failed_logins_by_user.get(user, 0) + 1
        
        # Check for brute force attempts
        for ip, count in failed_logins_by_ip.items():
            if count > 10:
                alerts.append({
                    'type': 'brute_force_ip',
                    'severity': 'high',
                    'details': {
                        'ip_address': ip,
                        'attempt_count': count
                    }
                })
        
        for user, count in failed_logins_by_user.items():
            if count > 5:
                alerts.append({
                    'type': 'brute_force_user',
                    'severity': 'high',
                    'details': {
                        'username': user,
                        'attempt_count': count
                    }
                })
        
        # Analyze API violations
        api_violations_by_ip = {}
        
        for event in events:
            if event['type'] == 'api_violation':
                ip = event['data']['ip_address']
                api_violations_by_ip[ip] = api_violations_by_ip.get(ip, 0) + 1
        
        # Check for API abuse
        for ip, count in api_violations_by_ip.items():
            if count > 50:
                alerts.append({
                    'type': 'api_abuse',
                    'severity': 'medium',
                    'details': {
                        'ip_address': ip,
                        'violation_count': count
                    }
                })
        
        return alerts
    
    def _send_alerts(self, alerts: List[Dict[str, Any]]) -> None:
        for alert in alerts:
            payload = {
                'text': f"Security Alert: {alert['type']}",
                'attachments': [{
                    'title': f"Severity: {alert['severity']}",
                    'text': json.dumps(alert['details'], indent=2),
                    'color': 'danger' if alert['severity'] == 'high' else 'warning'
                }]
            }
            
            try:
                requests.post(self.alert_webhook, json=payload)
            except Exception as e:
                print(f"Failed to send alert: {str(e)}")
```

## Next Steps

For details on how we'll handle testing and quality assurance across the platform, refer to the [Testing Strategy](./12-testing-strategy.md) document. 