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

	var csButton = new Button(10, 10, 100, 50, Renderer.getSprite("character_select_btn"), MainMenu.characterSelect);
	var quitBtn = new Button(10, 70, 100, 50, Renderer.getSprite("quit_game_btn"), MainMenu.quit);
	this.buttons.push(csButton);
	this.buttons.push(quitBtn);
}

MainMenu.update = function() {
	$.each(this.buttons, function(key, button) {
		button.update();
	});
}

MainMenu.render = function() {
	var ctx = Renderer.context;
	ctx.font = Config.titleFont;
	ctx.fillStyle = Config.titleColor;
	ctx.textAlign = "center";
	ctx.fillText("T-1000: Trolly Witch", Renderer.canvas.width/2, Renderer.canvas.height/2);

	$.each(this.buttons, function(key, button) {
		button.render();
	});
}

MainMenu.characterSelect = function() {
	Main.gameState = GameState.CharacterSelect;
}

MainMenu.quit = function() {
	Main.quit();
}