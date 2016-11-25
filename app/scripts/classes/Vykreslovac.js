define([], function() {
  function Vykreslovac() {
    this.pripraven = false;

    var pozadi = new Image();
    pozadi.src = "images/pozadi.jpg";

    var hrad = new Image();
    hrad.src = "images/hrad.jpg";



    this.pozadi = function(ctx, rozmer) {
      ctx.drawImage(pozadi, 0, 0, rozmer, rozmer);
    }
    this.hrad = function(ctx, souradnice, rozmer) {
      ctx.drawImage(hrad, souradnice, souradnice, rozmer, rozmer);
    }

  }

  return Vykreslovac;
})
