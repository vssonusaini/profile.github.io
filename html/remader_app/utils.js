export function loadTasks() {
    try {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
        console.error("Error loading tasks from localStorage:", error);
        return [];
    }
}


export function saveTasks(tasks) {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error("Error saving tasks to localStorage:", error);
    }
}

export function loadSuggestions() {
  try {
      const storedSuggestions = localStorage.getItem('suggestions');
      return storedSuggestions ? JSON.parse(storedSuggestions) : [];
  } catch (error) {
      console.error("Error loading suggestions from localStorage:", error);
      return [];
  }
}

export function saveSuggestions(suggestions) {
    try {
      localStorage.setItem('suggestions', JSON.stringify(suggestions));
    } catch (error) {
        console.error("Error saving suggestions to localStorage:", error);
    }
}