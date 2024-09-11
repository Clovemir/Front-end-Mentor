document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const homeLink = document.getElementById('homeLink');
    const tasksLink = document.getElementById('tasksLink');
    const expensesLink = document.getElementById('expensesLink');

    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const totalAmount = document.getElementById('totalAmount');

    let tasks = [];
    let expenses = [];
    let totalExpense = 0;

    // Alternar entre seções
    homeLink.addEventListener('click', () => showSection('homeSection'));
    tasksLink.addEventListener('click', () => showSection('tasksSection'));
    expensesLink.addEventListener('click', () => showSection('expensesSection'));

    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
        document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
        document.querySelector(`#${sectionId === 'homeSection' ? 'homeLink' : sectionId === 'tasksSection' ? 'tasksLink' : 'expensesLink'}`).classList.add('active');
    }

    // Adicionar nova tarefa
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = document.getElementById('newTask').value;

        if (newTask.trim()) {
            tasks.push(newTask);
            renderTasks();
            taskForm.reset();
        }
    });

    // Renderizar tarefas
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${task} <span data-index="${index}">X</span>`;
            taskList.appendChild(li);
        });
    }

    // Remover tarefa
    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            const index = e.target.getAttribute('data-index');
            tasks.splice(index, 1);
            renderTasks();
        }
    });

    // Adicionar novo gasto
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const expenseName = document.getElementById('expenseName').value;
        const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

        if (expenseName.trim() && expenseAmount > 0) {
            expenses.push({ name: expenseName, amount: expenseAmount });
            totalExpense += expenseAmount;
            renderExpenses();
            expenseForm.reset();
        }
    });

    // Renderizar gastos
    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${expense.name}: R$ ${expense.amount.toFixed(2)} <span data-index="${index}">X</span>`;
            expenseList.appendChild(li);
        });
        totalAmount.textContent = totalExpense.toFixed(2);
    }

    // Remover gasto
    expenseList.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            const index = e.target.getAttribute('data-index');
            totalExpense -= expenses[index].amount;
            expenses.splice(index, 1);
            renderExpenses();
        }
    });

    // Configuração das rodas de estatísticas
    const circles = document.querySelectorAll('.circle');

    circles.forEach(circle => {
        const percentage = circle.getAttribute('data-percentage');
        circle.style.setProperty('--percentage', percentage);
    });
});
