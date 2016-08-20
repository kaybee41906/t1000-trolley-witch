/* 
*	file: main.js
*
*	description: Contains the main game logic and the game loop
*
*/

var Main = {};

Main.initialize = function() {
	Config.initialize();
	Renderer.initialize();
	InputManager.initialize();

	this.gameLoop = setInterval(Main.run, 1000/Config.fps);
	this.changeState (null, GameState.Game);
}

Main.update = function() {
	switch(this.gameState) {
		case GameState.MainMenu:
			MainMenu.update();
			break;
		case GameState.CharacterSelect:
			CharacterSelect.update();
			break;
		case GameState.Game:
			Game.update();
			break;
		case GameState.Pause:
			break;
		case GameState.GameOver:
			break;
		case GameState.Win:
			break;
	}
}

Main.run = function() {
	Main.update();
	Renderer.render();
}

Main.changeState = function(previousState, newState) {
	this.gameState = newState;

	switch(this.gameState) {
		case GameState.MainMenu:
			//Creates buttons
			MainMenu.initialize();
			break;
		case GameState.CharacterSelect:
			CharacterSelect.initialize();
			break;
		case GameState.Game:
			Game.initialize();
			break;
		case GameState.Pause:
			break;
		case GameState.GameOver:
			break;
		case GameState.Win:
			break;
	}
}

Main.quit = function() {
	window.close();
}

$(document).ready(Main.initialize.bind(Main));
$(window).resize(Renderer.resize.bind(Renderer));