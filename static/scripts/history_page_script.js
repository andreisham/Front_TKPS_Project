const selectInput = document.querySelector('.select-input');
const selectDropdown = document.querySelector('.select-dropdown');
const form_radio_group = document.querySelector('.form_radio_group');
// let selectOptions = ['R101+17.1', 'R102+17.2', 'R111+17.11', 'R112+17.12', 'R123+17.23'];
let selectOptions = []

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
            form_radio_group.classList.add('_sending')
            sendDataToServer(option); // Отправляем данные на сервер
        });
        selectDropdown.appendChild(optionElement);
    });

    if (filteredOptions.length === 1) {
        selectInput.value = filteredOptions[0];
        selectDropdown.classList.remove('visible');
        form_radio_group.classList.add('_sending')
        sendDataToServer(filteredOptions[0]); // Отправляем данные на сервер
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

// Функция для отправки запроса с айдишником
function sendDataToServer(option) {
    fetch('your_server_endpoint', {
        method: 'POST', // Используем метод POST
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option: option }) // Отправляем данные в формате JSON
    })
        .then(response => {
            if (response.ok) {
                // Обработка успешной отправки
                console.log('Данные успешно отправлены на сервер.');
                form_radio_group.classList.remove('_sending')
            } else {
                // Обработка ошибки
                console.error('Ошибка при отправке данных на сервер.');
            }
        })
        .catch(error => {
            // Обработка ошибки
            console.error('Произошла ошибка:', error);
        });
}

// Функция для отправки AJAX-запроса для получения айдишников
function sendRequest(selectedValue) {
    fetch('/your-server-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: selectedValue })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка запроса: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Обработка полученных данных
            selectOptions = data.join("<br>");
            form_radio_group.classList.remove('_sending')
        })
        .catch(error => {
            console.error(error);
        });
}

// Обработчики событий для радиокнопок
let releaseRadio = document.getElementById("release_radio");
let vulnRadio = document.getElementById("vuln_radio");

releaseRadio.addEventListener("change", function () {
    if (releaseRadio.checked) {
        form_radio_group.classList.add('_sending')
        sendRequest(releaseRadio.value);
    }
});

vulnRadio.addEventListener("change", function () {
    if (vulnRadio.checked) {
        form_radio_group.classList.add('_sending')
        sendRequest(vulnRadio.value);
    }
});