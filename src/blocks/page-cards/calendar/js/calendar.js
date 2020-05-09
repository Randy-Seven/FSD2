function createCalendar(year, month) {

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
 
    let mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
    let d = new Date(year, mon);
    let previousMonthDays = new Date(year, mon - 1)
    let nextMonthDays = new Date(year, mon + 1)

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

    let table = '<table class=\'calendar__week-days\'><tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr><tr>';
    
    // пробелы для первого ряда
    // с понедельника до первого дня месяца
    // * * * 1  2  3  4
    for (let i = 0; i < getDay(d); i++) {
      table += '<td></td>';
    }

    // <td> ячейки календаря с датами
    while (d.getMonth() == mon) {
      table += '<td>' + d.getDate() + '</td>';

      if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
        table += '</tr><tr>';
      }

      d.setDate(d.getDate() + 1);
    }

    // добить таблицу пустыми ячейками, если нужно
    // 29 30 31 * * * *
    if (getDay(d) != 0) {
      for (let i = getDay(d); i < 7; i++) {
        table += '<td></td>';
      }
    }

    // закрыть таблицу
    table += '</tr></table>';

    calendar.innerHTML = table;
  }

  function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day == 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
  }

createCalendar(2020, 12);