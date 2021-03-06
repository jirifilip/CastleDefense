define([], function() {
  function UpdateCtrl(herniPlocha, hrac, gener, zaklUd, collCtrl, upgCtrl, scCtrl) {
    //kontroluje updatování hry padesátkrát za sekundu

    var collisionCtrl = collCtrl;
    var upgradeCtrl = upgCtrl;
    var generatorNepratel = gener;
    var scoreCtrl = scCtrl;
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
        scoreCtrl.update();
      }
    }


    this.interval = setInterval(this.mainUpdate, 20);


  }

  return UpdateCtrl;
})
