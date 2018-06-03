var nav = document.querySelector('.page-nav');
var button = document.querySelector('.page-nav__toggle');
nav.classList.remove('page-nav--nojs');

button.addEventListener('click', function () {
  if (nav.classList.contains('page-nav--closed')) {
    nav.classList.remove('page-nav--closed');
    nav.classList.add('page-nav--opened');
  } else {
    nav.classList.remove('page-nav--opened');
    nav.classList.add('page-nav--closed');
  }
});