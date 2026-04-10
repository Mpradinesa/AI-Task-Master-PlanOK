from django.db import models
from django.utils import timezone
from datetime import timedelta

class Task(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending', 'Pendiente'
        COMPLETED = 'completed', 'Completada'

    class Priority(models.TextChoices):
        LOW = 'low', 'Baja'
        MEDIUM = 'medium', 'Media'
        HIGH = 'high', 'Alta'
        URGENT = 'urgent', 'Urgente'

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    priority = models.CharField(max_length=20, choices=Priority.choices, default=Priority.MEDIUM)
    due_date = models.DateTimeField(null=True, blank=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    ai_suggestions = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # --- MÉTODO PARA DETECTAR URGENCIA ---
    @property
    def is_truly_urgent(self):
        if self.due_date and self.status == self.Status.PENDING:
            ahora = timezone.now()
            # Si vence en menos de 24 horas, es Urgente
            return self.due_date <= ahora + timedelta(hours=24)
        return False

    def __str__(self):
        return f"{self.title} - {self.status}"