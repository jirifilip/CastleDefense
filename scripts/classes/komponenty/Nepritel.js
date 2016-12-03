//atribud typ, podle kterého bude vytvářet různé typy přátel
//typ bude číslo, generovat ho bude náhodně generátor nepřátel
define([], function() {
  function Nepritel(spwnp, smr, rzmr, ctx, vykres, znamenko, obrz) {
    const maxZdravi = 100;
    var aktZdravi = maxZdravi;
    var zraneni = 50;

    var obrazek = obrz;

    var spawnpoint = spwnp;
    var vykreslovac = vykres;

    var rozmer = rzmr;
    var polohaZdravi = rozmer / 2;
    var offset = rozmer / 2;

    var ctx = ctx;

    var x = spawnpoint.x + offset;
    var y = spawnpoint.y + offset;

    var rychlostPohybu = 100;

    var pohyb = { "aktPole" : 0, "aktVzdalX" : 0, "aktVzdalY" : 0, "rychlost" : 30, "pocitadlo" : 0, "konec" : false };

    var smer = smr;
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
        }
      }
    }

    this.update = function () {
      _hybejSe();
       _vykresliZdravi();
      vykreslovac.nepritel(ctx, x, y, rozmer, obrazek);
      if (aktZdravi <= 0) {
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
