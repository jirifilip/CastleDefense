define([], function () {
  function ZakladniUdaje(rozmer) {
    const sloupcuRadku = 11;

    var rozmer = rozmer;
    var id = "herniPlocha"
    var rozmerJednohoGridu = rozmer / sloupcuRadku;

    //proměnné do cyklu
    var i;
    var j;

    this.grid = [];

    for (i = 0; i < sloupcuRadku; i++) {
      this.grid[i] = []
      function
    }

    this.getRozmer = function() {
      return rozmer;
    }

    this.getId = function() {
      return id;
    }
  }

  return ZakladniUdaje;
})
