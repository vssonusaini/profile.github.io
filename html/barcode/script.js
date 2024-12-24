const toolsData = [
    {
        id: 1,
        name: "Text Editor",
        description: "Edit and format text online.",
        image: "icon-text.png",
        url: "/tool/text-editor.html",
        category: "Text Tools",
    },
    {
        id: 2,
        name: "Image Resizer",
        description: "Resize your images quickly.",
        image: "icon-image.png",
        url: "/tool/image-resizer.html",
        category: "Image Tools",
    },
    {
        id: 3,
        name: "Text Transformer",
        description: "Transform text to uppercase, lowercase or capitalise.",
        image: "icon-transform.png",
        url: "/tool/text-transformer.html",
        category: "Text Tools",
    },
    {
        id: 4,
        name: "File Convertor",
        description: "Convert files between formats.",
        image: "icon-convert.png",
        url: "/tool/file-convertor.html",
        category: "Developer Tools",
    },
    {
        id: 5,
        name: "JSON Formatter",
        description: "Format and validate JSON data.",
        image: "icon-json.png",
        url: "/tool/json-formatter.html",
        category: "Developer Tools",
    },
];
function performSearch() {
    const searchInput = document.querySelector('header input[type="text"]');
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        alert(`Simulating search for: ${searchTerm} \n This is a placeholder for more robust search`);
    }
}
document.querySelector('header input[type="text"]').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        performSearch()
    }
});
// Get DOM elements
const featuredToolList = document.getElementById('featured-tool-list');
const categoryList = document.getElementById('category-list');


// Featured tools display
const featuredTools = toolsData.slice(0, 3);
featuredTools.forEach(tool => {
    const toolCardHTML = `
        <div class="tool-card">
            <img src="${tool.image}" alt="${tool.name}">
           <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <a href="${tool.url}">Use Now</a>
        </div>
        `;
    featuredToolList.innerHTML += toolCardHTML;
});

// Generate Categories dynamically
const categories = [...new Set(toolsData.map(tool => tool.category))]; // Get unique categories
categories.forEach(category => {
    const categoryCardHTML = `
          <a href="/category/${category.toLowerCase().replace(' ', '-')}.html" class="category-card">
          <img src="icon-category.png" alt="${category}">
              <h3>${category}</h3>
          </a>
          `;
    categoryList.innerHTML += categoryCardHTML;
});


// Category Pages dynamic display
const categoryPage = window.location.pathname.startsWith('/category/');
if (categoryPage) {
    const categoryName = window.location.pathname.split('/').pop().replace('-', ' ');
    const categoryTitle = document.getElementById('category-title');
    const categoryDescription = document.getElementById('category-description');
    const categoryToolList = document.getElementById('category-tool-list');
    //get tools related to this category
    const toolsInCategory = toolsData.filter(tool => tool.category.toLowerCase() === categoryName)

    if (toolsInCategory.length) {
        categoryTitle.innerHTML = toolsInCategory[0].category;
        categoryDescription.innerHTML = `List of tools available in the ${toolsInCategory[0].category} category`;
        toolsInCategory.forEach(tool => {
            const toolCardHTML = `
                      <div class="tool-card">
                          <img src="${tool.image}" alt="${tool.name}">
                          <h3>${tool.name}</h3>
                         <p>${tool.description}</p>
                          <a href="${tool.url}">Use Now</a>
                      </div>
                     `;
            categoryToolList.innerHTML += toolCardHTML;

        });

        // Ad unit for category pages
        const adUnitHTML = `
            <div class="adsense-ad" style="text-align:center; margin-bottom: 20px;">
                <!-- Replace with your AdSense ad code here -->
              <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
              crossorigin="anonymous"></script>
                    <!-- adName -->
              <ins class="adsbygoogle"
                   style="display:block"
                  data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
                   data-ad-slot="xxxxxxxxxx"
                  data-ad-format="auto"
                   data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                 </script>
              </div>
          `;
        categoryToolList.insertAdjacentHTML('beforebegin', adUnitHTML)

        // Add schema markup for category pages
        document.head.insertAdjacentHTML("beforeend", `
                  <script type="application/ld+json">
                     {
                         "@context": "https://schema.org",
                          "@type": "ItemList",
                          "itemListElement": ${JSON.stringify(toolsInCategory.map((tool, index) => {
            return {
                "@type": "ListItem",
                "position": index + 1,
                "url": window.location.origin + tool.url,
                "name": tool.name,
                "description": tool.description,
            }
        }))}
                     }
                   </script>
               `);
        //set page title
        document.title = `ToolVerse - ${toolsInCategory[0].category}`;
        //set description
        const descriptionMeta = document.createElement('meta');
        descriptionMeta.name = 'description';
        descriptionMeta.content = `Explore our range of ${toolsInCategory[0].category} tools designed to simplify your task.`
        document.head.appendChild(descriptionMeta);
    }
}
// Tool Page dynamic display
const toolPage = window.location.pathname.startsWith('/tool/');
if (toolPage) {
    const toolName = window.location.pathname.split('/').pop().replace('-', ' ');
    const toolDetailsContainer = document.getElementById('tool-details');
    const tool = toolsData.find(tool => tool.name.toLowerCase() === toolName);

    if (tool) {
        const toolPageHTML = `
                      <section class="tool-header">
                          <h1>${tool.name}</h1>
                         <p>${tool.description}</p>
                      </section>
                          <section class="tool-interface">
                              <p>Tool interface will be here...</p>
                                <!-- Tool Interface here -->
                           </section>
                            <section class="tool-instructions">
                               <h2>How to Use</h2>
                                 <p>Instruction for the ${tool.name} tool.</p>
                              </section>
                             <section class="related-tools">
                                 <h2>Related Tools</h2>
                                  <ul>
                                    <li> Related tools would appear here</li>
                                   </ul>
                             </section>
                             <section class="share-buttons">
                             <!-- Share buttons would go here in actual implementation -->
                           </section>
                      `;
        toolDetailsContainer.innerHTML = toolPageHTML;
        // Add schema markup for tool pages
        document.head.insertAdjacentHTML("beforeend", `
                   <script type="application/ld+json">
                      {
                          "@context": "https://schema.org",
                          "@type": "SoftwareApplication",
                          "name": "${tool.name}",
                           "description": "${tool.description}",
                           "applicationCategory": "Utility",
                            "operatingSystem": "Browser Based",
                           "offers": {
                               "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "USD"
                           }
                       }
                     </script>
                 `);
        //set page title
        document.title = `ToolVerse - ${tool.name}`;
        //set description
        const descriptionMeta = document.createElement('meta');
        descriptionMeta.name = 'description';
        descriptionMeta.content = `Use our ${tool.name} tool to help you with ${tool.description}`
        document.head.appendChild(descriptionMeta);
    }
}