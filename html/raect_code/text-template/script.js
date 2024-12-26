import { showToast } from './components/toast.js';
import { showPopup } from './components/popup.js';
import { setCookie, getCookie } from './lib/cookies.js';
import { toolsData } from './tools.js';
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookiesButton = document.getElementById('acceptCookies');


    // Function to load content based on the hash
    function loadContent() {
        const hash = window.location.hash.substring(1);
        if (!hash || hash === '') {
            loadHomepage();
        } else {
            loadToolContent(hash);
        }
    }
    //Load Hompage
    function loadHomepage() {
        const filterButtonsHtml = `<section class="filter-section">
                <h2>Filter by Need</h2>
                  <div class="filter-buttons">
                    <button data-filter="all" class="active">All</button>
                      <button data-filter="image-editing">Image Editing</button>
                      <button data-filter="text-utilities">Text Utilities</button>
                       <button data-filter="productivity">Productivity</button>
                      <button data-filter="coding">Coding</button>
                    <!-- Add more filter buttons here -->
                </div>
            </section>`
        const toolCardsHtml = `<section class="tools-section">
                <h2>Featured Tools</h2>
                <div class="tool-grid">
                    ${toolsData.map(tool => `
                       <div class="tool-card" data-tags="${tool.tags.join(' ')}">
                           <a href="#${tool.id}">
                               <img src="${tool.image}" alt="${tool.name} Icon">
                                   <h3>${tool.name}</h3>
                                    <p>${tool.description}</p>
                            </a>
                       </div>
                    `).join('')}
                </div>
            </section>
          `;
        mainContent.innerHTML = filterButtonsHtml + toolCardsHtml;

        // Add event listeners for filters
        const filterButtons = document.querySelectorAll('.filter-buttons button');
        const toolCards = document.querySelectorAll('.tool-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                //Remove active class
                filterButtons.forEach(btn => btn.classList.remove('active'))

                //add active class
                button.classList.add('active');

                toolCards.forEach(card => {
                    const cardTags = card.dataset.tags.split(' ');

                    if (filter === 'all' || cardTags.includes(filter)) {
                        card.style.display = ''; // Show the card
                    } else {
                        card.style.display = 'none'; // Hide the card
                    }
                });
            });
        });
    }

    // Load Tool Content
    function loadToolContent(toolId) {
        const tool = toolsData.find(tool => tool.id === toolId);
        if (!tool) {
            mainContent.innerHTML = "<h1>Tool not found</h1>";
            return;
        }

        document.title = tool.name; // Update page title
        document.querySelector('meta[name="description"]').setAttribute('content', tool.description); // Update meta description

        const toolContent = `
            <section class="tool-content">
                <h2>${tool.name}</h2>
                 <p>${tool.longDescription}</p>
                <div id="tool-target">
                     ${tool.content}
                </div>
            </section>
        `;
        mainContent.innerHTML = toolContent;
        if (tool.script) {
            tool.script();
        }

    }
    // Initial content load
    loadContent();
    window.addEventListener('hashchange', loadContent); // Handle route changes

    // Cookie consent
    const hasAcceptedCookies = getCookie('cookieConsent') === 'true';

    if (!hasAcceptedCookies) {
        cookieConsent.style.display = 'block';
    }

    acceptCookiesButton.addEventListener('click', () => {
        setCookie('cookieConsent', 'true', 365);
        cookieConsent.style.display = 'none';
        showToast('Cookies Accepted');
    });

    // Example popup
    setTimeout(() => {
        showPopup({
            title: 'Welcome!',
            content: 'Thanks for checking out my tools website!',
            buttonText: 'Close',
        });
    }, 1000);
});