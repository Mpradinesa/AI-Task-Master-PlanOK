# AI-Task Master PlanOK 🚀

Hola, soy Monica. He diseñado este gestor de tareas inteligente para la prueba técnica de **Fullstack Developer IA**. Mi meta fue convertir una base técnica en un asistente de productividad real, donde la IA no solo guarda datos, sino que ayuda activamente al usuario a organizarse mejor.

## 🧠 Lo que logré implementar con IA
* **Clasificación Automática:** El sistema entiende el texto y asigna categorías (Salud, Trabajo, Finanzas, Estudio) por su cuenta.
* **Hojas de Ruta:** La IA analiza la descripción y sugiere pasos concretos para que al usuario no le cueste empezar.
* **Un mensaje de ánimo:** Integré un "Coach" que da consejos personalizados según la tarea que estés haciendo.
* **Alerta de Urgencia:** Creé una lógica en el Backend que revisa los plazos. Si algo vence en menos de 24 horas, aparece automáticamente un aviso de **"⚠️ URGENTE"** en rojo. Quería que el sistema "avisara" visualmente cuando algo es crítico.

## 📸 Un vistazo al proyecto

### Mi tablero de tareas
Aquí se ve el diseño limpio y cómo resaltan las alertas de urgencia que programé.
![Dashboard Principal](https://github.com/Mpradinesa/AI-Task-Master-PlanOK/blob/main/capturas%20de%20pantalla/Imagen%201.PNG?raw=true)

### El "detrás de escena" (Admin y Base de Datos)
Para mí era vital que los datos estuvieran bien ordenados y persistentes en PostgreSQL.
![Admin de Django](https://github.com/Mpradinesa/AI-Task-Master-PlanOK/blob/main/capturas%20de%20pantalla/imagen2.PNG?raw=true)
![Base de Datos PostgreSQL](https://github.com/Mpradinesa/AI-Task-Master-PlanOK/blob/main/capturas%20de%20pantalla/image_e40829.png?raw=true)

---

## 💡 Sobre mi forma de trabajar y este proceso

Como profesional de 51 años en plena reconversión digital, este proyecto fue un gran aprendizaje. A veces, en el desarrollo grupal, el ritmo es muy acelerado y se usan términos técnicos que aún estoy terminando de dominar. En esos momentos, me di cuenta de que mi mayor aporte es la **pausa creativa y el orden**.

* **Mirar el mapa completo:** Mientras mis compañeros avanzaban con mucha rapidez en el código, yo me enfoqué en entender cómo encajaban todas las piezas. Siento que mi fortaleza es asegurar que la lógica sea coherente para que, al final, el usuario reciba algo que realmente funcione.
* **Experiencia y tecnología:** Sé que no soy la más rápida escribiendo código, pero mi formación como Ingeniera Comercial me ayuda a no perder de vista el objetivo final. Para mí, programar es resolver un problema real, y prefiero construir cimientos sólidos antes de levantar las paredes.

## 🔍 Desafíos que aparecieron en el camino

Durante la integración, me encontré con algunos "nudos" técnicos que me tocó desatar para que todo corriera bien:

* **Hacer visible la inteligencia:** Noté que el Frontend original no mostraba todo lo que el Backend ya sabía hacer. Hice los ajustes necesarios en React para que esa "magia" (como las prioridades automáticas) se viera reflejada en las tarjetas de tareas.
* **Conexión y persistencia:** Me aseguré de que la base de datos PostgreSQL estuviera bien configurada y con sus migraciones al día, para que la información no se perdiera y la API pudiera "hablar" fluido con el Frontend.
* **Adaptarse al entorno:** Tuve dificultades técnicas con Docker en mi equipo, así que decidí trabajar de forma nativa. Fue una elección práctica para no perder tiempo valioso y asegurar que lo importante —la funcionalidad de la IA— estuviera lista para la entrega.

## 🛠️ Herramientas que usé
* **Backend:** Python + Django REST Framework.
* **Base de Datos:** PostgreSQL (con pgAdmin 4).
* **Frontend:** React + Material UI.

## 🚀 Cómo probarlo
1. **Backend:** Entrar a `back-tasks-planok-main`, instalar con `pip install -r requirements.txt` y correr `python manage.py runserver`.
2. **Frontend:** Entrar a `planok-frontend-main`, instalar con `npm install` y correr `npm run dev`.

---

## 📬 Unas palabras finales

Soy muy consciente de que este trabajo es un punto de partida y que probablemente tenga mucho margen de mejora frente a los estándares de una empresa con tanta trayectoria. Sin embargo, lo entrego con la satisfacción de haber cumplido con mi compromiso y de no haber dejado la tarea a medias.

Si tienen el tiempo, **valoraría muchísimo cualquier comentario o crítica** sobre lo que presenté. Estoy aquí para aprender, y saber en qué me equivoqué o qué puedo hacer mejor es lo que más me va a ayudar en mi camino como desarrolladora.

* **Monica Pradines**
* [mpradinesa@gmail.com](mailto:mpradinesa@gmail.com)
* [Repositorio en GitHub](https://github.com/Mpradinesa/AI-Task-Master-PlanOK.git)

