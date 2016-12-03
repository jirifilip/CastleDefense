define([], function() {
  function UpdateCtrl(herniPlocha, hrac, gener, zakladniUdaje, collCtrl) {
    var collisionCtrl = collCtrl;
    var generatorNepratel = gener;
    pocitadlo = 0;
    this.mainUpdate = function() {
      pocitadlo++;
      herniPlocha.update();
      generatorNepratel.update();
      hrac.update();
      collisionCtrl.update();
    }


    this.interval = setInterval(this.mainUpdate, 20);


  }

  return UpdateCtrl;
})
