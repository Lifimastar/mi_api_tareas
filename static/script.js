const API_BASE_URL = '/api/tasks'

// referencias a los elementos HTML
const taskList = document.getElementById('taskList');
const noTasksMessage = document.getElementById('noTasksMessage');
const taskTitleInput = document.getElementById('taskTitle');
const taskDescriptionInput = document.getElementById('taskDescription');
const addTaskBtn = document.getElementById('addTaskBtn');

// --- Funcion para renderizar una sola tarea ---
function renderTask(task) {
    const taskItem = document.createElement('div');
    taskItem.className = `task-item ${task.status === "completada" ? "completed" : ""}`;
    taskItem.dataset.taskId = task.id;

    taskItem.innerHTML = `
        <div class="task-details">
            <div class="task-title">${task.title}</div>
            ${task.description ? `<div class='task-description'>${task.description}</div>` : ''}
        <div class="task-meta">Creada: ${new Date(task.created_at).toLocaleString()}</div>
        </div>
        <div class="task-actions">
            <span class="task-status">${task.status}</span>
            <button class="action-button complete" ${task.status === 'completada' ? 'disabled' : ''}>Completar</button>
            <button class="action-button delete">Eliminar</button>
        </div>`;

    // listeners de eventos a los botones
    taskItem.querySelector('.complete').addEventListener('click', () => completeTask(task.id));
    taskItem.querySelector('.delete').addEventListener('click', () => deleteTask(task.id));

    return taskItem;
}

// --- funcion para cargar y mostrar todas las tareas ---
async function loadTasks() {
    try {
        const respose = await fetch(API_BASE_URL);
        const tasks = await respose.json();
        taskList.innerHTML = '';

        if (tasks.length === 0) {
            noTasksMessage.style.display = 'block';

        } else {
            noTasksMessage.style.display = 'none';
            tasks.forEach(task => {
                taskList.appendChild(renderTask(task));
            });
        }
    } catch (error) {
        console.error('Error al cargar las tareas:', error);
        taskList.innerHTML = '<p class="no-tasks">Error al cargar las tareas. Intentalo de nuevo mas tarde.</p>';
    }
}

// --- funcion para agregar una nueva tarea ---
async function addTask() {
    const title = taskTitleInput.value.trim();
    const description = taskDescriptionInput.value.trim();

    if (!title) {
        alert('El titulo de la tarea es obligatorio.');
        return;
    }

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });

        if (response.ok) {
            taskTitleInput.value = '';
            taskDescriptionInput.value = '';
            await loadTasks();
        } else {
            const errorData = await response.json();
            alert(`Error al agregar tarea: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error al agregar tarea:', error);
        alert('Error de conexion al agregar la tarea.');
    }
}

// --- funcion para marcar una tarea como completada ---
async function completeTask(taskId) {
    try {
        const response = await fetch(`${API_BASE_URL}/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'completada' })
        });

        if (response.ok) {
            await loadTasks();
        } else {
            const errorData = await response.json();
            alert(`Error al completar tarea: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error al completar tarea:', error);
        alert('Error de conexion al completar la tarea.');
    }
}

// --- funcion para eliminar una tarea ---
async function deleteTask(taskId) {
    if (!confirm('Estas seguro de que quieres eliminar esta tarea?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${taskId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await loadTasks();
        } else {
            const errorData = await response.json();
            alert(`Error al eliminar tarea ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        alert('Error de conexion al eliminar la tarea.');
    }
}

// --- Event listeners ---
addTaskBtn.addEventListener('click', addTask);

// cargar las tareas al iniciar la pagina
document.addEventListener('DOMContentLoaded', loadTasks);