define(["jquery"], function($) {
  function HerniPlocha(ZakladniUdaje) {
    var rozmer = ZakladniUdaje.getRozmer();
    var id = ZakladniUdaje.getId();
    var vykreslovac = ZakladniUdaje.vykreslovac;
    var sloupcuRadku = ZakladniUdaje.getSloupceRadky();
    var rozmerJednohoGridu = rozmer / sloupcuRadku;
    var ctx;
    var spawnpointy = [];
    var grid = ZakladniUdaje.getGrid();
    var trasa = ZakladniUdaje.getTrasa();

    var $body;

    this.canvas;

    var _zapisSpawnpoint = function() {
      for (i = 0; i < sloupcuRadku; i++) {
        for (j = 0; j < sloupcuRadku; j++) {
          if (grid[i][j] == "spawnpoint") {
            spawnpointy.push({"x": i * rozmerJednohoGridu, "y" : j * rozmerJednohoGridu});
          }
        }
      }
    }


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
      _zapisSpawnpoint();
    }();

    var _clear = function() {
      ctx.clearRect(0, 0, rozmer, rozmer);
    }


    /*
    var _vykresliSpawnpoint = function() {
      for (i = 0; i < 4; i++) {
        vykreslovac.nepritel(ctx, spawnpointy[i].x, spawnpointy[i].y, rozmerJednohoGridu / 2, 0);
      }
    }
    */

    this.update = function() {
      _clear();
      vykreslovac.pozadi(ctx, rozmer);
      _vykresliTrasu(trasa, ctx);
    }


    this.getSpawnpoint = function() {
      return spawnpointy;
    }
  }

  return HerniPlocha;
})
