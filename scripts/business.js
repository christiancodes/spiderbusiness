var Game = {};
Game.fps = 60;

var canv = document.getElementById("web-canvas");
var ctx = canv.getContext("2d");

var pizzas = [
  {
    kind: "Pepperoni",
    price: 15,
    time: 30
  },
  {
    kind: "BBQ Chicken",
    price: 20,
    time: 40
  },
  {
    kind: "The Works",
    price: 30,
    time: 60
  }
];

var insects = [
  {
    name: "Fly",
    value: 5,
    silk: 10,
    weight: 2
  },
  {
    name: "Bee",
    value: 20,
    silk: 20,
    weight: 8
  }
]

var inventory = [];
var web = [];

function Player() {
  this.spiderbucks = 100;
  this.silk = 25;
}

Game.run = function() {
  Game.update();
  Game.draw();
};

Game.update = function() {

};

Game.draw = function() {
  drawWeb();
};

function drawWeb() {
  // TODO
}

// Pizza/clock mechanics

function orderPizza(pizzaoption) {
  Game.player.order = pizzaoption;
  Game.player.deliveryTime = addMinutes(new Date(), pizzas[pizzaoption].time);
  initializeClock();
  $('#control-panel').removeClass("hidden");
  $('#pizza-panel').addClass("hidden");
}

function initializeClock() {
  updateClock();
  var timeinterval = setInterval(everySecond,1000);
}

function everySecond() {
  updateClock();
  checkForInsects();
  runEventMachine();
  updateMarkets();
}

function checkForInsects() {
  //TODO maybe something gets stuck

}

function runEventMachine() {
  // TODO maybe calculate an event this second

}

function updateMarkets() {
  // TODO for the market graphs maybe we can use something like http://solutoire.com/flotr/ ?
}

function updateClock() {
  var clock = document.getElementById("pizza-counter");
  var t = getTimeRemaining(Game.player.deliveryTime);
  clock.innerHTML = (t.hours ? "1:" : "") + ('0' + t.minutes).slice(-2) + ':' + ('0' + t.seconds).slice(-2);
  if(t.total <= 0) {
    pizzaArrives();
  }
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function pizzaArrives() {
  // TODO
}

//////////////////

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
