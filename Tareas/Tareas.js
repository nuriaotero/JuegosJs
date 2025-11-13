
let tasks = [];

const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');


function addTask() {
    const taskText = taskInput.value.trim();

   
    if (taskText === '') {
        alert('Por favor, ingresa una tarea válida.');
        return;
    }

   
    const newTask = {
        id: Date.now(), 
        text: taskText,
        completed: false,
        createdAt: new Date()
    };

   
    tasks.push(newTask);

   
    taskInput.value = '';

    
    renderTasks();

    
    taskInput.focus();
}


function renderTasks() {
    // Limpiar la lista actual
    taskList.innerHTML = '';

    
    if (tasks.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'No hay tareas pendientes. ¡Agrega una nueva!';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.color = '#666';
        emptyMessage.style.padding = '20px';
        emptyMessage.style.fontStyle = 'italic';
        taskList.appendChild(emptyMessage);
        return;
    }

   
    tasks.forEach(task => {
        const taskItem = createTaskElement(task);
        taskList.appendChild(taskItem);
    });

    
    updateTaskCounter();
}

function createTaskElement(task) {
   
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.taskId = task.id;

    
    if (task.completed) {
        li.classList.add('completed');
    }


    const checkbox = document.createElement('div');
    checkbox.className = 'task-checkbox';
    if (task.completed) {
        checkbox.classList.add('checked');
    }


    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;


    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '×';
    deleteBtn.title = 'Eliminar tarea';


    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);


    addTaskEventListeners(li, task);

    return li;
}


function addTaskEventListeners(taskElement, task) {
    const checkbox = taskElement.querySelector('.task-checkbox');
    const taskText = taskElement.querySelector('.task-text');
    const deleteBtn = taskElement.querySelector('.delete-btn');


    checkbox.addEventListener('click', () => {
        toggleTaskCompletion(task.id);
    });


    taskText.addEventListener('click', () => {
        toggleTaskCompletion(task.id);
    });


    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTask(task.id);
    });
}


function toggleTaskCompletion(taskId) {

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {

        tasks[taskIndex].completed = !tasks[taskIndex].completed;


        renderTasks();
    }
}


function deleteTask(taskId) {

    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {

        tasks = tasks.filter(task => task.id !== taskId);

        renderTasks();
    }
}


function updateTaskCounter() {

    let counter = document.querySelector('.task-counter');

    if (!counter) {

        counter = document.createElement('div');
        counter.className = 'task-counter';
        taskList.parentNode.insertBefore(counter, taskList);
    }

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    counter.textContent = `Tareas: ${pendingTasks} pendientes, ${completedTasks} completadas (Total: ${totalTasks})`;
}


function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

function init() {

    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }


    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', handleKeyPress);


    window.addEventListener('beforeunload', () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });


    taskInput.focus();
}


document.addEventListener('DOMContentLoaded', init);