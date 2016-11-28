define([], function () {
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

    this.vykreslovac = Vykreslovac;

    this.grid = [];

    //vytvoření dvourozměrného gridu
    for (i = 0; i < sloupcuRadku; i++) {
      this.grid[i] = [];
      for (j = 0; j < sloupcuRadku; j++) {
        this.grid[i][j] = "prazdno";
      }
    }

    //vypsání lokace hradu
    for (i = zakladniSouradniceHradu; i < zakladniSouradniceHradu + rozmerHraduStrana; i++) {
      for (j = zakladniSouradniceHradu; j < zakladniSouradniceHradu + rozmerHraduStrana; j++) {
        this.grid[i][j] = "hrad";
      }
    }

    //vypsání lokace spawnpointů
    this.grid[Math.round(sloupcuRadku / 2) - 1][0] = "spawnpoint";
    this.grid[Math.round(sloupcuRadku / 2)  - 1][sloupcuRadku - 1] = "spawnpoint";
    this.grid[0][Math.round(sloupcuRadku / 2) - 1] = "spawnpoint";
    this.grid[sloupcuRadku - 1][Math.round(sloupcuRadku / 2) - 1] = "spawnpoint";




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

    //settery
    this.setCtx = function(context) {
      ctx = context;
    }

  }

  return ZakladniUdaje;
})
