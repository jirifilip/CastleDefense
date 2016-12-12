define([], function() {
  function CooldownUpg(zaklUd) {
    var zakladniUdaje = zaklUd;
    const puvodni = 100;
    const nyni = 50;

    this.ikonka = new Image();
    this.ikonka.src = "images/cooldownUpg.jpg";

    this.nazev = "cooldown";


    this.pouzij = function() {
      if (zakladniUdaje.getAktualniUpgrade() == "cooldown") {
        zakladniUdaje.setCooldownDela(nyni);
      }
      else {
        zakladniUdaje.setCooldownDela(puvodni);
        for (i = 0; i < 4; i++) {
          zakladniUdaje.getDelo()[i].setAktNabiti();
        }
      }
    }
  }

  return CooldownUpg;
})
