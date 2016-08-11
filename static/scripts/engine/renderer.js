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

	this.resourceCache = [];
	this.loadedResources = [];

	for (var key in this.sprites) {
		if(this.sprites.hasOwnProperty(key)) {
			$.each(this.sprites[key], function(key, val) {
				console.log("Loading resource [%s]", val.url);
				while(!Renderer.loadResource(val.url)) {
					Renderer.renderLoadingScreen();
				}
			});
		}
	}
}

Renderer.sprites = {
	"buttons": [
		{"name": "main_menu", "url": "static/images/buttons/main_menu.png"},
		{"name": "character_select", "url": "static/images/buttons/character_select.png"},
		{"name": "start_game", "url": "static/images/buttons/start_game.png"},
		{"name": "resume_game", "url": "static/images/buttons/resume_game.png"},
		{"name": "quit_game", "url": "static/images/buttons/quit_game.png"}
	], "spriteSheets": [
	], "backgrounds": [
		{"name": "main_menu_background", "url": "static/images/backgrounds/main_menu.jpg"}
	], "effects": [
	]
};

Renderer.loadResource = function(url) {
	if(Renderer.resourceCache[url]) {
		return Renderer.resourceCache[url];
	}
	else {
		
		var img = new Image();
		img.onload = function() {
			console.log("resource loaded [%s]", url);
			Renderer.loadedResources[url] = Renderer.resourceCache[url];

			return true;
		}
		img.src = url;
		Renderer.resourceCache[url] = img;
	}
	return false;
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

Renderer.renderLoadingScreen = function() {
	var percentComplete = (Object.keys(Renderer.loadedResources).length / Object.keys(Renderer.resourceCache).length) * 100;
	console.log(percentComplete);
	if(percentComplete >= 100)
		Renderer.resourceCache = [];	

	var ctx = Renderer.context;
	ctx.font = Config.titlefont;
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText(percentComplete + "%", Renderer.canvas.width/2, Renderer.canvas.height/2);

	this.context.fillStyle = "black";
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

Renderer.clear = function() {
	this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
}