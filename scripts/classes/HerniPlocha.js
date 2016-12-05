define(["jquery"], function($) {
  function HerniPlocha(ZakladniUdaje) {
    var rozmer = ZakladniUdaje.getRozmer();
    var id = ZakladniUdaje.getId();
    var vykreslovac = ZakladniUdaje.vykreslovac;
    var sloupcuRadku = ZakladniUdaje.getSloupceRadky();
    var rozmerJednohoGridu = rozmer / sloupcuRadku;
    var ctx;
    var spawnpoint = zakladniUdaje.getSpawnpoint();
    var grid = ZakladniUdaje.getGrid();
    var trasa = ZakladniUdaje.getTrasa();

    var $body;

    this.canvas;

    //vykreslí všechny trasy
    var _vykresliTrasu = function(trasa, ctx) {
      for (i = 0; i < trasa.length; i++) {
        for (j = 0; j < trasa[i].length; j++) {
          vykreslovac.cesta(ctx, trasa[i][j].x, trasa[i][j].y, rozmerJednohoGridu)
        }
      }
    }

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
      ZakladniUdaje.setCtx(ctx);
    }

    var _init = function() {
      _cacheDom();
      _vytvor();
    }();

    var _clear = function() {
      ctx.clearRect(0, 0, rozmer, rozmer);
    }

    this.update = function() {
      _clear();
      vykreslovac.pozadi(ctx, rozmer);
      _vykresliTrasu(trasa, ctx);
    }


    this.getSpawnpoint = function() {
      return spawnpoint;
    }
  }

  return HerniPlocha;
})
