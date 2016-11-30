define([], function() {
  function Vykreslovac() {

    var pozadi = new Image();
    pozadi.src = "images/pozadi.jpg";

    var hrad = new Image();
    hrad.src = "images/hrad2.jpg";

    var strela = new Image();
    strela.src = "images/strela.jpg";

    var cesta = new Image();
    cesta.src = "images/cesta.jpg";

    //nahore dole vlevo vpravo
    var nepritel = []
    for (i = 0; i < 4; i++)
      nepritel[i] = new Image();

    nepritel[0].src = "images/nepritel_nahore.jpg";
    nepritel[1].src = "images/nepritel_dole.jpg";
    nepritel[2].src = "images/nepritel_vlevo.jpg";
    nepritel[3].src = "images/nepritel_vpravo.jpg";


    this.pozadi = function(ctx, rozmer) {
      ctx.drawImage(pozadi, 0, 0, rozmer, rozmer);
    }
    this.hrad = function(ctx, souradnice, rozmer) {
      ctx.drawImage(hrad, souradnice, souradnice, rozmer, rozmer);
    }
    this.strela = function(ctx, x, y, rozmer) {
      ctx.drawImage(strela, x, y, rozmer, rozmer);
    }
    this.nepritel = function(ctx, x, y, rozmer, ktery) {
      ctx.drawImage(nepritel[ktery], x, y, rozmer, rozmer);
    }
    this.cesta = function(ctx, x, y, rozmer) {
      ctx.drawImage(cesta, x, y, rozmer, rozmer);
    }

  }

  return Vykreslovac;
})
