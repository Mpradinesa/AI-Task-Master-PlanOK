import os

# 1. BASE_DIR corregido para evitar el error 'str and str' en Django 2.2
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '7j*um)5dp6h$n2@z@%@)gp#m40vbl%cpy!i2wos)u^rqwd_hmq'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Permitimos conexiones para facilitar las pruebas locales y la vista React [cite: 19]
ALLOWED_HOSTS = ['*'] 

# 2. Aplicaciones necesarias para cumplir con el desafío [cite: 15, 19]
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',      # Requerido para la API REST [cite: 15]
    'corsheaders',         # Para conectar con el Frontend React [cite: 19]
    'core',                # Aquí vive tu lógica de Agente de IA [cite: 7, 26]
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # Debe ir arriba para evitar bloqueos de React
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

ROOT_URLCONF = 'task_manager.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'task_manager.wsgi.application'

# 3. Base de Datos PostgreSQL local (Requisito del desafío) [cite: 18]
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'tasks',           # Asegúrate de que exista en tu pgAdmin [cite: 28]
        'USER': 'postgres',        # Usuario de tu PostgreSQL local
        'PASSWORD': 'admin123',    # Tu contraseña de PostgreSQL
        'HOST': '127.0.0.1',       # Conexión local para evitar fallos de Docker
        'PORT': '5432',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Configuración regional
LANGUAGE_CODE = 'es-cl'
TIME_ZONE = 'America/Santiago'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_URL = '/static/'