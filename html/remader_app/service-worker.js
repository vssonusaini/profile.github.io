self.addEventListener('message', function(event) {
    if (event.data && event.data.type === "showNotification") {
      const task = event.data.task;
      const count = event.data.count;
      const taskId = event.data.taskId;

        const title = `Reminder for task: ${task.title}`;
        const body = `Task description: ${task.description}\nRescheduled count ${count}\nClick to complete or press Deny to delete this task`;
        
       const options = {
            body: body,
            icon: 'https://sainisahab.com/html/remader_app/icons/icon-192x192.png',
            badge: 'https://sainisahab.com/html/remader_app/icons/icon-192x192.png',
            tag: `task-${taskId}`,
            data: { taskId: taskId },
           actions: [
                { action: 'complete', title: 'Complete Task' },
                { action: 'deny', title: 'Deny Task' }
            ]
          };
        self.registration.showNotification(title, options);
    }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
    const taskId = event.notification.data.taskId;
    if (event.action === 'complete') {
        event.waitUntil(clients.matchAll({ type: 'window' }).then(function(clientList) {
                for (const client of clientList) {
                    client.postMessage({type: "completeTask", taskId: taskId});
                  }
            })
        );
    }
    else if (event.action === 'deny'){
      event.waitUntil(clients.matchAll({ type: 'window' }).then(function(clientList) {
        for (const client of clientList) {
            client.postMessage({type: "denyTask", taskId: taskId});
        }
    })
);
    }
});
