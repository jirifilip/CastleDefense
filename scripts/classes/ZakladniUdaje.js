define([
  "GeneratorTrasy",
   "Zvuk"
 ], function (
    GeneratorTrasy,
    Zvuk
  ) {
  function ZakladniUdaje(rozmer, id, Vykreslovac) {
    //musí být liché
    const sloupcuRadku = 11;
    const rozmerHraduStrana = 3;

    var rozmer = rozmer;
    var id = id;
    var rozmerJednohoGridu = rozmer / sloupcuRadku;
    var ctx;

    var pauza = false;
    var pocetZabitych = 0;
    var upgradeReady = false;
    var cooldownDela = 100;
    var aktualniUpgrade = undefined;
    var akce = false; //stisknut mezerník

    //vypočtení lokace hradu, výpočty jsou už upravené pro cyklus
    var zakladniSouradniceHradu = Math.round(sloupcuRadku / rozmerHraduStrana);

    const lokaceHradu = zakladniSouradniceHradu * rozmerJednohoGridu;
    const rozmerHradu = rozmerHraduStrana * rozmerJednohoGridu;

    //proměnné do cyklu
    var i;
    var j;

    //zvuk, který se přehraje při použití upgradu
    var upgradePouzitiZvuk = new Zvuk("sounds/upgradeUsed.mp3");
    upgradePouzitiZvuk.setVolume(0.5);

    //kontroluje, aby z děla nemohly vyjít dvě střely zároveň při použití upgradu
    var uzJednaStrela = { existuje : false, pocitadlo : 40, puvodniHodnota : 40};

    //trasa a cesta nepřátel
    var trasa;
    var spawnpointy;
    var smer;
    var nepratele;
    var delo;

    //rychlost, zdraví různých druhů nepřátel
    const obtiznost = {rychlost : 50, zdravi : 25, generovani : 50}; //z tohoto údaje vypočítáme pohyb nepřátel
    var druhyNepratel = [
      {"rychlost" : obtiznost.rychlost * 2, "zdravi" : obtiznost.zdravi},
      {"rychlost" : obtiznost.rychlost * 4, "zdravi" : obtiznost.zdravi * 2},
      {"rychlost" : obtiznost.rychlost * 6, "zdravi" : obtiznost.zdravi * 3}, //čím vyšší rychlost, tím pomalejší
    ]

    this.vykreslovac = Vykreslovac;

    this.grid = [];

    //vytvoření dvourozměrného gridu
    for (i = 0; i < sloupcuRadku; i++) {
      this.grid[i] = [];
      for (j = 0; j < sloupcuRadku; j++) {
        this.grid[i][j] = "NIC";
      }
    }

    //vypočtení lokace, kde se bude nacházet upgrade
    var lokaceUpgradu = {
      x : Math.round(sloupcuRadku/2) * rozmerJednohoGridu,
      y : rozmerJednohoGridu / 4,
      sirkaX : Math.round(sloupcuRadku/2 - 2) * rozmerJednohoGridu,
      sirkaY : rozmerJednohoGridu / 2,
    }
    //lokace GUI
    var lokaceGUI = {
      x: (sloupcuRadku/2) * rozmerJednohoGridu,
      y: 0,
      sirkaX: Math.round(sloupcuRadku/2) * rozmerJednohoGridu,
      sirkaY : rozmerJednohoGridu,
    }


    //vypsání lokace hradu
    for (i = zakladniSouradniceHradu; i < zakladniSouradniceHradu + rozmerHraduStrana; i++) {
      for (j = zakladniSouradniceHradu; j < zakladniSouradniceHradu + rozmerHraduStrana; j++) {
        this.grid[i][j] = "hrad";
      }
    }

    //gettery
    this.getCtx = function() {
      return ctx;
    }
    this.getSloupceRadky = function() {
      return sloupcuRadku;
    }
    this.getGrid = function() {
      return this.grid;
    };
    this.getRozmer = function() {
      return rozmer;
    };
    this.getId = function() {
      return id;
    };
    this.getLokaceHradu = function() {
      //vrátí pole se souřadnicemi pro vykreslení
      return lokaceHradu;
    };
    this.getRozmerHradu = function() {
      return rozmerHradu;
    };
    this.getTrasa = function() {
      return trasa;
    };
    this.getSpawnpoint = function() {
      return spawnpoint;
    }
    this.getSmer = function() {
      return smer;
    }
    this.getVykreslovac = function() {
      return this.vykreslovac;
    }
    this.getNepratele = function() {
      return nepratele;
    }
    this.getDelo = function() {
      return delo;
    }
    this.getPauza = function() {
      return pauza;
    }
    this.getPocetZabitych = function() {
      return pocetZabitych;
    }
    this.getDruhyNepratel = function() {
      return druhyNepratel;
    }
    this.getObtiznost = function() {
      return obtiznost;
    }
    this.getLokaceUpgradu = function() {
      return lokaceUpgradu;
    }
    this.getLokaceGUI = function() {
      return lokaceGUI;
    }
    this.getRozmerHradu = function() {
      return rozmerHradu;
    }
    this.getUpgradeReady = function() {
      return upgradeReady;
    }
    this.getCooldownDela = function() {
      return cooldownDela;
    }
    this.getRozmerJednohoGridu = function() {
      return rozmerJednohoGridu;
    }
    this.getAktualniUpgrade = function() {
      return aktualniUpgrade;
    }
    this.getAkce = function() {
      return akce;
    }
    this.getUpgradePouzitiZvuk = function() {
      return upgradePouzitiZvuk;
    }
    this.getUzJednaStrela = function() {
      return uzJednaStrela;
    }


    //settery
    this.setCtx = function(val) {
      ctx = val;
    };
    this.setTrasa = function(val) {
      trasa = val;
    };
    this.setSpawnpoint = function(val) {
      spawnpoint = val;
    };
    this.setSmer = function(val) {
      smer = val;
    };
    this.setNepratele = function(val) {
      nepratele = val;
    };
    this.setDelo = function(val) {
      delo = val;
    }
    this.setPauza = function() {
      pauza = !pauza;
    }
    this.incPocetZabitych = function(val) {
      pocetZabitych++
    }
    this.setPocetZabitych = function(val) {
      pocetZabitych = val;
    }
    this.setUpgradeReady = function(val) {
      upgradeReady = val;
    }
    this.setCooldownDela = function(val) {
      cooldownDela = val;
    }
    this.setAktualniUpgrade = function(val) {
      aktualniUpgrade = val;
    }
    this.setAkce = function(val) {
      akce = val;
    }
    this.setUzJednaStrela = function(existuje, pocitadlo, prepsat) {
      uzJednaStrela.existuje = existuje;
      prepsat? uzJednaStrela.pocitadlo = pocitadlo : uzJednaStrela.pocitadlo += pocitadlo ;
    }


  }

  return ZakladniUdaje;
})
