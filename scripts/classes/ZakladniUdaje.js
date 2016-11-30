define(["GeneratorTrasy"], function (GeneratorTrasy) {
  function ZakladniUdaje(rozmer, id, Vykreslovac) {
    //musí být liché
    const sloupcuRadku = 11;
    const rozmerHraduStrana = 3;

    var rozmer = rozmer;
    var id = id;
    var rozmerJednohoGridu = rozmer / sloupcuRadku;
    var ctx;

    //vypočtení lokace hradu, výpočty jsou už upravené pro cyklus
    var zakladniSouradniceHradu = Math.round(sloupcuRadku / rozmerHraduStrana);

    const lokaceHradu = zakladniSouradniceHradu * rozmerJednohoGridu;
    const rozmerHradu = rozmerHraduStrana * rozmerJednohoGridu;

    //proměnné do cyklu
    var i;
    var j;

    //trasa a cesta nepřátel
    var trasa;

    this.vykreslovac = Vykreslovac;

    this.grid = [];

    //vytvoření dvourozměrného gridu
    for (i = 0; i < sloupcuRadku; i++) {
      this.grid[i] = [];
      for (j = 0; j < sloupcuRadku; j++) {
        this.grid[i][j] = "NIC";
      }
    }

    //vypsání lokace hradu
    for (i = zakladniSouradniceHradu; i < zakladniSouradniceHradu + rozmerHraduStrana; i++) {
      for (j = zakladniSouradniceHradu; j < zakladniSouradniceHradu + rozmerHraduStrana; j++) {
        this.grid[i][j] = "hrad";
      }
    }

    //gettery
    this.getCtx = function() {
      return ctx;
    }
    this.getSloupceRadky = function() {
      return sloupcuRadku;
    }
    this.getGrid = function() {
      return this.grid;
    };
    this.getRozmer = function() {
      return rozmer;
    };
    this.getId = function() {
      return id;
    };
    this.getLokaceHradu = function() {
      //vrátí pole se souřadnicemi pro vykreslení
      return lokaceHradu;
    };
    this.getRozmerHradu = function() {
      return rozmerHradu;
    };
    this.getTrasa = function() {
      return trasa;
    }

    //settery
    this.setCtx = function(context) {
      ctx = context;
    }
    this.setTrasa = function(tr) {
      trasa = tr;
    }



  }

  return ZakladniUdaje;
})
