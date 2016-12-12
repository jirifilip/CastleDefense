define(["jquery"], function($) {
  function Zvuk(src) {
    var zvuk = document.createElement("audio");
    zvuk.src = src;

    zvuk.setAttribute("preload", "auto");
    zvuk.setAttribute("controls", "none");
    zvuk.style.display = "none";
    zvuk.volume = 0.05;

    document.body.appendChild(zvuk);

    this.stop = function() {
      zvuk.pause();
    }
    this.prehraj = function(){
      zvuk.play();
    }
    this.setVolume = function(val) {
      zvuk.volume = val;
    }

  }

  return Zvuk;
})
