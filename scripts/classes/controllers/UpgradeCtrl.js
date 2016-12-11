define([
  "BarikadyUpg",
  "CooldownUpg",
  "VsechnySmeryUpg"
], function(
  BarikadyUpg,
  CooldownUpg,
  VsechnySmeryUpg
) {
  function UpgradeCtrl(zaklUd) {
    var zakladniUdaje = zaklUd;
    var alert = false;
    var ctx = zakladniUdaje.getCtx();
    //lokace upgradu
    var lokUp = zakladniUdaje.getLokaceUpgradu();
    cas = {casKpouziti : 200, aktualniCas : 200};

    var cooldownUpg = new CooldownUpg(zakladniUdaje);
    var barikadyUpg = new BarikadyUpg(zakladniUdaje);
    var vsechnySmeryUpg = new VsechnySmeryUpg(zakladniUdaje);

    var nabidkaUpgradu = {
      cooldownUpg : cooldownUpg,
      barikadyUpg : barikadyUpg,
      vsechnySmeryUpg : vsechnySmeryUpg,
      zadny : undefined,
    }

    //proměnná pro vykreslení zbývajícího časového limitu
    var delka;

    //upgrade, který se použije při stisknutí akce
    upgrade = nabidkaUpgradu.zadny;

    //vykreslí, jak dlouho ještě hráč může použít upgrade
    var _vykresliCasLimit = function() {
      delka = cas.aktualniCas/cas.casKpouziti * lokUp.sirkaX;
      //časový limit
      ctx.beginPath();
      ctx.fillStyle = "blue";
      ctx.fillRect(lokUp.x, lokUp.y, delka, lokUp.sirkaY);
      ctx.fill();
    }

    var _odpocitavej = function() {

      if (!zakladniUdaje.getUpgradeReady()) {
        cas.aktualniCas = 0;
        //vynuluje hodnotu
      }
      if (upgrade !== undefined) {
        if (cas.aktualniCas > 0) {
          cas.aktualniCas --;
        }
        else {
          zakladniUdaje.setUpgradeReady(false);
          cas.aktualniCas = 0;
          alert = false;
        }
      }
    }
    this.update = function() {
      _odpocitavej();
      _vykresliCasLimit();
      if (zakladniUdaje.getPocetZabitych() > 1 && !alert) {
        zakladniUdaje.setPocetZabitych(0);
        cas.aktualniCas = cas.casKpouziti;
        alert = true;
        upgrade = nabidkaUpgradu.barikadyUpg;
        zakladniUdaje.setUpgradeReady(true);

      }
      if (upgrade == nabidkaUpgradu.barikadyUpg) {
        upgrade.pouzij();
      }
    }

    this.getAktUpg = function() {
      return upgrade;
    }

  }

  return UpgradeCtrl;
})
