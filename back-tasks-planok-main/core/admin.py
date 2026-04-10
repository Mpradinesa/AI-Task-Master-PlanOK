from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    # 1. Las columnas que verás en la tabla principal
    list_display = ('title', 'status', 'priority', 'due_date', 'category')
    
    # 2. Filtros laterales para navegar rápido
    list_filter = ('status', 'priority', 'category', 'created_at')
    
    # 3. Buscador (puedes buscar por título o descripción)
    search_fields = ('title', 'description')
    
    # 4. Orden predeterminado (las más nuevas primero)
    ordering = ('-created_at',)
    
    # 5. Organizar los campos dentro del formulario de edición
    # 5. Organizar los campos dentro del formulario de edición
    fieldsets = (
        ('Información Principal', {
            'fields': ('title', 'description', 'status', 'priority', 'due_date') # <-- AGREGADO AQUÍ
        }),
        ('Inteligencia Artificial', {
            'fields': ('category', 'ai_suggestions'),
            'description': 'Datos generados automáticamente por LangChain'
        }),
        ('Fechas del Sistema', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',), 
        }),
    )
    
    # Hacer que las fechas sean solo de lectura (no se pueden editar manualmente)
    readonly_fields = ('created_at', 'updated_at')