const config = {
    featuredTools: [
        {
            name: "Text Case Converter",
            slug: "text-case-converter",
            description: "Quickly convert text between different cases (uppercase, lowercase, title case, etc.).",
            category: "text-tools",
            icon: "fas fa-text-height"
        },
        {
            name: "HTML Encoder/Decoder",
            slug: "html-encoder-decoder",
            description: "Encode and decode HTML entities to prevent display issues or security vulnerabilities.",
            category: "dev-tools",
            icon: "fas fa-code"
        },
        {
            name: "JSON Formatter",
            slug: "json-formatter",
            description: "Format messy JSON data into a readable, well-structured format for easy parsing.",
            category: "dev-tools",
            icon: "fas fa-file-code"
        },
        {
            name: "Image Resizer",
            slug: "image-resizer",
            description: "Resize images to specified dimensions, perfect for web and social media.",
            category: "image-tools",
            icon: "fas fa-image"
        }
        ,
        {
            name: "Markdown Previewer",
            slug: "markdown-previewer",
            description: "View the output of Markdown formatted text with a live preview.",
            category: "text-tools",
            icon: "fas fa-markdown"
        }
    ],
    categories: [
        {
            name: "Text Tools",
            slug: "text-tools",
            icon: "fas fa-font",
            description: "A collection of tools for manipulating and processing text."
        },
        {
            name: "Dev Tools",
            slug: "dev-tools",
            icon: "fas fa-laptop-code",
            description: "Essential tools for developers to help code, test, and format their projects."
        },
        {
            name: "Image Tools",
            slug: "image-tools",
            icon: "fas fa-images",
            description: "Handy tools for manipulating and optimizing images."
        },
        {
            name: "Unit Converters",
            slug: "unit-converters",
            icon: "fas fa-exchange-alt",
            description: "Convert between various measurement units."
        },
        {
            name: "Color Tools",
            slug: "color-tools",
            icon: "fas fa-palette",
            description: "Tools for working with colors, such as converters, and generators"
        }

    ],
    tools: [
        {
            name: "Text Case Converter",
            slug: "text-case-converter",
            category: "text-tools",
            description: "Convert text between uppercase, lowercase, title case, sentence case, and more.",
            instructions: "Enter your text and select the desired case conversion option. Results will update automatically below.",
            interface: `
                <div class="mb-4">
                    <textarea id="text-input" placeholder="Enter your text here..." class="border rounded p-2 w-full h-32"></textarea>
                </div>
                <div class="mb-4 flex flex-wrap gap-2">
                     <button onclick="convertText('upper')"  class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Upper</button>
                    <button onclick="convertText('lower')" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Lower</button>
                     <button onclick="convertText('title')" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Title Case</button>
                    <button onclick="convertText('sentence')" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Sentence Case</button>
                    <button onclick="convertText('camel')" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Camel Case</button>
                    <button onclick="convertText('snake')" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Snake Case</button>
                    <button onclick="convertText('kebab')" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Kebab Case</button>
                </div>
                <div class="mb-4">
                    <div id="output-area" class="border rounded p-2 h-40 overflow-auto"></div>
                </div>
                <script>
                  function convertText(type) {
                    const inputText = document.getElementById('text-input').value;
                    let outputText = "";
                    switch (type) {
                    case 'upper':
                        outputText = inputText.toUpperCase();
                        break;
                    case 'lower':
                         outputText = inputText.toLowerCase();
                         break;
                    case 'title':
                         outputText = inputText.toLowerCase().replace(/(^|\s)\w/g, (match) => match.toUpperCase());
                         break;
                    case 'sentence':
                        outputText = inputText.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => match.toUpperCase());
                        break;
                        case 'camel':
                              outputText = inputText.toLowerCase().replace(/[-_\s](.)/g, (_, char) => char.toUpperCase())
                            break;
                        case 'snake':
                              outputText = inputText.toLowerCase().replace(/\s/g, '_');
                            break;
                        case 'kebab':
                                outputText = inputText.toLowerCase().replace(/\s/g, '-');
                            break;
                    }
                     document.getElementById('output-area').textContent = outputText;
                    }
                </script>
            `
        },
        {
            name: "HTML Encoder/Decoder",
            slug: "html-encoder-decoder",
            category: "dev-tools",
            description: "Encode or decode HTML entities to prevent parsing issues or XSS attacks.",
            instructions: "Paste HTML code into the input area and choose 'Encode' or 'Decode'. The result is displayed below.",
            interface: `
              <div class="mb-4">
                <textarea placeholder="Enter HTML code..." id="html-input" class="border rounded p-2 w-full h-32"></textarea>
            </div>
            <div class="mb-4 flex gap-2">
                  <button onclick="htmlEncode()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Encode</button>
                 <button onclick="htmlDecode()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Decode</button>
            </div>
                <div class="mb-4">
                    <div id="html-output" class="border rounded p-2 h-40 overflow-auto"></div>
                </div>
              <script>
                   function htmlEncode() {
                      const input = document.getElementById('html-input').value;
                      const encoded = document.createElement('div');
                       encoded.textContent = input;
                        document.getElementById('html-output').textContent = encoded.innerHTML;
                     }

                    function htmlDecode(){
                        const input = document.getElementById('html-input').value;
                          const decoded = document.createElement('div');
                        decoded.innerHTML = input;
                        document.getElementById('html-output').textContent = decoded.textContent
                    }
                </script>
            `
        },
        {
            name: "JSON Formatter",
            slug: "json-formatter",
            category: "dev-tools",
            description: "Takes messy JSON and formats it for readability, including indentation and syntax highlighting.",
            instructions: "Paste your JSON data into the input area. The formatted JSON is displayed in a clean and readable structure.",
            interface: `
               <div class="mb-4">
                  <textarea placeholder="Enter JSON data..." id="json-input"  class="border rounded p-2 w-full h-32"></textarea>
                </div>
                <div class="mb-4">
                  <button onclick="formatJSON()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Format JSON</button>
                </div>
                 <div class="mb-4">
                     <pre id="json-output" class="border rounded p-2 h-40 overflow-auto"></pre>
                 </div>
                <script>
                function formatJSON() {
                     const jsonInput = document.getElementById('json-input').value;
                   try {
                        const parsedJSON = JSON.parse(jsonInput);
                         const formattedJSON = JSON.stringify(parsedJSON, null, 2);
                      document.getElementById('json-output').textContent = formattedJSON;
                    }
                    catch (error) {
                        document.getElementById('json-output').textContent = "Invalid JSON format";
                   }
                }
                </script>
              `
        },
        {
            name: "Image Resizer",
            slug: "image-resizer",
            category: "image-tools",
            description: "Resize images to specified dimensions while maintaining the aspect ratio.",
            instructions: "Upload an image file then input the desired width and height. A preview of the resized image is shown on the page.",
            interface: `
                  <div class="mb-4">
                        <input type="file" id="image-upload" accept="image/*" class="mb-2">
                   </div>
                     <div class="mb-4 flex gap-2">
                        <input type="number" id="width-input" placeholder="Width"  class="border rounded p-2">
                         <input type="number" id="height-input" placeholder="Height" class="border rounded p-2">
                         <button onclick="resizeImage()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Resize</button>
                     </div>
                     <div class="mb-4">
                         <canvas id="resized-image-canvas" class="max-w-full max-h-96"></canvas>
                     </div>
                  <script>
                    function resizeImage() {
                        const fileInput = document.getElementById('image-upload');
                         const widthInput = document.getElementById('width-input').value;
                         const heightInput = document.getElementById('height-input').value;

                      if(!fileInput.files || fileInput.files.length === 0) {
                         alert("Please upload an image!");
                        return;
                        }
                     const file = fileInput.files[0];
                      const reader = new FileReader();
                       reader.onload = function(event) {
                           const img = new Image();
                            img.onload = function(){
                                 const canvas = document.getElementById('resized-image-canvas');
                                  const ctx = canvas.getContext('2d');

                                canvas.width = widthInput;
                                canvas.height = heightInput;
                                 ctx.drawImage(img,0,0, canvas.width, canvas.height)
                            }
                            img.src = event.target.result;
                       }
                      reader.readAsDataURL(file);
                     }
                 </script>
              `
        },
        {
            name: "Markdown Previewer",
            slug: "markdown-previewer",
            category: "text-tools",
            description: "A simple markdown editor with live preview",
            instructions: "Paste or write markdown formatted text in the input area. A preview of the rendered markdown will show in the output.",
            interface: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div class="mb-4">
                       <textarea placeholder="Enter markdown text..." id="markdown-input" class="border rounded p-2 w-full h-96"></textarea>
                 </div>
                   <div class="mb-4">
                        <div id="markdown-output" class="border rounded p-2 h-96 overflow-auto">
                     </div>
                </div>
              </div>
               <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
               <script>
                    const markdownInput = document.getElementById('markdown-input')
                     const markdownOutput = document.getElementById('markdown-output');
                    markdownInput.addEventListener('input', function(){
                     markdownOutput.innerHTML = marked.parse(markdownInput.value)
                    })
                    markdownOutput.innerHTML = marked.parse(markdownInput.value)
               </script>
             `
        },
        {
            name: "Temperature Converter",
            slug: "temperature-converter",
            category: "unit-converters",
            description: "Convert temperatures between Celsius, Fahrenheit, and Kelvin.",
            instructions: "Enter a value and select the input and output units. The converted value will appear in the output field.",
            interface: `
                <div class="mb-4">
                   <input type="number" id="temp-input" placeholder="Enter Temperature"  class="border rounded p-2">
                </div>
                <div class="mb-4 flex gap-2">
                    <select id="from-unit"  class="border rounded p-2">
                          <option value="celsius">Celsius</option>
                         <option value="fahrenheit">Fahrenheit</option>
                         <option value="kelvin">Kelvin</option>
                    </select>
                    <select id="to-unit" class="border rounded p-2">
                         <option value="celsius">Celsius</option>
                         <option value="fahrenheit">Fahrenheit</option>
                         <option value="kelvin">Kelvin</option>
                    </select>
                 </div>
                <div class="mb-4">
                   <button onclick="convertTemperature()"  class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Convert</button>
                 </div>
                 <div class="mb-4">
                     <div id="temp-output" class="border rounded p-2 h-20 overflow-auto"></div>
                 </div>
                 <script>
                     function convertTemperature(){
                        const tempInput = document.getElementById('temp-input').value;
                        const fromUnit = document.getElementById('from-unit').value;
                       const toUnit = document.getElementById('to-unit').value;

                       let result = 0;
                       if(fromUnit === toUnit) {
                           result = tempInput;
                        }
                        else if(fromUnit === 'celsius' && toUnit === 'fahrenheit'){
                           result = (tempInput * 9/5) + 32;
                         }
                        else if (fromUnit === 'celsius' && toUnit === 'kelvin'){
                            result =  parseFloat(tempInput) + 273.15;
                        }
                          else if (fromUnit === 'fahrenheit' && toUnit === 'celsius'){
                           result = (tempInput - 32) * 5/9;
                        }
                         else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin'){
                              result = ((tempInput - 32) * 5/9) + 273.15;
                        }
                         else if (fromUnit === 'kelvin' && toUnit === 'celsius'){
                              result = tempInput - 273.15;
                         }
                          else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit'){
                           result = ((tempInput - 273.15) * 9/5) + 32;
                         }
                      document.getElementById('temp-output').textContent = result.toFixed(2);
                     }
                 </script>
            `
        },
        {
            name: "Color Converter",
            slug: "color-converter",
            category: "color-tools",
            description: "Convert colors between HEX, RGB, and HSL formats.",
            instructions: "Choose the input color type and enter the color in the field. The output will convert the color into the other formats.",
            interface: `
                <div class="mb-4">
                  <label class="text-gray-700">Select Input Format:</label>
                    <select id="color-format"  class="border rounded p-2">
                         <option value="hex">HEX</option>
                          <option value="rgb">RGB</option>
                         <option value="hsl">HSL</option>
                      </select>
                </div>
                   <div class="mb-4">
                     <input type="text" id="color-input" placeholder="Enter Color Code" class="border rounded p-2">
                 </div>
                  <div class="mb-4">
                    <button onclick="convertColor()"  class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Convert</button>
                 </div>
                 <div class="grid grid-cols-3 gap-2">
                       <div class="mb-2">
                            <label class="text-gray-700">HEX</label>
                             <div id="hex-output"  class="border rounded p-2"></div>
                        </div>
                       <div class="mb-2">
                            <label class="text-gray-700">RGB</label>
                            <div id="rgb-output"  class="border rounded p-2"></div>
                        </div>
                        <div class="mb-2">
                             <label class="text-gray-700">HSL</label>
                            <div id="hsl-output"  class="border rounded p-2"></div>
                        </div>
                </div>
                <script>
                 function convertColor(){
                     const inputColorFormat = document.getElementById('color-format').value;
                     const inputColor = document.getElementById('color-input').value;

                   let hexValue = "";
                    let rgbValue = "";
                     let hslValue = "";

                    if(inputColorFormat === 'hex'){
                        hexValue = inputColor;
                       rgbValue = hexToRgb(inputColor);
                       hslValue = rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b)
                    }else if(inputColorFormat === 'rgb'){
                         rgbValue = parseRgbString(inputColor);
                          hexValue = rgbToHex(rgbValue.r, rgbValue.g, rgbValue.b);
                        hslValue = rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b);

                    } else if(inputColorFormat === 'hsl') {
                          hslValue = parseHslString(inputColor);
                         rgbValue = hslToRgb(hslValue.h, hslValue.s, hslValue.l)
                           hexValue = rgbToHex(rgbValue.r, rgbValue.g, rgbValue.b);
                     }


                     document.getElementById('hex-output').textContent = hexValue;
                     document.getElementById('rgb-output').textContent = rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b});
                    document.getElementById('hsl-output').textContent = hsl(${hslValue.h.toFixed(0)}, ${hslValue.s.toFixed(0)}%, ${hslValue.l.toFixed(0)}%);

                     function hexToRgb(hex) {
                        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                        return result ? {
                            r: parseInt(result[1], 16),
                             g: parseInt(result[2], 16),
                            b: parseInt(result[3], 16)
                         } : null;
                      }
                       function rgbToHex(r, g, b) {
                           return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                      }
                       function rgbToHsl(r, g, b) {
                           r /= 255, g /= 255, b /= 255;
                            let h, s, l;

                            const min = Math.min(r, g, b);
                             const max = Math.max(r, g, b);

                            if (max === min) {
                               h = 0;
                            } else if (max === r) {
                               h = 60 * (0 + (g - b) / (max - min));
                             } else if (max === g) {
                                h = 60 * (2 + (b - r) / (max - min));
                           } else if (max === b) {
                              h = 60 * (4 + (r - g) / (max - min));
                             }

                            if(h < 0){
                             h = h + 360
                            }


                            l = (min + max) / 2;

                          if (max === min){
                            s = 0;
                         }
                           else if (l <= 0.5) {
                            s = (max-min) / (max+min)
                        } else{
                           s = (max-min) / (2 - max-min)
                        }

                        return {h:h, s: s * 100, l: l * 100}
                       }
                     function hslToRgb(h, s, l) {
                         h /= 360;
                         s /= 100;
                           l /= 100;
                         let r, g, b;
                           if (s === 0) {
                                r = g = b = l;
                         } else {
                              const hue2rgb = (p, q, t) => {
                                   if (t < 0) t += 1;
                                   if (t > 1) t -= 1;
                                  if (t < 1/6) return p + (q - p) * 6 * t;
                                    if (t < 1/2) return q;
                                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                                    return p;
                                };
                                  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                               const p = 2 * l - q;
                               r = hue2rgb(p, q, h + 1/3);
                                g = hue2rgb(p, q, h);
                            b = hue2rgb(p, q, h - 1/3);
                            }
                       return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255)};
                      }
                    function parseRgbString(rgbStr) {
                      const match = rgbStr.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                      return match ? { r: parseInt(match[1], 10), g: parseInt(match[2], 10), b: parseInt(match[3], 10) } : null;
                     }
                     function parseHslString(hslStr) {
                       const match = hslStr.match(/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/);
                         return match ? { h: parseInt(match[1], 10), s: parseInt(match[2], 10), l: parseInt(match[3], 10) } : null;
                   }
               }
                 </script>
            `
        }
    ]
};