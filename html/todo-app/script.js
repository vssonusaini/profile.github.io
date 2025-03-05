const todoInput = document.getElementById('todo-input');
const prioritySelect = document.getElementById('priority-select');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const filterPrioritySelect = document.getElementById('filter-priority');
const clearFilterButton = document.getElementById('clear-filter-button');
const editModal = document.getElementById('edit-modal');
const editTodoInput = document.getElementById('edit-todo-input');
const editPrioritySelect = document.getElementById('edit-priority-select');
const saveEditButton = document.getElementById('save-edit-button');
const cancelEditButton = document.getElementById('cancel-edit-button');
const closeEditModalButton = document.getElementById('close-edit-modal');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const scheduleInput = document.getElementById('schedule-input');
const autoUncompleteSelect = document.getElementById('auto-uncomplete-select');
const editScheduleInput = document.getElementById('edit-schedule-input');
const editAutoUncompleteSelect = document.getElementById('edit-auto-uncomplete-select');
const editAutoRescheduleCheckbox = document.getElementById('edit-auto-reschedule');
const notificationSound = document.getElementById('notification-sound');
const todoHistoryList = document.getElementById('todo-history');
const showHistoryButton = document.getElementById('show-history-button');
const historyModal = document.getElementById('history-modal');
const fullTodoHistoryList = document.getElementById('full-todo-history');
const closeHistoryModal = document.getElementById('close-history-modal');
const settingsButton = document.getElementById('settings-button');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsModal = document.getElementById('close-settings-modal');
const saveSettingsButton = document.getElementById('save-settings-button');
const broadcastUsernameInput = document.getElementById('broadcast-username');
const broadcastKeyInput = document.getElementById('broadcast-key');


let todos = JSON.parse(localStorage.getItem('todos')) || []; // Load from localStorage
let todoHistory = JSON.parse(localStorage.getItem('todoHistory')) || []; // Load history
let currentEditTodoId = null;
let broadcastSettings = JSON.parse(localStorage.getItem('broadcastSettings')) || { username: '', key: '' };
let mqttClient = null;


// Function to set the theme
function setInitialTheme() {
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        themeToggleDarkIcon.classList.remove('hidden');
        themeToggleLightIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        themeToggleLightIcon.classList.remove('hidden');
        themeToggleDarkIcon.classList.add('hidden');
    }
}
// Load broadcast settings and connect to MQTT
function loadBroadcastSettings() {
    broadcastUsernameInput.value = broadcastSettings.username || '';
    broadcastKeyInput.value = broadcastSettings.key || '';
    if (broadcastSettings.key) {
        connectToMQTT();  // Connect immediately if settings exist
    }
}
// Connect to MQTT broker
function connectToMQTT() {
    if (mqttClient && mqttClient.connected) {
        mqttClient.end(); // Disconnect any existing client
    }
    const options = {
        protocol: 'ws',
        clientId: 'todo-app-' + Math.random().toString(16).substr(2, 8) // Unique client ID
    };

    mqttClient = mqtt.connect('ws://broker.hivemq.com:8000/mqtt', options);

    mqttClient.on('connect', () => {
        console.log('Connected to MQTT broker');
        //Subscribe topic
        mqttClient.subscribe(`todo/history/${broadcastSettings.key}`, (err) => {
            if (err) {
                console.error('Failed to subscribe:', err);
            } else {
                console.log(`Subscribed to todo/history/${broadcastSettings.key}`);
            }
        });
    });

    mqttClient.on('message', (topic, message) => {
        console.log('Received message:', topic, message.toString());
        // Handle incoming messages (you could update the UI here)
        if (topic === `todo/history/${broadcastSettings.key}`) {
            try {
                const receivedHistoryItem = JSON.parse(message.toString());

                // Check if the history item is already in the local history
                const isDuplicate = todoHistory.some(item =>
                    item.timestamp === receivedHistoryItem.timestamp &&
                    item.action === receivedHistoryItem.action &&
                    item.todo.id === receivedHistoryItem.todo.id
                );

                if (!isDuplicate) {
                    todoHistory.push(receivedHistoryItem);
                    saveHistoryToLocalStorage();
                    renderHistory(); // Update local history display
                }

            } catch (error) {
                console.error("Failed to parse incoming history message:", error)
            }
        }
    });

    mqttClient.on('error', (error) => {
        console.error('MQTT Error:', error);
    });
    mqttClient.on('close', () => {
        console.log('MQTT Connection closed');
    });

    mqttClient.on('offline', () => {
        console.log('MQTT Client is offline');
    });
}

// Save broadcast settings
function saveBroadcastSettings() {
    broadcastSettings = {
        username: broadcastUsernameInput.value.trim(),
        key: broadcastKeyInput.value.trim()
    };
    localStorage.setItem('broadcastSettings', JSON.stringify(broadcastSettings));

    if (broadcastSettings.key) {
        connectToMQTT();
    } else {
        if (mqttClient) {
            mqttClient.end();  //Disconnect if the key is removed
        }
    }
    settingsModal.classList.add('hidden');
}

//Request notification permissions on page load and schedule notifications
function requestNotificationPermission() {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
        return;
    }

    if (Notification.permission === "granted") {
        console.log("Notification permission already granted.");
        reloadTodos(); //Schedule existing todos
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                console.log("Notification permission granted.");
                reloadTodos(); //Schedule existing todos
            }
        });
    } else {
        console.log("Notification permission denied.");
    }
}

// Reload all scheduled notifications
function reloadTodos() {
    todos.forEach(todo => scheduleNotification(todo));
}

// Request permissions on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    setInitialTheme();
    requestNotificationPermission();
    renderHistory();
    loadBroadcastSettings(); // Load and display settings

    settingsButton.addEventListener('click', () => {
        settingsModal.classList.remove('hidden');
    });
    closeSettingsModal.addEventListener('click', () => {
        settingsModal.classList.add('hidden');
    });
    saveSettingsButton.addEventListener('click', saveBroadcastSettings);
});

function saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function saveHistoryToLocalStorage() {
    localStorage.setItem('todoHistory', JSON.stringify(todoHistory));
}

function recordHistory(action, todo) {
    const historyItem = {
        timestamp: new Date().toISOString(),
        action: action,
        todo: todo,
        user: broadcastSettings.username || 'Anonymous' // Add user
    };
    todoHistory.push(historyItem);
    saveHistoryToLocalStorage();
    renderHistory();

    // Broadcast the history item if MQTT is connected
    if (mqttClient && mqttClient.connected && broadcastSettings.key) {
        mqttClient.publish(`todo/history/${broadcastSettings.key}`, JSON.stringify(historyItem), (err) => {
            if (err) {
                console.error("Failed to publish:", err)
            }
        });
    }
}

function renderHistory() {
    todoHistoryList.innerHTML = '';
    // Sort by timestamp, most recent first
    const sortedHistory = [...todoHistory].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    sortedHistory.slice(0, 5).forEach(item => { // Show last 5 items
        const li = document.createElement('li');
        li.classList.add('mb-1', 'py-1', 'px-2', 'rounded', 'shadow', 'text-sm', 'text-gray-800', 'dark:text-white');
        li.textContent = `${item.action}: ${item.todo.title} - ${new Date(item.timestamp).toLocaleString()} - ${item.user}`;
        todoHistoryList.appendChild(li);
    });
}

function renderFullHistory() {
    fullTodoHistoryList.innerHTML = '';
    // Sort by timestamp, most recent first
    const sortedHistory = [...todoHistory].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    sortedHistory.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('mb-1', 'py-1', 'px-2', 'rounded', 'shadow', 'text-sm', 'text-gray-800', 'dark:text-white');
        li.textContent = `${item.action}: ${item.todo.title} - ${new Date(item.timestamp).toLocaleString()} -by ${item.user}`;
        fullTodoHistoryList.appendChild(li);
    });
}

function showHistoryModal() {
    renderFullHistory();
    historyModal.classList.remove('hidden');
}

function closeHistory() {
    historyModal.classList.add('hidden');
}


function renderTodos() {
    todoList.innerHTML = '';

    const filterPriority = filterPrioritySelect.value;

    let filteredTodos = todos;

    if (filterPriority !== 'all') {
        filteredTodos = todos.filter(todo => todo.priority === filterPriority);
    }


    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('mb-2', 'py-2', 'px-4', 'rounded', 'shadow', 'flex', 'items-center', 'justify-between', 'transition-colors', 'duration-300');
        li.classList.add(`priority-${todo.priority}`); // Add priority class
        li.dataset.id = todo.id;

        if (todo.completed) {
            li.classList.add('completed');
        }

        const scheduledTime = new Date(todo.scheduledTime).toLocaleString(); // Format the date

        li.innerHTML = `
            <span>${todo.title} - Scheduled: ${scheduledTime}</span>
            <div>
                <button class="edit-button bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2 transition-colors duration-300">Edit</button>
                <button class="complete-button bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded mr-2 transition-colors duration-300">${todo.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition-colors duration-300">Delete</button>
            </div>
        `;

        todoList.appendChild(li);
    });
}

function addTodo() {
    const title = todoInput.value.trim();
    const priority = prioritySelect.value;
    const scheduledTime = scheduleInput.value;  // Get value from datetime-local input
    const autoUncompleteDays = autoUncompleteSelect.value === 'none' ? 'none' : parseInt(autoUncompleteSelect.value, 10);


    if (title !== '' && scheduledTime !== '') {  // Also ensure scheduled time is provided

        const todo = {
            id: Date.now(),
            title: title,
            scheduledTime: scheduledTime,
            autoUncompleteDays: autoUncompleteDays,
            completed: false,
            completedTime: null,
            rescheduledTime: null,  // Initialize
            rescheduleCount: 0,       // Initialize
            autoReschedule: false,     // Initialize
            priority: priority,
        };

        todos.push(todo);
        saveTodosToLocalStorage(); // Save after adding
        scheduleNotification(todo); // Schedule the notification for the new todo
        recordHistory('Added', todo);  // Record the history
        todoInput.value = '';
        scheduleInput.value = '';
        autoUncompleteSelect.value = 'none';
        renderTodos();
    }
    else {
        alert("Please enter a title and schedule time.");
    }
}

function deleteTodo(id) {
    const todoToDelete = todos.find(todo => todo.id === id);
    if (todoToDelete) {
        recordHistory('Deleted', todoToDelete);
        todos = todos.filter(todo => todo.id !== id);
        saveTodosToLocalStorage(); // Save after deleting
        renderTodos();
    }
}

function toggleComplete(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
            todo.completedTime = todo.completed ? new Date().toISOString() : null; // Track completion time
            recordHistory(todo.completed ? 'Completed' : 'Uncompleted', todo);
        }
        return todo;
    });
    saveTodosToLocalStorage(); // Save after toggling complete
    renderTodos();
}

function editTodo(id) {
    currentEditTodoId = id;
    const todoToEdit = todos.find(todo => todo.id === id);

    if (todoToEdit) {
        editTodoInput.value = todoToEdit.title;
        editScheduleInput.value = todoToEdit.scheduledTime;
        editAutoUncompleteSelect.value = todoToEdit.autoUncompleteDays === 'none' ? 'none' : todoToEdit.autoUncompleteDays.toString();
        editPrioritySelect.value = todoToEdit.priority;
        editAutoRescheduleCheckbox.checked = todoToEdit.autoReschedule;

        // Show the modal
        editModal.classList.remove('hidden');
    }
}

function saveEditedTodo() {
    if (currentEditTodoId) {
        todos = todos.map(todo => {
            if (todo.id === currentEditTodoId) {
                recordHistory('Edited', todo);  //Record history before modification
                todo.title = editTodoInput.value;
                todo.scheduledTime = editScheduleInput.value;
                todo.autoUncompleteDays = editAutoUncompleteSelect.value === 'none' ? 'none' : parseInt(editAutoUncompleteSelect.value, 10);
                todo.priority = editPrioritySelect.value;
                todo.autoReschedule = editAutoRescheduleCheckbox.checked;
                recordHistory('Edited', todo); // And after
            }
            return todo;
        });
        saveTodosToLocalStorage(); // Save after editing
        renderTodos();
        // Hide the modal
        editModal.classList.add('hidden');
        currentEditTodoId = null;
        editTodoInput.value = ''; // Clear the input
        editScheduleInput.value = '';
        editAutoUncompleteSelect.value = 'none';
        editAutoRescheduleCheckbox.checked = false;
    }
}

function cancelEdit() {
    editModal.classList.add('hidden');
    currentEditTodoId = null;
    editTodoInput.value = '';
    editScheduleInput.value = '';
    editAutoUncompleteSelect.value = 'none';
    editAutoRescheduleCheckbox.checked = false;
}

addButton.addEventListener('click', addTodo);

todoList.addEventListener('click', (event) => {
    const target = event.target;
    const todoId = parseInt(target.closest('li').dataset.id);

    if (target.classList.contains('delete-button')) {
        deleteTodo(todoId);
    } else if (target.classList.contains('complete-button')) {
        toggleComplete(todoId);
    } else if (target.classList.contains('edit-button')) {
        editTodo(todoId);
    }
});

filterPrioritySelect.addEventListener('change', renderTodos);

clearFilterButton.addEventListener('click', () => {
    filterPrioritySelect.value = 'all';
    renderTodos();
});

saveEditButton.addEventListener('click', saveEditedTodo);
cancelEditButton.addEventListener('click', cancelEdit);
closeEditModalButton.addEventListener('click', cancelEdit);

themeToggleBtn.addEventListener('click', () => {

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            themeToggleDarkIcon.classList.remove('hidden');
            themeToggleLightIcon.classList.add('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            themeToggleLightIcon.classList.remove('hidden');
            themeToggleDarkIcon.classList.add('hidden');
        }

        // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            themeToggleLightIcon.classList.remove('hidden');
            themeToggleDarkIcon.classList.add('hidden');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            themeToggleDarkIcon.classList.remove('hidden');
            themeToggleLightIcon.classList.add('hidden');
        }
    }

});

// Auto-Uncomplete Logic (Basic)
function autoUncompleteTasks() {
    const now = new Date();
    todos = todos.map(todo => {
        if (todo.completed && todo.autoUncompleteDays !== 'none') {
            const completedDate = new Date(todo.completedTime);
            const daysSinceCompletion = (now - completedDate) / (1000 * 60 * 60 * 24); // Days elapsed

            if (daysSinceCompletion > todo.autoUncompleteDays) {
                todo.completed = false;
                todo.completedTime = null;
                recordHistory('Auto-Uncompleted', todo); // Add history record
            }
        }
        return todo;
    });
    saveTodosToLocalStorage();
    renderTodos();
}

// Run auto-uncomplete check every day
setInterval(autoUncompleteTasks, 24 * 60 * 60 * 1000);

// --- Notifications ---

function playSound() {
    notificationSound.play();
}

function showNotification(title, body) {
    new Notification(title, { body: body, icon: 'icon.png' });  // Replace 'icon.png' with your notification icon
    playSound();
}

function scheduleNotification(todo) {
    // Clear any existing timeout for the notification
    if (todo.timeoutId) {
        clearTimeout(todo.timeoutId);
    }

    const now = new Date().getTime();
    const scheduledTime = new Date(todo.scheduledTime).getTime();
    const timeDiff = scheduledTime - now;

    if (timeDiff > 0) {
        todo.timeoutId = setTimeout(() => {  // Store the timeout ID on the todo object
            showNotification("Todo Reminder", todo.title);
        }, timeDiff);
    }
}

showHistoryButton.addEventListener('click', showHistoryModal);
closeHistoryModal.addEventListener('click', closeHistory);

renderTodos(); // Initial render