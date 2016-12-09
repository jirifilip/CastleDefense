define([], function() {
  function UpdateCtrl(herniPlocha, hrac, gener, zaklUd, collCtrl) {
    var collisionCtrl = collCtrl;
    var generatorNepratel = gener;
    pocitadlo = 0;
    zakladniUdaje = zaklUd;
    this.mainUpdate = function() {
      if (!zakladniUdaje.getPauza()) {
        pocitadlo++;
        herniPlocha.update();
        generatorNepratel.update();
        hrac.update();
        collisionCtrl.update();
      }
    }


    this.interval = setInterval(this.mainUpdate, 20);


  }

  return UpdateCtrl;
})
