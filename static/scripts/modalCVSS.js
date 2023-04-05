// =============== Модальное окно CVSS ===============
// Получаем ссылки на элементы
let modal = document.getElementById('cvss-modal');
let btnOpenModal = document.getElementById("cvss-button");

// Добавляем обработчик события для открытия модального окна
btnOpenModal.onclick = function() {
    modal.style.display = "flex";
}