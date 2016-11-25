define([], function() {
  function Vykreslovac() {
    var pozadi = new Image();
    pozadi.src = "images/pozadi.jpg";

    this.pozadi = function(ctx) {
      ctx.drawImage(pozadi, 0, 0);
    }
  }

  return Vykreslovac;
})
