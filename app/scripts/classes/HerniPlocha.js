define(["jquery"], function($) {
  function HerniPlocha(ZakladniUdaje, Vykreslovac) {
    var rozmer = ZakladniUdaje.getRozmer();
    var id = ZakladniUdaje.getId();
    var vykreslovac = Vykreslovac;
    var ctx;

    var $body;

    this.canvas;

    var _cacheDom = function() {
      $body = $("body");
      this.canvas = $("<canvas></canvas>");
    }

    var _vytvor = function() {
      this.canvas.attr({
        "width" : rozmer,
        "height" : rozmer,
        "id" : "id",
      });
      $body.append(this.canvas);
      ctx = $(this.canvas).get(0).getContext("2d");
    }

    var _init = function() {
      _cacheDom();
      _vytvor();
    }();

    this.update = function() {
      vykreslovac.pozadi(ctx);
    }


    this.getCtx = function() {
      return ctx;
    }
  }

  return HerniPlocha;
})
