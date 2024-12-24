document.addEventListener('DOMContentLoaded', () => {

    // Function to generate tool cards HTML
    function generateToolCards(tools, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with id "${containerId}" not found.`);
            return;
        }
        container.innerHTML = ""; // Clear previous content
        tools.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded shadow p-4';
            card.innerHTML = `
                 <h3 class="text-xl font-bold mb-2">${tool.name}</h3>
                 <p class="text-gray-700 mb-4">${tool.description}</p>
                 <a href="/tool/${tool.slug}.html" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block">Use Tool</a>
            `;
            container.appendChild(card);
        });
    }
    // Function to generate Category cards HTML
    function generateCategoryCards(categories, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with id "${containerId}" not found.`);
            return;
        }
        container.innerHTML = "";//clear old cards
        categories.forEach(category => {
            const card = document.createElement("div");
            card.className = "bg-white rounded shadow p-4 text-center";
            card.innerHTML = `
                    <h3 class="text-xl font-bold mb-2">${category.name}</h3>
                    <a href="/category/${category.slug}.html" class="text-blue-500 hover:underline">Explore</a>
                `
            container.appendChild(card);
        })
    }
    // Dynamic card generation for the homepage
    if (document.querySelector('body').classList.contains('index-page')) {
        generateToolCards(config.featuredTools, 'tools');
        generateCategoryCards(config.categories, 'categories');
    }


    // Dynamically loading tools on the tool category page.
    if (document.querySelector('body').classList.contains('category-page')) {
        const categorySlug = window.location.pathname.split('/').pop().replace('.html', '');
        const category = config.categories.find(cat => cat.slug === categorySlug);
        if (category) {
            document.title = `${category.name} - Tool Hub`; //Set title of the page
            // dynamically set the page title and category description
            document.querySelector('.py-8 h1').textContent = `${category.name}`;
            document.querySelector('.py-8 p').textContent = `A selection of tools for ${category.name.toLowerCase()}.`;
            const categoryTools = config.tools.filter(tool => tool.category === category.slug);
            generateToolCards(categoryTools, 'category-tools-container');
        }
        else {
            console.error(`Category with slug "${categorySlug}" not found.`);
        }
    }


    // Dynamically load details on the tool page
    if (document.querySelector('body').classList.contains('tool-page')) {
        const toolSlug = window.location.pathname.split('/').pop().replace('.html', '');
        const tool = config.tools.find(t => t.slug === toolSlug);
        if (tool) {
            document.title = `${tool.name} - Tool Hub`;
            document.getElementById('tool-title').textContent = tool.name;
            document.getElementById('tool-description').textContent = tool.description;
            // Dynamically insert tool specific html and instructions
            document.getElementById('tool-interface').innerHTML = tool.interface;
            document.getElementById('tool-instructions').textContent = tool.instructions;


            // Generate the related tools section
            const relatedTools = config.tools.filter(t => t.category === tool.category && t.slug !== toolSlug);
            generateToolCards(relatedTools, 'related-tools')

            // add an event listener to the share button to share on the page
            document.getElementById('share-button').addEventListener('click', () => {
                if (navigator.share) {
                    navigator.share({
                        title: `Check out this tool ${tool.name} from Tool Hub`,
                        url: window.location.href
                    }).then(() => console.log('Shared'))
                        .catch(err => console.error('Failed to share', err));
                }
                else {
                    alert('Sharing is not supported on your device or browser')
                }
            })
        } else {
            console.error(`Tool with slug "${toolSlug}" not found.`);
        }
    }
});