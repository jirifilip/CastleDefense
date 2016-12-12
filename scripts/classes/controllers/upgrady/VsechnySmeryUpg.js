define([], function() {
  function VsechnySmeryUpg(zaklUd) {
    //upgrade - vystřelení do všech směrů naráz

    var zakladniUdaje = zaklUd;

    this.ikonka = new Image();
    this.ikonka.src = "images/VsechnySmeryUpg.jpg";

    this.nazev = "vsechnySmery";


    this.pouzij = function () {
      zakladniUdaje.getDelo()[2].vystrel(-1, 0, true);
      zakladniUdaje.getDelo()[1].vystrel(1, 0, true);
      zakladniUdaje.getDelo()[0].vystrel(0, -1, true);
      zakladniUdaje.getDelo()[3].vystrel(0, 1, true);
    }

  }




  return VsechnySmeryUpg;
})
