# Mi RESTful de Tareas con Flask

Este es un proyecto de API RESTful desarrollado con Flask y Flask-RESTful en Python.
Permite a otras aplicaciones interactuar con un gestor de tareas a traves de solicitudes HTTP y respuestas JSON.

## Caracteristicas
- Crear, leer, actualizar y eliminar tareas (CRUD).
- Respuestas en formato JSON.

## Endpoints de la API
- `GET /tasks`: Obtener todas las tareas.
- `GET /tasks/<int:task_id>`: Obtener una tarea especifica.
- `post /tasks`: Crear una nueva tarea.
- `PUT /tasks/<int:task_id>`: Actualizar una tarea existente.
- `DELETE /tasks/<int:task_id>`: Eliminar una tarea.

## Tecnologias
- Python 3.x
- Flask
- Flask-RESTful
- SQLite (Base de datos)

## Como usar

## Autor
Lifimastar