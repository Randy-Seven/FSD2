// Делаю дропдауны кликабельными

let facilitiesDropdownMenu = document.querySelectorAll('.facilities-dropdown__menu-js')
let facilitiesDropdownBtn = document.querySelectorAll('.facilities-dropdown__btn')

for (let i = 0; i < facilitiesDropdownMenu.length; i++) {
    facilitiesDropdownBtn[i].onclick = function() {
        facilitiesDropdownMenu[i].classList.toggle('facilities-dropdown__open-js');
    };
}

// Инициализирую дропдауны

/* Дропдаун - "Удобства номера"
============================================= */

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

let facilitiesDropdownBedroomsWords = ['спальня', 'спальни', 'спален']
let facilitiesDropdownBedsWords = ['кровать','кровати','кроватей']
let facilitiesDropdownBathroomsWords = ['ванная комната','ванные комнаты','ванных комнат']

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
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBeds} ${bedWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm}`
        }
        else if (i == 1) {
            facilitiesDropdownBeds++;
            bedWordForm = wordForm(facilitiesDropdownBeds, facilitiesDropdownBedsWords)
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBeds} ${bedWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm}`
        }
        else if (i == 2) {
            facilitiesDropdownBathrooms++;
            bathroomWordForm = wordForm(facilitiesDropdownBathrooms, facilitiesDropdownBathroomsWords)
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBeds} ${bedWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm}`
        }

// Если 0 удобств, то убрать из инпута запись

        if (facilitiesDropdownBedrooms == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBeds} ${bedWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm}`
        } 
        if (facilitiesDropdownBeds == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm}`
        }  
        if (facilitiesDropdownBathrooms == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBeds} ${bedWordForm}`
        } 
        if (facilitiesDropdownBedrooms == 0 && facilitiesDropdownBeds == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBathrooms} ${bathroomWordForm}`
        }
        if (facilitiesDropdownBeds == 0 && facilitiesDropdownBathrooms == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}`
        }
        if (facilitiesDropdownBedrooms == 0 && facilitiesDropdownBathrooms == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBeds} ${bedWordForm}`
        }
        if (facilitiesDropdownBedrooms == 0 && facilitiesDropdownBathrooms == 0 && facilitiesDropdownBeds == 0) {
            facilitiesDropdownInput.innerHTML = `Выберите удобства`
        }

        facilitiesDropdownInput.innerHTML = truncate(facilitiesDropdownInput.innerHTML, 26);
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
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBeds} ${bedWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm}`
        } else if (i == 1) {
            facilitiesDropdownBeds--;
            bedWordForm = wordForm(facilitiesDropdownBeds, facilitiesDropdownBedsWords)
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBeds} ${bedWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm}`
        } else if (i == 2) {
            facilitiesDropdownBathrooms--;
            bathroomWordForm = wordForm(facilitiesDropdownBathrooms, facilitiesDropdownBathroomsWords)
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBeds} ${bedWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm}`
        }

// Если 0 удобств, то убрать из инпута запись        

        if (facilitiesDropdownBedrooms == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBeds} ${bedWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm}`
        } 
        if (facilitiesDropdownBeds == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBathrooms} ${bathroomWordForm}`
        } 
        if (facilitiesDropdownBathrooms == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}, ${facilitiesDropdownBeds} ${bedWordForm}`
        }
        if (facilitiesDropdownBedrooms == 0 && facilitiesDropdownBeds == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBathrooms} ${bathroomWordForm}`
        }
        if (facilitiesDropdownBeds == 0 && facilitiesDropdownBathrooms == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBedrooms} ${bedroomWordForm}`
        }
        if (facilitiesDropdownBedrooms == 0 && facilitiesDropdownBathrooms == 0) {
            facilitiesDropdownInput.innerHTML = `${facilitiesDropdownBeds} ${bedWordForm}`
        }
        if (facilitiesDropdownBedrooms == 0 && facilitiesDropdownBathrooms == 0 && facilitiesDropdownBeds == 0) {
            facilitiesDropdownInput.innerHTML = `Выберите удобства`
        }

        facilitiesDropdownInput.innerHTML = truncate(facilitiesDropdownInput.innerHTML, 26);
    }
}


/* Дропдаун - "Гости"
================================================= */

let guestsDropdownNum = document.querySelectorAll('.guests-dropdown__num-js')
let guestsDropdownPlus = document.querySelectorAll('.guests-dropdown__plus-js')
let guestsDropdownMinus = document.querySelectorAll('.guests-dropdown__minus-js')
let guestsDropdownInput = document.querySelector('.guests-dropdown__input-js')
let guestsDropdownAdults = 0;
let guestsDropdownChildren = 0;
let guestsDropdownBabies = 0;
let adultWordForm = "взрослые";
let childWordForm = "дети";
let babyWordForm = "младенцы";
let guestsDropdownClearButton = document.querySelector('.guests-dropdown__cancel-js') 

// Склонения слов

let guestsDropdownAdultsWords = ['взрослый', 'взрослых', 'взрослых']
let guestsDropdownChildrenWords = ['ребенок','ребенка','детей']
let guestsDropdownBabiesWords = ['младенец','младенца','младенцев']

// Для каждого вида удобства:

for(let i = 0; i < guestsDropdownNum.length; i++) {

// При клике на плюс

    guestsDropdownPlus[i].onclick = function() {

// При очистке сбросить все переменные

        if (guestsDropdownNum[0].innerHTML == 0) {
            guestsDropdownAdults = 0;
        }

        if (guestsDropdownNum[1].innerHTML == 0) {
            guestsDropdownChildren = 0;
        }

        if (guestsDropdownNum[2].innerHTML == 0) {
            guestsDropdownBabies = 0;
        }

// Настраиваю инициализацию инпута

        if (i == 0) {
            guestsDropdownAdults++;
            adultWordForm = wordForm(guestsDropdownAdults, guestsDropdownAdultsWords)
            guestsDropdownInput.innerHTML = `${guestsDropdownAdults} ${adultWordForm}, ${guestsDropdownChildren} ${childWordForm}, ${guestsDropdownBabies} ${babyWordForm}`
            guestsDropdownNum[i].innerHTML = guestsDropdownAdults
        }
        else if (i == 1) {
            guestsDropdownChildren++;
            childWordForm = wordForm(guestsDropdownChildren, guestsDropdownChildrenWords)
            guestsDropdownInput.innerHTML = `${guestsDropdownAdults} ${adultWordForm}, ${guestsDropdownChildren} ${childWordForm}, ${guestsDropdownBabies} ${babyWordForm}`
            guestsDropdownNum[i].innerHTML = guestsDropdownChildren
        }
        else if (i == 2) {
            guestsDropdownBabies++;
            babyWordForm = wordForm(guestsDropdownBabies, guestsDropdownBabiesWords)
            guestsDropdownInput.innerHTML = `${guestsDropdownAdults} ${adultWordForm}, ${guestsDropdownChildren} ${childWordForm}, ${guestsDropdownBabies} ${babyWordForm}`
            guestsDropdownNum[i].innerHTML = guestsDropdownBabies
        }

// Если 0 удобств, то убрать из инпута запись

        if (guestsDropdownAdults == 0) {
            guestsDropdownInput.innerHTML = `${guestsDropdownChildren} ${childWordForm}, ${guestsDropdownBabies} ${babyWordForm}`
        } 
        if (guestsDropdownChildren == 0) {
            guestsDropdownInput.innerHTML = `${guestsDropdownAdults} ${adultWordForm}, ${guestsDropdownBabies} ${babyWordForm}`
        }  
        if (guestsDropdownBabies == 0) {
            guestsDropdownInput.innerHTML = `${guestsDropdownAdults} ${adultWordForm}, ${guestsDropdownChildren} ${childWordForm}`
        } 
        if (guestsDropdownAdults == 0 && guestsDropdownChildren == 0) {
            guestsDropdownInput.innerHTML = `${guestsDropdownBabies} ${babyWordForm}`
        }
        if (guestsDropdownChildren == 0 && guestsDropdownBabies == 0) {
            guestsDropdownInput.innerHTML = `${guestsDropdownAdults} ${adultWordForm}`
        }
        if (guestsDropdownAdults == 0 && guestsDropdownBabies == 0) {
            guestsDropdownInput.innerHTML = `${guestsDropdownChildren} ${childWordForm}`
        }
        if (guestsDropdownAdults == 0 && guestsDropdownBabies == 0 && guestsDropdownChildren == 0) {
            guestsDropdownInput.innerHTML = `Сколько гостей`
        }

        guestsDropdownInput.innerHTML = truncate(guestsDropdownInput.innerHTML, 29);

// Делаю кнопку "-" доступной когда удобств больше 0 

        if (guestsDropdownNum[i].innerHTML == 1) {
            guestsDropdownMinus[i].classList.remove("facilities-dropdown__plus-minus_disabled");
        }    
    }

// При клике на минус

    guestsDropdownMinus[i].onclick = function() {

// Исключаю отрицательные значения

        if (guestsDropdownNum[i].innerHTML == 0) return 

// Настраиваю инициализацию инпута

        if (i == 0) {
            guestsDropdownAdults--;
            adultWordForm = wordForm(guestsDropdownAdults, guestsDropdownAdultsWords)
            guestsDropdownInput.innerHTML = `${guestsDropdownAdults} ${adultWordForm}, ${guestsDropdownChildren} ${childWordForm}, ${guestsDropdownBabies} ${babyWordForm}`
            guestsDropdownNum[i].innerHTML = guestsDropdownAdults
        }
        else if (i == 1) {
            guestsDropdownChildren--;
            childWordForm = wordForm(guestsDropdownChildren, guestsDropdownChildrenWords)
            guestsDropdownInput.innerHTML = `${guestsDropdownAdults} ${adultWordForm}, ${guestsDropdownChildren} ${childWordForm}, ${guestsDropdownBabies} ${babyWordForm}`
            guestsDropdownNum[i].innerHTML = guestsDropdownChildren
        }
        else if (i == 2) {
            guestsDropdownBabies--;
            babyWordForm = wordForm(guestsDropdownBabies, guestsDropdownBabiesWords)
            guestsDropdownInput.innerHTML = `${guestsDropdownAdults} ${adultWordForm}, ${guestsDropdownChildren} ${childWordForm}, ${guestsDropdownBabies} ${babyWordForm}`
            guestsDropdownNum[i].innerHTML = guestsDropdownBabies
        }

// Если 0 удобств, то убрать из инпута запись        

        if (guestsDropdownAdults == 0) {
            guestsDropdownInput.innerHTML = `${guestsDropdownChildren} ${childWordForm}, ${guestsDropdownBabies} ${babyWordForm}`
        } 
        if (guestsDropdownChildren == 0) {
            guestsDropdownInput.innerHTML = `${guestsDropdownAdults} ${adultWordForm}, ${guestsDropdownBabies} ${babyWordForm}`
        }  
        if (guestsDropdownBabies == 0) {
            guestsDropdownInput.innerHTML = `${guestsDropdownAdults} ${adultWordForm}, ${guestsDropdownChildren} ${childWordForm}`
        } 
        if (guestsDropdownAdults == 0 && guestsDropdownChildren == 0) {
            guestsDropdownInput.innerHTML = `${guestsDropdownBabies} ${babyWordForm}`
        }
        if (guestsDropdownChildren == 0 && guestsDropdownBabies == 0) {
            guestsDropdownInput.innerHTML = `${guestsDropdownAdults} ${adultWordForm}`
        }
        if (guestsDropdownAdults == 0 && guestsDropdownBabies == 0) {
            guestsDropdownInput.innerHTML = `${guestsDropdownChildren} ${childWordForm}`
        }
        if (guestsDropdownAdults == 0 && guestsDropdownBabies == 0 && guestsDropdownChildren == 0) {
            guestsDropdownInput.innerHTML = `Сколько гостей`
        }

        guestsDropdownInput.innerHTML = truncate(guestsDropdownInput.innerHTML, 29);

// Делаю кнопку "-" неактивной при нуле

        if (guestsDropdownNum[i].innerHTML == 0) {
            guestsDropdownMinus[i].classList.add("facilities-dropdown__plus-minus_disabled");
        }
    }
}

// Кнопка "Очистить"

guestsDropdownClearButton.onclick = function() {
    for (let i = 0; i < guestsDropdownNum.length; i++) {
        guestsDropdownNum[i].innerHTML = 0
    }
    for (let i = 0; i < guestsDropdownMinus.length; i++) {
        guestsDropdownMinus[i].classList.add("facilities-dropdown__plus-minus_disabled");
    }
    guestsDropdownInput.innerHTML = 'Сколько гостей'
}