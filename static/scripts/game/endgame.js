//endgame.js

var EndGame = {};

EndGame.initialize = function() {
	this.gameLength = 10000;
	this.gameTimer = 0;
}

EndGame.update = function() {
	this.gameTimer++;
	if(this.gameTimer >= this.gameLength) {
		Main.changeState(Main.gameState, GameState.Win);
	}
}

EndGame.render = function() {

}