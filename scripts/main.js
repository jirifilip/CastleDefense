define(["jquery", "HerniPlocha", "ZakladniUdaje", "Vykreslovac", "Hrac", "UpdateCtrl"], function($, HerniPlocha, ZakladniUdaje, Vykreslovac, Hrac, UpdateCtrl) {
  var controller = gamee.controller.requestController('FiveButtons', {enableKeyboard: true});

  controller.buttons.left.on('keydown' );
  controller.buttons.right.on('keydown' );
  controller.buttons.up.on('keydown' );
  controller.buttons.down.on('keydown' );
  controller.buttons.A.on('keydown' );


  $(function() {

    vykreslovac = new Vykreslovac();

    //zadání rozměrů a id canvas
    zakladniUdaje = new ZakladniUdaje(320, "herniPlocha", vykreslovac);
    herniPlocha = new HerniPlocha(zakladniUdaje, vykreslovac);
    hrac = new Hrac(vykreslovac, herniPlocha, zakladniUdaje);
    updateCtrl = new UpdateCtrl(herniPlocha, hrac);

  });

})
