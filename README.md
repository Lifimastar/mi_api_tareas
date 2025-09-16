# Mi RESTful de Tareas

Este proyecto es una aplicacion Full-Stack que consiste en una API RESTful (Flask y Flask-RESTful) y un frontend interactivo (HTML, CSS, JAVASCRIPT) que consume esta API para gestiar tareas.

## Caracteristicas
- **Backend:** CRUD API con Flask-RESTful.
- **Frontend:** CRUD UI con JS/Fetch.

## Endpoints de la API
- `GET /tasks`: Obtener todas las tareas.
- `GET /tasks/<int:task_id>`: Obtener una tarea especifica.
- `post /tasks`: Crear una nueva tarea.
- `PUT /tasks/<int:task_id>`: Actualizar una tarea existente.
- `DELETE /tasks/<int:task_id>`: Eliminar una tarea.

## Tecnologias
- **Backend:** Python 3.x, Flask, Flask-RESTful, SQLite
- **Frontend:** HTML, CSS, Javascript (Fetch API), venv

## Como usar
1. Clonar el repositorio.
2. Crear y activar entorno virtual.
3. Instalar dependencias (`pip install -r requirements.txt`).
4. Inicializar DB (`python database.py`).
5. Ejecutar la app (`python app.py`).
6. Acceder al frontend en el navegador (`http://127.0.0.1:5000`).
7. Puedes probar con postman o curl.

## Autor
Lifimastar
