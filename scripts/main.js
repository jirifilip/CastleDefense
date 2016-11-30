define(["jquery", "HerniPlocha", "ZakladniUdaje", "Vykreslovac", "Hrac", "UpdateCtrl"], function($, HerniPlocha, ZakladniUdaje, Vykreslovac, Hrac, UpdateCtrl) {
  var controller = gamee.controller.requestController('FiveButtons', {enableKeyboard: true});




  $(function() {

    vykreslovac = new Vykreslovac();


    //zadání rozměrů a id canvas
    zakladniUdaje = new ZakladniUdaje(480, "herniPlocha", vykreslovac);
    herniPlocha = new HerniPlocha(zakladniUdaje, vykreslovac);

    hrac = new Hrac(zakladniUdaje);
    updateCtrl = new UpdateCtrl(herniPlocha, hrac);

    controller.buttons.left.on('keydown', function() {
      hrac.getDelo()[2].vystrel(-1, 0);
    } );
    controller.buttons.right.on('keydown', function() {
      hrac.getDelo()[3].vystrel(1, 0);
    } );
    controller.buttons.up.on('keydown' , function() {
      hrac.getDelo()[0].vystrel(0, -1);
    } );
    controller.buttons.down.on('keydown', function() {
      hrac.getDelo()[1].vystrel(0, 1);
    } );

  });


  controller.buttons.A.on('keydown' );
})
