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

	this.masterWidth = 1920;
	this.masterHeight = 1080;
	this.masterRatio = 16/9;

	this.playerStartX = 640;
	this.playerStartY = 680;
	this.playerWidth = 170;
	this.playerHeight = 220;

	this.ladyStartX = 50;
	this.ladyStartY = 660;
	this.ladyWidth = 250;
	this.ladyHeight = 240;

	this.playerJumpArc = 300;
	this.trainLevel = 900;

	this.trainWidth = 4000;
	this.trainHeight = 300;
	this.trainGap = 500;

	this.animationTimer = 5;
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