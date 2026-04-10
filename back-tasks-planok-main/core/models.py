from django.db import models

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
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )
    priority = models.CharField(
        max_length=20,
        choices=Priority.choices,
        default=Priority.MEDIUM
    )
    
    due_date = models.DateTimeField(null=True, blank=True)
    
    # --- NUEVOS CAMPOS PARA LA IA ---
    # Para guardar la clasificación automática (ej: Personal, Trabajo)
    category = models.CharField(max_length=100, blank=True, null=True)
    
    # Para guardar las subtareas sugeridas por la IA como una lista
    ai_suggestions = models.JSONField(blank=True, null=True)
    # --------------------------------
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.status}"