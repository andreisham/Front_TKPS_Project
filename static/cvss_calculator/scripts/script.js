let select_k = kForm.k
let select_l = lForm.l
let select_p = pForm.p

let res_infr = document.querySelector('#res_Iinfr')

let infr_sum = 0

let result = 0
let score = document.querySelector('#score')
let level = document.querySelector('#level')

// поле для вставки кнопок цвсс по строке
let fstec_cvss_score = document.querySelector('#cvss_score')
let cvss_score = document.querySelector('#environmentalMetricScore')
console.log(cvss_score)
cvss_score.addEventListener('DOMSubtreeModified', () => {
    fstec_cvss_score.value = cvss_score.innerText
})
fstec_cvss_score.addEventListener('change', calcAll)


// обработка выбора опции
function changeOption(select, id){
    let selection = document.getElementById(id);
    let selectedOption = select.options[select.selectedIndex];
    selection.innerText = selectedOption.value;
    get_I_infr()
}

// сумирование по инфраструктуре
function get_I_infr() {
    let select_res = document.querySelectorAll('.res')
    console.log(select_res[0].textContent)
    select_res.forEach(element => {
        element = parseFloat(element.textContent)
        infr_sum += element
    })
    res_infr.innerText = infr_sum.toFixed(2)
    infr_sum = 0
    calcAll()
}

function calcAll() {
    result = parseFloat(fstec_cvss_score.value).toFixed(2) * parseFloat(res_infr.innerText).toFixed(2)
    score.innerText = result.toFixed(2)
    console.log(result)
    setCritical(result)
}


// определение критичности
function setCritical(result) {
    if (7.5 <= result && result <= 10) {
        level.innerText = 'Критический'
        level.className = 'critical'
    } else if (4.5 <= result && result < 7.5) {
        level.innerText = 'Высокий'
        level.className = 'high'
    } else if (1.5 <= result && result < 4.5) {
        level.innerText = 'Средний'
        level.className = 'medium'
    } else if (result < 1.5) {
        level.innerText = 'Низкий'
        level.className = 'low'
    } else if (result > 10) {
        score.innerText = 10
        level.innerText = 'Критический'
        level.className = 'critical'
    } else {
        score.innerText = ''
    }
}