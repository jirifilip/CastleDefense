define(["jquery"], function($) {
  function Zvuk(src) {
    _cacheDom = function() {
      var $zvuk = $("<audio><audio/>")
      var $body = $(body);
    }();

    _init = function() {
      $zvuk.attr({
        "preload" : "auto",
        "controls" : "none",
      });
      $zvuk.css({
        "display" : "none",
      });
      $body.append($zvuk);
    }();

    this.prehraj() {
      $zvuk.play();
    }
  }

  return Zvuk;
})
