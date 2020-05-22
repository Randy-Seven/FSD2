let today = new Date();

let months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

function createCalendar(year, month) {
 
  let mon = month - 1;
  let d = new Date(year, mon);
  let nextMonthFirstDay = 0;
  let previousMonthLastDay = getLastDayOfMonth(year, mon - 1);

  let roomSearchArrivalButton = document.querySelector('.room-search-form__arrival-button')
  let roomSearchCheckoutButton = document.querySelector('.room-search-form__checkout-button')

  // Меняем месяц и год в заголовке календаря
  let headerMonth = document.querySelector('.calendar__header-month');
  headerMonth.innerHTML = months[mon] + ' ' + year;

  // Обрабатываем стрелки
  let nextMonth = document.querySelector('.calendar__next-month_next');
  let previousMonth = document.querySelector('.calendar__next-month_previous');

  nextMonth.onclick = function() {
      if (month == 12) {
          createCalendar(year + 1, 1);
      } else {
          createCalendar(year, month + 1);
      }
  }

  previousMonth.onclick = function() {
      if (month == 1) {
          createCalendar(year - 1, 12)
      } else {
          createCalendar(year, month - 1);
      }
  }

  // Прячем стрелку влево если на календаре текущий год и месяц
  if ((year == today.getFullYear()) && (month == today.getMonth() + 1)) {
    previousMonth.style.opacity = '0';
    previousMonth.style.pointerEvents = 'none';
  } else {
    previousMonth.style.opacity = '1';
    previousMonth.style.pointerEvents = 'auto';
  }

  let table = '<table class=\'calendar__week-days\'><tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr><tr>';
  
  // Последние числа прошлого месяца
  // с понедельника до первого дня месяца
  // 29 30 31 1  2  3  4
  previousMonthLastDay -= getDay(d) - 1
  for (let i = 0; i < getDay(d); i++) {
    table += '<td class = \'calendar__disabled\'>' + previousMonthLastDay + '</td>';
    previousMonthLastDay += 1;
  }

  // <td> ячейки календаря с датами
  while (d.getMonth() == mon) {
    // Выделяем текущую дату
    if (d.getDate() == today.getDate() && d.getFullYear() == today.getFullYear() && today.getMonth() == mon) {
      table += '<td class = \'calendar__current\'>' + today.getDate() + '</td>'
    } else {
      table += '<td>' + d.getDate() + '</td>';
    }

    if (getDay(d) % 7 == 6) { // Вс, последний день - перевод строки
      table += '</tr><tr>';
    }

    d.setDate(d.getDate() + 1);
  }

  // Добить таблицу числами следующего месяца, если нужно
  // 29 30 31 1 2 3 4
  if (getDay(d) != 0) {
    for (let i = getDay(d); i < 7; i++) {
      nextMonthFirstDay += 1
      table += '<td class = \'calendar__disabled\'>' + nextMonthFirstDay + '</td>';
    }
  }

  // Закрыть таблицу
  table += '</tr></table>';

  // Исправляем конфликты с id
  if (window.location.toString().indexOf('landing-page.html') <= 0) {
    calendar.innerHTML = table;
  }
  
  dropCalendar.innerHTML = table;

  let calendarDays = document.querySelectorAll('#dropCalendar td');

  // Делаем недоступными дни до текущей даты
  for (let i = 0; i < calendarDays.length; i++) {
    if (+calendarDays[i].innerHTML < +today.getDate() && (year == today.getFullYear()) && (month == today.getMonth() + 1)) {
        calendarDays[i].classList.add('calendar__disabled')
    }
  }
  
  // Форматируем месяц
  if (month < 10) {
    monthAndYear = '0' + month + '.' + year 
  } else {
    monthAndYear = month + '.' + year
  }

  // При переклчении месяцев запоминаем дни прибытия и выезда
  for (let i = 0; i < calendarDays.length; i++) {
    if ((+roomSearchArrivalButton.innerHTML.slice(0, 2) == +calendarDays[i].innerHTML) && (roomSearchArrivalButton.innerHTML.slice(3) == monthAndYear) && (!calendarDays[i].classList.contains('calendar__disabled'))) {
      calendarDays[i].classList.add('calendar__arrivalWithoutAfter')
    }

    if ((+roomSearchCheckoutButton.innerHTML.slice(0, 2) == +calendarDays[i].innerHTML) && (roomSearchCheckoutButton.innerHTML.slice(3) == monthAndYear) && (!calendarDays[i].classList.contains('calendar__disabled'))) {
      calendarDays[i].classList.add('calendar__checkout')
    }
  }


  // Отрабатываем диапазон дней при переключении месяцев
  if ((roomSearchArrivalButton.innerHTML !== 'ДД.ММ.ГГГГ') && (roomSearchCheckoutButton.innerHTML !== 'ДД.ММ.ГГГГ')) { 
    for (let i = 0; i < calendarDays.length; i++) {
      if (calendarDays[i].classList.contains('calendar__arrivalWithoutAfter')) {
        calendarDays[i].classList.remove('calendar__arrivalWithoutAfter')
        calendarDays[i].classList.add('calendar__arrival')
        for (let j = 0; j < calendarDays.length; j++) {
          if ((+calendarDays[j].innerHTML > +roomSearchArrivalButton.innerHTML.slice(0, 2)) && (!calendarDays[j].classList.contains('calendar__disabled')) && (roomSearchArrivalButton.innerHTML.slice(3) == monthAndYear)) {
            calendarDays[j].classList.add('calendar__dayInRange')
          }
        }
      }

      if (calendarDays[i].classList.contains('calendar__checkout')) {
        for (let i = 0; i < calendarDays.length; i++) {
          if ((+calendarDays[i].innerHTML < +roomSearchCheckoutButton.innerHTML.slice(0, 2)) && (!calendarDays[i].classList.contains('calendar__disabled')) && (roomSearchCheckoutButton.innerHTML.slice(3) == monthAndYear)) {
            calendarDays[i].classList.add('calendar__dayInRange')
          }
        }
      }
    }

    for (let i = 0; i < calendarDays.length; i++) {
      if (((+monthAndYear.slice(0, 2) > +roomSearchArrivalButton.innerHTML.slice(3, 5)) && (+monthAndYear.slice(0, 2) < +roomSearchCheckoutButton.innerHTML.slice(3, 5)) && (+monthAndYear.slice(3) == +roomSearchArrivalButton.innerHTML.slice(6)) && (+monthAndYear.slice(3) == +roomSearchCheckoutButton.innerHTML.slice(6))) 
      && (!calendarDays[i].classList.contains('calendar__disabled'))) {
        calendarDays[i].classList.add('calendar__dayInRange')
      }

      if (+roomSearchArrivalButton.innerHTML.slice(6) < +roomSearchCheckoutButton.innerHTML.slice(6)) {
        if ((((+monthAndYear.slice(3) == +roomSearchArrivalButton.innerHTML.slice(6)) && (+monthAndYear.slice(0, 2) > +roomSearchArrivalButton.innerHTML.slice(3, 5))) 
        || ((+monthAndYear.slice(3) == +roomSearchCheckoutButton.innerHTML.slice(6)) && (+monthAndYear.slice(0, 2) < +roomSearchCheckoutButton.innerHTML.slice(3, 5))))
        && (!calendarDays[i].classList.contains('calendar__disabled'))) {
          calendarDays[i].classList.add('calendar__dayInRange')
        }
      }

      if (((+monthAndYear.slice(3) > +roomSearchArrivalButton.innerHTML.slice(6)) && (+monthAndYear.slice(3) < +roomSearchCheckoutButton.innerHTML.slice(6)))
      && (!calendarDays[i].classList.contains('calendar__disabled'))) {
        calendarDays[i].classList.add('calendar__dayInRange')
      }
    }

    if ((monthAndYear == roomSearchArrivalButton.innerHTML.slice(3)) && (monthAndYear == roomSearchCheckoutButton.innerHTML.slice(3))) {
      for (let i = 0; i < calendarDays.length; i++) {
        calendarDays[i].classList.remove('calendar__dayInRange')
      }
      
      for (let i = 0; i < calendarDays.length; i++) {
        if (((+calendarDays[i].innerHTML > +roomSearchArrivalButton.innerHTML.slice(0, 2)) && (+calendarDays[i].innerHTML < +roomSearchCheckoutButton.innerHTML.slice(0, 2)))
        && (!calendarDays[i].classList.contains('calendar__disabled'))) {
          calendarDays[i].classList.add('calendar__dayInRange')
        }
      }
    }
  }

  // Возвращаем месяц и год для инициализации инпутов
  return monthAndYear 
}

  // Функция, возвращающая последнее число месяца 
  function getLastDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
  }

  function getDay(date) { // Получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day == 0) day = 7; // Сделать воскресенье (0) последним днем
    return day - 1;
  }

createCalendar(today.getFullYear(), today.getMonth() + 1);