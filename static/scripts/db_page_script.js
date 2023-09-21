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

function info(vuln) {
    window.location.href = `/vuln/info?id=${vuln.id}`
}

