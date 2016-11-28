define([], function() {
  function Vykreslovac() {

    var pozadi = new Image();
    pozadi.src = "images/pozadi.jpg";

    var hrad = new Image();
    hrad.src = "images/hrad2.jpg";

    var strela = new Image();
    strela.src = "images/strela.jpg"

    var nepritel = new Image();
    nepritel.src = "images/nepritel.jpg"

    this.pozadi = function(ctx, rozmer) {
      ctx.drawImage(pozadi, 0, 0, rozmer, rozmer);
    }
    this.hrad = function(ctx, souradnice, rozmer) {
      ctx.drawImage(hrad, souradnice, souradnice, rozmer, rozmer);
    }
    this.strela = function(ctx, x, y, rozmer) {
      ctx.drawImage(strela, x, y, rozmer, rozmer);
    }
    this.nepritel = function(ctx, x, y, rozmer) {
      ctx.drawImage(nepritel, x, y, rozmer, rozmer);
    }

  }

  return Vykreslovac;
})
