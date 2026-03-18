// DOM Elements
const todoList = [];
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const prioritySelect = document.getElementById("priority-select");
const deleteAllButton = document.getElementById("delete-all");
const allTodos = document.getElementById("all-todos");
const deleteSButton = document.getElementById("delete-selected");
const searchInput = document.getElementById("search-input");
const clearFilterBtn = document.getElementById("clear-filter");

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromStorage();
    updateStats();
});

// Form submission
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});

// Delete buttons
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteSelected);

// Search
if (searchInput) {
    searchInput.addEventListener("input", searchTasks);
}

// Filter event listeners
document.getElementById("all")?.addEventListener("click", (e) => {
    e.preventDefault();
    filterTasks('all');
});

document.getElementById("rem")?.addEventListener("click", (e) => {
    e.preventDefault();
    filterTasks('pending');
});

document.getElementById("com")?.addEventListener("click", (e) => {
    e.preventDefault();
    filterTasks('completed');
});

// Priority filters
document.getElementById("prio-high")?.addEventListener("click", (e) => {
    e.preventDefault();
    filterTasks('priority-high');
});

document.getElementById("prio-med")?.addEventListener("click", (e) => {
    e.preventDefault();
    filterTasks('priority-medium');
});

document.getElementById("prio-low")?.addEventListener("click", (e) => {
    e.preventDefault();
    filterTasks('priority-low');
});

// Clear filter
clearFilterBtn?.addEventListener("click", () => {
    appendTask(todoList);
    showToast("Filter cleared!", "success");
});

// Dropdown accessibility
const dropbtn = document.querySelector('.dropbtn');
const dropdownContent = document.querySelector('.dropdown-content');

if (dropbtn && dropdownContent) {
    dropbtn.addEventListener('focus', () => {
        dropdownContent.style.display = 'block';
    });

    dropbtn.addEventListener('blur', () => {
        // Delay to allow clicking on dropdown items
        setTimeout(() => {
            if (!dropdownContent.matches(':hover')) {
                dropdownContent.style.display = 'none';
            }
        }, 200);
    });
}

// Event delegation for dynamic elements
document.addEventListener('click', (event) => {
    // Delete button
    const deleteBtn = event.target.closest('.delete-btn');
    if (deleteBtn) {
        const id = deleteBtn.dataset.id;
        deleteTask(id);
        return;
    }

    // Complete button
    const completeBtn = event.target.closest('.complete-btn');
    if (completeBtn) {
        const id = completeBtn.dataset.id;
        toggleComplete(id);
        return;
    }

    // Edit button
    const editBtn = event.target.closest('.edit-btn');
    if (editBtn) {
        const id = editBtn.dataset.id;
        editTask(id);
    }
});

// LocalStorage Functions
function saveTasksToStorage() {
    try {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

function loadTasksFromStorage() {
    try {
        const stored = localStorage.getItem('todoList');
        if (stored) {
            const parsed = JSON.parse(stored);
            todoList.length = 0;
            todoList.push(...parsed);
            appendTask(todoList);
        }
    } catch (e) {
        console.error('Error loading from localStorage:', e);
    }
}

// Main Functions
function addTask() {
    const task = todoInput.value.trim();
    const priority = prioritySelect?.value || 'medium';

    if (task === "") {
        showToast("Please enter a task!", "error");
        todoInput.focus();
        return;
    }

    const newTask = {
        id: Date.now().toString(),
        content: task,
        complete: false,
        priority: priority,
        createdAt: new Date().toISOString()
    };

    todoList.push(newTask);
    saveTasksToStorage();
    appendTask(todoList);
    updateStats();

    todoInput.value = "";
    if (prioritySelect) prioritySelect.value = 'medium';
    todoInput.focus();

    showToast("Task added successfully!", "success");
}

function appendTask(tasks) {
    allTodos.innerHTML = "";

    if (!tasks || tasks.length === 0) {
        allTodos.innerHTML = `
            <li class="empty-state" role="status">
                <i class='bx bx-clipboard' aria-hidden="true"></i>
                <p>No tasks yet. Add a task to get started!</p>
            </li>
        `;
        return;
    }

    tasks.forEach((element) => {
        const priorityClass = `priority-${element.priority}`;
        const li = document.createElement('li');
        li.className = `todo-item ${element.complete ? 'completed' : ''}`;
        li.dataset.id = element.id;

        li.innerHTML = `
            <div class="task-content">
                <p id="task" class="${element.complete ? 'completed-text' : ''}">${escapeHtml(element.content)}</p>
                <div class="meta-row">
                    <span class="priority-badge ${priorityClass}">${element.priority}</span>
                    <span class="task-date">${formatDate(element.createdAt)}</span>
                </div>
            </div>
            <div class="todo-actions">
                <button class="action-btn complete-btn" data-id="${element.id}" title="${element.complete ? 'Mark as pending' : 'Mark as complete'}" aria-label="${element.complete ? 'Mark as pending' : 'Mark as complete'}">
                    <i class="bx ${element.complete ? 'bx-undo' : 'bx-check'}" aria-hidden="true"></i>
                </button>
                <button class="action-btn edit-btn" data-id="${element.id}" title="Edit task" aria-label="Edit task">
                    <i class="bx bx-edit" aria-hidden="true"></i>
                </button>
                <button class="action-btn delete-btn" data-id="${element.id}" title="Delete task" aria-label="Delete task">
                    <i class="bx bx-trash" aria-hidden="true"></i>
                </button>
            </div>
        `;
        allTodos.appendChild(li);
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    // Less than 1 minute
    if (diff < 60000) {
        return 'Just now';
    }
    // Less than 1 hour
    if (diff < 3600000) {
        const mins = Math.floor(diff / 60000);
        return `${mins} min${mins > 1 ? 's' : ''} ago`;
    }
    // Less than 24 hours
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function deleteTask(id) {
    const index = todoList.findIndex(task => task.id === id);
    if (index > -1) {
        todoList.splice(index, 1);
        saveTasksToStorage();
        appendTask(todoList);
        updateStats();
        showToast("Task deleted!", "success");
    }
}

function toggleComplete(id) {
    const task = todoList.find(t => t.id === id);
    if (task) {
        task.complete = !task.complete;
        saveTasksToStorage();
        appendTask(todoList);
        updateStats();
        showToast(task.complete ? "Task completed! 🎉" : "Task marked as pending", "success");
    }
}

function editTask(id) {
    const task = todoList.find(t => t.id === id);
    if (task) {
        const newContent = prompt("Edit your task:", task.content);
        if (newContent !== null && newContent.trim() !== "") {
            task.content = newContent.trim();
            saveTasksToStorage();
            appendTask(todoList);
            showToast("Task updated!", "success");
        }
    }
}

function deleteAll() {
    if (todoList.length === 0) {
        showToast("No tasks to delete!", "error");
        return;
    }

    if (confirm("Are you sure you want to delete all tasks? This action cannot be undone.")) {
        todoList.length = 0;
        saveTasksToStorage();
        appendTask(todoList);
        updateStats();
        showToast("All tasks deleted!", "success");
    }
}

function deleteSelected() {
    const completedTasks = todoList.filter(task => task.complete);

    if (completedTasks.length === 0) {
        showToast("No completed tasks to delete!", "error");
        return;
    }

    if (confirm(`Delete ${completedTasks.length} completed task(s)?`)) {
        const remainingTasks = todoList.filter(task => !task.complete);
        todoList.length = 0;
        todoList.push(...remainingTasks);
        saveTasksToStorage();
        appendTask(todoList);
        updateStats();
        showToast("Completed tasks deleted!", "success");
    }
}

function filterTasks(filter) {
    let filteredList;

    switch (filter) {
        case 'pending':
            filteredList = todoList.filter(task => !task.complete);
            showToast("Showing pending tasks", "success");
            break;
        case 'completed':
            filteredList = todoList.filter(task => task.complete);
            showToast("Showing completed tasks", "success");
            break;
        case 'priority-high':
            filteredList = todoList.filter(task => task.priority === 'high');
            showToast("Showing high priority tasks", "success");
            break;
        case 'priority-medium':
            filteredList = todoList.filter(task => task.priority === 'medium');
            showToast("Showing medium priority tasks", "success");
            break;
        case 'priority-low':
            filteredList = todoList.filter(task => task.priority === 'low');
            showToast("Showing low priority tasks", "success");
            break;
        default:
            filteredList = [...todoList];
    }

    appendTask(filteredList);
}

function searchTasks(e) {
    const searchTerm = e.target.value.toLowerCase().trim();

    if (searchTerm === "") {
        appendTask(todoList);
        return;
    }

    const filteredList = todoList.filter(task =>
        task.content.toLowerCase().includes(searchTerm)
    );

    appendTask(filteredList);
}

function updateStats() {
    const completed = todoList.filter(task => task.complete).length;
    const total = todoList.length;

    const cCountEl = document.querySelector("#c-count");
    const rCountEl = document.querySelector("#r-count");

    if (cCountEl) cCountEl.textContent = completed;
    if (rCountEl) rCountEl.textContent = total;
}

// Toast notification
function showToast(message, type = "success") {
    const container = document.getElementById('toast-container');
    if (!container) return;

    // Remove existing toasts
    const existingToasts = container.querySelectorAll('.toast');
    existingToasts.forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <i class="bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}" aria-hidden="true"></i>
        <span>${escapeHtml(message)}</span>
        <button class="toast-close" aria-label="Close notification">&times;</button>
    `;

    container.appendChild(toast);

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
    });

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
}
