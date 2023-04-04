// =============== страница релиза ===============

// удаление уязвимости
function deleteVuln(rowToDel) {
    let vuln_id = rowToDel.cells[0].innerHTML
    console.log('deleted vuln with id: ' + vuln_id)
    rowToDel.remove()
}

// получение кнопок
let primaryReport = document.querySelector('#primaryReport_btn'),
    shortReport = document.querySelector('#shortReport_btn'),
    fullReport = document.querySelector('#fullReport_btn'),
    confirmFix = document.querySelector('#confirmFix_btn')

// обработчики для кнопок
primaryReport.onclick = function() {
    console.log(this)
}

shortReport.onclick = function() {
    console.log(this)
}

fullReport.onclick = function() {
    console.log(this)
}

confirmFix.onclick = function() {
    console.log(this)
}

// =============== Модальное окно добавления релиза ===============
// Получаем ссылки на элементы
let modal = document.getElementById('add_release_modal');
let btnOpenModal = document.getElementById("add_release_btn");

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

// // ресайз textarea в зависимости от контента
function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = (10+element.scrollHeight)+"px";
}

// =============== Отправка формы релиза ===============
// =============== отправка формы ===============
async function handleFormSubmit(event) {
    event.preventDefault()
  
    const data = serializeForm(event.target)
    console.log(data)
    applicantForm.classList.add('_sending')
    
    const response = await sendData(data)
  }
  
  // сбор данных с формы
  function serializeForm(formNode) {
  
    const { elements } = formNode
  
    const data = new FormData()
  
    Array.from(elements)
      .filter((item) => !!item.name)
      .forEach((element) => {
        const { name } = element
        const value = element.value
        data.append(name, value)
      })

    formNode.reset()
    return data
  }
  
  // отправка данных
  async function sendData(data) {
    return await fetch('/', {
      method: 'POST',
      body: data,
    }).then(response => {
      if (response.ok) {
          applicantForm.reset()
          applicantForm.classList.remove('_sending')
      }
    }).catch(error => {
      alert('Ошибка отправки' + error)
        applicantForm.classList.remove('_sending')
    });
  }
  
  const applicantForm = document.getElementById('release_add_form')
  applicantForm.addEventListener('submit', handleFormSubmit)