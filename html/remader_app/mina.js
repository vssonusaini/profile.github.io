import { config } from "./config.js";
import * as utils from "./utils.js";

document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOM is fully loaded and parsed");

  const taskTitleInput = document.getElementById("taskTitle");
  const taskDescriptionInput = document.getElementById("taskDescription");
  const taskDateTimeInput = document.getElementById("taskDateTime");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const openAddTaskBtn = document.getElementById("openAddTaskBtn");
  console.log("DOM elements selected", {
    taskTitleInput,
    taskDescriptionInput,
    taskDateTimeInput,
    addTaskBtn,
    taskList,
  });

  const suggestionInput = document.getElementById("suggestionInput");
  const submitSuggestionBtn = document.getElementById("submitSuggestionBtn");
  const viewSuggestionBtn = document.getElementById("viewSuggestionBtn");
  console.log("DOM elements for suggestion", {
    suggestionInput,
    submitSuggestionBtn,
    viewSuggestionBtn,
  });

  let tasks = utils.loadTasks();
  console.log("Tasks loaded from local storage", tasks);

  renderTasks();
  console.log("Tasks rendered to UI");

  scheduleAllReminders();
  console.log("All reminders scheduled");

  // addTaskBtn.addEventListener('click', addTask); removed old add task button logic
  console.log("Event listener added to the 'Add Task' button");
  openAddTaskBtn.addEventListener("click", () => {
    addModal.style.display = "flex";
  });

  submitSuggestionBtn.addEventListener("click", submitSuggestion);
  viewSuggestionBtn.addEventListener("click", viewSuggestion);
  console.log("Event listener added to suggestion buttons");

  // Request notification permission on load
  requestNotificationPermission();
  console.log("Notification permission requested");

  const MAX_TASKS = config.maxTasks;
  // Cookie Consent
  const cookieConsent = document.getElementById("cookieConsent");
  const acceptCookiesBtn = document.getElementById("acceptCookies");
  const hasConsent = localStorage.getItem("cookieConsent") === "true";

  // Error message container
  const errorContainer = document.getElementById("error-message");
  // Register Service Worker
  registerServiceWorker();

  const editModal = document.getElementById("editModal");
  const closeBtn = document.querySelector(".close-btn");

  const editTaskTitleInput = document.getElementById("editTaskTitle");
  const editTaskDescriptionInput = document.getElementById(
    "editTaskDescription"
  );
  const editTaskDateTimeInput = document.getElementById("editTaskDateTime");
  const editTaskIdInput = document.getElementById("editTaskId");
  const saveTaskBtn = document.getElementById("saveTaskBtn");

  const addModal = document.getElementById("addModal");
  const addTaskTitleInput = document.getElementById("addTaskTitle");
  const addTaskDescriptionInput = document.getElementById("addTaskDescription");
  const addTaskDateTimeInput = document.getElementById("addTaskDateTime");
  const addTaskModalBtn = document.getElementById("addTaskModalBtn");
  const historyModal = document.getElementById("historyModal");
  const taskHistoryContent = document.getElementById("taskHistoryContent");

  let currentEditTaskId = null;

  addTaskModalBtn.addEventListener("click", handleAddTask);

  window.closeAddModal = function () {
    addModal.style.display = "none";
  };
  window.closeHistoryModal = function () {
    historyModal.style.display = "none";
  };

  async function handleAddTask() {
    try {
      const taskTitle = addTaskTitleInput.value.trim();
      const taskDescription = addTaskDescriptionInput.value.trim();
      const taskDateTime = addTaskDateTimeInput.value;

      if (!taskTitle) {
        showError("Please enter a task title", errorContainer);
        return;
      }
      if (!taskDescription) {
        showError("Please enter a task description", errorContainer);
        return;
      }
      if (!taskDateTime) {
        showError("Please select date and time", errorContainer);
        return;
      }
      if (tasks.length >= MAX_TASKS) {
        showError(
          `Too many tasks. Max tasks are ${MAX_TASKS}. Delete some tasks before adding new`,
          errorContainer
        );
        return;
      }

      if (taskTitle && taskDescription && taskDateTime) {
        const newTask = {
          id: Date.now(),
          title: taskTitle,
          description: taskDescription,
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
        addTaskTitleInput.value = "";
        addTaskDescriptionInput.value = "";
        addTaskDateTimeInput.value = "";
        addModal.style.display = "none";
        hideError(errorContainer); // Hide error message after success
      }
    } catch (error) {
      console.error("Error in adding task:", error);
      showError(
        "Error occurred during the adding process please try again",
        errorContainer
      );
    }
  }

  function deleteTask(taskId) {
    try {
      tasks = tasks.filter((task) => task.id !== taskId);
      utils.saveTasks(tasks);
      console.log("Task deleted, tasks saved to local storage");
      renderTasks();
      console.log("Tasks rendered to UI after delete");
    } catch (error) {
      console.error("Error deleting a task:", error);
      showError(
        "Error occurred during the delete process please try again",
        errorContainer
      );
    }
  }

  function renderTasks() {
    try {
      taskList.innerHTML = "";
      console.log("Task list cleared");
      tasks.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
      tasks.forEach((task) => {
        const li = document.createElement("li");
        if (task.completed) {
          li.classList.add("completed");
        }
        const history = task.history
          ? task.history.map((entry) => `<p>${entry}</p>`).join("")
          : "";
        const formattedDateTime = new Date(task.dateTime).toLocaleString();

        li.innerHTML = `
                     <span>${task.title}</span>
                     <p>${task.description}</p>
                    <span class="scheduled-time">Scheduled For: ${formattedDateTime}</span>
                    <div class="actionBTN">
                     <button onclick="completeTask(${task.id}, this.closest('li'))">Complete</button>
                     <button onclick="window.editTask(${task.id})">Edit</button>
                       <button onclick="showTaskHistory(${task.id})">History</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                   </div>
                 `;
        taskList.appendChild(li);
      });
      console.log("Tasks updated in UI");
    } catch (error) {
      console.error("Error rendering tasks:", error);
      showError(
        "Error occurred during the render process please try again",
        errorContainer
      );
    }
  }

  function completeTask(taskId, listItem) {
    try {
      tasks = tasks.map((task) => {
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
      if (listItem) {
        listItem.classList.add("completed");
      }
      console.log("Task style changed");
      renderTasks();
      console.log("Tasks rendered to UI after task completion");
    } catch (error) {
      console.error("Error completing a task:", error);
      showError(
        "Error occurred during the task completion process please try again",
        errorContainer
      );
    }
  }

  async function scheduleReminder(task) {
    try {
      if (task.completed) {
        console.log(
          `Task is already completed. ID = ${task.id}. Skipping schedule`
        );
        return;
      }
      const reminderTime = task.rescheduledTime
        ? new Date(task.rescheduledTime).getTime()
        : new Date(task.dateTime).getTime();
      const currentTime = Date.now();
      const delay = reminderTime - currentTime;

      if (delay > 0) {
        task.timerId = setTimeout(async () => {
          await sendNotificationToServiceWorker(
            task,
            task.rescheduledCount,
            task.id
          );
          console.log(`Task notification shown for id: ${task.id}`);
          await rescheduleReminder(task);
        }, delay);
      } else {
        await rescheduleReminder(task);
      }
    } catch (error) {
      console.error("Error scheduling a task:", error);
      showError(
        "Error occurred during the schedule process please try again",
        errorContainer
      );
    }
  }

  function scheduleAllReminders() {
    try {
      tasks.forEach((task) => {
        scheduleReminder(task);
      });
      console.log("All reminder scheduled again.");
    } catch (error) {
      console.error("Error scheduling all tasks:", error);
      showError(
        "Error occurred during the all reminder schedule process please try again",
        errorContainer
      );
    }
  }

  async function rescheduleReminder(task) {
    try {
      if (task.completed) {
        console.log(
          `Task is already completed. ID = ${task.id}. Skipping reschedule`
        );
        return;
      }
      const minDelay = task.config.minRescheduleDelay;
      const maxDelay = task.config.maxRescheduleDelay;
      const randomDelay = Math.floor(
        Math.random() * (maxDelay - minDelay) + minDelay
      );
      const newReminderTime = Date.now() + randomDelay;
      const historyMessage = `Rescheduled at ${new Date().toLocaleString()}`;

      task.rescheduledTime = new Date(newReminderTime).toISOString();
      task.rescheduledCount++;

      if (!task.history) {
        task.history = [];
      }
      task.history.push(historyMessage);
      utils.saveTasks(tasks);
      console.log(
        `Task with id: ${task.id} is Rescheduled. Updated Time, Rescheduled Count and History`
      );
      await scheduleReminder(task); // reschedule again
    } catch (error) {
      console.error("Error rescheduling a task:", error);
      showError(
        "Error occurred during the reschedule process please try again",
        errorContainer
      );
    }
  }

  async function sendNotificationToServiceWorker(task, count, taskId) {
    if (navigator.serviceWorker.controller) {
      // Check if service worker is active
      navigator.serviceWorker.ready.then((registration) => {
        navigator.serviceWorker.controller.postMessage({
          type: "showNotification",
          task: task,
          count: count,
          taskId: taskId,
        });
      });
    } else {
      console.log("No service worker is active");
    }
  }

  window.editTask = function (taskId) {
    currentEditTaskId = taskId; // set the current editing id
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      editTaskTitleInput.value = task.title;
      editTaskDescriptionInput.value = task.description;
      editTaskDateTimeInput.value = task.dateTime;
      editTaskIdInput.value = task.id;
      editModal.style.display = "flex";
    }
  };

  window.showTaskHistory = function (taskId) {
    const task = tasks.find((task) => task.id === taskId);
    if (task && task.history) {
      taskHistoryContent.innerHTML = task.history
        .map((entry) => `<p>${entry}</p>`)
        .join("");
      historyModal.style.display = "flex";
    } else {
      taskHistoryContent.innerHTML = `<p>No history Available for this task</p>`;
      historyModal.style.display = "flex";
    }
  };

  function requestNotificationPermission() {
    if ("Notification" in window) {
      if (
        Notification.permission !== "granted" &&
        Notification.permission !== "denied"
      ) {
        Notification.requestPermission().then((permission) => {
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
      if (!suggestionText) {
        showError("Please enter a suggestion.", errorContainer);
        return;
      }
      let suggestions = utils.loadSuggestions();
      const newSuggestion = {
        id: Date.now(),
        text: suggestionText,
        timestamp: new Date().toLocaleString(),
      };
      suggestions.push(newSuggestion);
      utils.saveSuggestions(suggestions);
      suggestionInput.value = "";
      console.log("New suggestion submitted:", newSuggestion);
    } catch (error) {
      console.error("Error submitting a suggestion:", error);
      showError(
        "Error occurred during the suggestion submission process please try again",
        errorContainer
      );
    }
  }

  function viewSuggestion() {
    window.location.href = "suggestions.html";
  }

  // Cookie Consent Logic
  if (!hasConsent) {
    cookieConsent.style.display = "block";
  } else {
    cookieConsent.style.display = "none";
  }

  acceptCookiesBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "true");
    cookieConsent.style.display = "none";
    tasks = utils.loadTasks();
    renderTasks();
    scheduleAllReminders();
  });

  closeBtn.addEventListener("click", () => {
    editModal.style.display = "none";
  });
  window.addEventListener("click", (event) => {
    if (event.target === editModal) {
      editModal.style.display = "none";
    } else if (event.target === addModal) {
      addModal.style.display = "none";
    } else if (event.target === historyModal) {
      historyModal.style.display = "none";
    }
  });
  saveTaskBtn.addEventListener("click", saveEditedTask);

  window.completeTask = completeTask;
  window.deleteTask = deleteTask;

  function saveEditedTask() {
    try {
      const editedTitle = editTaskTitleInput.value.trim();
      const editedDescription = editTaskDescriptionInput.value.trim();
      const editedDateTime = editTaskDateTimeInput.value;
      if (!editedTitle) {
        showError("Please enter a task title", errorContainer);
        return;
      }
      if (!editedDescription) {
        showError("Please enter a task description", errorContainer);
        return;
      }
      if (!editedDateTime) {
        showError("Please select date and time", errorContainer);
        return;
      }
      tasks = tasks.map((task) => {
        if (task.id === currentEditTaskId) {
          return {
            ...task,
            title: editedTitle,
            description: editedDescription,
            dateTime: editedDateTime,
          };
        }
        return task;
      });
      utils.saveTasks(tasks);
      renderTasks();
      editModal.style.display = "none";
      hideError(errorContainer);
      scheduleAllReminders();
    } catch (error) {
      console.error("Error saving edited task:", error);
      showError(
        "Error occurred during the save task process please try again",
        errorContainer
      );
    }
  }

  // Add message listener to handle message sent from service worker
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data && event.data.type === "completeTask") {
      completeTask(event.data.taskId);
    } else if (event.data && event.data.type === "denyTask") {
      deleteTask(event.data.taskId);
    }
  });

  // Register service worker
  async function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(
          "./service-worker.js"
        );
        console.log("Service worker registered:", registration);
      } catch (error) {
        console.error("Service worker registration failed:", error);
      }
    }
  }

  // Error Handler
  function showError(message, container) {
    container.textContent = message;
    container.style.display = "block";
    setTimeout(() => {
      hideError(container);
    }, 5000);
  }
  function hideError(container) {
    container.textContent = "";
    container.style.display = "none";
  }
});
