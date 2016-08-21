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

	this.conversionRatio = Config.masterRatio;
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
	], "albus": [
		{"name": "albus_1", "url": "static/images/sprites/albus/1.png"},
		{"name": "albus_2", "url": "static/images/sprites/albus/2.png"},
		{"name": "albus_3", "url": "static/images/sprites/albus/3.png"},
		{"name": "albus_4", "url": "static/images/sprites/albus/4.png"},
		{"name": "albus_5", "url": "static/images/sprites/albus/5.png"},
		{"name": "albus_6", "url": "static/images/sprites/albus/6.png"},
		{"name": "albus_s1", "url": "static/images/sprites/albus/s1.png"},
		{"name": "albus_s2", "url": "static/images/sprites/albus/s2.png"},
		{"name": "albus_s3", "url": "static/images/sprites/albus/s3.png"},
		{"name": "albus_s4", "url": "static/images/sprites/albus/s4.png"},
		{"name": "albus_s5", "url": "static/images/sprites/albus/s5.png"},
		{"name": "albus_s6", "url": "static/images/sprites/albus/s6.png"},
	], "scorpius": [
		{"name": "scorpius_1", "url": "static/images/sprites/scorpius/1.png"},
		{"name": "scorpius_2", "url": "static/images/sprites/scorpius/2.png"},
		{"name": "scorpius_3", "url": "static/images/sprites/scorpius/3.png"},
		{"name": "scorpius_4", "url": "static/images/sprites/scorpius/4.png"},
		{"name": "scorpius_5", "url": "static/images/sprites/scorpius/5.png"},
		{"name": "scorpius_6", "url": "static/images/sprites/scorpius/6.png"},
		{"name": "scorpius_s1", "url": "static/images/sprites/scorpius/s1.png"},
		{"name": "scorpius_s2", "url": "static/images/sprites/scorpius/s2.png"},
		{"name": "scorpius_s3", "url": "static/images/sprites/scorpius/s3.png"},
		{"name": "scorpius_s4", "url": "static/images/sprites/scorpius/s4.png"},
		{"name": "scorpius_s5", "url": "static/images/sprites/scorpius/s5.png"},
		{"name": "scorpius_s6", "url": "static/images/sprites/scorpius/s6.png"},
	], "backgrounds": [
		{"name": "main_menu_bg", "url": "static/images/backgrounds/main_menu.jpg"}
	], "effects": [
	], "game": [
		{"name": "train_1", "url": "static/images/game/trains/train_1.png"}
	], "general": [
		{"name": "character_placeholder", "url": "static/images/general/character_placeholder.png"}
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

	this.previousConversion = this.conversionRatio;

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