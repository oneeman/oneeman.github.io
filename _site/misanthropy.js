$(function () {
  var cartoons = parseCartoonsData();
  var current,
      imageElem = $('#mis-img'),
      titleElem = $('#mis-title');
  initializeLinks();
  current = parseHash();
  setCartoon(current);

  function parseCartoonsData() {
    var rows, result, parts;
    rows = misanthropyData.split('\n');
    result = [];
    rows.forEach(function (row) {
      if (row.indexOf(',') !== -1) {
        var comma = row.indexOf(',');
        result.push([parseInt(row.substring(0, comma).trim()), row.substring(comma+1).trim()]);
      }
    });
    return result;
  }

  function parseHash() {
    var hash = parseInt(location.hash.substring(1));
    for (var i = 0; i < cartoons.length; i++) {
      if (cartoons[i][0] === hash) {
        return hash;
      }
    }
    location.hash = 1;
    return 1;
  }

  function initializeLinks() {
    $('#mis-first').on('click', function () { setCartoon(1); return false;});
    $('#mis-prev').on('click', function () { setCartoon(current - 1); return false;});
    $('#mis-next').on('click', function () { setCartoon(current + 1); return false;});
    $('#mis-last').on('click', function () { setCartoon(cartoons.length); return false;});
  }

  function setCartoon(number) {
    if (number === 0) { number = 1; }
    if (number === cartoons.length + 1) { number = cartoons.length; }
    current = number;
    location.hash = current;
    var image = '/img/misanthropy/mis_' + current + '.jpg',
        title = cartoons[current-1][1];
    imageElem.attr('src', image).attr('alt', 'Cartoon: ' + title);
    titleElem.text(title);
  }
});

