import * as utils from './utils.js';
document.addEventListener('DOMContentLoaded', function () {
    const suggestionList = document.getElementById('suggestionList');
    const hasConsent = localStorage.getItem('cookieConsent') === 'true';

    function renderSuggestions() {
        try {
            const suggestions = utils.loadSuggestions();
            suggestionList.innerHTML = ''; // Clear the list
            suggestions.forEach(suggestion => {
                const li = document.createElement('li');
                li.innerHTML = `
                 <p>${suggestion.text}</p>
                 <span class="scheduled-time">Submitted on: ${suggestion.timestamp}</span>
                `;
                suggestionList.appendChild(li);
            });
        } catch (error) {
            console.error("Error rendering suggestions", error);
            alert("Error occurred during the suggestions render process please try again");
        }
    }
    renderSuggestions();
});