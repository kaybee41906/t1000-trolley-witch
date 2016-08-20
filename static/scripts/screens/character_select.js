//character_select.js

var CharacterSelect = {};

CharacterSelect.initialize = function() {
	this.buttons = [];
	this.background = Renderer.getSprite("character_select_bg");

	var albusBtn = new Button(Renderer.canvas.width/4 - 150, 250, 300, 600, ChracterSelect.chooseAlbus)
}

CharacterSelect.render = function() {
	var ctx = Renderer.context;
	var img = Renderer.getResource(this.background);
	ctx.drawImage(img, 0, 0, Renderer.canvas.width, Renderer.canvas.height);

	ctx.font = Config.titleFont;
	ctx.fillStyle = Config.titleColor;
	ctx.textAlign = "center";
	ctx.fillText("Choose your character", Renderer.canvas.width/2, Renderer.canvas.height/2);

	$.each(this.buttons, function(key, button) {
		button.render();
	});
}

CharacterSelect.mainMenu = function() {
	Main.changeState(Main.gameState, GameState.MainMenu);
}

CharacterSelect.startGame = function() {
	Main.changeState(Main.gameState, GameState.Game);
}

CharacterSelect.chooseAlbus = function() {
	console.log("Albus chosen");
}