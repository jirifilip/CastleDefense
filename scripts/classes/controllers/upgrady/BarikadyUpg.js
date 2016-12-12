define([], function() {
  function BarikadyUpg(zaklUd) {
    this.ikonka = new Image();
    this.ikonka.src = "images/barikadyUpg.jpg";

    zakladniUdaje = zaklUd;
    vykreslovac = zakladniUdaje.vykreslovac;
    ctx = zakladniUdaje.getCtx();
    trasa = zakladniUdaje.getTrasa();
    rozmer = zakladniUdaje.getRozmerJednohoGridu();
    var temp;

    this.nazev = "barikady";

    var _vykresliPalisady = function() {
      for (i = 0; i < 4; i++) {
        if (i == 1 || i == 3) {
          temp = trasa[i][0];
          vykreslovac.barikada(ctx, temp.x, temp.y, rozmer, i);
        }
        else {
          temp = trasa[i][trasa[i].length - 1];
          vykreslovac.barikada(ctx, temp.x, temp.y, rozmer, i);
        }
      }
    }

    this.pouzij = function() {
      if (zakladniUdaje.getAktualniUpgrade() == "barikady") {
        _vykresliPalisady();
      }
    }
  }

  return BarikadyUpg;
})
