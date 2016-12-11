define(["jquery",
        "HerniPlocha",
        "ZakladniUdaje",
        "Vykreslovac",
        "Hrac",
        "UpdateCtrl",
        "GeneratorTrasy",
        "GeneratorNepratel",
        "CollisionCtrl",
        "UpgradeCtrl"],
function($,
        HerniPlocha,
        ZakladniUdaje,
        Vykreslovac,
        Hrac,
        UpdateCtrl,
        GeneratorTrasy,
        GeneratorNepratel,
        CollisionCtrl,
        UpgradeCtrl)
  {


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
    upgradeCtrl = new UpgradeCtrl(zakladniUdaje);
    updateCtrl = new UpdateCtrl(herniPlocha, hrac, generatorNepratel, zakladniUdaje, collisionCtrl, upgradeCtrl);

    controller.buttons.left.on('keydown', function() {
      hrac.getDelo()[2].vystrel(-1, 0, false);
    } );
    controller.buttons.right.on('keydown', function() {
      hrac.getDelo()[1].vystrel(1, 0, false);
    } );
    controller.buttons.up.on('keydown' , function() {
      hrac.getDelo()[0].vystrel(0, -1, false);
    } );
    controller.buttons.down.on('keydown', function() {
      hrac.getDelo()[3].vystrel(0, 1, false);
    } );
    controller.buttons.A.on('keydown', function() {
      if (zakladniUdaje.getUpgradeReady()) {
        zakladniUdaje.setUpgradeReady(false);
        upgradeCtrl.getAktUpg().pouzij();
      }
    } );

  });



})
