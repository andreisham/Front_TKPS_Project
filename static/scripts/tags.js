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

        tags.push(input.value.toUpperCase().slice(0,-1))
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
            link_ending = tag.toLowerCase()
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