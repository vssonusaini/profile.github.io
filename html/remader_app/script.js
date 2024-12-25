import { config } from './config.js';
import * as utils from './utils.js';

document.addEventListener('DOMContentLoaded', async function () {
    console.log("DOM is fully loaded and parsed");

    const taskInput = document.getElementById('taskInput');
    const taskDateTimeInput = document.getElementById('taskDateTime');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    console.log("DOM elements selected", { taskInput, taskDateTimeInput, addTaskBtn, taskList });

    const suggestionInput = document.getElementById('suggestionInput');
    const submitSuggestionBtn = document.getElementById('submitSuggestionBtn');
    const viewSuggestionBtn = document.getElementById('viewSuggestionBtn');
    console.log("DOM elements for suggestion", { suggestionInput, submitSuggestionBtn, viewSuggestionBtn });


    let tasks = utils.loadTasks();
    console.log("Tasks loaded from local storage", tasks);


    renderTasks();
    console.log("Tasks rendered to UI");


    scheduleAllReminders();
    console.log("All reminders scheduled");


    addTaskBtn.addEventListener('click', addTask);
    console.log("Event listener added to the 'Add Task' button");


    submitSuggestionBtn.addEventListener('click', submitSuggestion);
    viewSuggestionBtn.addEventListener('click', viewSuggestion);
    console.log("Event listener added to suggestion buttons");


    // Request notification permission on load
    requestNotificationPermission();
    console.log("Notification permission requested");


    const MAX_TASKS = config.maxTasks; // set a limit
    // Cookie Consent
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    const hasConsent = localStorage.getItem('cookieConsent') === 'true';


    async function addTask() {
        try {
            const taskText = taskInput.value.trim();
            const taskDateTime = taskDateTimeInput.value;

            if (taskText === "") {
                alert("Please enter a task");
                return;
            }
            if (taskDateTime === "") {
                alert("Please select date and time");
                return;
            }
            if (tasks.length >= MAX_TASKS) {
                alert(`Too many tasks. Max tasks are ${MAX_TASKS}. Delete some tasks before adding new`);
                return;
            }

            if (taskText && taskDateTime) {
                const newTask = {
                    id: Date.now(),
                    text: taskText,
                    dateTime: taskDateTime,
                    completed: false,
                    timerId: null,
                    rescheduledCount: 0,
                    rescheduledTime: null,
                    history: [],
                    config: config.task,
                };
                tasks.push(newTask);
                console.log("New task added:", newTask);
                utils.saveTasks(tasks);
                renderTasks();
                await scheduleReminder(newTask);
                taskInput.value = '';
                taskDateTimeInput.value = '';
            }

        } catch (error) {
            console.error("Error in adding task:", error);
            alert("Error occurred during the adding process please try again")
        }

    }


    function deleteTask(taskId) {
        try {
            tasks = tasks.filter(task => task.id !== taskId);
            utils.saveTasks(tasks);
            console.log("Task deleted, tasks saved to local storage");
            renderTasks();
            console.log("Tasks rendered to UI after delete");
        } catch (error) {
            console.error("Error deleting a task:", error)
            alert("Error occurred during the delete process please try again")
        }
    }

    function renderTasks() {
        try {
            taskList.innerHTML = '';
            console.log("Task list cleared");
            tasks.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
            tasks.forEach(task => {
                const li = document.createElement('li');
                const isCompleted = task.completed ? "completed" : "";
                const history = task.history ? task.history.map(entry => `<p>${entry}</p>`).join("") : "";
                li.innerHTML = `
                     <span class="${isCompleted}">${task.text}</span>
                     <span class="scheduled-time">Scheduled For: ${new Date(task.dateTime).toLocaleString()}</span>
                    <div class="task-history">${history}</div>
                    <button onclick="completeTask(${task.id})">Complete</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                 `;
                taskList.appendChild(li);
            });
            console.log("Tasks updated in UI");
        } catch (error) {
            console.error("Error rendering tasks:", error)
            alert("Error occurred during the render process please try again")
        }
    }



    function completeTask(taskId) {
        try {
            tasks = tasks.map(task => {
                if (task.id === taskId) {
                    task.completed = true;
                    if (task.timerId) {
                        clearTimeout(task.timerId);
                    }
                }
                return task;
            });
            utils.saveTasks(tasks);
            console.log("Task completed, tasks saved to local storage");
            renderTasks();
            console.log("Tasks rendered to UI after task completion");
        } catch (error) {
            console.error("Error completing a task:", error)
            alert("Error occurred during the task completion process please try again")
        }
    }



    async function scheduleReminder(task) {
        try {
            if (task.completed) {
                console.log(`Task is already completed. ID = ${task.id}. Skipping schedule`);
                return;
            }

            const reminderTime = task.rescheduledTime ? new Date(task.rescheduledTime).getTime() : new Date(task.dateTime).getTime();
            const currentTime = Date.now();
            const delay = reminderTime - currentTime;

            if (delay > 0) {
                task.timerId = setTimeout(async () => {
                    await showNotification(task, task.rescheduledCount);
                    console.log(`Task notification shown for id: ${task.id}`);
                    await rescheduleReminder(task);
                }, delay);
            } else {
                await rescheduleReminder(task);
            }

        } catch (error) {
            console.error("Error scheduling a task:", error)
            alert("Error occurred during the schedule process please try again")
        }
    }


    function scheduleAllReminders() {
        try {
            tasks.forEach(task => {
                scheduleReminder(task);
            });
            console.log("All reminder scheduled again.");
        } catch (error) {
            console.error("Error scheduling all tasks:", error)
            alert("Error occurred during the all reminder schedule process please try again")
        }
    }

    async function rescheduleReminder(task) {
        try {
            if (task.completed) {
                console.log(`Task is already completed. ID = ${task.id}. Skipping reschedule`);
                return;
            }

            const minDelay = task.config.minRescheduleDelay;
            const maxDelay = task.config.maxRescheduleDelay;

            const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay) + minDelay);
            const newReminderTime = Date.now() + randomDelay;
            const historyMessage = `Rescheduled at ${new Date().toLocaleString()}`;

            task.rescheduledTime = new Date(newReminderTime).toISOString();
            task.rescheduledCount++;

            if (!task.history) {
                task.history = [];
            }
            task.history.push(historyMessage);
            utils.saveTasks(tasks);
            console.log(`Task with id: ${task.id} is Rescheduled. Updated Time, Rescheduled Count and History`);
            await scheduleReminder(task); // reschedule again

        } catch (error) {
            console.error("Error rescheduling a task:", error)
            alert("Error occurred during the reschedule process please try again")
        }

    }


    async function showNotification(task, count) {
        try {
            if (Notification.permission === 'granted') {
                let message = task.text;
                if (count > 0) {
                    message = `${task.text} (rescheduled ${count} times)`;
                }
                new Notification("Reminder:", {
                    body: message
                });
            }

        } catch (error) {
            console.error("Error showing notification:", error)
            alert("Error occurred during the notification process please try again")
        }
    }

    function requestNotificationPermission() {
        if ('Notification' in window) {
            if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        console.log("Notifications enabled");
                    }
                });
            }
        }
    }



    async function submitSuggestion() {
        try {
            const suggestionText = suggestionInput.value.trim();
            if (suggestionText === "") {
                alert("Please enter a suggestion.");
                return;
            }
            let suggestions = utils.loadSuggestions();
            const newSuggestion = {
                id: Date.now(),
                text: suggestionText,
                timestamp: new Date().toLocaleString()
            };
            suggestions.push(newSuggestion);
            utils.saveSuggestions(suggestions);
            suggestionInput.value = '';
            console.log("New suggestion submitted:", newSuggestion);
        } catch (error) {
            console.error("Error submitting a suggestion:", error)
            alert("Error occurred during the suggestion submission process please try again")
        }
    }


    function viewSuggestion() {
        window.location.href = 'suggestions.html';
    }


    // Cookie Consent Logic
    if (!hasConsent) {
        cookieConsent.style.display = 'block';
    } else {
        cookieConsent.style.display = 'none';
    }

    acceptCookiesBtn.addEventListener('click', function () {
        localStorage.setItem('cookieConsent', 'true');
        cookieConsent.style.display = 'none';
        tasks = utils.loadTasks();
        renderTasks();
        scheduleAllReminders();
    });

    window.completeTask = completeTask;
    window.deleteTask = deleteTask;
});