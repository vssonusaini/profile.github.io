// service-worker.js
self.addEventListener("install", (event) => {
  console.log("Service worker installed:", event);
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activated:", event);
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "showNotification") {
    const task = event.data.task;
    const count = event.data.count;
    const taskId = event.data.taskId;

    const title = `Task Reminder: ${task.title}`;
    const options = {
      body: `${task.description} \n Rescheduled Count: ${count}`,
      icon: "https://sainisahab.com/html/remader_app/reminder.png",
      tag: "task-reminder-" + taskId, // Use task ID as the tag
      actions: [
        { action: "complete", title: "Complete" },
        { action: "deny", title: "Deny" },
      ],
    };
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
    console.log("Notification Created in service worker")
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const taskId = event.notification.tag.replace("task-reminder-", "");
  if (event.action === "complete") {
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        if (clients && clients.length) {
          clients[0].postMessage({
            type: "completeTask",
            taskId: parseInt(taskId),
          });
        }
      })
    );
  } else if (event.action === "deny") {
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        if (clients && clients.length) {
          clients[0].postMessage({
            type: "denyTask",
            taskId: parseInt(taskId),
          });
        }
      })
    );
  }
});
