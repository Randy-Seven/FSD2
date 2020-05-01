// Делаю дропдауны кликабельными

let facilitiesDropdownMenu = document.querySelectorAll('.facilities-dropdown__menu-js')
let facilitiesDropdownBtn = document.querySelectorAll('.facilities-dropdown__btn')

for (let i = 0; i < facilitiesDropdownMenu.length; i++) {
    facilitiesDropdownBtn[i].onclick = function() {
        facilitiesDropdownMenu[i].classList.toggle('facilities-dropdown__open-js');
    };
}

// Инициализирую дропдауны

// Дропдаун - "Удобства номера"

let facilitiesDropdownNum = document.querySelectorAll('.facilities-dropdown__num-js')
let facilitiesDropdownPlus = document.querySelectorAll('.facilities-dropdown__plus-js')
let facilitiesDropdownMinus = document.querySelectorAll('.facilities-dropdown__minus-js')
let facilitiesDropdownInput = document.querySelector('.facilities-dropdown__input-js')
let facilitiesDropdownBedrooms = 2;
let facilitiesDropdownBeds = 2;
let facilitiesDropdownBathrooms = 0;
let bedroomWordForm = "спальни";
let bedWordForm = "кровати";
let bathroomWordForm = "ванных комнат";

// Функция склонения слов

let wordForm = function(num, word) {  
	cases = [2, 0, 1, 1, 1, 2];  
	return word[ (num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num %10 : 5]];  
} 

// Функция усечения строки

function truncate(str, maxlength) {
    return (str.length > maxlength) ?
      str.slice(0, maxlength - 1) + '…' : str;
}

// Для каждого вида удобства:

for(let i = 0; i < facilitiesDropdownNum.length; i++) {
    let n = facilitiesDropdownNum[i].innerHTML;

// При клике на плюс

    facilitiesDropdownPlus[i].onclick = function() {
        n++;
// Делаю кнопку "-" доступной когда удобств больше 0 
        if (n == 1) {
            facilitiesDropdownMinus[i].classList.remove("facilities-dropdown__plus-minus_disabled");
        }
// Настраиваю инициализацию инпута
        facilitiesDropdownNum[i].innerHTML = n
        if (i == 0) {
            facilitiesDropdownBedrooms++;
            bedroomWordForm = wordForm(facilitiesDropdownBedrooms, facilitiesDropdownBedroomsWords)
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBeds} ${bedWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        }
        else if (i == 1) {
            facilitiesDropdownBeds++;
            bedWordForm = wordForm(facilitiesDropdownBeds, facilitiesDropdownBedsWords)
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBeds} ${bedWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        }
        else if (i == 2) {
            facilitiesDropdownBathrooms++;
            bathroomWordForm = wordForm(facilitiesDropdownBathrooms, facilitiesDropdownBathroomsWords)
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBeds} ${bedWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        }

// Если 0 удобств, то убрать из инпута запись

        if (facilitiesDropdownBedrooms == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBeds} ${bedWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        } 
        if (facilitiesDropdownBeds == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        }  
        if (facilitiesDropdownBathrooms == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBeds} ${bedWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        } 
        if (facilitiesDropdownBedrooms == 0 && facilitiesDropdownBeds == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBathrooms} ${bathroomWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        }
        if (facilitiesDropdownBeds == 0 && facilitiesDropdownBathrooms == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        }
        if (facilitiesDropdownBedrooms == 0 && facilitiesDropdownBathrooms == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBeds} ${bedWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        }
        if (facilitiesDropdownBedrooms == 0 && facilitiesDropdownBathrooms == 0 && facilitiesDropdownBeds == 0) {
            facilitiesDropdownInput.innerHTML = `Выберите удобства <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        }

        facilitiesDropdownInput.innerHTML = truncate(facilitiesDropdownInput.innerHTML, 26) + `<div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`;
    }

// При клике на минус

    facilitiesDropdownMinus[i].onclick = function() {
// Делаю кнопку "-" неактивной при нуле
        if (n == 0) return; 
        n--;
        if (n == 0) {
            facilitiesDropdownMinus[i].classList.add("facilities-dropdown__plus-minus_disabled");
        }
        facilitiesDropdownNum[i].innerHTML = n
// Настраиваю инициализацию инпута
        if (i == 0) {
            facilitiesDropdownBedrooms--;
            bedroomWordForm = wordForm(facilitiesDropdownBedrooms, facilitiesDropdownBedroomsWords)
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBeds} ${bedWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        } else if (i == 1) {
            facilitiesDropdownBeds--;
            bedWordForm = wordForm(facilitiesDropdownBeds, facilitiesDropdownBedsWords)
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBeds} ${bedWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        } else if (i == 2) {
            facilitiesDropdownBathrooms--;
            bathroomWordForm = wordForm(facilitiesDropdownBathrooms, facilitiesDropdownBathroomsWords)
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBeds} ${bedWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        }

// Если 0 удобств, то убрать из инпута запись        

        if (facilitiesDropdownBedrooms == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBeds} ${bedWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        } 
        if (facilitiesDropdownBeds == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        } 
        if (facilitiesDropdownBathrooms == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBeds} ${bedWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        }
        if (facilitiesDropdownBedrooms == 0 && facilitiesDropdownBeds == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBathrooms} ${bathroomWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        }
        if (facilitiesDropdownBeds == 0 && facilitiesDropdownBathrooms == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        }
        if (facilitiesDropdownBedrooms == 0 && facilitiesDropdownBathrooms == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBeds} ${bedWordForm} <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        }
        if (facilitiesDropdownBedrooms == 0 && facilitiesDropdownBathrooms == 0 && facilitiesDropdownBeds == 0) {
            facilitiesDropdownInput.innerHTML = `Выберите удобства <div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`
        }

        facilitiesDropdownInput.innerHTML = truncate(facilitiesDropdownInput.innerHTML, 26) + `<div class = 'arrow'><img src="/assets/img/down-arrow.svg" width="12", alt=""/></div>`;
    }
}

let facilitiesDropdownBedroomsWords = ['спальня', 'спальни', 'спален']
let facilitiesDropdownBedsWords = ['кровать','кровати','кроватей']
let facilitiesDropdownBathroomsWords = ['ванная комната','ванные комнаты','ванных комнат']

let count = 31;
let result = count + wordForm(count, [' комментарий', ' комментария', ' комментариев']); 