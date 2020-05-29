let roomSearchArrivalButton = document.querySelector('.room-search-form__arrival-button')
let roomSearchCheckoutButton = document.querySelector('.room-search-form__checkout-button')
let dropCalendar = document.querySelector('.drop-calendar')
let calendarApplyButton = document.querySelector('.calendar__apply-js')
let calendarClearButton = document.querySelector('.calendar__clear-js')
let dropCalendarTable = document.querySelector('#dropCalendar')
let selectedArrivalDay;
let selectedCheckoutDay;

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

        if (((+target.innerHTML <= +selectedArrivalDay.innerHTML) && (monthAndYear == roomSearchArrivalButton.innerHTML.slice(3))) 
        || ((+monthAndYear.slice(0, 2) < +roomSearchArrivalButton.innerHTML.slice(3, 5)) && (monthAndYear.slice(3) ==  roomSearchArrivalButton.innerHTML.slice(6)))
        || (+monthAndYear.slice(3) < +roomSearchArrivalButton.innerHTML.slice(6))) { // Если выбран день прибытия и потом выбран день до него, то это перевыбор дня прибытия
            
            for (let i = 0; i < calendarDays.length; i++) {
                if (calendarDays[i].classList.contains('calendar__arrival') || calendarDays[i].classList.contains('calendar__arrivalWithoutAfter')) {
                    calendarDays[i].classList.remove('calendar__arrival')
                    calendarDays[i].classList.remove('calendar__arrivalWithoutAfter')
                }
    
                if (calendarDays[i].classList.contains('calendar__checkout')) {
                    calendarDays[i].classList.remove('calendar__checkout')
                }
            }

            selectedArrivalDay.classList.remove('calendar__arrival')
            selectedArrivalDay.classList.remove('calendar__arrivalWithoutAfter')
            selectedArrivalDay = false;

            highlightArrivalDay(target)

            roomSearchArrivalButton.style.borderColor = 'rgba(31, 32, 65, 0.25)'
            roomSearchCheckoutButton.style.borderColor = 'rgba(31, 32, 65, 0.5)'

        } else {

            highlightCheckoutDay(target)

            roomSearchArrivalButton.style.borderColor = 'rgba(31, 32, 65, 0.5)'
            roomSearchCheckoutButton.style.borderColor = 'rgba(31, 32, 65, 0.25)'

            target.classList.remove('calendar__hoverIfSelectedDay')
        }

    } else if (selectedArrivalDay && selectedCheckoutDay) { // Если оба дня выбраны то сбрасываем их и снова выбираем день прибытия
        for (let i = 0; i < calendarDays.length; i++) {
            if (calendarDays[i].classList.contains('calendar__arrival') || calendarDays[i].classList.contains('calendar__arrivalWithoutAfter')) {
                calendarDays[i].classList.remove('calendar__arrival')
                calendarDays[i].classList.remove('calendar__arrivalWithoutAfter')
            }

            if (calendarDays[i].classList.contains('calendar__checkout')) {
                calendarDays[i].classList.remove('calendar__checkout')
            }
        }
        
        selectedArrivalDay.classList.remove('calendar__arrival');

        roomSearchCheckoutButton.style.borderColor = 'rgba(31, 32, 65, 0.5)';
        selectedArrivalDay = false;

        selectedCheckoutDay.classList.remove('calendar__checkout');

        roomSearchArrivalButton.style.borderColor = 'rgba(31, 32, 65, 0.25)'
        selectedCheckoutDay = false;

        roomSearchCheckoutButton.innerHTML = 'ДД.ММ.ГГГГ'

        // Удаляем все подсвеченные ячейки
        for (let i = 0; i < calendarDays.length; i++) {
            calendarDays[i].classList.remove('calendar__dayInRange') 
            calendarDays[i].classList.remove('calendar__hoverIfOnTheRange')
        }

        highlightArrivalDay(target)
    }

    // Инициализируем день прибытия
    if (!selectedCheckoutDay) {
        if (+selectedArrivalDay.innerHTML < 10) {
            roomSearchArrivalButton.innerHTML = '0' + selectedArrivalDay.innerHTML + '.' + monthAndYear
        } else {
            roomSearchArrivalButton.innerHTML = selectedArrivalDay.innerHTML + '.' + monthAndYear
        }
    }

    // Инициализируем день выезда
    if (selectedCheckoutDay && (+selectedCheckoutDay.innerHTML < 10)) {
        roomSearchCheckoutButton.innerHTML = '0' + selectedCheckoutDay.innerHTML + '.' + monthAndYear
    } else if (selectedCheckoutDay) {
        roomSearchCheckoutButton.innerHTML = selectedCheckoutDay.innerHTML + '.' + monthAndYear
    }

    return selectedArrivalDay
}



dropCalendarTable.onmouseover = function(event) { // Функция, подсвечивающая диапазон между днями выезда и прибытия
        
    let target = event.target;
    let calendarDays = document.querySelectorAll('#dropCalendar td')

    if (target.tagName != 'TD') return;
    
    if (selectedArrivalDay) {

        // Если наводим на день в диапазоне, меняем класс наведения
        for (let i = 0; i < calendarDays.length; i++) {
            if (target.classList.contains('calendar__dayInRange')) {
                target.classList.add('calendar__hoverIfOnTheRange')
            }
        }

        if (((+target.innerHTML > +selectedArrivalDay.innerHTML) && (monthAndYear == roomSearchArrivalButton.innerHTML.slice(3))) 
        || ((+monthAndYear.slice(0, 2) > +roomSearchArrivalButton.innerHTML.slice(3, 5)) && (monthAndYear.slice(3) == roomSearchArrivalButton.innerHTML.slice(6)))
        || (monthAndYear.slice(3) > roomSearchArrivalButton.innerHTML.slice(6))) { 

            target.classList.add('calendar__hoverIfSelectedDay') // При выборе дня выезда, ко дню = target, добавить подсвеченный прямоугольник слева
            
            if (selectedArrivalDay && !selectedCheckoutDay) { 
                for (let i = 0; i < calendarDays.length; i++) {
                    if (calendarDays[i].classList.contains('calendar__arrivalWithoutAfter')) {
                        calendarDays[i].classList.remove('calendar__arrivalWithoutAfter')
                        calendarDays[i].classList.add('calendar__arrival')
                    }
                }
                selectedArrivalDay.classList.add('calendar__arrival')
                selectedArrivalDay.classList.remove('calendar__arrivalWithoutAfter')
            }
            
        } else {

            if (selectedArrivalDay && !selectedCheckoutDay) {
                selectedArrivalDay.classList.remove('calendar__arrival') 
                selectedArrivalDay.classList.add('calendar__arrivalWithoutAfter')
            }
        
            target.classList.remove('calendar__hoverIfSelectedDay')
        }
        
        if (selectedArrivalDay && selectedCheckoutDay) { // Если уже выбраны дни прибытия и выезда, то сбрасываем диапазон при новом выборе дня прибытия
            target.classList.remove('calendar__hoverIfSelectedDay')
            if (target.classList.contains('calendar__dayInRange')) {
                target.classList.add('calendar__hoverIfOnTheRange')
            } else {
                for (let i = 0; i < calendarDays.length; i++) {
                    calendarDays[i].classList.remove('calendar__hoverIfOnTheRange')
                }
                selectedArrivalDay.classList.remove('calendar__hoverIfOnTheRange')
            }
            return;
        }

        if (selectedArrivalDay && !selectedCheckoutDay) {

            for (let i = 0; i < calendarDays.length; i++) { // Добавляем подсветку диапазона при переключении месяцев
                if ((((+calendarDays[i].innerHTML < +target.innerHTML) && (+calendarDays[i].innerHTML > +selectedArrivalDay.innerHTML) && (monthAndYear == roomSearchArrivalButton.innerHTML.slice(3)))
                || ((+calendarDays[i].innerHTML < +target.innerHTML) && (+monthAndYear.slice(0, 2) > +roomSearchArrivalButton.innerHTML.slice(3, 5)) && (monthAndYear.slice(3) == roomSearchArrivalButton.innerHTML.slice(6)))
                || ((monthAndYear.slice(3) > roomSearchArrivalButton.innerHTML.slice(6)) && (+calendarDays[i].innerHTML < +target.innerHTML))) && (!calendarDays[i].classList.contains('calendar__disabled'))) {  
                    calendarDays[i].classList.add('calendar__dayInRange')
                } else {
                    calendarDays[i].classList.remove('calendar__dayInRange')
                }
            }
        }
    }

    dropCalendarTable.onmouseout = function() { // Если мышь за календарем то сбрасываем подсветку диапазона
        if (selectedArrivalDay && !selectedCheckoutDay) {
            for (let i = 0; i < calendarDays.length; i++) {
                calendarDays[i].classList.remove('calendar__dayInRange')
            }
            selectedArrivalDay.classList.add('calendar__arrivalWithoutAfter')
            selectedArrivalDay.classList.remove('calendar__arrival')
        }
    }
}

// Кнопка "Очистить" 
calendarClearButton.onclick = function() {
    let calendarDays = document.querySelectorAll('#dropCalendar td')
    selectedArrivalDay = false;
    selectedCheckoutDay = false;
    roomSearchArrivalButton.innerHTML = 'ДД.ММ.ГГГГ' 
    roomSearchCheckoutButton.innerHTML = 'ДД.ММ.ГГГГ'
    for (let i = 0; i < calendarDays.length; i++) {
        calendarDays[i].classList.remove('calendar__dayInRange')
        calendarDays[i].classList.remove('calendar__arrival')
        calendarDays[i].classList.remove('calendar__arrivalWithoutAfter')
        calendarDays[i].classList.remove('calendar__checkout')
        calendarDays[i].classList.remove('calendar__hoverIfOnTheRange')
        calendarDays[i].classList.remove('calendar__hoverIfSelectedDay')
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