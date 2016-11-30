//atribud typ, podle kterého bude vytvářet různé typy přátel
//typ bude číslo, generovat ho bude náhodně generátor nepřátel
define([], function() {
  function Nepritel(spwnp, trs, smr, rzmr, ctx, vykres) {
    const maxZdravi = 100;
    var aktZdravi = maxZdravi;

    var spawnpoint = spwnp;
    var vykreslovac = vykres;

    var rozmer = rzmr;
    var polohaZdravi = rozmer / 2;
    var offset = rozmer / 2;

    var x = spawnpoint.x + offset;
    var y = spawnpoint.y + offset;



    var trasa = trs;
    var smer = smr;


    var rychlostPohybu;

    var _vykresliZdravi = function () {
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.fillRect(x, y - polohaZdravi, rozmer  * aktZdravi / maxZdravi, polohaZdravi);
      ctx.fill();
    }

    var _hybejSe = function(smer) {
      x -= smer;
    }

    this.update = function () {
      _hybejSe(1);
       _vykresliZdravi();
      vykreslovac.nepritel(ctx, x, y, rozmer, 0);
    }

  }

  return Nepritel;
});
