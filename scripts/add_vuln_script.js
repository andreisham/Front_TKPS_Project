// ресайз textarea в зависимости от контента
function textAreaAdjust(element) {
  element.style.height = "1px";
  element.style.height = (10+element.scrollHeight)+"px";
}

// =============== Модальное окно CVSS ===============
// Получаем ссылки на элементы
let modal = document.getElementById('cvss-modal');
let btnOpenModal = document.getElementById("cvss-button");

// Добавляем обработчик события для открытия модального окна
btnOpenModal.onclick = function() {
  modal.style.display = "flex";
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
  page_vector_string.onchange = function() {
    window.location.href =  str.replace(/.html#/gi, page_vector_string.value);
  }
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
    console.log(tags)
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
// добавление файлов
function uploadFile(file,file_input,label,labelVal) {
  if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
    alert('Разрешены только изображения!')
    file_input.value = '';
    return
  }

  if (file.name)
    label.querySelector('.input__file-button-text').innerText = file.name;
  else
    label.querySelector('.input__file-button-text').innerText = labelVal;
  previewImage(file_input)
}

// превью картинок
function previewImage(element) {
  let file    = element.files;
  let preview_img = element.nextElementSibling.nextElementSibling.firstChild; 

  console.log(preview_img)

  if (file.length > 0) {
    let reader  = new FileReader();
    let event_link;
    reader.onload = function(event) {
      preview_img.setAttribute("src",event.target.result)
      preview_img.parentElement.style.display = "block";
      event_link = event.target.result
    }
    // открытие увеличенного изображения в новой вкладке
    preview_img.parentElement.onclick = function() {
      var win = window.open();
      win.document.write('<iframe src="' + event_link  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
    };

    reader.readAsDataURL(file[0])
  }
}
    
// перетаскивание блоков
const vulnDetails = document.querySelector(`.vulns-detail`);

vulnDetails.addEventListener(`dragstart`, (evt) => {
  evt.target.classList.add(`selected`);
});

vulnDetails.addEventListener(`dragend`, (evt) => {
  evt.target.classList.remove(`selected`);
});

vulnDetails.addEventListener(`dragover`, (evt) => {
  evt.preventDefault();

  const activeElement = vulnDetails.querySelector(`.selected`);
  const currentElement = evt.target;
  const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains(`detail_block`);
  
  if (!isMoveable) {
    return;
  }

  const nextElement = (currentElement === activeElement.nextElementSibling) ?
		currentElement.nextElementSibling :
		currentElement;

  vulnDetails.insertBefore(activeElement, nextElement);
});

// удаление блоков
let delBtns = document.querySelectorAll('.del_icon')

// добавление блоков
let addBtns = document.querySelectorAll('.add_btn')
let modalDetail = document.getElementById('detail-modal');

// открытие модального окна выбора блока
function openModalAddBlock() {
  modalDetail.style.display = "flex";
}

// Добавляем обработчик события для закрытия модального окна при щелчке вне модального окна
window.onclick = function(event) {
  if (event.target == modalDetail ) {
    modalDetail.style.display = "none";
  } else if (event.target == modal) {
    modal.style.display = "none";
    render_cvss_rating()
  }
}

// создание блока
let i = 0; // инкрементное значение для id файловых импутов
function createBlock(selectedValue) {
  const div = document.createElement('div')
  div.setAttribute('draggable','true')
  if (selectedValue == 'description_block_option') { // блок с описанием
    div.setAttribute('class','description_block detail_block')
    div.innerHTML = `<div class="move_icon"></div>
        <textarea data-i="descr-${i}" name="description-${i}" id="" cols="30" rows="2" onkeyup="textAreaAdjust(this)"></textarea> 
        <input type="button" class="btn" required value="Добавить блок" onclick="openModalAddBlock()">
        <div class="del_icon" onclick="this.parentElement.remove()"></div>`
    modalDetail.style.display = "none"
    i++
  } else if (selectedValue == 'image_block_option') { // блок с изображением
    div.setAttribute('class','image_block detail_block')
    div.innerHTML = `<div class="move_icon"></div>
      <div class="input__wrapper">
          <input name="file-${i}" type="file" data-i="file_input-${i}" required accept=".jpg, .png, .gif" id="input__file-${i}" class="input input__file">
          <label for="input__file-${i}" class="input__file-button btn">
              <span class="input__file-icon-wrapper"><img class="input__file-icon" src="./img/iconfinder_download_down_save_8666778.svg" alt="Выбрать файл" width="25"></span>
              <span class="input__file-button-text">Выберите файл</span>
          </label>
          <div class="preview_img_div"><img src="#" class="preview_img"></div>
          </div>
      <textarea name="image_descr-${i}" data-i="image_descr-${i}" id="" cols="30" rows="2" required onkeyup="textAreaAdjust(this)"></textarea>
      <input type="button" class="btn" value="Добавить блок" onclick="openModalAddBlock()">
      <div class="del_icon" onclick="this.parentElement.remove()"></div>`
    modalDetail.style.display = "none"
    i++
    div.querySelector('input[type="file"]').addEventListener('change', function (e) {
      console.log(e)
      let label = e.target.nextElementSibling
      let labelVal = label.querySelector('.input__file-button-text').innerText;
      uploadFile(e.target.files[0], e.target, label, labelVal) 
    })
  }
  return div
}

// добавление тегов на страницу
function addBlock(selectedBlock) {
    const block = createBlock(selectedBlock.value);
    vulnDetails.append(block)
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
      form.reset()
      form.classList.remove('_sending')
    }
  }).catch(error => {
    alert('Ошибка отправки' + error)
    form.classList.remove('_sending')
  });
}

const applicantForm = document.getElementById('vuln_add_form')
applicantForm.addEventListener('submit', handleFormSubmit)
