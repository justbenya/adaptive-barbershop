var slider = document.querySelector('.slider');
slider.classList.remove('slider--nojs');
var advantages = document.querySelector('.advantages');
advantages.classList.remove('advantages--nojs');

var toggles = document.querySelectorAll('.slider__toggle');
var items = document.querySelectorAll('.advantages__item');

toggles.forEach(function (element) {
  element.addEventListener('click', function (e) {
    if (!e.target.classList.contains('slider__toggle--active')) {
      // Убираем все выделения
      toggles.forEach(function (button) {
        button.classList.remove('slider__toggle--active');
      });

      // Выделяем нужную кнопку
      e.target.classList.add('slider__toggle--active');

      items.forEach(function (element) {
        element.classList.remove('advantages__item--active');
      });

      // Выведем нужный слайд
      var slide = e.target.innerHTML;
      items[slide - 1].classList.add('advantages__item--active');
    }
  });
});