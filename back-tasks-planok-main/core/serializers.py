from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    priority_display = serializers.CharField(source='get_priority_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    ai_suggestions = serializers.JSONField(required=False, allow_null=True)

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'status', 'status_display', 
            'priority', 'priority_display', 'due_date', 'category', 
            'ai_suggestions', 'created_at'
        ]

    def to_representation(self, instance):
        # Todo esto debe llevar 4 espacios (un Tab) hacia adentro
        data = super().to_representation(instance)
        
        # Si el método del modelo dice que es urgente, forzamos la prioridad
        if instance.is_truly_urgent:
            data['priority'] = 'urgent'
            data['priority_display'] = '⚠️ URGENTE'
            
        return data