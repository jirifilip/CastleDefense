define([], function() {
  function GeneratorNepratel(ZakladniUdaje) {
    //funkce pro zkrácení výpočtu trasy
    //funkce pro výpočet směrů jednotlivých tras
    //objekt smer - bude tam souřednice x a y
    var trasa = ZakladniUdaje.getTrasa();
    var smer = [];
    var zkracenaTrasa = [];
    var objekt;

    function SmerObjekt(smerX, smerY) {
      this.x = smerX;
      this.y = smerY;
    }

    var _vypocteniPocSmeru = function(trasa, i, j) {
        if (trasa[j].x !== trasa[j + 1].x) {
          objekt = new SmerObjekt(-1, 0);
          smer[i].push(objekt);
        }
        else {
          objekt = new SmerObjekt(0, -1);
          smer[i].push(objekt);
        }
    };


    var _zkraceniTras = function(index) {
      for (i = 0 ; i < smer.length; i++) {
        smer[i] = [];
        for (j = 0; j < trasa[i].length; j++) {
          _vypocteniPocSmeru(trasa[i], i, j);
        }
      }
    };

    var _init = function() {
      _zkraceniTras();
      console.log(smer);
    }();

    this.getSmer = function() {
      return smer;
    }
  }

  return GeneratorNepratel;
})
