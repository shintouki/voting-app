$(document).ready(function () {
  var pathname = window.location.pathname;
  var currAnchor = $('a[href="' + pathname + '"]');
  $(currAnchor).parent().addClass("active");
});