from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from datetime import datetime, timezone, timedelta
import os

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer

    # --- NUEVO MÉTODO: PERMITIR ACTUALIZACIONES PARCIALES ---
    # Esto soluciona el error 400 (Bad Request) al apretar el botón Terminar
    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True  # <--- Esto permite que React solo mande el status
        return super().update(request, *args, **kwargs)

    def perform_create(self, serializer):
        # 1. Extraemos los datos básicos antes de guardar
        title = self.request.data.get('title', '')
        description = self.request.data.get('description', '')
        due_date_str = self.request.data.get('due_date')
        
        texto_analisis = (title + " " + description).lower()
        
        # --- LÓGICA DE INTELIGENCIA ARTIFICIAL SIMULADA ---
        
        # A. Prioridad Inteligente por Fecha y Palabras Clave
        priority = 'medium'
        if due_date_str:
            try:
                # Convertimos la fecha que viene del frontend
                due_date = datetime.fromisoformat(due_date_str.replace('Z', '+00:00'))
                ahora = datetime.now(timezone.utc)
                
                # Si falta menos de 48 horas (2 días), es ALTA
                if due_date - ahora < timedelta(days=2):
                    priority = 'high'
            except Exception as e:
                print(f"Error procesando fecha: {e}")

        if any(word in texto_analisis for word in ['urgente', 'ahora', 'importante', 'inmediato']):
            priority = 'high'

        # B. Clasificación, Hojas de Ruta y Mensajes de Coach
        category = "otro"
        ai_steps = []
        coach_tip = "Organizarte es el primer paso al éxito. ¡Vamos, Moni!"

        # Mejoramos la detección incluyendo 'informe' y 'gestion' para tu tarea
        if any(word in texto_analisis for word in ['medica', 'salud', 'doctor', 'clinica', 'examen']):
            category = "salud"
            ai_steps = ["Confirmar hora con el especialista", "Preparar historial o exámenes", "Llegar 15 min antes a la cita"]
            coach_tip = "¡Tu salud es lo primero! No olvides anotar tus dudas para el médico."
            
        elif any(word in texto_analisis for word in ['pago', 'banco', 'cuenta', 'transferir', 'dinero', 'plata', 'luz']):
            category = "finanzas"
            ai_steps = ["Revisar saldo en la cuenta", "Realizar el pago o transferencia", "Guardar el comprobante digital"]
            coach_tip = "Cuentas claras, corazón contento. ¡Tus finanzas te lo agradecerán!"
            
        elif any(word in texto_analisis for word in ['estudio', 'leer', 'curso', 'aprender', 'tarea', 'clase']):
            category = "estudio"
            ai_steps = ["Preparar material de estudio", "Eliminar distracciones del ambiente", "Realizar un resumen de lo aprendido"]
            coach_tip = "¡Paso a paso se llega lejos! Dale con todo a ese aprendizaje."
            
        elif any(word in texto_analisis for word in ['planok', 'trabajo', 'oficina', 'reunion', 'proyecto', 'informe', 'gestion']):
            category = "trabajo"
            ai_steps = ["Analizar requerimientos del jefe", "Coordinar con el equipo de PlanOK", "Ejecutar y revisar antes de entregar"]
            coach_tip = "¡A brillar en el trabajo! Tu capacidad no tiene límites."
        
        else:
            ai_steps = ["Definir el primer paso concreto", "Establecer un bloque de tiempo", "Marcar como lista al terminar"]

        # C. Guardamos la tarea con todos los campos calculados
        full_description = f"💡 {coach_tip}\n\n{description}"
        
        serializer.save(
            category=category,
            priority=priority,
            ai_suggestions=ai_steps,
            description=full_description
        )
        
        print(f"DEBUG: IA Procesó la tarea '{title}' como {category} con prioridad {priority}.")