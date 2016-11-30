define(["jquery", "HerniPlocha", "ZakladniUdaje", "Vykreslovac", "Hrac", "UpdateCtrl", "GeneratorTrasy", "GeneratorNepratel", "Nepritel"], function($, HerniPlocha, ZakladniUdaje, Vykreslovac, Hrac, UpdateCtrl, GeneratorTrasy, GeneratorNepratel, Nepritel) {
  var controller = gamee.controller.requestController('FiveButtons', {enableKeyboard: true});




  $(function() {

    vykreslovac = new Vykreslovac();


    //zadání rozměrů a id canvas
    zakladniUdaje = new ZakladniUdaje(480, "herniPlocha", vykreslovac);
    generatorTrasy = new GeneratorTrasy(zakladniUdaje);
    herniPlocha = new HerniPlocha(zakladniUdaje, vykreslovac);

    generatorNepratel = new GeneratorNepratel(zakladniUdaje);
    hrac = new Hrac(zakladniUdaje);
    hoho = new Nepritel(zakladniUdaje.getSpawnpoint()[1], "trasa", 1, 20, zakladniUdaje.getCtx(), vykreslovac);
    updateCtrl = new UpdateCtrl(herniPlocha, hrac, hoho);

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
