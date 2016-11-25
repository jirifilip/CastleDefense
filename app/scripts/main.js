define(["jquery", "HerniPlocha", "ZakladniUdaje", "Vykreslovac"], function($, HerniPlocha, ZakladniUdaje, Vykreslovac) {

  $(function() {
    //zadání rozměrů a id canvas
    zakladniUdaje = new ZakladniUdaje(640, "herniPlocha");

    vykreslovac = new Vykreslovac();
    herniPlocha = new HerniPlocha(zakladniUdaje, vykreslovac);
    herniPlocha.update();
  })
})
