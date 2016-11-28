define(["Delo"], function(Delo) {
  function Hrac(ZakladniUdaje) {
    var lokaceHradu = ZakladniUdaje.getLokaceHradu();
    var rozmerHradu = ZakladniUdaje.getRozmerHradu();
    var ctx = ZakladniUdaje.getCtx();
    var vykreslovac = ZakladniUdaje.vykreslovac;

    var delo = [];
    var deloTemp
    var i;

    var poziceDel = [];

    poziceDel[0] = {"x" : lokaceHradu + rozmerHradu / 3, "y" : lokaceHradu};
    poziceDel[1] = {"x" : lokaceHradu + rozmerHradu / 3, "y" : lokaceHradu + rozmerHradu};
    poziceDel[2] = {"x" : lokaceHradu, "y" : lokaceHradu + rozmerHradu / 2};
    poziceDel[3] = {"x" : lokaceHradu + rozmerHradu, "y" : lokaceHradu + rozmerHradu / 2};


    for (i = 0; i < 4; i++) {
      deloTemp = new Delo(poziceDel[i].x, poziceDel[i].y, ctx, rozmerHradu / 3, vykreslovac);
      delo.push(deloTemp)
    }

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
