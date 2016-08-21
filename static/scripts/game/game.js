//game.js

var Game = {};

Game.initialize = function() {
	Player.initialize();
	TrainCarManager.initialize();
}

Game.resize = function() {
	TrainCarManager.resize();
	Player.resize();
}

Game.update = function() {
	TrainCarManager.update();
	Player.update();
}

Game.render = function() {
	TrainCarManager.render();
	Player.render();
}