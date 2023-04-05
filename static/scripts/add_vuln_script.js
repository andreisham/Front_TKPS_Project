// ресайз textarea в зависимости от контента
function textAreaAdjust(element) {
  element.style.height = "1px";
  element.style.height = (10+element.scrollHeight)+"px";
}

// =============== Работа с cvss ===============
// перенос значения cvss на страницу
let page_score_rating = document.querySelector('#score_rating')
let page_cvss_score = document.querySelector('#cvss_score')
let page_cvss_severity = document.querySelector('#cvss_severity')
let cvss_score = document.querySelector('#environmentalMetricScore')
let cvss_severity = document.querySelector('#environmentalSeverity')
let cvss_vector_string = document.querySelector('#vectorString')
let page_vector_string = document.querySelector('#page_vector_string')

function render_cvss_rating(){
  page_cvss_score.value = cvss_score.textContent
  page_cvss_severity.textContent = cvss_severity.textContent
  page_vector_string.value = cvss_vector_string.value
  page_vector_string.onchange = function() {
    window.location.href =  str.replace(/.html#/gi, page_vector_string.value);
  }
  setCritical(page_cvss_score.value)
}

// определение критичности (подкрашивание)
function setCritical(result) {
  if (9.0 <= result) {
      page_score_rating.className = 'critical'
  } else if (7.0 <= result && result < 9.0) {
      page_score_rating.className = 'high'
  } else if (4.0 <= result && result < 7.0) {
      page_score_rating.className = 'medium'
  } else if (result < 4.0) {
      page_score_rating.className = 'low'
  } 
}

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
  const fileUploadBlocks = document.querySelectorAll('.image_block');

  Array.from(elements)
    .filter((item) => !!item.name)
    .forEach((element) => {
      const { name } = element
      if (name == 'vuln-classification') {
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

// отправка данных
async function sendData(data) {
  return await fetch('/api/apply/', {
    method: 'POST',
    body: data,
  }).then(response => {
    if (response.ok) {
      applicantForm.reset()
      applicantForm.classList.remove('_sending')
      location.href = "http://127.0.0.1:5500/release?id=1"
    }
  }).catch(error => {
    alert('Ошибка отправки' + error)
    applicantForm.classList.remove('_sending')
  });
}

const applicantForm = document.getElementById('vuln_add_form')
applicantForm.addEventListener('submit', handleFormSubmit)
