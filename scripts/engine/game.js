/* 
*	file: game.js
*
*	description: Contains the main game logic and the game loop
*
*/

var Game = {};

Game.initialize = function() {
	Renderer.initialize();

	this.gameLoop = setInterval(Game.run, 1000/Config.fps);
}

Game.update = function() {
	
}

Game.run = function() {
	Game.update();
	Renderer.render();
}

$(document).ready(Game.initialize.bind(Game));
$(window).resize(Renderer.resize.bind(Renderer));