define([], function() {
  function GeneratorNepratel(ZakladniUdaje, cislo) {
    //funkce pro zkrácení výpočtu trasy
    //funkce pro výpočet směrů jednotlivých tras
    //objekt smer - bude tam souřednice x a y
    var ZakladniUdaje = ZakladniUdaje;
    var trasa = ZakladniUdaje.getTrasa();
    var rozmerJednohoGridu = ZakladniUdaje.getRozmer() / ZakladniUdaje.getSloupceRadky() / 2;
    var ctx = ZakladniUdaje.getCtx();
    var vykreslovac = ZakladniUdaje.getVykreslovac();
    var smer = [];
    var zkracenaTrasa = [];
    var objekt;
    var nepratele = { "trasa1" : [], "trasa2" : [], "trasa3" : [], "trasa4" : []};

    function SmerObjekt(smerX, smerY) {
      this.x = smerX;
      this.y = smerY;
    }

    var _vypocteniPocSmeru = function(trasa, i, j, prvni) {
      if (prvni) {
        if (trasa[j].x !== trasa[j + 1].x) {
          objekt = new SmerObjekt(1 * rozmerJednohoGridu, 0);
          smer[i].push(objekt);
        }
        else {
          objekt = new SmerObjekt(0, 1 * rozmerJednohoGridu);
          smer[i].push(objekt);
        }
      }
      else {
        if (trasa[j].x !== trasa[j - 1].x) {
          objekt = new SmerObjekt(-1 * rozmerJednohoGridu, 0);
          smer[i].push(objekt);
        }
        else {
          objekt = new SmerObjekt(0, -1 * rozmerJednohoGridu);
          smer[i].push(objekt);
        }
      }

    };


    var _zkraceniTras = function() {
      for (i = 0 ; i < 4; i++) {
        smer[i] = [];
        if (i == 0 || i == 2) {
          for (j = 0; j < trasa[i].length - 1; j++) {
            _vypocteniPocSmeru(trasa[i], i, j, true);
          }
        }
        else {
          for (j = trasa[i].length - 1; j > 0; j--) {
            _vypocteniPocSmeru(trasa[i], i, j, false);
          }
        }
      }

    };

    var _init = function() {
      _zkraceniTras();
      zakladniUdaje.setSmer(smer);
    }();
  }

  this.generujNepritele = function(cisloTrasy) {
    spwn = zakladniUdaje.getSpawnpoint()[cisloTrasy - 1];
    smr = zakladniUdaje.getSmer()[cisloTrasy - 1]
    nepr = new Nepritel(spwn, smer, rozmerJednohoGridu, ctx, vykreslovac, 1);
    nepratele["trasa" + cisloTrasy].push(nepr);
  }

  return GeneratorNepratel;
})
