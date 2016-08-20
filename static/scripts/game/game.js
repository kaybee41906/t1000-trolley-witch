//game.js

var Game = {};

Game.initialize = function() {
	Player.initialize();
}

Game.update = function() {
	Player.update();
}

Game.render = function() {
	Player.render();
}