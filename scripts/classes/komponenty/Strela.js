define(["Zvuk"], function(Zvuk) {
  function Strela(Vykreslovac, ctx, velikost, smerX, smerY, x, y, rozmerPlatna, typ) {
    var smerX = smerX;
    var smerY = smerY;
    var rozmerPlatna = rozmerPlatna;
    var vykreslovac = Vykreslovac;
    var velikostStrely = velikost;
    var x = x;
    var y = y;
    var typ = typ;

    //zvuk ktery se přehraje při vytvoření
    var src;
    typ == "ohnivaKoule"? src = "sounds/ohnivaKoule.mp3" : src = "sounds/delo.mp3";
    var strelbaZvuk = new Zvuk(src);
    strelbaZvuk.prehraj();

    this.mimo = false;

    this.getXY = function() {
      return {"x" : x, "y" : y, "rozmer" : velikostStrely};
    }

    this.update = function() {
      x += smerX * 5;
      y += smerY * 5;
      if (typ == "ohnivaKoule") {
        vykreslovac.ohnivaKoule(ctx, x, y, velikostStrely * 2);
      } else {
        vykreslovac.strela(ctx, x, y, velikostStrely);
      }
      if (x > rozmerPlatna || x < 0 || y > rozmerPlatna || y < 0) {
        this.mimo = true;
      }
    }
  }

  return Strela;
})
