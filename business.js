var Game = {};
Game.fps = 60;

var canv = document.getElementById("web-canvas");
var ctx = canv.getContext("2d");

function Player() {
  this.spiderbucks = 100;
}

Game.run = function() {
  Game.update();
  Game.draw();
};

Game.update = function() {

};

Game.draw = function() {

};

(function() {
  var onEachFrame;
  if (window.webkitRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); webkitRequestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 500 / Game.fps);
    }
  }

  window.onEachFrame = onEachFrame;
})();

// Start the game loop
Game.player = new Player();

window.onEachFrame(Game.run);
