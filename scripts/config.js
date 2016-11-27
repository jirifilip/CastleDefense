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

    //kontrolery
    CollisionCtrl: "classes/controllers/CollisionCtrl",
    ScoreCtrl: "classes/controllers/ScoreCtrl",
    UpdateCtrl: "classes/controllers/UpdateCtrl",

    //komponenty
    Delo: "classes/komponenty/Delo",
    Nepritel: "classes/komponenty/Nepritel",
    Strela: "classes/komponenty/Strela",
    Upgrade: "classes/komponenty/Upgrade",


    }
});
