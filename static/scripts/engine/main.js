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
	Physics.initialize();
	AudioManager.initialize();

	this.gameLoop = setInterval(Main.run, 1000/Config.fps);
	this.changeState (null, GameState.MainMenu);

	this.gameTime = (new Date).getTime();
	this.deltaTime = 0;
	this.selectedCharacter = null;
}

Main.update = function() {
	var time = (new Date).getTime();
	this.deltaTime = time - this.gameTime;
	this.gameTime = time;

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
			GameOver.update();
			break;
		case GameState.Win:
			WinScreen.update();
			break;
	}
	AudioManager.update();
}

Main.run = function() {
	Main.update();
	Renderer.render();
}

Main.changeState = function(previousState, newState) {
	this.gameState = newState;
	AudioManager.stopAll();

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
			GameOver.initialize();
			break;
		case GameState.Win:
			WinScreen.initialize();
			break;
	}
}

Main.quit = function() {
	window.close();
}

Main.resize = function() {
	Renderer.resize();
	Physics.resize();

	switch(this.gameState) {
		case GameState.MainMenu:
			MainMenu.resize();
			break;
		case GameState.CharacterSelect:
			CharacterSelect.resize();
			break;
		case GameState.Game:
			Game.resize();
			break;
		case GameState.Pause:
			break;
		case GameState.GameOver:
			break;
		case GameState.Win:
			break;
	}
}

$(document).ready(Main.initialize.bind(Main));
$(window).resize(Main.resize.bind(Main));