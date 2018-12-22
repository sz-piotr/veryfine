(function() {
  var buttons = document.getElementsByClassName('install__button');
  var codes = document.getElementsByClassName('install__code');

  buttons[0].addEventListener('click', function() {
    buttons[0].className = 'install__button install__button--active'
    buttons[1].className = 'install__button'
    codes[0].className = 'install__code install__code--active'
    codes[1].className = 'install__code'
  });

  buttons[1].addEventListener('click', function() {
    buttons[1].className = 'install__button install__button--active'
    buttons[0].className = 'install__button'
    codes[1].className = 'install__code install__code--active'
    codes[0].className = 'install__code'
  });
})();
