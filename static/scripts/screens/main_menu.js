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
	var ctx = Renderer.context;
	ctx.font = Config.titleFont;
	ctx.fillStyle = Config.titleColor;
	ctx.textAlign = "center";
	ctx.fillText("T-1000: Trolly Witch", Renderer.canvas.width/2, Renderer.canvas.height/2);
}