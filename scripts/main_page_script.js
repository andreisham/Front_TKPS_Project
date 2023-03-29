// =============== главная страница ===============

// =============== Модальное окно добавления проекта ===============
// Получаем ссылки на элементы
let modal = document.getElementById('add_project_modal');
let btnOpenModal = document.getElementById("add_project_block");

// Добавляем обработчик события для открытия модального окна
btnOpenModal.onclick = function() {
  modal.style.display = "flex";
}

// Добавляем обработчик события для закрытия модального окна при щелчке вне модального окна
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// =============== Добавление блока проекта ===============
// создание блока
let i = 0; // инкрементное значение для id файловых импутов
let project_blocks = document.querySelector('.main_wrapper')
let add_btn = document.querySelector('.btn')


add_btn.onclick = function() {
    let project_name = document.querySelector('#project_add_input').value
    if (project_name === "") {
        alert("Пожалуйста, введите название проекта.");
        return;
    }
    createBlock(project_name)
}

// создание и добавление блока прокета
function createBlock(project_name) {
    const div = document.createElement('div')
    div.setAttribute('class','project_block')
    div.setAttribute('onclick','location.href="#"')
    div.innerHTML = `<h3 class="project_name">${project_name}</h3>
    <div class="project_block__release">
        <span class="actual_release">Текущий релиз:</span><span>R109 + 17.9</span>
    </div>
    <div class="project_block__vulns">
        <span>10</span><span class="actual_vulns">актуальных уязвимостей</span>
    </div>`
    modal.style.display = "none"
    i++

    project_blocks.insertBefore(div, btnOpenModal)

    // перенаправление на страницу релиза
    location.href = "http://127.0.0.1:5500/release_page.html"
}
