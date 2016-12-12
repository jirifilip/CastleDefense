define(["Nepritel"], function(Nepritel) {
  function GeneratorNepratel(ZakladniUdaje) {
    var ZakladniUdaje = ZakladniUdaje;
    var trasa = ZakladniUdaje.getTrasa();
    var rozmerJednohoGridu = ZakladniUdaje.getRozmer() / ZakladniUdaje.getSloupceRadky();
    var vykreslovac = ZakladniUdaje.getVykreslovac();
    var smer = [];
    var zkracenaTrasa = [];

    var objekt;

    var nepratele = [ [], [], [], [] ];
    var pocitadloNepr = [0, 0, 0, 0];

    var obtiznost = zakladniUdaje.getObtiznost().generovani;

    var generovaniNepr = {
      pocitadloGenerovani : [0, 0, 0, 0],
      vychCasGen : [obtiznost * 7, obtiznost * 6, obtiznost * 5, obtiznost * 4], //50 je jedna vteřina
      casGen : "", //bude sloužit k tomu, aby se nepřekročil limit obtížnosti
      //300 znamená každých šest sekund atd.
    }
    //proházení času na trasách, aby se negenerovalo pokaždé stejně na stejné trase
    generovaniNepr.vychCasGen.sort(function(a, b) {
      return (0.5 - Math.random())
    })
    generovaniNepr.casGen = generovaniNepr.vychCasGen; //ze začátku budou mít stejné hodnoty
    //postupně se budou odčítat

    var druh;

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
      druh = 1;
      if (pocitadloNepr[i] % 2 == 0) {
        druh = 2;
        if (pocitadloNepr[i] % 8 == 0) {
          druh = 3;
        }
      }


      zapsano = false;
      znamenko = 1;
      if (i == 1 || i == 2) {
        znamenko = -1;
      }
      nepr = new Nepritel(ZakladniUdaje, znamenko, i, druh);
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
      //bude fungovat tak, aby pro každou trasu generovalo nepřátele v jiném intervalu
      for (i = 0; i < nepratele.length; i++) {
        generovaniNepr.pocitadloGenerovani[i]++
        if (generovaniNepr.pocitadloGenerovani[i] >= generovaniNepr.casGen[i]) {
          pocitadloNepr[i]++; //počítá, kolik nepřátel se už vygenerovalo
          _generujNepritele(i);
          generovaniNepr.pocitadloGenerovani[i] = 0;
          if (generovaniNepr.vychCasGen[i] - generovaniNepr.casGen[i] >= obtiznost * 3) {
            generovaniNepr.casGen[i] -= 5;
          }
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
