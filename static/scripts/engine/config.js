/* 
*	file: config.js
*
*	description: Contains the global configurations
*
*/

var Config = {};

Config.initialize = function() {
	this.fps = 60;

	this.static = window.location.pathname.split("index")[0] + "static/";

	this.titleFont = "60px Comic Sans MS";
	this.titleColor = "black";
}

var GameState = 
	{
		MainMenu: 0,
		Game: 1,
		Pause: 2,
		GameOver:3,
		Win:4,
		CharacterSelect: 5,
	}