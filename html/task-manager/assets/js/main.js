document.addEventListener("DOMContentLoaded", function () {
  var soundsdb = JSON.parse(localStorage.getItem("sounds"));
  if (soundsdb === null) {
    const defaultSound = [
      {
        id: "sound-1739819190402",
        name: "sci-fi-reject",
        src: "https://sainisahab.com/html/task-manager/assets/sound/mixkit-bell-notification-933.wav",
      }
   
    ];
    localStorage.setItem("sounds", JSON.stringify(defaultSound));
  }

  const taskTitleInput = document.getElementById("task-title");
  const taskDatetimeInput = document.getElementById("task-datetime");
  const autoUncompleteSelect = document.getElementById("auto-uncomplete");
  const addTaskBtn = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todoList");
  const completedList = document.getElementById("completedList");
  const emptyState = document.getElementById("emptyState");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const toggleCompletedButton = document.getElementById("toggleCompleted");
  const eyeIcon = document.getElementById("eyeIcon");
  const eyeOffIcon = document.getElementById("eyeOffIcon");
  const toggleThemeButton = document.getElementById("toggleTheme");
  const lightIcon = document.getElementById("lightIcon");
  const darkIcon = document.getElementById("darkIcon");
  const clockElement = document.getElementById("clock");
  const resetButton = document.getElementById("reset-btn"); // Get the reset button element

  const notificationSoundSelect = document.getElementById("notificationSound");
  const manageSoundsButton = document.getElementById("manageSoundsButton");
  const soundManagerPopup = document.getElementById("soundManagerPopup");
  const closeButton = document.querySelector(".close-button");
  const soundList = document.getElementById("soundList");
  const addSoundButton = document.getElementById("addSoundButton");
  const soundFileInput = document.getElementById("soundFileInput");
  const audioContainer = document.getElementById("audioContainer");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let nextTaskId =
    tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
  let showCompleted = localStorage.getItem("showCompleted") === "true";
  let currentTheme = localStorage.getItem("theme") || "dark";
  let selectedSound = localStorage.getItem("notificationSound") || "default";

  let sounds = JSON.parse(localStorage.getItem("sounds")) || []; // Load stored sounds

  // Initialize sounds and populate select
  initializeSounds();

  // Set initial theme
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "light") {
    lightIcon.classList.remove("hidden");
    darkIcon.classList.add("hidden");
  } else {
    lightIcon.classList.add("hidden");
    darkIcon.classList.remove("hidden");
  }

  function updateClock() {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    clockElement.textContent = dateTimeString;
  }

  setInterval(updateClock, 1000);
  updateClock();

  requestNotificationPermission();

  if (showCompleted) {
    eyeIcon.classList.remove("hidden");
    eyeOffIcon.classList.add("hidden");
    completedList.classList.remove("hidden");
  } else {
    eyeIcon.classList.add("hidden");
    eyeOffIcon.classList.remove("hidden");
    completedList.classList.add("hidden");
  }

  function requestNotificationPermission() {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      return;
    }

    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      });
    }
  }

  function playNotificationSound() {
    if (selectedSound === "default") return; // Use default notification sound

    const audioElement = document.getElementById(selectedSound);
    if (audioElement) {
      audioElement.play();
    }
  }

  function showNotification(title, body) {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body: body,
        icon: "icon.png",
      });
      playNotificationSound(); // Play the sound *after* the notification
    } else if (Notification.permission !== "denied") {
      console.warn("Notification permission not granted.");
    }
  }

  function renderTasks() {
    todoList.innerHTML = "";
    completedList.innerHTML = "";

    const activeTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);

    activeTasks.forEach((task) => {
      const li = createTaskListItem(task);
      todoList.appendChild(li);
    });

    if (completedTasks.length > 0 && showCompleted) {
      completedList.classList.remove("hidden");
      completedTasks.forEach((task) => {
        const li = createTaskListItem(task);
        completedList.appendChild(li);
      });
    } else {
      completedList.classList.add("hidden");
    }

    if (tasks.length === 0) {
      emptyState.classList.remove("hidden");
    } else {
      emptyState.classList.add("hidden");
    }

    updateProgress();
  }

  function createTaskListItem(task) {
    const li = document.createElement("li");
    li.innerHTML = `
            <div class="task-details">
                <span class="task-title">${task.title}</span><br><br>
                Scheduled: ${new Date(task.scheduledTime).toLocaleString()}<br>
                ${
                  task.rescheduledTime
                    ? `Rescheduled: ${new Date(
                        task.rescheduledTime
                      ).toLocaleString()}`
                    : ""
                } -
                Reschedule Count: ${task.rescheduleCount || 0}
            </div>
            <div class="task-actions">
                <button class="edit-btn" data-id="${
                  task.id
                }"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" data-id="${
                  task.id
                }"><i class="fas fa-trash"></i></button>
                ${
                  task.completed
                    ? `<button class="undo-btn" data-id="${task.id}">Undo</button>`
                    : `<button class="complete-btn" data-id="${task.id}">Complete</button>`
                }
            </div>
        `;

    if (task.completed) {
      li.classList.add("completed");
    }

    return li;
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function addTaskBtnClickHandler() {
    const title = taskTitleInput.value.trim();
    const scheduledTime = taskDatetimeInput.value;
    const autoUncompleteDays = autoUncompleteSelect.value;

    // VALIDATION: Check if title and scheduledTime are not empty
    if (!title) {
      alert("Task title cannot be empty.");
      return;
    }
    if (!scheduledTime) {
      alert("Please select a scheduled time.");
      return;
    }

    if (title && scheduledTime) {
      const newTask = {
        id: nextTaskId++,
        title: title,
        scheduledTime: new Date(scheduledTime).toISOString(),
        autoUncompleteDays: autoUncompleteDays,
        completed: false,
        rescheduledTime: null,
        rescheduleCount: 0,
        autoReschedule: true, // New property for auto-rescheduling
      };
      tasks.push(newTask);
      saveTasks();
      renderTasks();
      taskTitleInput.value = "";
      taskDatetimeInput.value = "";
      autoUncompleteSelect.value = "none";

      // Schedule a notification
      scheduleNotification(newTask);
    }
  }

  addTaskBtn.addEventListener("click", addTaskBtnClickHandler);

  document.addEventListener("click", function (event) {
    const target = event.target;
    const taskId = parseInt(target.dataset.id);

    if (isNaN(taskId)) return;

    if (target.classList.contains("delete-btn")) {
      tasks = tasks.filter((task) => task.id !== taskId);
      saveTasks();
      renderTasks();
    } else if (target.classList.contains("complete-btn")) {
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = true;
        task.completedTime = new Date().toISOString();
        saveTasks();
        renderTasks();
      }
    } else if (target.classList.contains("undo-btn")) {
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = false;
        saveTasks();
        renderTasks();
      }
    } else if (target.classList.contains("edit-btn")) {
      const taskToEdit = tasks.find((task) => task.id === taskId);
      if (taskToEdit) {
        taskTitleInput.value = taskToEdit.title;
        taskDatetimeInput.value = new Date(taskToEdit.scheduledTime)
          .toISOString()
          .slice(0, 16);
        autoUncompleteSelect.value = taskToEdit.autoUncompleteDays;

        addTaskBtn.textContent = "Update Task";
        addTaskBtn.dataset.editingId = taskId;

        addTaskBtn.removeEventListener("click", addTaskBtnClickHandler);
        addTaskBtn.clickHandler = function () {
          updateTask(taskId);
        };
        addTaskBtn.addEventListener("click", addTaskBtn.clickHandler);
      }
    }
  });

  function updateTask(taskId) {
    const title = taskTitleInput.value.trim();
    const scheduledTime = taskDatetimeInput.value;
    const autoUncompleteDays = autoUncompleteSelect.value;

    // VALIDATION: Check if title and scheduledTime are not empty
    if (!title) {
      alert("Task title cannot be empty.");
      return;
    }
    if (!scheduledTime) {
      alert("Please select a scheduled time.");
      return;
    }

    if (title && scheduledTime) {
      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex].title = title;
        tasks[taskIndex].scheduledTime = new Date(scheduledTime).toISOString();
        tasks[taskIndex].autoUncompleteDays = autoUncompleteDays;
        saveTasks();
        renderTasks();

        taskTitleInput.value = "";
        taskDatetimeInput.value = "";
        autoUncompleteSelect.value = "none";
        addTaskBtn.textContent = "Add Task";
        delete addTaskBtn.dataset.editingId;
        addTaskBtn.removeEventListener("click", addTaskBtnClickHandler);

        addTaskBtn.addEventListener("click", addTaskBtnClickHandler);
      }
    }
  }

  function autoUncompleteTasks() {
    console.log("called");
    tasks.forEach((task) => {
      if (task.completed && task.autoUncompleteDays !== "none") {
        console.log(task);
        const completionDate = new Date(task.completedTime);
        const uncompleteDate = new Date(completionDate);

        console.log(completionDate);
        console.log(uncompleteDate);

        uncompleteDate.setDate(
          completionDate.getDate() + parseInt(task.autoUncompleteDays)
        );

        if (new Date() > uncompleteDate) {
          task.completed = false;
        }
      }
    });
    saveTasks();
    renderTasks();
  }

  // Scheduling
  function scheduleNotification(task) {
    const now = new Date().getTime();
    const scheduledTime = new Date(task.scheduledTime).getTime();
    const timeDiff = scheduledTime - now;

    if (timeDiff > 0) {
      setTimeout(() => {
        showNotification("Task Reminder", `Task "${task.title}" is due!`);
        // Auto-Reschedule Logic
        if (task.autoReschedule) {
          const rescheduleMinutes =
            Math.floor(Math.random() * (30 - 10 + 1)) + 10;
          const newScheduledTime = new Date(
            new Date().getTime() + rescheduleMinutes * 60000
          ).toISOString();
          task.scheduledTime = newScheduledTime;
          task.rescheduledTime = new Date().toISOString();
          task.rescheduleCount = (task.rescheduleCount || 0) + 1;

          saveTasks();
          renderTasks();
          scheduleNotification(task); // Schedule the notification again
        }
      }, timeDiff);
    } else {
      console.log("Scheduled time is in the past.");
    }
  }

  function updateProgress() {
    const completedCount = tasks.filter((task) => task.completed).length;
    const totalCount = tasks.length;
    const progressPercentage =
      totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    progressBar.style.width = `${progressPercentage}%`;
    progressText.textContent = `${completedCount} of ${totalCount} tasks completed`;
  }

  // Toggle completed tasks visibility
  toggleCompletedButton.addEventListener("click", function () {
    showCompleted = !showCompleted;
    localStorage.setItem("showCompleted", showCompleted);

    if (showCompleted) {
      eyeIcon.classList.remove("hidden");
      eyeOffIcon.classList.add("hidden");
      completedList.classList.remove("hidden");
    } else {
      eyeIcon.classList.add("hidden");
      eyeOffIcon.classList.remove("hidden");
      completedList.classList.add("hidden");
    }

    renderTasks();
  });

  // Toggle theme
  toggleThemeButton.addEventListener("click", function () {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "light") {
      lightIcon.classList.remove("hidden");
      darkIcon.classList.add("hidden");
    } else {
      lightIcon.classList.add("hidden");
      darkIcon.classList.remove("hidden");
    }
  });

  // ---------------- Sound Management ----------------

  function initializeSounds() {
    // Load from local storage if available
    sounds = JSON.parse(localStorage.getItem("sounds")) || [];
    populateSoundSelect();
    renderAudioElements();
  }

  function populateSoundSelect() {
    notificationSoundSelect.innerHTML = ""; // Clear existing options
    const defaultOption = document.createElement("option");
    defaultOption.value = "default";
    defaultOption.textContent = "Default";
    notificationSoundSelect.appendChild(defaultOption);

    sounds.forEach((sound) => {
      const option = document.createElement("option");
      option.value = sound.id;
      option.textContent = sound.name;
      notificationSoundSelect.appendChild(option);
    });

    notificationSoundSelect.value = selectedSound; // Reset selection
  }

  function renderAudioElements() {
    audioContainer.innerHTML = ""; // Clear existing elements

    sounds.forEach((sound) => {
      const audioElement = document.createElement("audio");
      audioElement.id = sound.id;
      audioElement.src = sound.src;
      audioElement.preload = "auto";
      audioContainer.appendChild(audioElement);
    });
  }

  function generateUniqueId() {
    return "sound-" + Date.now(); // Basic unique ID
  }

  manageSoundsButton.addEventListener("click", function () {
    soundManagerPopup.classList.remove("hidden");
    renderSoundList(); // Populate the list each time it's opened
  });

  closeButton.addEventListener("click", function () {
    soundManagerPopup.classList.add("hidden");
  });

  function renderSoundList() {
    soundList.innerHTML = ""; // Clear the list
    sounds.forEach((sound) => {
      const soundItem = document.createElement("div");
      soundItem.classList.add("sound-item");
      soundItem.innerHTML = `
            <span>${sound.name}</span>
            <button class="play-sound" data-id="${sound.id}">Play</button>
            <button class="delete-sound" data-id="${sound.id}">Delete</button>
            `;
      soundList.appendChild(soundItem);
    });
  }

  addSoundButton.addEventListener("click", function () {
    soundFileInput.click(); // Trigger file input
  });

  soundFileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const soundId = generateUniqueId();
        const newSound = {
          id: soundId,
          name: file.name,
          src: e.target.result, // Data URL of the sound
        };
        sounds.push(newSound);
        localStorage.setItem("sounds", JSON.stringify(sounds));

        renderAudioElements(); // Update audio elements
        populateSoundSelect(); // Update options list
        selectedSound = soundId; // Select the new sound
        notificationSoundSelect.value = selectedSound;

        renderSoundList(); // Update sound list
      };
      reader.readAsDataURL(file); // Read file as Data URL
    }
    soundFileInput.value = ""; // Reset the input
  });

  // Event delegation for Play and Delete sound
  soundList.addEventListener("click", function (event) {
    const target = event.target;
    const soundId = target.dataset.id;

    if (target.classList.contains("play-sound")) {
      const audioElement = document.getElementById(soundId);
      if (audioElement) {
        audioElement.play();
      }
    } else if (target.classList.contains("delete-sound")) {
      sounds = sounds.filter((sound) => sound.id !== soundId);
      localStorage.setItem("sounds", JSON.stringify(sounds));

      renderAudioElements(); // Update audio elements
      populateSoundSelect(); // Update options list
      renderSoundList(); // Update sound list
    }
  });

  // Set initial selected sound
  notificationSoundSelect.value = selectedSound;

  // Load value from localStorage
  function loadValueFromLocalStorage() {
    selectedSound = localStorage.getItem("notificationSound") || "default";
    notificationSoundSelect.value = selectedSound;
  }

  // Save value to localStorage
  function saveValueToLocalStorage(value) {
    localStorage.setItem("notificationSound", value);
  }

  // Listen to the change event
  notificationSoundSelect.addEventListener("change", function () {
    selectedSound = this.value;
    saveValueToLocalStorage(this.value);
  });

  loadValueFromLocalStorage();

  // Schedule notifications for existing tasks on load
  tasks.forEach((task) => {
    if (!task.completed) {
      scheduleNotification(task);
    }
  });

  // Reset Button Event Listener
  resetButton.addEventListener("click", function () {
    if (
      confirm(
        "Are you sure you want to reset all tasks? This action cannot be undone."
      )
    ) {
      tasks = []; // Clear the tasks array
      nextTaskId = 1; // Reset the task ID counter
      localStorage.removeItem("tasks"); // Clear tasks from localStorage
      localStorage.removeItem("showCompleted"); // Clear tasks from localStorage
      localStorage.removeItem("theme"); // Clear tasks from localStorage
      renderTasks(); // Re-render the task list (which will now be empty)
    }
  });

  renderTasks();
  setInterval(autoUncompleteTasks, 24 * 60 * 60 * 1000);
  // setInterval(autoUncompleteTasks, 10000);
});
