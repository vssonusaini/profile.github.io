export function showPopup(options) {
    const popupContainer = document.getElementById('popup-container');
    const popupElement = document.createElement('div');
    popupElement.classList.add('popup');
    popupElement.innerHTML = `
          <h2>${options.title}</h2>
          <p>${options.content}</p>
          <button id="closePopupBtn">${options.buttonText}</button>
      `;
    popupContainer.appendChild(popupElement);
    popupContainer.style.display = 'flex';
    const closePopupBtn = document.getElementById('closePopupBtn')
    closePopupBtn.addEventListener('click', () => {
        popupContainer.style.display = 'none';
        popupElement.remove();
    });
}