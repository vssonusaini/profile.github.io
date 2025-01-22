self.addEventListener("notificationclick", function (event) {
  event.notification.close(); // Close the notification
  if (event.action === "complete") {
    // Handle "Complete" button action
    event.waitUntil(
      clients.matchAll({ type: "window" }).then(function (clientList) {
        for (const client of clientList) {
          client.postMessage({
            type: "completeTask",
            taskId: event.notification.data.taskId,
          });
        }
      })
    );
  } else if (event.action === "deny") {
    event.waitUntil(
      clients.matchAll({ type: "window" }).then(function (clientList) {
        for (const client of clientList) {
          client.postMessage({
            type: "denyTask",
            taskId: event.notification.data.taskId,
          });
        }
      })
    );
  } else {
    event.waitUntil(
      clients
        .matchAll({
          type: "window",
        })
        .then(function (clientList) {
          if (clientList.length > 0) {
            return clients.openWindow(event.notification.data.url);
          } else {
            return clients.openWindow(event.notification.data.url);
          }
        })
    );
  }
});

self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "showNotification") {
    const { task, count, taskId } = event.data;
    let message = task.title;
    if (count > 0) {
      message = `${task.title} (rescheduled ${count} times)`;
    }
    self.registration.showNotification("Task Reminder", {
      body: message,
      icon: "https://sainisahab.com/images/back-logo.png", // Path to your icon
      data: {
        taskId: taskId,
        url: location.origin,
      },
      actions: [
        { action: "complete", title: "Complete" },
        { action: "deny", title: "Deny" },
      ],
    });
  }
});
