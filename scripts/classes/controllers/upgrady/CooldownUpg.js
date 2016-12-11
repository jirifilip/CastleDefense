define([], function() {
  function CooldownUpg(zaklUd) {
    var zakladniUdaje = zaklUd;
    const puvodni = 100;
    const nyni = 25;

    this.aktivni = false;

    this.pouzij = function() {
      this.aktivni = !this.aktivni;
      this.aktivni? zakladniUdaje.setCooldownDela(nyni) : zakladniUdaje.setCooldownDela(puvodni);
    }
  }

  return CooldownUpg;
})
