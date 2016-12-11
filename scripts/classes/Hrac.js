define(["Delo"], function(Delo) {
  function Hrac(zaklUd) {
    var zakladniUdaje = zaklUd
    var lokaceHradu = zakladniUdaje.getLokaceHradu();
    var rozmerHradu = zakladniUdaje.getRozmerHradu();
    var ctx = zakladniUdaje.getCtx();
    var vykreslovac = zakladniUdaje.vykreslovac;

    var delo = [];
    var deloTemp
    var i;

    var poziceDel = [];

    //nahoře
    poziceDel[0] = {"x" : lokaceHradu + rozmerHradu / 2, "y" : lokaceHradu + lokaceHradu / 9};
    //dole
    poziceDel[3] = {"x" : lokaceHradu + rozmerHradu / 2, "y" : lokaceHradu + rozmerHradu - lokaceHradu / 9};
    //vlevo
    poziceDel[2] = {"x" : lokaceHradu + rozmerHradu / 7, "y" : lokaceHradu + rozmerHradu / 2};
    //vpravo
    poziceDel[1] = {"x" : lokaceHradu + rozmerHradu - rozmerHradu / 7, "y" : lokaceHradu + rozmerHradu / 2 };


    for (i = 0; i < 4; i++) {
      deloTemp = new Delo(poziceDel[i].x, poziceDel[i].y, ctx, rozmerHradu / 3, vykreslovac, zakladniUdaje);
      delo.push(deloTemp)
    }
    zakladniUdaje.setDelo(delo);


    this.update = function() {
      vykreslovac.hrad(ctx, lokaceHradu, rozmerHradu);
      for (i = 0; i < 4; i++) {
        delo[i].update();
      }
    }

    this.getDelo = function() {
      return delo;
    }


  }

  return Hrac;
})
