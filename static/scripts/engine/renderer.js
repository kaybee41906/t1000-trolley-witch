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
		{"name": "character_select_btn", "url": "static/images/buttons/character.png"},
		{"name": "start_game_btn", "url": "static/images/buttons/start.png"},
		{"name": "resume_game_btn", "url": "static/images/buttons/resume_game.png"},
		{"name": "retry_btn", "url": "static/images/buttons/retry.png"},
		{"name": "quit_game_btn", "url": "static/images/buttons/quit.png"},
		{"name": "albus_select", "url": "static/images/buttons/albus_unselect.png"},
		{"name": "albus_selected", "url": "static/images/buttons/albus_select.png"},
		{"name": "scorpius_select", "url": "static/images/buttons/scorpius_unselect.png"},
		{"name": "scorpius_selected", "url": "static/images/buttons/scorpius_select.png"},
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
		{"name": "albus_life", "url": "static/images/sprites/albus/life.png"},
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
		{"name": "scorpius_life", "url": "static/images/sprites/scorpius/life.png"},
	], "trolly_witch": [
		{"name": "lady_legs_1", "url": "static/images/sprites/lady/l1.png"},
		{"name": "lady_legs_2", "url": "static/images/sprites/lady/l2.png"},
		{"name": "lady_legs_3", "url": "static/images/sprites/lady/l3.png"},
		{"name": "lady_legs_4", "url": "static/images/sprites/lady/l4.png"},
		{"name": "lady_legs_5", "url": "static/images/sprites/lady/l5.png"},
		{"name": "lady_legs_6", "url": "static/images/sprites/lady/l6.png"},
		{"name": "lady_torso_1", "url": "static/images/sprites/lady/t1.png"},
		{"name": "lady_torso_2", "url": "static/images/sprites/lady/t2.png"},
		{"name": "lady_torso_3", "url": "static/images/sprites/lady/t3.png"},
		{"name": "lady_torso_4", "url": "static/images/sprites/lady/t4.png"},
		{"name": "lady_torso_5", "url": "static/images/sprites/lady/t5.png"},
		{"name": "lady_torso_6", "url": "static/images/sprites/lady/t6.png"},
		{"name": "lady_torso_7", "url": "static/images/sprites/lady/t7.png"},
	], "backgrounds": [
		{"name": "main_menu_bg", "url": "static/images/backgrounds/main_menu.jpg"},
		{"name": "scroll_bg_1", "url": "static/images/backgrounds/bg.png"},
		{"name": "main_menu_bg", "url": "static/images/backgrounds/main_menu_bg.png"},
		{"name": "character_select_bg", "url": "static/images/backgrounds/character_select_bg.png"},
		{"name": "game_over_bg_a", "url": "static/images/backgrounds/game_over_bg_a.png"},
		{"name": "game_over_bg_s", "url": "static/images/backgrounds/game_over_bg_s.png"},
		{"name": "win_screen_bg", "url": "static/images/backgrounds/game_over_bg_a.png"},
		{"name": "tree_1", "url": "static/images/backgrounds/tree.png"}
	], "effects": [
		{"name": "shield", "url": "static/images/effects/shield.png"},
		{"name": "smoke_1", "url": "static/images/effects/smoke_1.png"},
		{"name": "smoke_2", "url": "static/images/effects/smoke_2.png"},
		{"name": "smoke_3", "url": "static/images/effects/smoke_3.png"},
		{"name": "smoke_4", "url": "static/images/effects/smoke_4.png"},
		{"name": "smoke_5", "url": "static/images/effects/smoke_5.png"},
		{"name": "smoke_6", "url": "static/images/effects/smoke_6.png"},
		{"name": "smoke_7", "url": "static/images/effects/smoke_7.png"},
		{"name": "explosion_1", "url": "static/images/effects/explosion_1.png"},
		{"name": "explosion_2", "url": "static/images/effects/explosion_2.png"}
	], "game": [
		{"name": "train_1", "url": "static/images/game/trains/train.png"}
	], "general": [
		{"name": "pumpkin", "url": "static/images/sprites/pumpkin.png"}
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
				console.log("Resources Loaded");
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
	var percentageLoaded = (Object.keys(Renderer.loadingResources).length / Object.keys(Renderer.resourceCache).length) * 100;
	if(percentageLoaded < 100) {
		// TODO: Render loading screen
		console.log("loading");
	} else {
	
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
				GameOver.render();
				break;
			case GameState.Win:
				WinScreen.render();
				break;
		}
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