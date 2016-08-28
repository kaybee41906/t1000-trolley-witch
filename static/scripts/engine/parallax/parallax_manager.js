//parallax_manager.js

var ParallaxManager = {};

ParallaxManager.initialize = function() {
	this.layers = [];

	var bg = new ParallaxLayer(Renderer.getSprite("scroll_bg_1"), 0.5, 5760 * Renderer.conversionRatio, Renderer.canvas.height);
	this.layers.push(bg);

	var bg_2_sprites = [
		Renderer.getSprite("tree_1"),
	];
	var bg_2_frequency = { min: 5, max: 25 };
	var bg_2_widthRange = { min: (Config.treeWidth * (1/5)) * Renderer.conversionRatio, max: (Config.treeWidth * (1/3)) * Renderer.conversionRatio };
	var bg_2_heightRange = { min: (Config.treeHeight * (1/5)) * Renderer.conversionRatio, max: (Config.treeHeight * (1/2)) * Renderer.conversionRatio };
	var bg_2_speed = 8;
	var bg_2_y = {min: Renderer.screenHeight - (200 * Renderer.conversionRatio), max: Renderer.screenHeight - (100 * Renderer.conversionRatio)};
	var bg_2 = new ParallaxObjectLayer(bg_2_sprites, bg_2_frequency, bg_2_widthRange, bg_2_heightRange, bg_2_speed, bg_2_y);
	this.layers.push(bg_2);

	var bg_3_sprites = [
		Renderer.getSprite("tree_1"),
	];
	var bg_3_frequency = { min: 15, max: 50 };
	var bg_3_widthRange = { min: (Config.treeWidth * (1/3)) * Renderer.conversionRatio, max: (Config.treeWidth * (2/3)) * Renderer.conversionRatio };
	var bg_3_heightRange = { min: (Config.treeHeight * (1/2)) * Renderer.conversionRatio, max: (Config.treeHeight * (3/4)) * Renderer.conversionRatio };
	var bg_3_speed = 8;
	var bg_3_y = {min: Renderer.screenHeight - (100 * Renderer.conversionRatio), max: Renderer.screenHeight};
	var bg_3 = new ParallaxObjectLayer(bg_3_sprites, bg_3_frequency, bg_3_widthRange, bg_3_heightRange, bg_3_speed, bg_3_y);
	this.layers.push(bg_3);

	var bg_4_sprites = [
		Renderer.getSprite("tree_1"),
	];
	var bg_4_frequency = { min: 25, max: 75 };
	var bg_4_widthRange = { min: (Config.treeWidth * (2/3)) * Renderer.conversionRatio, max: Config.treeWidth * Renderer.conversionRatio };
	var bg_4_heightRange = { min: (Config.treeHeight * (3/4)) * Renderer.conversionRatio, max: Config.treeHeight * Renderer.conversionRatio };
	var bg_4_speed = 10;
	var bg_4_y = {min: Renderer.screenHeight - (50 * Renderer.conversionRatio), max: Renderer.screenHeight};
	var bg_4 = new ParallaxObjectLayer(bg_4_sprites, bg_4_frequency, bg_4_widthRange, bg_4_heightRange, bg_4_speed, bg_4_y);
	this.layers.push(bg_4);
}

ParallaxManager.update = function() {
	$.each(this.layers, function(key, layer){
		layer.update();
	});
}

ParallaxManager.render = function() {
	$.each(this.layers, function(key, layer){
		layer.render();
	});
}