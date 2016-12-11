define(["jquery"], function($) {
  function Zvuk(src) {
    this.zvuk = document.createElement("audio");
    this.zvuk.src = src;

    this.zvuk.setAttribute("preload", "auto");
    this.zvuk.setAttribute("controls", "none");
    this.zvuk.style.display = "none";
    this.zvuk.volume = 0.05;

    document.body.appendChild(this.zvuk);

    this.stop = function() {
      this.zvuk.pause();
    }

    this.prehraj = function(){
        this.zvuk.play();
    }

  }

  return Zvuk;
})
