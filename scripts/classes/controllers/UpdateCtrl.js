define([], function() {
  function UpdateCtrl(herniPlocha, hrac, gener, zakladniUdaje) {
    generatorNepratel = gener;
    pocitadlo = 0;
    this.mainUpdate = function() {
      pocitadlo++;
      herniPlocha.update();
      hrac.update();
      generatorNepratel.update();
    }


    this.interval = setInterval(this.mainUpdate, 20);


  }

  return UpdateCtrl;
})
