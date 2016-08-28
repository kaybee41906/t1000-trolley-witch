//endgame.js

var EndGame = {};

EndGame.initialize = function() {
	this.gameLength = 50000;
	this.gameTimer = 0;
}

EndGame.update = function() {
	this.gameTimer++;
}

EndGame.render = function() {
	var ctx = Renderer.context;
	ctx.font = "25px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Game Length: " + this.gameTimer + "/" + this.gameLength, 800, 30);
}