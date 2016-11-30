define([], function() {
  function UpdateCtrl(herniPlocha, hrac, hoho) {
    this.mainUpdate = function() {
      herniPlocha.update();
      hrac.update();
      hoho.update();
      console.log(1);
    }


    this.interval = setInterval(this.mainUpdate, 20);


  }

  return UpdateCtrl;
})
