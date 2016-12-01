define([], function() {
  function UpdateCtrl(herniPlocha, hrac, holo) {
    this.mainUpdate = function() {
      herniPlocha.update();
      hrac.update();
      holo.update();
      console.log(1);
    }


    this.interval = setInterval(this.mainUpdate, 20);


  }

  return UpdateCtrl;
})
