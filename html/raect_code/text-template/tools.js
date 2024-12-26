export const toolsData = [
    {
        id: 'text-comparison',
        name: 'Text Comparison',
        description: 'Compare two texts for differences.',
        longDescription: 'This tool will compare two texts and show if they are different or not.',
        tags: ['text-utilities'],
        image: 'tool-image.jpg',
        content: `<div class="text-inputs">
                    <textarea id="text1" placeholder="Text 1"></textarea>
                    <textarea id="text2" placeholder="Text 2"></textarea>
                </div>
                <button id="compareBtn">Compare</button>
                <div id="results"></div>`,
        script: () => {
            const compareBtn = document.getElementById('compareBtn');
            const resultsDiv = document.getElementById('results');
            const text1Input = document.getElementById('text1');
            const text2Input = document.getElementById('text2');
            compareBtn.addEventListener('click', () => {
                const text1 = text1Input.value.trim();
                const text2 = text2Input.value.trim();
                if (text1 === "" || text2 === "") {
                    resultsDiv.textContent = "Please fill out both text areas."
                    return;
                }

                if (text1 === text2) {
                    resultsDiv.textContent = "The texts are identical.";
                } else {
                    resultsDiv.textContent = "The texts are different.";
                }
            });
        }
    },
    {
        id: 'image-resizer',
        name: 'Image Resizer',
        description: 'Resize images to your specifications.',
        longDescription: 'This tool allows you to resize your image.',
        tags: ['image-editing'],
        image: 'tool-image.jpg',
        content: `<p>Image resizer coming soon!</p>`,
    },
    {
        id: 'code-formatter',
        name: 'Code Formatter',
        description: 'Formats your code to make it beautiful',
        longDescription: 'This tool allows you to format your code.',
        tags: ['coding'],
        image: 'tool-image.jpg',
        content: `<p>Code formatter coming soon!</p>`,
    }
];