# Generated by Django 5.2 on 2025-05-03 20:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("chatsphere", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="AnalyticsUsage",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("timestamp", models.DateTimeField(auto_now_add=True, db_index=True)),
                ("metric_type", models.CharField(db_index=True, max_length=100)),
                ("value", models.FloatField(default=0.0)),
                ("metadata", models.JSONField(blank=True, default=dict)),
                (
                    "bot",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="chatsphere.bot",
                    ),
                ),
            ],
            options={
                "ordering": ["-timestamp"],
            },
        ),
        migrations.CreateModel(
            name="ConversationFeedback",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("timestamp", models.DateTimeField(auto_now_add=True)),
                ("rating", models.IntegerField(blank=True, null=True)),
                ("feedback_text", models.TextField(blank=True)),
                ("user_id", models.CharField(blank=True, max_length=255)),
                (
                    "conversation",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="feedback",
                        to="chatsphere.conversation",
                    ),
                ),
                (
                    "message",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="feedback",
                        to="chatsphere.message",
                    ),
                ),
            ],
            options={
                "ordering": ["-timestamp"],
            },
        ),
        migrations.CreateModel(
            name="ErrorLog",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("timestamp", models.DateTimeField(auto_now_add=True, db_index=True)),
                ("service", models.CharField(db_index=True, max_length=100)),
                ("error_type", models.CharField(db_index=True, max_length=255)),
                ("error_message", models.TextField()),
                ("details", models.JSONField(blank=True, default=dict)),
                (
                    "bot",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="errors",
                        to="chatsphere.bot",
                    ),
                ),
            ],
            options={
                "ordering": ["-timestamp"],
            },
        ),
        migrations.CreateModel(
            name="TrainingSourceStats",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("timestamp", models.DateTimeField(auto_now_add=True)),
                ("retrieval_count", models.PositiveIntegerField(default=0)),
                ("last_retrieved", models.DateTimeField(blank=True, null=True)),
                (
                    "document",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="stats",
                        to="chatsphere.document",
                    ),
                ),
            ],
            options={
                "ordering": ["-timestamp"],
            },
        ),
    ]
