if (window.location.toString().indexOf('search-room-page.html') > 0) { // Запускать скрипт только на нужной странице
    let additionalsCheckbox = document.querySelector('.additionals-checkbox-js')
    let additionalsCheckboxBtn = additionalsCheckbox.querySelector('.additionals-checkbox__btn')

    additionalsCheckboxBtn.onclick = function() {
    additionalsCheckbox.classList.toggle('additionals-checkbox__open-js')
    }
}