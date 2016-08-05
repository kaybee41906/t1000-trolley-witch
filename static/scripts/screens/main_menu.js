/* 
*	file: main_menu.js
*
*	description: Contains main menu function
*
*/

var MainMenu = {};

MainMenu.initialize = function() {
	this.buttons = [];
	this.background = Config.static + "images/main_background.jpg";
}

MainMenu.update = function() {
	
}

MainMenu.render = function() {
	this.context.fillStyle = "#6495ed";
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.restore();
}