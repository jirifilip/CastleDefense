define(["Nepritel"], function(Nepritel) {
  function GeneratorNepratel(ZakladniUdaje) {
    var ZakladniUdaje = ZakladniUdaje;
    var trasa = ZakladniUdaje.getTrasa();
    var rozmerJednohoGridu = ZakladniUdaje.getRozmer() / ZakladniUdaje.getSloupceRadky();
    var ctx = ZakladniUdaje.getCtx();
    var vykreslovac = ZakladniUdaje.getVykreslovac();
    var smer = [];
    var zkracenaTrasa = [];
    var objekt;
    var nepratele = [ [], [], [], [] ];

    var casGenerace = 200;
    var pocitadlo = 0;


    ZakladniUdaje.setNepratele(nepratele);

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
      ZakladniUdaje.setSmer(smer);
    }();


    var _generujNepritele = function(i) {
      zapsano = false;
      znamenko = 1;
      if (i == 1 || i == 2) {
        znamenko = -1;
      }
      nepr = new Nepritel(zakladniUdaje.getSpawnpoint()[i], zakladniUdaje.getSmer()[i], zakladniUdaje.getRozmer() / 22, zakladniUdaje.getCtx(), vykreslovac, znamenko, i);
      for (j = 0; j < nepratele[i].length; j++) {
        if (!zapsano && nepratele[i][j] == undefined) {
          nepratele[i][j] = nepr;
          zapsano = true;
        }
      }
      if (!zapsano) {
        nepratele[i].push(nepr);
      }
    }

    this.update = function() {
      pocitadlo++;
      if (pocitadlo > casGenerace) {
        pocitadlo = 0;
        for (i = 0; i < nepratele.length; i++) {
          _generujNepritele(i);
        }
      }

      for (i = 0; i < nepratele.length; i++) {
        for (j = 0; j < nepratele[i].length; j++) {
          if (nepratele[i][j] !== undefined)
            nepratele[i][j].update();
        }
      }


    }


  }

  return GeneratorNepratel;
})
