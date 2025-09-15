# Mi RESTful de Tareas con Frontend (Full-Stack)

Este proyecto es una aplicacion Full-Stack que consiste en una API RESTful (Flask y Flask-RESTful) y un frontend interactivo (HTML, CSS, JAVASCRIPT) que consume esta API para gestiar tareas.

## Caracteristicas
- **Backend (API):** Crear, leer, actualizar y eliminar tareas (CRUD) a traves de endpoints RESTful con respuestas JSON.
- **Frontend (Web):** Interfaz de usuario para visualizar, anadir, marcar como completadas y eliminar tareas, comunicandose con la API.

## Endpoints de la API
- `GET /tasks`: Obtener todas las tareas.
- `GET /tasks/<int:task_id>`: Obtener una tarea especifica.
- `post /tasks`: Crear una nueva tarea.
- `PUT /tasks/<int:task_id>`: Actualizar una tarea existente.
- `DELETE /tasks/<int:task_id>`: Eliminar una tarea.

## Tecnologias
- **Backend:** Python 3.x, Flask, Flask-RESTful, SQLite (Base de datos)
- **Frontend:** HTML, CSS, Javascript (Fetch API)

## Como usar

## Autor
Lifimastar