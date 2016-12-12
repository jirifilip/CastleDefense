define(["jquery",
        "HerniPlocha",
        "ZakladniUdaje",
        "Vykreslovac",
        "Hrac",
        "UpdateCtrl",
        "GeneratorTrasy",
        "GeneratorNepratel",
        "CollisionCtrl",
        "UpgradeCtrl",
        "ScoreCtrl"
], function($,
        HerniPlocha,
        ZakladniUdaje,
        Vykreslovac,
        Hrac,
        UpdateCtrl,
        GeneratorTrasy,
        GeneratorNepratel,
        CollisionCtrl,
        UpgradeCtrl,
        ScoreCtrl
){


  var controller = gamee.controller.requestController('FiveButtons', {enableKeyboard: true});





    vykreslovac = new Vykreslovac();


    //zadání rozměrů a id canvas
    zakladniUdaje = new ZakladniUdaje(480, "herniPlocha", vykreslovac);
    generatorTrasy = new GeneratorTrasy(zakladniUdaje);
    herniPlocha = new HerniPlocha(zakladniUdaje, vykreslovac);


    generatorNepratel = new GeneratorNepratel(zakladniUdaje);
    hrac = new Hrac(zakladniUdaje);

    collisionCtrl = new CollisionCtrl(zakladniUdaje);
    upgradeCtrl = new UpgradeCtrl(zakladniUdaje);
    scoreCtrl = new ScoreCtrl(zakladniUdaje);
    updateCtrl = new UpdateCtrl(herniPlocha, hrac, generatorNepratel, zakladniUdaje, collisionCtrl, upgradeCtrl, scoreCtrl);

    gamee.gameStart();

    controller.buttons.left.on('keydown', function() {
      if (!zakladniUdaje.getUzJednaStrela().existuje && !zakladniUdaje.getPauza()) {
        hrac.getDelo()[2].vystrel(-1, 0, false);
      }
    } );
    controller.buttons.right.on('keydown', function() {
      if (!zakladniUdaje.getUzJednaStrela().existuje && !zakladniUdaje.getPauza()) {
        hrac.getDelo()[1].vystrel(1, 0, false);
      }
    } );
    controller.buttons.up.on('keydown' , function() {
      if (!zakladniUdaje.getUzJednaStrela().existuje && !zakladniUdaje.getPauza()) {
        hrac.getDelo()[0].vystrel(0, -1, false);
      }
    } );
    controller.buttons.down.on('keydown', function() {
      if (!zakladniUdaje.getUzJednaStrela().existuje && !zakladniUdaje.getPauza()) {
        hrac.getDelo()[3].vystrel(0, 1, false);
      }
    } );
    controller.buttons.A.on('keydown', function() {
      if (zakladniUdaje.getUpgradeReady() && !zakladniUdaje.getPauza()) {
        zakladniUdaje.getUpgradePouzitiZvuk().prehraj();
        zakladniUdaje.setAkce(true);
      }

    gamee.onPause = function() {
      zakladniUdaje.setPauza();
    }

    gamee.onResume = function() {
      zakladniUdaje.setPauza();
    }

    } );
})
