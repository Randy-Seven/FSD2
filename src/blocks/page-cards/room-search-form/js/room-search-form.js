let roomSearchArrivalButton = document.querySelector('.room-search-form__arrival-button')
let roomSearchCheckoutButton = document.querySelector('.room-search-form__checkout-button')
let dropCalendar = document.querySelector('.drop-calendar')
let calendarApplyButton = document.querySelector('.calendar__apply-js')
let dropCalendarTable = document.querySelector('#dropCalendar')
let selectedArrivalDay
let selectedCheckoutDay
let secondRowInCalendar = document.querySelector('#dropCalendar tr').nextSibling

// Изначально календарь спрятан
dropCalendar.hidden = true

// Открываем календарь по клику 
roomSearchArrivalButton.onclick = function() {
    dropCalendar.hidden = false;
    roomSearchArrivalButton.style.borderColor = 'rgba(31, 32, 65, 0.5)' // Выделяем кнопку прибытия
}

roomSearchCheckoutButton.onclick = function() {
    dropCalendar.hidden = false;
    roomSearchArrivalButton.style.borderColor = 'rgba(31, 32, 65, 0.5)'
}

// Кнопка "применить" закрывает календарь
calendarApplyButton.onclick = function() {
    dropCalendar.hidden = true;
    roomSearchArrivalButton.style.borderColor = 'rgba(31, 32, 65, 0.25)'
    roomSearchCheckoutButton.style.borderColor = 'rgba(31, 32, 65, 0.25)'
}

// Также закрываем календарь при клике мимо него
roomSearchArrivalButton.addEventListener('click', e => {
    e.stopPropagation();
});

roomSearchCheckoutButton.addEventListener('click', e => {
    e.stopPropagation();
});
  
document.addEventListener('click', e => {
    let target = e.target;
    let its_calendar = target == dropCalendar || dropCalendar.contains(target);
    
    if (!its_calendar &&  dropCalendar.hidden == false) {
        dropCalendar.hidden = true;
        roomSearchArrivalButton.style.borderColor = 'rgba(31, 32, 65, 0.25)'
        roomSearchCheckoutButton.style.borderColor = 'rgba(31, 32, 65, 0.25)'
    }

})

// Выбираем даты прибытия и выезда
dropCalendarTable.onclick = function(event) {

    let calendarDays = document.querySelectorAll('#dropCalendar td')
    let target = event.target;

    if (target.tagName != 'TD') return;

    if (!selectedArrivalDay && !selectedCheckoutDay) { // Если дни не выбраны то сначала выбираем день прибытия    
        highlightArrivalDay(target)
        roomSearchArrivalButton.style.borderColor = 'rgba(31, 32, 65, 0.25)'
        roomSearchCheckoutButton.style.borderColor = 'rgba(31, 32, 65, 0.5)'

    } else if (selectedArrivalDay && !selectedCheckoutDay) { // Если выбран день прибытия то выбираем день выезда
        
        if (+target.innerHTML <= +selectedArrivalDay.innerHTML) { // Если выбран день прибытия и потом выбран день до него, то это перевыбор дня прибытия
            selectedArrivalDay.classList.remove('calendar__arrival')
            selectedArrivalDay = false;

            highlightArrivalDay(target)

            roomSearchArrivalButton.style.borderColor = 'rgba(31, 32, 65, 0.25)'
            roomSearchCheckoutButton.style.borderColor = 'rgba(31, 32, 65, 0.5)'

        } else {
            highlightCheckoutDay(target)

            roomSearchArrivalButton.style.borderColor = 'rgba(31, 32, 65, 0.5)'
            roomSearchCheckoutButton.style.borderColor = 'rgba(31, 32, 65, 0.25)'
        }

    } else if (selectedArrivalDay && selectedCheckoutDay) { // Если оба дня выбраны то сбрасываем их и снова выбираем день прибытия
        selectedArrivalDay.classList.remove('calendar__arrival');

        roomSearchCheckoutButton.style.borderColor = 'rgba(31, 32, 65, 0.5)';
        selectedArrivalDay = false;

        selectedCheckoutDay.classList.remove('calendar__checkout');

        roomSearchArrivalButton.style.borderColor = 'rgba(31, 32, 65, 0.25)'
        selectedCheckoutDay = false;

        roomSearchCheckoutButton.innerHTML = 'ДД.ММ.ГГГГ'

        highlightArrivalDay(target)
    }

    // Инициализируем день прибытия
    if (+selectedArrivalDay.innerHTML < 10) {
        roomSearchArrivalButton.innerHTML = '0' + selectedArrivalDay.innerHTML + '.' + monthAndYear
    } else {
        roomSearchArrivalButton.innerHTML = selectedArrivalDay.innerHTML + '.' + monthAndYear
    }

    // Инициализируем день выезда
    if (selectedCheckoutDay && (+selectedCheckoutDay.innerHTML < 10)) {
        roomSearchCheckoutButton.innerHTML = '0' + selectedCheckoutDay.innerHTML + '.' + monthAndYear
    } else if (selectedCheckoutDay && (selectedCheckoutDay.innerHTML >= 10)) {
        roomSearchCheckoutButton.innerHTML = selectedCheckoutDay.innerHTML + '.' + monthAndYear
    }

    if (selectedArrivalDay) {
        dropCalendarTable.onmouseover = function(event) { // Функция, подсвечивающая диапазон между днями выезда и прибытия
            target = event.target;

            if (target.tagName != 'TD') return;

            for (let i = 1; i < calendarDays.length; i++) {
                if ((+calendarDays[i].innerHTML < +target.innerHTML) && (+calendarDays[i].innerHTML > +selectedArrivalDay.innerHTML)) {
                    calendarDays[i].classList.add('calendar__dayInRange')
                }
            }
        }
    }
}

// Подсвечивает день прибытия
function highlightArrivalDay(day) {
    selectedArrivalDay = day;
    selectedArrivalDay.classList.add('calendar__arrival'); 
}

// Подсвечивает день выезда
function highlightCheckoutDay(day) {
    selectedCheckoutDay = day;
    selectedCheckoutDay.classList.add('calendar__checkout'); 
}