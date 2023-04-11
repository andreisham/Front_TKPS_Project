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

// добавление блоков на страницу
function addBlock(selectedBlock) {
    const block = createBlock(selectedBlock.value);
    vulnDetails.append(block)
}