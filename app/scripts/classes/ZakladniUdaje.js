define([], function () {
  function ZakladniUdaje(rozmer) {
    //musí být liché
    const sloupcuRadku = 11;
    const rozmerHraduStrana = 3;

    var rozmer = rozmer;
    var id = "herniPlocha";
    var rozmerJednohoGridu = rozmer / sloupcuRadku;

    //vypočtení lokace hradu, výpočty jsou už upravené pro cyklus
    var zakladniSouradniceHradu = Math.round(sloupcuRadku / rozmerHraduStrana);

    //proměnné do cyklu
    var i;
    var j;

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

    //vypsání lokace bran





    //gettery
    this.getRozmer = function() {
      return rozmer;
    };
    this.getId = function() {
      return id;
    };
    this.getLokaceHradu = function() {
      //vrátí pole se souřadnicemi pro vykreslení
      return zakladniSouradniceHradu * rozmerJednohoGridu;
    };
    this.getRozmerHradu = function() {
      return rozmerHraduStrana * rozmerJednohoGridu;
    };

  }

  return ZakladniUdaje;
})
