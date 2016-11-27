define([], function() {
  function UpdateCtrl(herniPlocha, hrac) {
    this.mainUpdate = function() {
      herniPlocha.update();
      hrac.update();
      console.log(1);
    }


    this.interval = setInterval(this.mainUpdate, 20);


  }

  return UpdateCtrl;
})
