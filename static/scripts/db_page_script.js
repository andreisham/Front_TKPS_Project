const applicantForm = document.getElementById('vuln_db_filter_form')

if (applicantForm) {
    applicantForm.addEventListener('submit', handleFormSubmit)
}

// =============== отправка формы ===============
async function handleFormSubmit(event) {
    event.preventDefault()

    const data = serializeForm(event.target)
    console.log(data)
    applicantForm.classList.add('_sending')

    const response = await sendData(data, '/api/db')
    // location.reload()
    // добавление полей и значений фильтрации в кнопку "Показать еще"
    setDataAtr(data.vuln_db_filter_key, data.vuln_db_filter_value)
}

// сбор данных с формы
function serializeForm(formNode) {

    const { elements } = formNode

    const data = new FormData()

    Array.from(elements)
        .filter((item) => !!item.name)
        .forEach((element) => {
            // обработка чекбоксов true\false
            if (element.type === 'checkbox') {
                const { name } = element
                const value = element.checked
                data.append(name, value)
            } else {
                const { name } = element
                const value = element.value
                data.append(name, value)
            }
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

function info(vuln) {
    window.location.href = `/vuln/info?id=${vuln.id}`
}



let addButton = document.querySelector('#add_row_btn')

function setDataAtr(field, value) {
    addButton.dataset.field = field
    addButton.dataset.value = value
}

async function getMore(base, field, value) {
    let offset = +base + 10
    addButton.dataset.offset = offset
    let data = {
        'offset': offset,
        'field': field,
        'value': value
    }
    console.log(data)
    addButton.classList.add('_sending')

    const response = await sendData(data, '/api/db/more')

    addNewRow(response.body)
}

// =============== Добавление новой строки ===============
function addNewRow(data) {
    let table = document.getElementById('db_table')

    data.forEach((Vuln) => function () {
        let cvss_row = document.createElement('td')
        cvss_row.innerHTML = Vuln.cvss
        cvss_row.className = 'table_item table_item_cvss'

        let cvss_row_class = ''
        let cvss_row_text = ''

        setCritical(Vuln.cvss)

        createBlock(Vuln)
    })

    // let Vuln = {
    //     'id': '1',
    //     'project': 'vtbo',
    //     'name': 'xss',
    //     'description': 'wow',
    //     'cvss': '1.0',
    //     'channel': 'ib',
    //     'discovery_date': '10-02-1111',
    //     'fix_date': '11-02-1111',
    //     'status': 'active'
    // }


}

// определение критичности (подкрашивание)
function setCritical(result) {
    if (9.0 <= result) {
        cvss_row_class = 'critical'
        cvss_row_text = `${Vuln.cvss}<br>Критический`
    } else if (7.0 <= result && result < 9.0) {
        cvss_row_class = 'high'
        cvss_row_text = `${Vuln.cvss}<br>Высокий`
    } else if (4.0 <= result && result < 7.0) {
        cvss_row_class = 'medium'
        cvss_row_text = `${Vuln.cvss}<br>Средний`
    } else if (result < 4.0) {
       cvss_row_class = 'low'
       cvss_row_text = `${Vuln.cvss}<br>Низкий`
    }
}


// создание и добавление строки в таблицу
function createBlock(Vuln) {
    let index = table.rows.length
    let row = table.insertRow(index)
    row.setAttribute('class','table_row')
    row.innerHTML = `
        <td class="table_item table_item_link" onclick="info(this)">${Vuln.id}</td>
        <td class="table_item">${Vuln.project}</td>
        <td class="table_item">${Vuln.name}</td>
        <td class="table_item">${Vuln.description}</td>
        <td class="table_item table_item_cvss ${cvss_row_class}">${cvss_row_text}</td>
        <td class="table_item">${Vuln.channel}</td>
        <td class="table_item">${Vuln.discovery_date}</td>
        <td class="table_item">${Vuln.fix_date}</td>
        <td class="table_item">${Vuln.status}</td>
    `
    addButton.classList.remove('_sending')
    //
    // table.insertBefore(div, btnOpenModal)
    // const data = new FormData()
    // data.append('csrfmiddlewaretoken', csrf_token)
    // data.append('project_name', project_name)
    // data.append('project_prefix', project_prefix)
    // console.log(data)
    // sendProjectInfo(data)
}

// отображение warning'a
let warning = document.querySelector('.warning_db')

// переменная для определения того нужно ли выводить ворнинг или нет.
// Должна прилетать с бека при загрузке страницы в гет параметре или в куки
warning.style.display = 'none'

// Если через гет параметр /?isStatusChanged=true, то показываем, если что либо иное или нет параметра то нет
// urlParams = new URLSearchParams(window.location.search)
// params = {}
//
// urlParams.forEach((param, key) => {
//     params[key] = param;
// });
//
// if (params.isStatusChanged === 'true') {
//     warning.style.display = 'block'
// } else {
//     warning.style.display = 'none'
// }

// Если через куки isStatusChanged=true, то показываем, если что либо иное или нет параметра то нет
let isStatusChanged = getCookie('isStatusChanged')
// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
if (isStatusChanged === 'true') {
    warning.style.display = 'block'
} else {
    warning.style.display = 'none'
}