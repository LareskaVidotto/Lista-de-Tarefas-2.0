document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Carregar tarefas do local storage
    loadTasks();

    // Adicionar tarefa
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // Função para adicionar tarefa à lista
    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;

        // Botão de concluir
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Concluir';
        completeBtn.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks(); // Salvar tarefas após a conclusão
        });

        // Botão de remover
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remover';
        removeBtn.addEventListener('click', () => {
            li.remove();
            saveTasks(); // Salvar tarefas após remoção
        });

        li.appendChild(completeBtn);
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        saveTasks(); // Salvar tarefas após adição
    }

    // Função para salvar tarefas no local storage
    function saveTasks() {
        const tasks = [];
        const taskItems = document.querySelectorAll('#task-list li');
        taskItems.forEach(item => {
            tasks.push({
                text: item.childNodes[0].textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Função para carregar tarefas do local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }

            // Botão de concluir
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Concluir';
            completeBtn.addEventListener('click', () => {
                li.classList.toggle('completed');
                saveTasks(); // Salvar tarefas após a conclusão
            });

            // Botão de remover
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remover';
            removeBtn.addEventListener('click', () => {
                li.remove();
                saveTasks(); // Salvar tarefas após remoção
            });

            li.appendChild(completeBtn);
            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }
});