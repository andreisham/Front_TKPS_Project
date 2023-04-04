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
}

