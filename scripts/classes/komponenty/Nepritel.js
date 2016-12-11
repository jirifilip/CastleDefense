//atribud typ, podle kterého bude vytvářet různé typy přátel
//typ bude číslo, generovat ho bude náhodně generátor nepřátel
define([], function() {
  function Nepritel(zaklUd, znamenko, obrz, druh) {
    var zakladniUdaje = zaklUd;

    //číslo 1 - 3
    //3 je nejtěžší
    const druhNepritele = druh;

    const maxZdravi = zakladniUdaje.getDruhyNepratel()[druh-1].zdravi
    var aktZdravi = maxZdravi;
    const zraneni = zakladniUdaje.getObtiznost().zdravi; //jak moc nepřítele poškodí jedna střela

    var rychlostPohybu =zakladniUdaje.getDruhyNepratel()[druh-1].rychlost

    var i = obrz;
    var obrazek = obrz;


    var spawnpoint = zakladniUdaje.getSpawnpoint()[i];
    var vykreslovac = zakladniUdaje.getVykreslovac();

    var rozmer = zakladniUdaje.getRozmer() / 22;
    var polohaZdravi = rozmer / 2;
    var offset = rozmer / 2;

    var ctx = zakladniUdaje.getCtx();

    var x = spawnpoint.x + offset;
    var y = spawnpoint.y + offset;




    var pohyb = { "aktPole" : 0, "aktVzdalX" : 0, "aktVzdalY" : 0, "rychlost" : 30, "pocitadlo" : 0, "konec" : false};

    var smer = zakladniUdaje.getSmer()[i];
    var delkaSmeru = smer.length;

    this.getSmer = function() {
      return smer;
    }

    var _vykresliZdravi = function () {
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.fillRect(x, y - polohaZdravi, rozmer  * aktZdravi / maxZdravi, polohaZdravi);
      ctx.fill();
    }
    var _hybejSe = function() {
      if (pohyb.aktPole < delkaSmeru) {
        pohyb.pocitadlo++;
        x += smer[pohyb.aktPole].x/rychlostPohybu;
        y += znamenko * smer[pohyb.aktPole].y/rychlostPohybu;
        if (pohyb.pocitadlo >= rychlostPohybu) {
          pohyb.pocitadlo = 0;
          pohyb.aktPole++;
        }
      }
      if (pohyb.aktPole >= delkaSmeru) {
        if (!pohyb.konec) {
          pohyb.aktPole--;
          pohyb.konec = true;
          if (zakladniUdaje.getBarikady()) {
            aktZdravi -= aktZdravi
          }
          else {
            zakladniUdaje.setPauza();
          }
        }
      }
    }

    this.update = function () {
      _hybejSe();
       _vykresliZdravi();
      vykreslovac.nepritel(ctx, x, y, rozmer, druh, obrazek);
      if (aktZdravi <= 0) {
        zakladniUdaje.incPocetZabitych();
        pohyb.konec = true;
      }
    }

    this.odectiZivot = function() {
      aktZdravi -= zraneni;
    }

    this.getPohyb = function() {
      return pohyb;
    }
    this.getXY = function() {
      return {"x" : x, "y" : y, "rozmer" : rozmer};
    }
    this.getZdravi = function() {
      return aktZdravi;
    }

  }

  return Nepritel;
});
