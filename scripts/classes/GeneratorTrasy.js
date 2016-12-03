define([], function() {
  function GeneratorTrasy(zkUd) {
    zakladniUdaje = zkUd;
    var sloupcuRadku = zakladniUdaje.getSloupceRadky();
    var grid = zakladniUdaje.getGrid();
    var rozmer = zakladniUdaje.getRozmer();
    var rozmerJednohoGridu = rozmer / sloupcuRadku;

    var trasa = [
      [], [], [], []
    ];

    var spawnpoint = [];

    var zaklSourMensi = Math.floor(sloupcuRadku / 2) - 1; //4
    var zaklSourVetsi = zaklSourMensi++; //5


    var udaje = [
     { "jmeno" : "trasa1", "priorita" : "smerRd", "krokRd" : -1, "krokSl" : -1, "x" : zaklSourVetsi + 1, "y" : zaklSourMensi - 2},
     { "jmeno" : "trasa2", "priorita" : "smerSl", "krokRd" : 1, "krokSl" : -1, "x" : zaklSourVetsi + 3, "y" : zaklSourVetsi + 1 },
     { "jmeno" : "trasa3", "priorita" : "smerSl", "krokRd" : -1, "krokSl" : 1, "x" : zaklSourMensi - 2, "y" : zaklSourVetsi + 1 },
     { "jmeno" : "trasa4", "priorita" : "smerRd", "krokRd" : 1, "krokSl" : 1, "x" : zaklSourVetsi + 1, "y" : zaklSourVetsi + 3},
   ];

    var  _existujeDalsi = function (udaje, aktSour) {
      if (aktSour.Sl > 0 && aktSour.Rd > 0 && aktSour.Sl < 10 && aktSour.Rd < 10) {
        return true;
      }
      else {
        return false;
      }
    }

    var _zapisPohyb = function (krok, aktSour, predchoziSmer, smer, vynulovat) {
      if (vynulovat)
        predchoziSmer.pocitadlo = 0;
      predchoziSmer.pocitadlo = 0;
      predchoziSmer.smer = smer;
      if (smer == "smerRd")
        aktSour.Rd += krok.Rd;
      else {
        aktSour.Sl += krok.Sl;
      }
      predchoziSmer.pocitadlo++;
    }

    var _generujTrasu = function (udaje, grid) {
      var udaje = udaje;
      var krok = {"Sl" : udaje.krokRd, "Rd" : udaje.krokSl};
      var predchoziSmer = {"smer" : "", "pocitadlo" : 0};
      var aktSour = {"Sl" : udaje.x, "Rd" : udaje.y};
      var dalsiSmer = "smerSl";
      var zacatekPocitadlo = 1;
      while(_existujeDalsi(udaje, aktSour)) {
        grid[aktSour.Sl][aktSour.Rd] = udaje.jmeno;
        //VRdlosování, jestli se půjde směrem Sl nebo směrem Rd
        if (zacatekPocitadlo > 0) {
          if (udaje.priorita == "smerSl") {
            _zapisPohyb(krok, aktSour, predchoziSmer, "smerSl", false);
            zacatekPocitadlo--;
          }
          else {
            _zapisPohyb(krok, aktSour, predchoziSmer, "smerRd", false);
            zacatekPocitadlo--;
          }
        }
        else {
          if (Math.round(Math.random()) > 0) {
            //ověření, zda jsme nejdeme stejným směrem vícetkrát, než je možno
            if (predchoziSmer.smer == "smerSl" && predchoziSmer.pocitadlo > 2) {
                _zapisPohyb(krok, aktSour, predchoziSmer, "smerRd", true);
              }
            else {
                _zapisPohyb(krok, aktSour, predchoziSmer, "smerSl", false);
            }
          }
          else {
            if (predchoziSmer.smer == "smerRd" && predchoziSmer.pocitadlo > 2) {
                _zapisPohyb(krok, aktSour, predchoziSmer, "smerSl", true);
              }
              else {
                _zapisPohyb(krok, aktSour, predchoziSmer, "smerRd", false);
              }
          }
        }
      }
      grid[aktSour.Sl][aktSour.Rd] = udaje.jmeno;
    }

    this.generuj = function() {
      for (i = 0; i < 4; i++) {
        _generujTrasu(udaje[i], grid);
      }

      poc = {"tr1" : 0, "tr2" : 0, "tr3" : 0, "tr4" : 0};
      for (i = 0; i < sloupcuRadku; i++) {
        for (j = 0; j < sloupcuRadku; j++) {
          switch(grid[i][j]) {
            case "trasa1":
              trasa[0][poc.tr1] = {"x" : i * rozmerJednohoGridu, "y" : j * rozmerJednohoGridu, "konec" : false};
              poc.tr1++
              break;

            case "trasa2":
              trasa[1][poc.tr2] = {"x" : i * rozmerJednohoGridu, "y" : j * rozmerJednohoGridu, "konec" : false};
              poc.tr2++
              break;

            case "trasa3":
              trasa[2][poc.tr3] = {"x" : i * rozmerJednohoGridu, "y" : j * rozmerJednohoGridu, "konec" : false};
              poc.tr3++
              break;

            case "trasa4":
              trasa[3][poc.tr4] = {"x" : i * rozmerJednohoGridu, "y" : j * rozmerJednohoGridu, "konec" : false};
              poc.tr4++
              break;
          }
        }
      }
      for (i = 0; i < trasa.length; i++) {
        if (i == 0 || i == 2) {
          spawnpoint[i] = trasa[i][0];
        }
        else {
          spawnpoint[i] = trasa[i][trasa[i].length - 1];
        }
      }
      zakladniUdaje.setTrasa(trasa);
      zakladniUdaje.setSpawnpoint(spawnpoint);
    }();

  }

  return GeneratorTrasy;
})
