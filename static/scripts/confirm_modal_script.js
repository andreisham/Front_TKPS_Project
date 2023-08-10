// функция подтверждения действия
// function confir11m_action(message) {
//     const block = createBlock();
//     document.body.append(block)
//
//
//     return confirm(message)
// }
//
// function handleModalSubmit(status) {
//     return status
// }
//
// function createBlock() {
//     const div = document.createElement('div')
//     div.setAttribute('draggable','true')
//     if (selectedValue === 'description_block_option') { // блок с описанием
//         div.setAttribute('class','description_block detail_block')
//         div.innerHTML = `<div id="confirm_modal">
//                             <div id="confirm_modal_content">
//                                 <form action="#" class="form_body">
//                                     <h3>message!!!!</h3>
//                                     <input type="button" class="btn" value="Да" data-status="true" onclick="handleModalSubmit(this.dataset.status)">
//                                     <input type="button" class="btn" value="Нет" data-status="false" onclick="handleModalSubmit(this.dataset.status)>
//                                 </form>
//                             </div>
//                         </div>`
//         modalDetail.style.display = "none"
//         i++
//     }
//     return div
// }
confirm_action = undefined

const Confirm = {
    open (options) {
        options = Object.assign({}, {
            title: '',
            message: '',
            okText: 'OK',
            cancelText: 'Отмена',
            onok: function () {},
            oncancel: function () {}
        }, options);

        const html = `
            <div class="confirm">
                <div class="confirm__window">
                    <div class="confirm__titlebar">
                        <span class="confirm__title">${options.title}</span>
                        <button class="confirm__close">&times;</button>
                    </div>
                    <div class="confirm__content">${options.message}</div>
                    <div class="confirm__buttons">
                        <button class="confirm__button confirm__button--ok confirm__button--fill">${options.okText}</button>
                        <button class="confirm__button confirm__button--cancel">${options.cancelText}</button>
                    </div>
                </div>
            </div>
        `;

        const template = document.createElement('template');
        template.innerHTML = html;

        // Elements
        const confirmEl = template.content.querySelector('.confirm');
        const btnClose = template.content.querySelector('.confirm__close');
        const btnOk = template.content.querySelector('.confirm__button--ok');
        const btnCancel = template.content.querySelector('.confirm__button--cancel');

        confirmEl.addEventListener('click', e => {
            if (e.target === confirmEl) {
                options.oncancel();
                this._close(confirmEl);
            }
        });

        btnOk.addEventListener('click', () => {
            options.onok();
            this._close(confirmEl);
        });

        [btnCancel, btnClose].forEach(el => {
            el.addEventListener('click', () => {
                options.oncancel();
                this._close(confirmEl);
            });
        });

        document.body.appendChild(template.content);
    },

    _close (confirmEl) {
        confirmEl.classList.add('confirm--close');

        confirmEl.addEventListener('animationend', () => {
            document.body.removeChild(confirmEl);
        });
    },
    status: undefined
};
