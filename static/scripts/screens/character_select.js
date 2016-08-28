//character_select.js

var CharacterSelect = {};

CharacterSelect.initialize = function() {
	this.buttons = [];
	this.background = Renderer.getSprite("character_select_bg");

	this.albusStd = Renderer.getSprite("albus_select");
	this.albusOutline = Renderer.getSprite("albus_selected");
	this.scorpiusStd = Renderer.getSprite("scorpius_select");
	this.scorpiusOutline = Renderer.getSprite("scorpius_selected");

	console.log(Renderer.screenWidth);
	var albusBtn = new Button(0, 0, 500, 500, this.albusOutline, CharacterSelect.chooseAlbus)
	var scorpiusBtn = new Button(Renderer.screenWidth - 300, 0, 500, 500, this.scorpiusStd, CharacterSelect.chooseScorpius)
	this.buttons.push(albusBtn);
	this.buttons.push(scorpiusBtn);


	var startBtn = new Button(Renderer.canvas.width/2, Renderer.canvas.height/2 + (300 * Renderer.conversionRatio), 300 * Renderer.conversionRatio, 100 * Renderer.conversionRatio, Renderer.getSprite("start_game_btn"), CharacterSelect.startGame);
	this.buttons.push(startBtn);

	this.albusSelected = true;
	this.scorpiusSelected = false;
}

CharacterSelect.update = function() {
	$.each(this.buttons, function(key, button) {
		button.update();
	});
}

CharacterSelect.render = function() {
	var ctx = Renderer.context;
	var img = Renderer.getResource(this.background);
	ctx.drawImage(img, 0, 0, Renderer.canvas.width, Renderer.canvas.height);

	ctx.font = Config.titleFont;
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText("Choose your character", Renderer.canvas.width/2, 100);

	// Render selection outline
	/*
	if(this.albusSelected) {
		var ctx = Renderer.context;
		ctx.fillStyle = "white";
		ctx.fillRect(this.buttons[0].x -5, this.buttons[0].y - 5, this.buttons[0].width + 10, this.buttons[0].height + 10);
	}
	else if(this.scorpiusSelected) {
		var ctx = Renderer.context;
		ctx.fillStyle = "white";
		ctx.fillRect(this.buttons[1].x -5, this.buttons[1].y - 5, this.buttons[1].width + 10, this.buttons[1].height + 10);
	}*/

	$.each(this.buttons, function(key, button) {
		button.render();
	});
}

CharacterSelect.mainMenu = function() {
	Main.changeState(Main.gameState, GameState.MainMenu);
}

CharacterSelect.startGame = function() {
	Main.selectedCharacter = CharacterSelect.albusSelected;
	console.log(CharacterSelect.selectedCharacter);
	Main.changeState(Main.gameState, GameState.Game);
}

CharacterSelect.chooseAlbus = function() {
	CharacterSelect.albusSelected = true;
	CharacterSelect.scorpiusSelected = false;
	CharacterSelect.buttons[0].sprite = CharacterSelect.albusOutline;
	CharacterSelect.buttons[1].sprite = CharacterSelect.scorpiusStd;
	console.log(CharacterSelect.buttons[0].sprite);
}

CharacterSelect.chooseScorpius = function() {
	CharacterSelect.albusSelected = false;
	CharacterSelect.scorpiusSelected = true;
	CharacterSelect.buttons[0].sprite = CharacterSelect.albusStd;
	CharacterSelect.buttons[1].sprite = CharacterSelect.scorpiusOutline;
}