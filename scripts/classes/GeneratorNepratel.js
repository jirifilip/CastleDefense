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
      if (trasa[j].x !== trasa[j - 1].x) {
        if (trasa[j].x > trasa[j - 1].x) {
          objekt = new SmerObjekt(-1, 0);
          smer[i].push(objekt);
          console.log(trasa[j].x - trasa[j - 1].x);
        }
        else {
          objekt = new SmerObjekt(1, 0);
          smer[i].push(objekt);
          console.log("bla");
          console.log(trasa[j - 1].x - trasa[j].x);
        }
      }
      else {
        if (trasa[j].y > trasa[j - 1].y) {
          objekt = new SmerObjekt(0, -1);
          smer[i].push(objekt);
          console.log(trasa[j].y - trasa[j - 1].y);

        }
        else {
          objekt = new SmerObjekt(0, 1);
          smer[i].push(objekt);
          console.log(trasa[j - 1].y - trasa[j].y);
        }
      }
    };


    var _zkraceniTras = function(index) {
      var i = index;
      var predchoziSmer = "x";
      for (i = trasa.length - 1 ; i > 0; i--) {
        smer[i] = [];
        for (j = trasa[i].length - 1; j > 0; j--) {
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
