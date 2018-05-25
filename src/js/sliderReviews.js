var slider = Peppermint(document.getElementById('peppermint'), {
  dots: true,
  dotsContainer: document.querySelector('.reviews__toggles')
});
slider.recalcWidth();
var nextButton = document.getElementById('nextBtn');
var prevButton = document.getElementById('prevBtn');

nextButton.addEventListener('click', slider.next, false);
prevButton.addEventListener('click', slider.prev, false);