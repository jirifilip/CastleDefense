define([], function() {
  function UpdateCtrl(herniPlocha, hrac, gener, zaklUd, collCtrl, upgCtrl) {
    var collisionCtrl = collCtrl;
    var upgradeCtrl = upgCtrl;
    var generatorNepratel = gener;
    pocitadlo = 0;
    var zakladniUdaje = zaklUd;
    this.mainUpdate = function() {
      if (!zakladniUdaje.getPauza()) {
        pocitadlo++;
        herniPlocha.update();
        generatorNepratel.update();
        hrac.update();
        collisionCtrl.update();
        upgradeCtrl.update();
      }
    }


    this.interval = setInterval(this.mainUpdate, 20);


  }

  return UpdateCtrl;
})
