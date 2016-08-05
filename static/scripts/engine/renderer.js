/* 
*	file: renderer.js
*
*	description: Contains the render related functions and variables
*
*/

var Renderer = {};

Renderer.initialize = function() {
	this.screenWidth = window.innerWidth;
	this.screenHeight = window.innerHeight;

	this.canvas = document.createElement("canvas");
	document.body.appendChild(this.canvas);

	this.canvas.width = this.screenWidth;
	this.canvas.height = this.screenHeight;

	this.context = this.canvas.getContext("2d");
}

Renderer.resize = function() {
	this.screenWidth = $(window).width();
	this.screenHeight = $(window).height();

	this.canvas.width = this.screenWidth;
	this.canvas.height = this.screenHeight;

	this.context = this.canvas.getContext("2d");
	this.context.save();
}

Renderer.render = function() {
	Renderer.clear();
	
	switch(Main.gameState) {
		case GameState.MainMenu:
			this.context.fillStyle = "#6495ed";
			this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);	
			MainMenu.render();
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

Renderer.clear = function() {
	this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
}