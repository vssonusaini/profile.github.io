const formElement = document.getElementById('data-group');
const actionElement = document.getElementById('action');
const idElement = document.getElementById('id-group');
const idInputElement = document.getElementById('id');
const resultElement = document.querySelector('.result');

actionElement.addEventListener('change', () => {
    const selectedAction = actionElement.value;
    idElement.style.display = selectedAction === 'update' || selectedAction === 'delete' ? 'block' : 'none';
    renderForm(selectedAction)
})

function renderForm(action) {
    formElement.innerHTML = '';
    if(action === 'read') {
      return
    }
     // Sample fields (adjust as per your sheet columns)
     const fields = [
         {label: 'id', type: 'text', id: 'id-field', hidden: action !== 'create'  },
        { label: 'Name', type: 'text', id: 'name-field', hidden: false},
        { label: 'Email', type: 'email', id: 'email-field', hidden: false },
        { label: 'Phone', type: 'tel', id: 'phone-field', hidden: false }
    ];

     for (const field of fields) {
      if(field.hidden) {
        continue;
      }
       const div = document.createElement('div');
        div.classList.add('form-group');

         const label = document.createElement('label');
         label.textContent = field.label + ':';
         div.appendChild(label);

        const input = document.createElement('input');
        input.type = field.type;
        input.id = field.id;
         input.placeholder = `Enter ${field.label}`
         div.appendChild(input);


         formElement.appendChild(div);

    }
}

function submitForm() {
    const action = actionElement.value;
    let payload = {};
    
     if (action === 'create' || action === 'update' || action === 'delete') {
        const formInputs = formElement.querySelectorAll('input');
        formInputs.forEach((input) => {
            payload[input.id.replace('-field','')] = input.value
        });
         if (action === 'update' || action === 'delete') {
             payload.id = idInputElement.value;
         }
    }


    resultElement.textContent = 'Loading...';

    fetch(apiURL + '?action=' + action, {
        method: action === 'read' ? 'GET' : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: action === 'read' ? null : JSON.stringify(payload)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            resultElement.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            resultElement.textContent = 'Error: ' + error.message;
        });
}

renderForm('read')