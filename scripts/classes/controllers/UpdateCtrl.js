define([], function() {
  function UpdateCtrl(herniPlocha, hrac, nepratele) {
    this.mainUpdate = function() {
      herniPlocha.update();
      hrac.update();
      for (i = 0; i < nepratele.length; i++) {
        nepratele[i].update();
      }
      console.log(1);
    }


    this.interval = setInterval(this.mainUpdate, 20);


  }

  return UpdateCtrl;
})
