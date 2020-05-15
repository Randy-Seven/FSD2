let roomSearchArrivalButton = document.querySelector('.room-search-form__arrival-button')
let roomSearchCheckoutButton = document.querySelector('.room-search-form__checkout-button')
let dropCalendar = document.querySelector('.drop-calendar')
let calendarApplyButton = document.querySelector('.calendar__apply-js')
let dropCalendarDays = document.querySelector('#dropCalendar')

// Изначально календарь спрятан
dropCalendar.hidden = true

// Открываем календарь по клику 
roomSearchArrivalButton.onclick = function() {
    dropCalendar.hidden = false;
}

roomSearchCheckoutButton.onclick = function() {
    dropCalendar.hidden = false;
}

// Кнопка "применить" закрывает календарь
calendarApplyButton.onclick = function() {
    dropCalendar.hidden = true;
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
    }

})

// Выбираем даты прибытия и выезда
let selectedArrivalDay;
let selectedCheckoutDay;
let calendarDays = document.querySelectorAll('#dropCalendar td');

dropCalendarDays.onclick = function(event) {
    let target = event.target;

    if (target.tagName != 'TD') return;

    if (!selectedArrivalDay && !selectedCheckoutDay) { // Если дни не выбраны то сначала выбираем день прибытия
        highlightArrivalDay(target)
    } else if (selectedArrivalDay && !selectedCheckoutDay) { // Если выбран день прибытия то выбираем день выезда
        if (+target.innerHTML <= +selectedArrivalDay.innerHTML) { // Если выбран день прибытия и потом выбран день до него, то это перевыбор дня прибытия
            selectedArrivalDay.classList.remove('calendar__active')
            selectedArrivalDay = false;
            highlightArrivalDay(target)
        } else {
            highlightCheckoutDay(target)
        }
    } else if (selectedArrivalDay && selectedCheckoutDay) { // Если оба дня выбраны то сбрасываем их и снова выбираем день прибытия
        selectedArrivalDay.classList.remove('calendar__active');
        selectedArrivalDay = false;
        selectedCheckoutDay.classList.remove('calendar__viezd');
        selectedCheckoutDay = false;
        highlightArrivalDay(target)
    }
}

function highlightArrivalDay(day) {
    selectedArrivalDay = day;
    selectedArrivalDay.classList.add('calendar__active'); // подсветить новый td
}

function highlightCheckoutDay(day) {
    selectedCheckoutDay = day;
    selectedCheckoutDay.classList.add('calendar__viezd'); // подсветить новый td
}
