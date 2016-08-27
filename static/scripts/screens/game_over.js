//game_over.js

var GameOver = {};

GameOver.initialize = function() {
	this.buttons = [];
	this.background = Renderer.getSprite("game_over_bg");

	var retryBtn = new Button(10, 10, 100, 50, Renderer.getSprite("retry_btn"), GameOver.game);
	var mainMenuBtn = new Button(10, 70, 100, 50, Renderer.getSprite("main_menu_btn"), GameOver.mainMenu);
	var quitBtn = new Button(10, 130, 100, 50, Renderer.getSprite("quit_game_btn"), GameOver.quit);
	this.buttons.push(retryBtn);
	this.buttons.push(mainMenuBtn);
	this.buttons.push(quitBtn);
}

GameOver.update = function() {
	$.each(this.buttons, function(key, button) {
		button.update();
	});
}

GameOver.render = function() {
	var ctx = Renderer.context;
	var img = Renderer.getResource(this.background);
	ctx.drawImage(img, 0, 0, Renderer.canvas.width, Renderer.canvas.height);

	ctx.font = Config.titleFont;
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText("Game Over", Renderer.canvas.width/2, Renderer.canvas.height/2);

	$.each(this.buttons, function(key, button) {
		button.render();
	});
}

GameOver.mainMenu = function() {
	Main.changeState(Main.gameState, GameState.MainMenu);
}

GameOver.game = function() {
	Main.changeState(Main.gameState, GameState.Game);
}

GameOver.quit = function() {
	Main.quit();
}