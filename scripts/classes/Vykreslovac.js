define(["Zvuk"], function(Zvuk) {
  function Vykreslovac() {
    var uvodniObrazovka = new Image();
    uvodniObrazovka.src = "images/uvodni_obrazovka.jpg"

    var pozadi = new Image();
    pozadi.src = "images/pozadi2.jpg";

    var hrad = new Image();
    hrad.src = "images/hrad.jpg";

    var strela = new Image();
    strela.src = "images/strela.jpg";

    var cesta = new Image();
    cesta.src = "images/cesta.jpg";

    var _nactiNepratele = function(cil, druh) {
      for (i = 0; i < 4; i++) {
        cil[i] = new Image();
      }
      cil[0].src = "images/" + druh + "_nahore.jpg";
      cil[1].src = "images/" + druh + "_vpravo.jpg";
      cil[2].src = "images/" + druh + "_vlevo.jpg";
      cil[3].src = "images/" + druh + "_dole.jpg";
    }

    //nahore dole vlevo vpravo
    var nepritel = []
    nepritel[0] = [];
    nepritel[1] = [];
    nepritel[2] = [];
    _nactiNepratele(nepritel[0], "nepritel");
    _nactiNepratele(nepritel[1], "skret");
    _nactiNepratele(nepritel[2], "beranidlo");

    var barikada = [];
    _nactiNepratele(barikada, "palisada");


    this.uvodniObrazovka = function(ctx, rozmer) {
      ctx.drawImage(uvodniObrazovka, 0, 0, rozmer, rozmer);
    };
    this.pozadi = function(ctx, rozmer) {
      ctx.drawImage(pozadi, 0, 0, rozmer, rozmer);
    };
    this.hrad = function(ctx, souradnice, rozmer) {
      ctx.drawImage(hrad, souradnice, souradnice, rozmer, rozmer);
    };
    this.strela = function(ctx, x, y, rozmer) {
      ctx.drawImage(strela, x, y, rozmer, rozmer);
    };
    this.nepritel = function(ctx, x, y, rozmer, druh, animace) {
      ctx.drawImage(nepritel[druh - 1][animace], x, y, rozmer, rozmer);
    };
    this.cesta = function(ctx, x, y, rozmer) {
      ctx.drawImage(cesta, x, y, rozmer, rozmer);
    };
    this.barikada = function(ctx, x, y, rozmer, i) {
      ctx.drawImage(barikada[i], x, y, rozmer, rozmer);
    }


  }

  return Vykreslovac;
})
