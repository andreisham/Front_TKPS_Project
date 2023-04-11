// =============== Модальное окно CVSS ===============
// Получаем ссылки на элементы
let modal = document.getElementById('cvss-modal');
let btnOpenModalCVSS = document.querySelector(".cvss-button");
//let btnOpenModalEditCVSS = document.querySelector(".editCVSS_btn");

// Добавляем обработчик события для открытия модального окна
btnOpenModalCVSS.onclick = function() {
    modal.style.display = "flex";
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
