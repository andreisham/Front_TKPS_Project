const selectInput = document.querySelector('.select-input');
const selectDropdown = document.querySelector('.select-dropdown');
let selectOptions = ['R101+17.1', 'R102+17.2', 'R111+17.11', 'R112+17.12', 'R123+17.23'];

selectInput.addEventListener('input', () => {
    const searchText = selectInput.value.toLowerCase();
    const filteredOptions = selectOptions.filter(option => option.toLowerCase().includes(searchText));

    selectDropdown.innerHTML = '';
    filteredOptions.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('select-option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => {
            selectInput.value = option;
            selectDropdown.classList.remove('visible');
        });
        selectDropdown.appendChild(optionElement);
    });

    if (filteredOptions.length === 1) {
        selectInput.value = filteredOptions[0];
        selectDropdown.classList.remove('visible');
    } else if (filteredOptions.length > 0) {
        selectDropdown.classList.add('visible');
    } else {
        selectDropdown.classList.remove('visible');
    }
});

document.addEventListener('click', (event) => {
    if (!selectInput.contains(event.target) && !selectDropdown.contains(event.target)) {
        selectDropdown.classList.remove('visible');
    }
});
