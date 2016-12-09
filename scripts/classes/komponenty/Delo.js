define(["Strela", "Zvuk"], function(Strela, Zvuk) {
  function Delo(x, y, ctx, rozmer, Vykreslovac) {
    var nabito = true;
    const MaxNabiti = 100 ;
    var aktNabiti = MaxNabiti;
    var rozmerPlatna = rozmer * 11;
    var rozmer = rozmer;
    var rozsah = rozmer / 1.5;
    const velikostStrely = rozsah / 5;
    var vykreslovac = Vykreslovac;
    var strela;
    var x = x;
    var y = y;
    var strelbaDeloZvuk = new Zvuk("sounds/delo.mp3");

    this.strely = [];

    var i;

    this.update = function() {
      if (!nabito) {
        aktNabiti++;
        if (aktNabiti >= MaxNabiti) {
          nabito = true;
          aktNabiti = MaxNabiti;
        }
      }
      ctx.beginPath();
      nabito? ctx.fillStyle = "blue" : ctx.fillStyle = "red";
      //ctx.fillRect(x, y, rozsah * aktNabiti / MaxNabiti, rozsah/2);
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
        strelbaDeloZvuk.prehraj();
        strela = new Strela (vykreslovac, ctx, velikostStrely, smerX, smerY, x, y, rozmerPlatna);
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
  }

  return Delo;
})
