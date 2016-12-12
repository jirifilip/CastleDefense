define(["Strela", "Zvuk"], function(Strela, Zvuk) {
  function Delo(x, y, ctx, rozmer, Vykreslovac, zaklUd) {
    var zakladniUdaje = zaklUd;
    var nabito = true;
    var MaxNabiti = zakladniUdaje.getCooldownDela();
    var aktNabiti = MaxNabiti;
    var rozmerPlatna = rozmer * 11;
    var rozmer = rozmer;
    var rozsah = rozmer / 1.5;
    const velikostStrely = rozsah / 5;
    var vykreslovac = Vykreslovac;
    var strela;
    var x = x;
    var y = y;
    var typ; //ohnivá koule nebo normální střela

    this.strely = [];

    var i;

    this.update = function() {
      MaxNabiti = zakladniUdaje.getCooldownDela()
      if (!nabito) {
        aktNabiti++;
        if (aktNabiti >= MaxNabiti) {
          nabito = true;
          aktNabiti = MaxNabiti;
        }
      }
      ctx.beginPath();
      if (nabito) {
        zakladniUdaje.getAktualniUpgrade() == "cooldown"? ctx.fillStyle = "yellow" : ctx.fillStyle = "blue";
      }
      else {
        zakladniUdaje.getAktualniUpgrade() == "cooldown"? ctx.fillStyle = "#333300" : ctx.fillStyle = "red";
      }
      ctx.arc(x, y, rozsah/6, 0, aktNabiti / MaxNabiti * 2 * Math.PI);
      ctx.fill();

      for (i = 0; i < this.strely.length; i++) {
        if (this.strely[i] !== undefined) {
          if (!this.strely[i].mimo) {
            this.strely[i].update();
          }
          else {
            this.strely[i] = undefined;
          }
        }
      }
    }

    this.vystrel = function(smerX, smerY, bezCooldownu) {
      if (nabito || bezCooldownu) {
        zapsano = false;
        bezCooldownu? typ = "ohnivaKoule" : typ = "strela";
        strela = new Strela (vykreslovac, ctx, velikostStrely, smerX, smerY, x, y, rozmerPlatna, typ);
        for (i = 0; i < this.strely.length; i++) {
          if (this.strely[i] == undefined) {
            this.strely[i] = strela;
            zapsano = true;
          }
        }
        if (!zapsano) {
          this.strely.push(strela);
        }
        if (!bezCooldownu) {
          nabito = false;
          aktNabiti = 0;
        }
      }
    }

    this.setAktNabiti = function() {
      MaxNabiti = zakladniUdaje.getCooldownDela();
      aktNabiti = MaxNabiti;
    }
  }

  return Delo;
})
