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
    let project_name = document.querySelector('#project_name_input').value
    let project_prefix = document.querySelector('#project_prefix_input').value
    let csrf_token = document.querySelector('input').value
    if (project_name === "") {
        alert("Пожалуйста, введите название проекта.");
        return;
    } else if (project_prefix === "") {
        alert("Пожалуйста, введите префикс проекта.");
        return;
    }
    createBlock(project_name,project_prefix,csrf_token)
}

// создание и добавление блока прокета
function createBlock(project_name,project_prefix,csrf_token) {
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
    const data = new FormData()
    data.append('csrfmiddlewaretoken', csrf_token)
    data.append('project_name', project_name)
    data.append('project_prefix', project_prefix)
    console.log(data)
    sendProjectInfo(data)
}

// async function handleFormSubmit(event) {
//     event.preventDefault()
//
//
//     const data = serializeForm(event.target)
//
//     const response = await
// }

async function sendProjectInfo(data) {
    return await fetch('/api/project', {
        method: 'POST',
        body: data,
    }).then(response => {
        if (response.ok) {
            location.reload()
        }
    }).catch(error => {
        alert('Ошибка отправки' + error)
    });
}
  