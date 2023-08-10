// =============== страница релиза ===============

// удаление уязвимости
async function deleteVuln(rowToDel) {
    Confirm.open({
        title: 'Подтверждение действия',
        message: 'Вы точно хотите удалить уязвимость?',
        onok: () => {
            let vuln_id = rowToDel.cells[0].innerHTML
            rowToDel.remove()
            const data = new FormData()
            data.append('csrfmiddlewaretoken', document.querySelector('input[name*="csrf"]').value);
            data.append('release', document.querySelector('input#release').value);
            data.append('vuln', rowToDel.querySelector('td.table_item_link').id)
            if (rowToDel.querySelector('td.table_item_status select') != null) {
                data.append('status', rowToDel.querySelector('td.table_item_status select').value)
            } else {
                data.append('status', rowToDel.querySelector('td.table_item_status').innerHTML)
            }
            // убрал await
            const response = sendData(data, '/api/vuln/delete');
        }
    })
}

// получение кнопок
let primaryReport = document.querySelector('#primaryReport_btn'),
    shortReport = document.querySelector('#shortReport_btn'),
    fullReport = document.querySelector('#fullReport_btn'),
    confirmFix = document.querySelector('#confirmFix_btn')

// обработчики для кнопок
if (primaryReport) {
    primaryReport.onclick = function() {
        console.log(this)
    }
}

if (shortReport) {
    shortReport.onclick = function() {
        console.log(this)
    }
}

if (fullReport) {
    fullReport.onclick = function() {
        console.log(this)
    }
}

if (confirmFix) {
    confirmFix.onclick = async function() {
        Confirm.open({
            title: 'Подтверждение действия',
            message: 'Фиксируем устранение?',
            onok: () => {
                old_vulns = document.querySelectorAll('.table.old_vuln tbody tr');
                const data = new FormData()
                data.append('csrfmiddlewaretoken', document.querySelector('input[name*="csrf"]').value);
                data.append('release', document.querySelector('input#release').value);
                Array.from(old_vulns)
                    .forEach((element) => {
                        const id = element.querySelector('td.table_item_link').id;
                        if (element.querySelector('select') != null) {
                            data.append(id, element.querySelector('select').value);
                        } else {
                            data.append(id, element.querySelector('.table_item_status').innerText);
                        }
                    })
                // убрал await
                const response = sendData(data, '/api/release/fix');
            }
        })
    }
}

// =============== Модальное окно добавления релиза ===============
// Получаем ссылки на элементы
let modal = document.getElementById('add_release_modal');
let btnOpenModal = document.getElementById("add_release_btn");

// Добавляем обработчик события для открытия модального окна
btnOpenModal.onclick = function() {
  modal.style.display = "flex";
}

// =============== Модальное окно изменения релиза ===============
let modal_edit = document.getElementById('edit_release_modal');
let btnOpenModalEdit = document.getElementById('edit_release_btn');

// Добавляем обработчик события для открытия модального окна
if (btnOpenModalEdit) {
    btnOpenModalEdit.onclick = function() {
        modal_edit.style.display = "flex";
        fillFields()
    }
}

// Добавляем обработчик события для закрытия модального окна при щелчке вне модального окна
window.onclick = function(event) {
    if (event.target === modal_edit) {
        modal_edit.style.display = "none";
    } else if (event.target === modal) {
        modal.style.display = "none";
    }
}

// заполнение полей для редактирвоания релиза
let releaseData = document.querySelector('.release_header')

function fillFields() {
    applicantEditForm.release_id.value = releaseData.dataset.id
    applicantEditForm.release_number.value = releaseData.dataset.number
    applicantEditForm.edit_release_start_date_input.value = releaseData.dataset.start
    applicantEditForm.edit_release_end_date_input.value = releaseData.dataset.end
    applicantEditForm.edit_release_rds_input.value = releaseData.dataset.rds
    applicantEditForm.edit_release_scope_input.value = releaseData.dataset.scope
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
    
    const response = await sendData(data, '/api/release')
    location.reload()
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
async function sendData(data, url) {
return await fetch(url, {
  method: 'POST',
  body: data,
}).then(response => {
  if (response.ok) {
      alert('Отправлено успешно')
      applicantForm.reset()
      applicantForm.classList.remove('_sending')
  }
}).catch(error => {
  alert('Ошибка отправки' + error)
    applicantForm.classList.remove('_sending')
});
}
  
  const applicantForm = document.getElementById('release_add_form')
  const applicantEditForm = document.getElementById('release_edit_form')

if (applicantForm) {
    applicantForm.addEventListener('submit', handleFormSubmit)
}

if (applicantEditForm) {
    applicantEditForm.addEventListener('submit', handleFormSubmit)
}

function info(vuln) {
    window.location.href = `/vuln/info?id=${vuln.id}`
}

// =============== Карточка релиза ===============
async function report(url) {
  console.log(url)
  let response = await fetch(url).then((response) => {
    return response.text()
  }).catch(error => {
    alert('Ошибка отправки' + error)
  })
  let report = window.open();
  report.document.open();
  report.document.write(response);
  report.document.close();
}

// Подсвечивание отображаемого релиза в сайдбаре
let url = new URL(document.location.href)
let showedReleaseId = url.searchParams.get('id')
let menu_item = document.querySelector(`[data-release_id="${showedReleaseId}"]`)
menu_item.firstChild.setAttribute('style', 'color: #5E81FE;')