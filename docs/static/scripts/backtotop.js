(function() {
  var button = document.getElementsByClassName('backtotop')[0];
  button.addEventListener('click', function () {
    window.scrollTo(0, 0);
  })
  window.addEventListener('scroll', function () {
    if (document.documentElement.scrollTop > 400) {
      button.style.bottom = '15px';
    } else {
      button.style.bottom = '-40px';
    }
  }, { passive: true });
})();
