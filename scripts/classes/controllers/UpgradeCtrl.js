define([
  "BarikadyUpg",
  "CooldownUpg",
  "VsechnySmeryUpg",
  "Zvuk"
], function(
  BarikadyUpg,
  CooldownUpg,
  VsechnySmeryUpg,
  Zvuk
) {
  function UpgradeCtrl(zaklUd) {
    //tento objekt se stará o aktivování upgradů

    var zakladniUdaje = zaklUd;
    var vykreslovac = zakladniUdaje.vykreslovac;
    var rozmerIkonky = zakladniUdaje.getRozmerJednohoGridu() / 2;
    var alert = false; //aby se upgrade nenačetl vícekrát
    var ctx = zakladniUdaje.getCtx();

    //zvuk, který se přehraje, když se načte upgradeCtrl
    var upgradeReadyZvuk = new Zvuk("sounds/upgradeReady.mp3");
    upgradeReadyZvuk.setVolume(0.5);

    //lokace upgradu
    var lokUp = zakladniUdaje.getLokaceUpgradu();
    var lokGUI = zakladniUdaje.getLokaceGUI();
    cas = {casKpouziti : 200, aktualniCas : 200};

    const zabitDoUpg = 4;

    var uzJednaStrela;

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


    var _vykresliCasLimit = function() {
      vykreslovac.gui(ctx, lokGUI.x, lokGUI.y, lokGUI.sirkaX, lokGUI.sirkaY);
      //vykreslí se ikonka upgradu k použití. Pokud neexistuje, vykreslí se otazník
      upgrade == undefined? ikonka = undefined : ikonka = upgrade.ikonka;
      vykreslovac.upgrade(ctx, lokUp.x + lokUp.sirkaX, lokUp.y, rozmerIkonky, ikonka);
      //pokud je aktivována akce, vykreslí, jak dlouho ještě bude trvat
      //pokud není aktivována, vykreslí, kolik nepřátel je třeba zabít, aby byla dostupná schopnost
      if (zakladniUdaje.getAkce() || zakladniUdaje.getUpgradeReady()) {
        delka = cas.aktualniCas / cas.casKpouziti * lokUp.sirkaX;
        //časový limit
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(lokUp.x, lokUp.y, delka, lokUp.sirkaY);
        ctx.fill();
      }
      else if (!zakladniUdaje.getAkce()) {
        delka = zakladniUdaje.getPocetZabitych() / zabitDoUpg * lokUp.sirkaX;
        //kolik ještě zastřelit
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(lokUp.x, lokUp.y, delka, lokUp.sirkaY);
        ctx.fill();
      }

    }

    var _odpocitavej = function() {
      if (!zakladniUdaje.getUpgradeReady()) {
        cas.aktualniCas = 0;
        //vynuluje hodnotu
      }
      if (upgrade !== undefined) {
        if (cas.aktualniCas > 0) {
          if (cas.aktualniCas < zakladniUdaje.getUzJednaStrela().pocitadlo / 2) {
            uzJednaStrela = zakladniUdaje.getUzJednaStrela();
            zakladniUdaje.setUzJednaStrela(true, uzJednaStrela.puvodniHodnota, true); //dělo nemůže, aby nevznikly dvě střely najednou
          }
          cas.aktualniCas --;
        }
        else {
          zakladniUdaje.setUpgradeReady(false);
          cas.aktualniCas = 0;
          alert = false;
          zakladniUdaje.setAktualniUpgrade(undefined);
          upgrade.pouzij();
          upgrade = undefined;
          zakladniUdaje.setPocetZabitych(0);
          zakladniUdaje.setAkce(false);
        }
      }
    }
    this.update = function() {
      //zjištění, zda dělo už může znovu střílet
      uzJednaStrela = zakladniUdaje.getUzJednaStrela();
      if ((uzJednaStrela.pocitadlo > 0) && (uzJednaStrela.existuje)) {
        zakladniUdaje.setUzJednaStrela(true, -1, false);
      }
      else {
        zakladniUdaje.setUzJednaStrela(false, uzJednaStrela.puvodniHodnota, true);
      }

      if (zakladniUdaje.getAkce()) {
        _odpocitavej();
      }
      _vykresliCasLimit();
      if (zakladniUdaje.getPocetZabitych() >= zabitDoUpg && !alert) {
        zakladniUdaje.setPocetZabitych(0);
        cas.aktualniCas = cas.casKpouziti;
        alert = true;
        switch (Math.floor(Math.random() * 3) + 1) {
          case 1:
            upgrade = nabidkaUpgradu.vsechnySmeryUpg;
            break;

          case 2:
            upgrade = nabidkaUpgradu.barikadyUpg;
            break;

          case 3:
            upgrade = nabidkaUpgradu.cooldownUpg;
        }
        zakladniUdaje.setUpgradeReady(true);
        upgradeReadyZvuk.prehraj();
      }
      if (zakladniUdaje.getAkce() && upgrade !== undefined) {
        switch (upgrade.nazev) {
          case "barikady":
            zakladniUdaje.setAktualniUpgrade("barikady");
            upgrade.pouzij();
            break;

          case "cooldown":
            zakladniUdaje.setAktualniUpgrade("cooldown");
            upgrade.pouzij();
            break;
        }
      }
    }

    this.getAktUpg = function() {
      return upgrade;
    }

  }

  return UpgradeCtrl;
})
