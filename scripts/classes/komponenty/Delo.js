define(["Strela"], function(Strela) {
  function Delo(x, y, ctx, rozmer, Vykreslovac) {
    var nabito = true;
    const MaxNabiti = 200 ;
    var minNabiti = MaxNabiti;
    var rozsah = rozmer / 1.5;
    const velikostStrely = rozsah / 5;
    var vykreslovac = Vykreslovac;
    var strela;
    var x = x;
    var y = y;

    this.strely = [];

    var i;

    this.update = function() {
      if (!nabito) {
        minNabiti++;
        if (minNabiti >= MaxNabiti) {
          nabito = true;
          minNabiti = MaxNabiti;
        }
      }
      nabito? ctx.fillStyle = "blue" : ctx.fillStyle = "red";
      ctx.fillRect(x, y, rozsah * minNabiti / MaxNabiti, rozsah/2);

      for (i = 0; i < this.strely.length; i++) {
        this.strely[i].update();
      }
    }

    this.vystrel = function(smerX, smerY) {
      if (nabito) {
        strela = new Strela (vykreslovac, ctx, velikostStrely, smerX, smerY, x, y);
        this.strely.push(strela);
        nabito = false;
        minNabiti = 0;
      }

    }
  }

  return Delo;
})
