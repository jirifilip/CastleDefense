//atribud typ, podle kterého bude vytvářet různé typy přátel
//typ bude číslo, generovat ho bude náhodně generátor nepřátel
define([
  "Zvuk"
], function(
  Zvuk
) {
  function Nepritel(zaklUd, znamenko, obrz, druh) {
    var zakladniUdaje = zaklUd;

    //zvuk, který se přehraje při umrtí
    var skoreZvuk = new Zvuk("sounds/skore.mp3");
    skoreZvuk.setVolume(0.4);

    //číslo 1 - 3
    //3 je nejtěžší
    const druhNepritele = druh;

    const maxZdravi = zakladniUdaje.getDruhyNepratel()[druh-1].zdravi
    var aktZdravi = maxZdravi;
    const zraneni = zakladniUdaje.getObtiznost().zdravi; //jak moc nepřítele poškodí jedna střela

    var rychlostPohybu =zakladniUdaje.getDruhyNepratel()[druh-1].rychlost

    var i = obrz;
    var obrazek = obrz;
    //proměnná se stará o to, jak se má obrázek otáčet
    var aktualniRotace = obrz;

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
        if (smer[pohyb.aktPole].x > 0) {
          aktualniRotace = 2;
        }
        else if (smer[pohyb.aktPole].x < 0) {
          aktualniRotace = 1;
        }
        else if (smer[pohyb.aktPole].y > 0) {
          if (i == 1 || i == 2)
            aktualniRotace = 3
          else
            aktualniRotace = 0;
        }
        else {
          if (i == 1 || i == 2)
            aktualniRotace = 0
          else
            aktualniRotace = 3;
        }
        x += smer[pohyb.aktPole].x/rychlostPohybu;
        y += znamenko * smer[pohyb.aktPole].y/rychlostPohybu;
        if (pohyb.pocitadlo >= rychlostPohybu) {
          pohyb.pocitadlo = 0;
          pohyb.aktPole++;
        }
      }
      if (pohyb.aktPole >= delkaSmeru - 1) {
        if (zakladniUdaje.getAktualniUpgrade() == "barikady") {
          aktZdravi -= aktZdravi
        }
      }
      if (pohyb.aktPole >= delkaSmeru) {
        if (!pohyb.konec) {
          pohyb.aktPole--;
          pohyb.konec = true;
          zakladniUdaje.setPauza();
        }
      }
    }

    this.update = function () {
      _hybejSe();
       _vykresliZdravi();
      vykreslovac.nepritel(ctx, x, y, rozmer, druh, aktualniRotace);
      if (aktZdravi <= 0) {
        zakladniUdaje.incPocetZabitych();
        pohyb.konec = true;
        skoreZvuk.prehraj();
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
