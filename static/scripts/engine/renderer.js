/* 
*	file: renderer.js
*
*	description: Contains the render related functions and variables
*
*/

var Renderer = {};

Renderer.initialize = function() {
	this.canvas = document.createElement("canvas");
	document.body.appendChild(this.canvas);
	this.resize();

	this.resourceCache = [];
	this.loadingResources = [];
	this.loadedResources = [];

	for (var key in this.sprites) {
		if(this.sprites.hasOwnProperty(key)) {
			$.each(this.sprites[key], function(key, val) {
				while(!Renderer.loadResource(val.url)) {
					Renderer.renderLoadingScreen();
				}
			});
		}
	}

	//Load missing texture
	this.noTexture = new Image();
	this.noTexture.src = "static/images/general/no_texture.png";
}

Renderer.sprites = {
	"buttons": [
		{"name": "main_menu_btn", "url": "static/images/buttons/main_menu.png"},
		{"name": "character_select_btn", "url": "static/images/buttons/character_select.png"},
		{"name": "start_game_btn", "url": "static/images/buttons/start_game.png"},
		{"name": "resume_game_btn", "url": "static/images/buttons/resume_game.png"},
		{"name": "quit_game_btn", "url": "static/images/buttons/quit_game.png"}
	], "spriteSheets": [
	], "backgrounds": [
		{"name": "main_menu_bg", "url": "static/images/backgrounds/main_menu.jpg"}
	], "effects": [
	]
};

Renderer.getSprite = function(name) {
	var returnVal = null;

	for (var key in this.sprites) {
		if(this.sprites.hasOwnProperty(key)) {
			$.each(this.sprites[key], function(key, val) {
				if(val.name == name) {
					returnVal = val;
				}
			});
		}
	}
	return returnVal;
}

Renderer.getResource = function(resource_obj) {
	if(resource_obj == null)
		return Renderer.noTexture;
	return Renderer.loadedResources[resource_obj.url];
}

Renderer.loadResource = function(url) {
	if(Renderer.resourceCache[url]) {
		return Renderer.resourceCache[url];
	}
	else {
		
		var img = new Image();
		img.onload = function() {
			Renderer.loadingResources[url] = Renderer.resourceCache[url];

			var percentComplete = (Object.keys(Renderer.loadingResources).length / Object.keys(Renderer.resourceCache).length) * 100;

			if(percentComplete >= 100) { 
				Renderer.resourceCache = [];
				Renderer.loadedResources = Renderer.loadingResources;
				Renderer.loadingResources = [];
			}

			return true;
		}
		img.src = url;
		Renderer.resourceCache[url] = img;
	}
	return false;
}

Renderer.resize = function() {
	this.screenWidth = window.innerWidth;
	this.screenHeight = window.innerHeight;

	var startRatio = this.screenWidth/this.screenHeight;
	if(startRatio > Config.masterRatio) {
		this.conversionRatio = this.screenHeight / Config.masterHeight;
		this.screenWidth = Config.masterWidth * this.conversionRatio;
	} else if(startRatio < Config.masterRatio) {
		this.conversionRatio = this.screenWidth / Config.masterWidth;
		this.screenHeight = Config.masterHeight * this.conversionRatio;
	} else {
		this.conversionRatio = 1;
	}

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
			CharacterSelect.render();
			break;
		case GameState.Game:
			Game.render();
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
	var percentComplete = (Object.keys(Renderer.loadingResources).length / Object.keys(Renderer.resourceCache).length) * 100;

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