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
    setCriticalVulnPage(cvss_score_p.innerHTML)
    render_cvss_rating()
    setCvssVector()
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

}function translateCvss(cvss_severity) {
    if (cvss_severity.textContent === '(None)') {
        cvss_severity.textContent = 'None'
    } else if (cvss_severity.textContent === '(Low)') {
        cvss_severity.textContent = 'Низкий'
    } else if (cvss_severity.textContent === '(Medium)') {
        cvss_severity.textContent = 'Средний'
    } else if (cvss_severity.textContent === '(High)') {
        cvss_severity.textContent = 'Высокий'
    } else if (cvss_severity.textContent === '(Critical)') {
        cvss_severity.textContent = 'Критический'
    }
}
// todo руссификация cvss
cvss_severity.DOMSubtreeModified = function () {
    translateCvss(cvss_severity)
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
}