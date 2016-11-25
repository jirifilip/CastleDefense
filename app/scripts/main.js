define(["jquery", "HerniPlocha", "ZakladniUdaje", "Vykreslovac", "Hrac"], function($, HerniPlocha, ZakladniUdaje, Vykreslovac, Hrac) {

  $(function() {
    vykreslovac = new Vykreslovac();
    //zadání rozměrů a id canvas
    zakladniUdaje = new ZakladniUdaje(480, "herniPlocha");
    herniPlocha = new HerniPlocha(zakladniUdaje, vykreslovac);
    hrac = new Hrac(vykreslovac, herniPlocha, zakladniUdaje);
    herniPlocha.update();
    hrac.update();

  })
})
