/* 
*	file: main.js
*
*	description: Contains the main game logic and the game loop
*
*/

var Main = {};

Main.initialize = function() {
	Renderer.initialize();

	this.gameLoop = setInterval(this.run, 1000/Config.fps);
	this.changeState (null, GameState.MainMenu);
}

Main.update = function() {
	switch(this.state) {
		case GameState.MainMenu:
			MainMenu.update();
			break;
		case GameState.CharacterSelect:
			break;
		case GameState.Game:
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
	if(previousState == null)
		this.state = newState;

	switch(this.state) {
		case GameState.MainMenu:
			//Creates buttons
			MainMenu.initialize();
			break;
		case GameState.CharacterSelect:
			break;
		case GameState.Game:
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
$(window).resize(Renderer.resize.bind(Renderer));