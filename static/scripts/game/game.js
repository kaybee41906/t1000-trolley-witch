//game.js

var Game = {};

Game.initialize = function() {
	EndGame.initialize();
	TrainCarManager.initialize();
	ParallaxManager.initialize();
	Lady.initialize();
	GrenadeManager.initialize();
	Player.initialize();
	UI.initialize();
}

Game.resize = function() {
	TrainCarManager.resize();
	GrenadeManager.resize();
	Lady.resize();
	Player.resize();
}

Game.update = function() {
	EndGame.update();
	ParallaxManager.update();
	TrainCarManager.update();
	GrenadeManager.update();
	Lady.update();
	Player.update();
	UI.update();
}

Game.render = function() {
	if(Player.dead){
		Renderer.context.fillStyle = "red";	
		Renderer.context.fillRect(0, 0, Renderer.canvas.width, Renderer.canvas.height);	
	} //else {
		//Renderer.context.fillStyle = "#6495ed";	
		//Renderer.context.fillRect(0, 0, Renderer.canvas.width, Renderer.canvas.height);	
		//ParallaxManager.render();
	//}
	ParallaxManager.render();
	TrainCarManager.render();
	
	Lady.render();
	Player.render();
	GrenadeManager.render();
	EndGame.render();
	UI.render();
}