# 1. Imagen base de Python
FROM python:3.11-slim

# 2. Evitar que Python genere archivos .pyc y permitir logs en tiempo real
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 3. Directorio de trabajo dentro del contenedor
WORKDIR /app

# 4. Instalar dependencias del sistema necesarias para PostgreSQL (psycopg2)
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# 5. Instalar dependencias de Python
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copiar el resto del código del proyecto
COPY . /app/

# 7. Exponer el puerto donde corre Django
EXPOSE 8000

# 8. Comando para iniciar el servidor
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]