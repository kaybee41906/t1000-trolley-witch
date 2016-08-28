/* 
*	file: main_menu.js
*
*	description: Contains main menu function
*
*/

var MainMenu = {};

MainMenu.initialize = function() {
	this.buttons = [];
	this.background = Renderer.getSprite("main_menu_bg");

	var csButton = new Button(25 * Renderer.conversionRatio, 25 * Renderer.conversionRatio, 300 * Renderer.conversionRatio, 100 * Renderer.conversionRatio, Renderer.getSprite("character_select_btn"), MainMenu.characterSelect);
	var quitBtn = new Button(25 * Renderer.conversionRatio, 175 * Renderer.conversionRatio, 300 * Renderer.conversionRatio, 100 * Renderer.conversionRatio, Renderer.getSprite("quit_game_btn"), MainMenu.quit);
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
	var img = Renderer.getResource(this.background);
	ctx.drawImage(img, 0, 0, Renderer.canvas.width, Renderer.canvas.height);

	ctx.font = Config.titleFont;
	ctx.fillStyle = Config.titleColor;
	ctx.textAlign = "center";
	ctx.fillText("T-1000: Trolly Witch", Renderer.canvas.width/2, 100 * Renderer.conversionRatio);

	ctx.font = "40px Sanlabello";
	ctx.textAlign = "left";
	ctx.fillText("Programming & Design: Jake Higgins", Renderer.canvas.width/2 + (120 * Renderer.conversionRatio), Renderer.screenHeight - (175 * Renderer.conversionRatio));
	ctx.fillText("Art, Music, & Design: Kat Bolling", Renderer.canvas.width/2 + (120 * Renderer.conversionRatio), Renderer.screenHeight - (75 * Renderer.conversionRatio));

	$.each(this.buttons, function(key, button) {
		button.render();
	});
}

MainMenu.resize = function() {
	$.each(this.buttons, function(key, button) {
		button.resize();
	});
}

MainMenu.characterSelect = function() {
	Main.changeState(Main.gameState, GameState.CharacterSelect);
}

MainMenu.quit = function() {
	Main.quit();
}