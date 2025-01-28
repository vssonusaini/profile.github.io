const fileInput = document.getElementById('fileInput');
const downloadButton = document.getElementById('downloadButton');
const errorMessageDiv = document.getElementById('error-message');
const successMessageDiv = document.getElementById('success-message');
const loadingMessageDiv = document.getElementById('loading-message');
const fileCountDiv = document.getElementById('file-count')
let mergedData = [];

fileInput.addEventListener('change', async (event) => {
    errorMessageDiv.textContent = '';
    successMessageDiv.textContent = '';
    loadingMessageDiv.textContent = '';
    mergedData = [];
    downloadButton.disabled = true;

    const files = event.target.files;

    if (files.length === 0) {
        fileCountDiv.textContent = '';
        errorMessageDiv.textContent = 'Please select at least one file.';
        return;
    }

    fileCountDiv.textContent = `Selected ${files.length} file(s)`;
    loadingMessageDiv.textContent = 'Processing...';


    try {
        for (const file of files) {
            const data = await processFile(file);
            mergedData = mergedData.concat(data);
        }

        if (mergedData.length === 0) {
            loadingMessageDiv.textContent = '';
            errorMessageDiv.textContent = 'No valid data found in the selected files.';
            return;
        }

        loadingMessageDiv.textContent = '';
        successMessageDiv.textContent = 'Files processed successfully!';
        downloadButton.disabled = false;

    } catch (error) {
        console.error('Error processing files:', error);
        loadingMessageDiv.textContent = '';
        errorMessageDiv.textContent = 'Error reading files. Please check the file format and try again.';
        mergedData = [];
        downloadButton.disabled = true;
    }
});

downloadButton.addEventListener('click', () => {
    if (mergedData.length > 0) {
        generateAndDownloadExcel(mergedData);
        successMessageDiv.textContent = 'Downloading file';
    } else {
        errorMessageDiv.textContent = 'No data to download.';
    }
});

async function processFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const binaryString = e.target.result;
                const workbook = XLSX.read(binaryString, { type: 'binary' });
                let allSheetData = [];

                workbook.SheetNames.forEach(sheetName => {
                    const worksheet = workbook.Sheets[sheetName];
                    const range = XLSX.utils.decode_range(worksheet['!ref']);

                    let lastRow = range.s.r;
                    for (let row = range.e.r; row >= range.s.r; row--) {
                        const cellAddress = XLSX.utils.encode_cell({ r: row, c: range.s.c });

                        if (worksheet[cellAddress] && worksheet[cellAddress].v != null && worksheet[cellAddress].v != undefined) {
                            lastRow = row;
                            break;
                        }
                    }
                    const sheetData = XLSX.utils.sheet_to_json(worksheet, {
                        header: 1,
                        range: { s: range.s, e: { r: lastRow, c: range.e.c } }
                    });


                    // Add sheet name as new column
                    const sheetDataWithSheetName = sheetData.map(row => {
                        const newRow = [...row];
                        newRow.push(sheetName);
                        return newRow;
                    });


                    allSheetData = allSheetData.concat(sheetDataWithSheetName);

                });

                resolve(allSheetData);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = () => {
            reject(new Error("Error reading the file."));
        };

        reader.readAsBinaryString(file);
    });
}



function generateAndDownloadExcel(data) {
    if (!data || data.length === 0) {
        console.error("No data to create Excel file.");
        return;
    }
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'MergedData');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    try {
        const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'merged_data.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error generating the file:', error);
        errorMessageDiv.textContent = 'Error generating excel file.'
    }
}