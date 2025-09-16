from flask import Flask, request, render_template
from flask_restful import Resource, Api
from database import get_db_connection, init_db
import json

app = Flask(__name__)
api = Api(app)

with app.app_context():
    init_db()

@app.route('/')
def serve_frontend():
    """Sirve el archivo HTML principal de la aplicacion frontend."""
    return render_template('index.html')

# --- Clase de Recurso para una sola tarea (GET, PUT, DELETE) ---
class Task(Resource):
    def get(self, task_id):
        """Obtiene una tarea especifica por su ID."""
        conn = get_db_connection()
        task = conn.execute("select * from tasks where id = ?", (task_id,)).fetchone()
        conn.close()
        if task:
            return dict(task), 200
        return {"message": "Tarea no encontrada"}, 404
    
    def put(self, task_id):
        """Actualiza una tarea existente por su ID. Se espera un JSON con 'title', 'description' o 'status'."""
        conn = get_db_connection()
        task = conn.execute("select * from tasks where id = ?", (task_id,)).fetchone()

        if not task:
            conn.close()
            return {'message': 'Tarea no encontrada'}, 404
        
        # obtener los datos del cuerpo de la solicitud (JSON)
        data = request.get_json()
        if not data:
            conn.close()
            return {'message': 'No se proporcionaron datos JSON validos'}, 400
        title = data.get('title', task['title'])
        description = data.get('description', task['description'])
        status = data.get('status', task['status'])
        conn.execute("update tasks set title = ?, description = ?, status = ? where id = ?", (title, description, status, task_id))
        conn.commit()
        conn.close()

        # Devolver la tarea actualizada
        conn = get_db_connection()
        updated_task = conn.execute("select * from tasks where id = ?", (task_id,)).fetchone()
        conn.close()
        return dict(updated_task), 200
    
    def delete(self, task_id):
        """Elimina una tarea por su ID."""
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("delete from tasks where id = ?", (task_id,))
        conn.commit()
        rows_affected = cursor.rowcount
        conn.close()

        if rows_affected > 0:
            return {'message': f'Tarea {task_id} eliminada exitosamente'}, 200
        return {'message': 'Tarea no encontrada'}, 404
    

# --- Clase de Recurso para la Coleccion de Tareas (GET, POST) ---
class TaskList(Resource):
    def get(self):
        """Obtiene todas las tareas."""
        conn = get_db_connection()
        tasks = conn.execute("select * from tasks order by created_at desc").fetchall()
        conn.close()
        return [dict(task) for task in tasks], 200
    
    def post(self):
        """Crea una nueva tarea. Se espera un JSON con 'title' (obligatorio) y 'description' (opcional)."""
        data = request.get_json()
        if not data or 'title' not in data:
            return {'message': 'El titulo de la tarea es obligatorio'}, 400
        
        title = data['title']
        description = data.get('description', '')
        status = data.get('status', 'pendiente')

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("insert into tasks (title, description, status) values (?, ?, ?)", (title, description, status))
        conn.commit()
        new_task_id = cursor.lastrowid
        conn.close()

        # Devolver la tarea recien creada
        conn = get_db_connection()
        new_task = conn.execute("select * from tasks where id = ?", (new_task_id,)).fetchone()
        conn.close()
        return dict(new_task), 201
    
# --- Definicion de las Rutas de la API ---
api.add_resource(TaskList, '/api/tasks')
api.add_resource(Task, '/api/tasks/<int:task_id>')

if __name__ == '__main__':
    app.run(debug=True)

