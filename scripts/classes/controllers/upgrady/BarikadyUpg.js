define([], function() {
  function BarikadyUpg(zaklUd) {
    zakladniUdaje = zaklUd;
    vykreslovac = zakladniUdaje.vykreslovac;
    ctx = zakladniUdaje.getCtx();
    trasa = zakladniUdaje.getTrasa();
    rozmer = zakladniUdaje.getRozmerJednohoGridu();
    var temp;

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
      _vykresliPalisady();
      zakladniUdaje.setBarikady(true);
    }
  }

  return BarikadyUpg;
})
