const hasConsent = localStorage.getItem('cookieConsent') === 'true';
export function loadTasks() {
    if (!hasConsent) {
        return [];
    }
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
}
export function saveTasks(tasks) {
    if (hasConsent) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}


export function saveSuggestions(suggestions) {
    if (hasConsent) {
        localStorage.setItem('suggestions', JSON.stringify(suggestions));
    }
}
export function loadSuggestions() {
    if (!hasConsent) {
        return [];
    }
    const savedSuggestions = localStorage.getItem('suggestions');
    return savedSuggestions ? JSON.parse(savedSuggestions) : [];
}