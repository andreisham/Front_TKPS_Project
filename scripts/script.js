// ресайз textarea в зависимости от контента
function textAreaAdjust(element) {
  element.style.height = "1px";
  element.style.height = (10+element.scrollHeight)+"px";
}

// =============== Модальное окно CVSS ===============
// Получаем ссылки на элементы
let modal = document.getElementById('modal');
let btnOpenModal = document.getElementById("cvss-button");

// Добавляем обработчик события для открытия модального окна
btnOpenModal.onclick = function() {
  modal.style.display = "flex";
}

// Добавляем обработчик события для закрытия модального окна при щелчке вне модального окна
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    render_cvss_rating()
  }
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
  page_cvss_score.textContent = cvss_score.textContent
  page_cvss_severity.textContent = cvss_severity.textContent
  page_vector_string.value = cvss_vector_string.value
  setCritical(page_cvss_score.textContent)
}

// определение критичности (подкрашивание)
function setCritical(result) {
  if (9.0 <= result) {
      page_score_rating.className = 'critical'
  } else if (7.0 <= result && result < 9.0) {
      page_score_rating.className = 'high'
  } else if (4.0 <= result && result < 7.0) {
      page_score_rating.className = 'middle'
  } else if (result < 4.0) {
      page_score_rating.className = 'low'
  } 
}

// =============== работа с тэгами в классификации ===============
const tagContainer = document.querySelector('.tag_container')
const input = document.querySelector('.tag_container input')

// массив тэгов
let tags = []

// создание тэга
function createTag(label) {
  const div = document.createElement('div')
  div.setAttribute('class','tag')
  const span = document.createElement('span')
  span.innerHTML = label
  const closeBtn = document.createElement('closeBtn')
  closeBtn.setAttribute('class','close-icon')
  closeBtn.setAttribute('data-item', label)

  div.appendChild(span)
  div.appendChild(closeBtn)

  return div
}

// добавление тегов на страницу
function addTags() {
  reset()
  tags.slice().reverse().forEach(function(tag) {
    const input = createTag(tag);
    tagContainer.prepend(input)
  })
} 

// восстановление массива (чтоб избежать дублирования)
function reset() {
  document.querySelectorAll('.tag').forEach(function(tag) {
    tag.parentElement.removeChild(tag)
  })
}

// создание тэгов после нажатия на пробел
input.addEventListener('keyup', function(e) {
  if (e.key === ' ') { 
    tags.push(input.value.toUpperCase())
    addTags()
    input.value = ''
    createLink()
  }
})

// удаление тэгов и ссылок нажатием на крестик !TODO удаление через backspase!
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'CLOSEBTN') {
    const value = e.target.getAttribute('data-item')
    const index = tags.indexOf(value)
    if (index !== -1) { // если элемент найден
      links = linkArea.value.split("\n")
      links.splice(index, 1); // удаляем соответствующий элемент из массива links
      tags.splice(index, 1); // удаляем элемент из массива tags
    }
    addTags();
    addLink()
  }
})

// создание ссылок на основе тэгов
let link_ending;
let links = []
const linkArea = document.querySelector('#source_links')

function createLink() {
  tags.forEach(function(tag) {
    if (tag.slice(0, 4) == 'CWE-') {
      link_ending = tag.slice(4, -1)
      link_ending += '.html'
      links.push('https://cwe.com/' + link_ending)
    } else if (tag.slice(0, 4) == 'MSTG') {
      links.push('https://owasp.org/www-project-mobile-security-testing-guide')
    }
    
  })
  addLink()
  
}

// добавление ссылок на страницу
function addLink() {
  linkArea.value = links.join("\n")
  links = []
  textAreaAdjust(source_links)
}


// =============== работа с свидетельствами ===============