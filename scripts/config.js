requirejs.config({
  baseUrl: "scripts",
  paths: {
    //PubSub
    events: "PubSub",

    //základní
    jquery: '../bower_components/jquery/dist/jquery',
    ZakladniUdaje: "classes/ZakladniUdaje",
    Vykreslovac: "classes/Vykreslovac",
    Hrac: "classes/Hrac",
    HerniPlocha: "classes/HerniPlocha",
    GeneratorNepratel: "classes/GeneratorNepratel",
    GeneratorTrasy: "classes/GeneratorTrasy",
    Zvuk: "classes/Zvuk",

    //kontrolery
    CollisionCtrl: "classes/controllers/CollisionCtrl",
    ScoreCtrl: "classes/controllers/ScoreCtrl",
    UpdateCtrl: "classes/controllers/UpdateCtrl",
    UpgradeCtrl: "classes/controllers/UpgradeCtrl",
      //upgrady
      BarikadyUpg: "classes/controllers/upgrady/BarikadyUpg",
      CooldownUpg: "classes/controllers/upgrady/CooldownUpg",
      VsechnySmeryUpg: "classes/controllers/upgrady/VsechnySmeryUpg",

    //komponenty
    Delo: "classes/komponenty/Delo",
    Nepritel: "classes/komponenty/Nepritel",
    Strela: "classes/komponenty/Strela",
    Upgrade: "classes/komponenty/Upgrade",


    }
});
