if (window.location.toString().indexOf('search-room-page.html') > 0) { // Запускать только на определенной странице
  let rangeSlider = document.querySelector('.range-slider__price')
  let rangeSliderDiapason = document.querySelector('.range-slider__range')
  let rangeSliderThumb1 = document.querySelector('.range-slider__min');
  let rangeSliderThumb2 = document.querySelector('.range-slider__max');
  let rangeSliderMinPrice = document.querySelector('#rangeSliderMin')
  let rangeSliderMaxPrice = document.querySelector('#rangeSliderMax')

  // Обрабатываем первый бегунок
  rangeSliderThumb1.onmousedown = function(event) {
    event.preventDefault(); // Предотвратить запуск выделения 

    let leftShiftX = event.clientX - rangeSliderThumb1.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMoveMin);
    document.addEventListener('mouseup', onMouseUpMin);

    function onMouseMoveMin(event) {
      let newLeft = event.clientX - leftShiftX - rangeSlider.getBoundingClientRect().left;
      
      // Не дать первому бегунку выйти из левой границы и за второй бегунок
      if (newLeft < 0) {
        newLeft = -1;
      }

      let rightEdgeForMin = rangeSliderThumb2.getBoundingClientRect().left - rangeSlider.getBoundingClientRect().left - 15;

      if (newLeft > rightEdgeForMin) {
        newLeft = rightEdgeForMin;
      }

      rangeSliderMinPrice.innerHTML = (Math.trunc(newLeft / 1.5) * 100).toLocaleString('ru')

      if (+rangeSliderMinPrice.innerHTML <= 0) { // Исключаем отрицательные значения
        rangeSliderMinPrice.innerHTML = 0
      }

      rangeSliderDiapason.style.left = newLeft + 'px';
    }

    function onMouseUpMin() {
      document.removeEventListener('mouseup', onMouseUpMin);
      document.removeEventListener('mousemove', onMouseMoveMin);
    }

  };

  // Обрабатываем второй бегунок
  rangeSliderThumb2.onmousedown = function(event) {
    event.preventDefault(); // Предотвратить запуск выделения 

    let leftShiftX = event.clientX - rangeSliderThumb2.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMoveMax);
    document.addEventListener('mouseup', onMouseUpMax);

    function onMouseMoveMax(event) {
      let newLeft = event.clientX - leftShiftX - rangeSlider.getBoundingClientRect().left;
      
      // Не дать второму бегунку выйти за первый бегунок и за правую границу
      if (newLeft <= rangeSliderThumb1.getBoundingClientRect().left + 14 - rangeSlider.getBoundingClientRect().left) {
        newLeft = rangeSliderThumb1.getBoundingClientRect().left + 14 - rangeSlider.getBoundingClientRect().left;
      }

      if (newLeft > 252) {
        newLeft = 252;
      }

      rangeSliderMaxPrice.innerHTML = (Math.trunc(newLeft / 1.5) * 100 - 1000).toLocaleString('ru')

      rangeSliderDiapason.style.right = (rangeSlider.offsetWidth - newLeft - 15) + 'px';
    }

    function onMouseUpMax() {
      document.removeEventListener('mouseup', onMouseUpMax);
      document.removeEventListener('mousemove', onMouseMoveMax);
    }

  };

  rangeSliderThumb1.ondragstart = function() {
    return false;
  };

  rangeSliderThumb2.ondragstart = function() {
    return false;
  };
}