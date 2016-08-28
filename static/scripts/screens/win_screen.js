//game_over.js

var WinScreen = {};

WinScreen.initialize = function() {
	this.buttons = [];
	this.background = Renderer.getSprite("win_screen_bg");

	var mainMenuBtn = new Button(25 * Renderer.conversionRatio, 25 * Renderer.conversionRatio, 300 * Renderer.conversionRatio, 100 * Renderer.conversionRatio, Renderer.getSprite("main_menu_btn"), WinScreen.mainMenu);
	var quitBtn = new Button(25 * Renderer.conversionRatio, 175 * Renderer.conversionRatio, 300 * Renderer.conversionRatio, 100 * Renderer.conversionRatio, Renderer.getSprite("quit_game_btn"), WinScreen.quit);
	this.buttons.push(mainMenuBtn);
	this.buttons.push(quitBtn);
}

WinScreen.update = function() {
	$.each(this.buttons, function(key, button) {
		button.update();
	});
}

WinScreen.render = function() {
	var ctx = Renderer.context;
	var img = Renderer.getResource(this.background);
	ctx.drawImage(img, 0, 0, Renderer.canvas.width, Renderer.canvas.height);

	ctx.font = Config.titleFont;
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText("Congratulations! You escaped!", Renderer.canvas.width/2, 100 * Renderer.conversionRatio);

	$.each(this.buttons, function(key, button) {
		button.render();
	});
}

WinScreen.mainMenu = function() {
	Main.changeState(Main.gameState, GameState.MainMenu);
}

WinScreen.game = function() {
	Main.changeState(Main.gameState, GameState.Game);
}

WinScreen.quit = function() {
	Main.quit();
}