// // ресайз textarea в зависимости от контента
function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = (10+element.scrollHeight)+"px";
}

// обновление массива тегов
window.onload =function () {
    document.querySelectorAll('.tag span').forEach(function(tag) {
        tags.push(tag.innerHTML)
    })
    // обновление ссылкок
    createLink()

    // обновление cvss
    setCvssVector()
    setCriticalVulnPage(cvss_score_p.innerHTML)
    render_cvss_rating()
    translateCvss(cvss_severity_p)
}

let cvss_severity_p = document.querySelector('.cvss_severity')
let cvss_score_p = document.querySelector('.cvss_score')
let cvss_vector_p = document.querySelector('.cvss_vector')
let cvss_score = document.querySelector('#environmentalMetricScore')
let cvss_severity = document.querySelector('#environmentalSeverity')
let cvss_vector_string = document.querySelector('#vectorString')
setCriticalVulnPage(cvss_score_p.innerHTML)
setCvssVector()

function setCvssVector() {
    window.location.hash = cvss_vector_p.innerHTML
}

function translateCvss(cvss_critical) {
    if (cvss_critical.textContent === '(None)') {
        cvss_critical.textContent = 'Информационный'
    } else if (cvss_critical.textContent === '(Low)') {
        cvss_critical.textContent = 'Низкий'
    } else if (cvss_critical.textContent === '(Medium)') {
        cvss_critical.textContent = 'Средний'
    } else if (cvss_critical.textContent === '(High)') {
        cvss_critical.textContent = 'Высокий'
    } else if (cvss_critical.textContent === '(Critical)') {
        cvss_critical.textContent = 'Критический'
    }
}
cvss_severity.DOMSubtreeModified = function () {
    translateCvss(cvss_severity)
}

// Добавление обработки на загрузку файлов
if (document.querySelector('input[type="file"]')) {
    document.querySelector('input[type="file"]').addEventListener('change', function (e) {
        imageUploader(e)
    })
}

// Обновление критичности
function setCriticalVulnPage(result) {
    if (9.0 <= result) {
        cvss_severity_p.className = 'critical_text'
        cvss_score_p.className = 'critical_text'
    } else if (7.0 <= result && result < 9.0) {
        cvss_severity_p.className = 'high_text'
        cvss_score_p.className = 'high_text'
    } else if (4.0 <= result && result < 7.0) {
        cvss_severity_p.className = 'medium_text'
        cvss_score_p.className = 'medium_text'
    } else if (result < 4.0) {
        cvss_severity_p.className = 'low_text'
        cvss_score_p.className = 'low_text'
    }
}

// рендер cvss
function render_cvss_rating() {
    cvss_score_p.innerHTML = cvss_score.textContent
    cvss_severity_p.innerHTML = cvss_severity.textContent
    cvss_vector_p.innerHTML = cvss_vector_string.value

    setCriticalVulnPage(cvss_score_p.innerHTML)
    translateCvss(cvss_severity_p)
}



// отправка данных
async function sendData(data, url) {
    data.append('csrfmiddlewaretoken', document.querySelector("[name='csrfmiddlewaretoken']").value)
    data.append('vuln', document.querySelector('header').dataset.vulnId)
    return await fetch(url, {
      method: 'POST',
      body: data,
    }).then(response => {
    if (response.ok) {
        return response.text()
    }
    }).catch(error => {
        alert('Ошибка отправки' + error)
    });
}



// =============== Карточка уязвимости ===============
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

// false positive
FalsePositive_btn.onclick = function (){
    Confirm.open({
        title: 'Подтверждение действия',
        message: 'Перевести уязвимость в статус false positive?',
        onok: () => {
            vuln_note = document.querySelector("[name='vuln-note']").value
            if (vuln_note.length > 1 ) {
                console.log(vuln_note.value)
                console.log('можно переводить в ФП')
                const data = new FormData()
                data.append('release', document.querySelector('header').dataset.releaseId)
                data.append('note', vuln_note)
                sendData(data, '/api/vuln/false')
                // todo success
            } else {
                alert('Нужно указать причину FP в примечания!')
            }
        }
    })
}

// редактирование критичности уязвимости
async function editSeverity() {
    flagEdit = true;
}

// удаление уязвимости
async function deleteVuln() {
    Confirm.open({
        title: 'Подтверждение действия',
        message: 'Вы точно хотите удалить уязвимость?',
        onok: () => {
            const data = new FormData()
            data.append('release', document.querySelector('header').dataset.releaseId)
            sendData(data, '/api/vuln/delete')
            // todo success
        }
    })
}

// Сложная редакция уязвимости (за исключением поля классификации и детализации)
async function editVuln(nameElement, valueElement) {
    const data = new FormData()
    if (nameElement === 'class-link') {
        let arrTags = new Array()
        document.querySelectorAll(".tag_container .tag").forEach(function (currentValue, currentIndex, listObj) {
            currentValue = currentValue.querySelector('span').textContent.trim()
            arrTags.push(currentValue)
        })
        let arrTagsLinks = valueElement.split('\n')
        arrTagsLinks.forEach(function (currentValue, currentIndex, listObj) {
            if (currentValue === ''){
                throw 'Значение не должно быть пустым!'
            }
        })
        if (arrTags.length !== arrTagsLinks.length) {
            throw 'Длины не равны!'
        }
        data.append('class', arrTags)
    }
    data.append(nameElement, valueElement)
    sendData(data, '/api/vuln/edit')
}

// отображение названия файла в кнопке
function changeBtnName(file_name) {
    input_span.innerHTML = file_name
}

// =============== отправка формы свидетельства ===============

async function handleFormSubmit() {
  const data = serializeForm(document.getElementById('form-edit-vuln'))
  console.log(data)

  const response = await sendData(data, '/api/vuln/edit')
}

// сбор данных с формы
function serializeForm(formNode) {

  const { elements } = formNode

  const data = new FormData()
  const fileUploadBlocks = document.querySelectorAll('.image_block');

  Array.from(elements)
    .filter((item) => !!item.name)
    .forEach((element) => {
      const { name } = element
      if (name === 'vuln-classification') {
        element.value = tags
      }
      const value = element.value
      data.append(name, value)
    })

  fileUploadBlocks.forEach(block => {
    const fileInput = block.querySelector('input[type="file"]');
    const fileDesc = block.querySelector('textarea');

    data.append(fileInput.name, fileInput.files[0]);
    data.append(fileDesc.name, fileDesc.value);
  });
  input.value = ''
  return data
}

// Эскалирование уязвимости
function escalateVuln(vuln) {
    if (vuln.value === 'Уязвимость эскалирована!') {
        vuln.classList.toggle('escalate')
        vuln.value = 'Эскалировать уязвимость'
        // send
    } else if (vuln.value === 'Эскалировать уязвимость') {
        vuln.classList.toggle('escalate')
        vuln.value = 'Уязвимость эскалирована!'
        // send
    }
}