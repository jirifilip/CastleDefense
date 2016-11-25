define([], function() {
  function Hrac(Vykreslovac, HerniPlocha, ZakladniUdaje) {
    var lokaceHradu = ZakladniUdaje.getLokaceHradu();
    var rozmerHradu = ZakladniUdaje.getRozmerHradu();
    var ctx = HerniPlocha.getCtx();

    this.update = function() {
      Vykreslovac.hrad(ctx, lokaceHradu, rozmerHradu)
    }

  }

  return Hrac;
})
