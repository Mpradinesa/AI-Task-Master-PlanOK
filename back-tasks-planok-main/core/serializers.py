from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    # Estos son solo para lectura (mostrar el texto en el frontend)
    priority_display = serializers.CharField(source='get_priority_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    # Aseguramos que ai_suggestions pueda ser opcional al recibir datos
    ai_suggestions = serializers.JSONField(required=False, allow_null=True)

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'status', 'status_display', 
            'priority', 'priority_display', 'due_date', 'category', 
            'ai_suggestions', 'created_at'
        ]