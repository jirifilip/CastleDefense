define([], function() {
  function Strela(Vykreslovac, ctx, velikost, smerX, smerY, x, y, rozmerPlatna) {
    var smerX = smerX;
    var smerY = smerY;
    var rozmerPlatna = rozmerPlatna;
    var vykreslovac = Vykreslovac;
    var velikostStrely = velikost;
    var x = x;
    var y = y;

    this.mimo = false;

    this.getXY = function() {
      return {"x" : x, "y" : y, "rozmer" : velikostStrely};
    }

    this.update = function() {
      x += smerX * 5;
      y += smerY * 5;
      vykreslovac.strela(ctx, x, y, velikostStrely, velikostStrely);
      if (x > rozmerPlatna || x < 0 || y > rozmerPlatna || y < 0) {
        this.mimo = true;
        //console.log("mimo");
      }
    }
  }

  return Strela;
})
