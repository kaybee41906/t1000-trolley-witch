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
	if(Player.dead){
		Renderer.context.fillStyle = "red";	
		Renderer.context.fillRect(0, 0, Renderer.canvas.width, Renderer.canvas.height);	
	} else {
		Renderer.context.fillStyle = "#6495ed";	
		Renderer.context.fillRect(0, 0, Renderer.canvas.width, Renderer.canvas.height);	
	}
	TrainCarManager.render();
	Player.render();
}