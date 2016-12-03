define(["jquery", "HerniPlocha", "ZakladniUdaje", "Vykreslovac", "Hrac", "UpdateCtrl", "GeneratorTrasy", "GeneratorNepratel", "CollisionCtrl"], function($, HerniPlocha, ZakladniUdaje, Vykreslovac, Hrac, UpdateCtrl, GeneratorTrasy, GeneratorNepratel, CollisionCtrl) {
  var controller = gamee.controller.requestController('FiveButtons', {enableKeyboard: true});




  $(function() {

    vykreslovac = new Vykreslovac();


    //zadání rozměrů a id canvas
    zakladniUdaje = new ZakladniUdaje(480, "herniPlocha", vykreslovac);
    generatorTrasy = new GeneratorTrasy(zakladniUdaje);
    herniPlocha = new HerniPlocha(zakladniUdaje, vykreslovac);


    generatorNepratel = new GeneratorNepratel(zakladniUdaje);
    hrac = new Hrac(zakladniUdaje);

    collisionCtrl = new CollisionCtrl(zakladniUdaje);
    updateCtrl = new UpdateCtrl(herniPlocha, hrac, generatorNepratel, zakladniUdaje, collisionCtrl);

    controller.buttons.left.on('keydown', function() {
      hrac.getDelo()[2].vystrel(-1, 0);
    } );
    controller.buttons.right.on('keydown', function() {
      hrac.getDelo()[1].vystrel(1, 0);
    } );
    controller.buttons.up.on('keydown' , function() {
      hrac.getDelo()[0].vystrel(0, -1);
    } );
    controller.buttons.down.on('keydown', function() {
      hrac.getDelo()[3].vystrel(0, 1);
    } );

  });


  controller.buttons.A.on('keydown' );
})
