define([], function() {
  function ScoreCtrl(zaklUd) {
    var zakladniUdaje = zaklUd;
    var ctx = zakladniUdaje.getCtx();
    var rozmer = zakladniUdaje.getRozmerJednohoGridu() / 2;
    var vykreslovac = zakladniUdaje.vykreslovac;
    var lokScore = zakladniUdaje.getLokaceScore();
    var score;

    this.update = function() {
      score = zakladniUdaje.getScore();
      ctx.fillStyle = "blue";
      ctx.font = "25px Georgia";
      ctx.fillText(score, lokScore.x, lokScore.y);
    }

  }

  return ScoreCtrl;
})
