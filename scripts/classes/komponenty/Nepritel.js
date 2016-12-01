//atribud typ, podle kterého bude vytvářet různé typy přátel
//typ bude číslo, generovat ho bude náhodně generátor nepřátel
define([], function() {
  function Nepritel(spwnp, smr, rzmr, ctx, vykres) {
    const maxZdravi = 100;
    var aktZdravi = maxZdravi;

    var spawnpoint = spwnp;
    var vykreslovac = vykres;

    var rozmer = rzmr;
    var polohaZdravi = rozmer / 2;
    var offset = rozmer / 2;

    var ctx = ctx;

    var x = spawnpoint.x + offset;
    var y = spawnpoint.y + offset;

    var pohyb = { "aktPole" : 0, "aktVzdal" : 0, "rychlost" : rozmer / 30 };

    var smer = smr;
    this.getSmer = function() {
      return smer;
    }

    var rychlostPohybu = 2;

    var _jeSmerNegativni = function(smer) {

      if (smer[0].x > 0) {
        return false;
      }
      else if (smer[0].x = 0) {
        if (smer[0].y > 0)
          return false;
        else {
          return true;
        }
      }
      else if (smer[0].x < 0) {
        return true;
      }
    }
    var negativniSmer = _jeSmerNegativni(smer);

    this.negativni = function(smer) {
      return _jeSmerNegativni(smer);
    }

    var _vykresliZdravi = function () {
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.fillRect(x, y - polohaZdravi, rozmer  * aktZdravi / maxZdravi, polohaZdravi);
      ctx.fill();
    }
    var _hybejSe = function() {
      pohyb.aktVzdal += smer[pohyb.aktSour];
    }

    this.update = function () {
      _hybejSe();
       _vykresliZdravi();
      vykreslovac.nepritel(ctx, x, y, rozmer, 0);
    }

  }

  return Nepritel;
});
