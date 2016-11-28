define([], function() {
  function Strela(Vykreslovac, ctx, velikost, smerX, smerY, x, y) {
    var smerX = smerX;
    var smerY = smerY;
    var vykreslovac = Vykreslovac;
    var velikostStrely = velikost;
    var x = x;
    var y = y;


    this.update = function() {
      x += smerX * 5;
      y += smerY * 5;
      vykreslovac.strela(ctx, x, y, velikostStrely, velikostStrely);
    }
  }

  return Strela;
})
