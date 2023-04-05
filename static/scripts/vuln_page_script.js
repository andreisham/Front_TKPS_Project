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

// наполнение содержимым свидетельств
// открытие увеличенного изображения в новой вкладке
let preview_images = document.querySelectorAll('.preview_img')
preview_images.forEach(function (preview_img) {
    // preview_img.parentElement.onclick = function() {
    //     var win = window.open();
    //     win.document.write('<img src="C:\\Users\\User\\Documents\\Front_VulnTrack\\static\\img\\loading.gif" style="width:100%; height:100%;">');
    // };
})
