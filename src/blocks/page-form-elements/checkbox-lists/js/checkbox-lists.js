let additionalsCheckbox = document.querySelector('.additionals-checkbox-js')
let additionalsCheckboxBtn = additionalsCheckbox.querySelector('.additionals-checkbox__btn')

additionalsCheckboxBtn.onclick = function() {
    additionalsCheckbox.classList.toggle('additionals-checkbox__open-js')
}