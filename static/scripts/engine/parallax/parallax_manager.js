//parallax_manager.js

var ParallaxManager = {};

ParallaxManager.initialize = function() {
	this.layers = [];

	var bg = new ParallaxLayer(Renderer.getSprite("scroll_bg_1"), 2, 5760 * Renderer.conversionRatio, Renderer.canvas.height);
	this.layers.push(bg);

	var bg_2_sprites = [
		Renderer.getSprite("tree_1"),
	];
	var bg_2_frequency = { min: 10, max: 50 };
	var bg_2_widthRange = { min: 50 * Renderer.conversionRatio, max: 83 * Renderer.conversionRatio };
	var bg_2_heightRange = { min: 150 * Renderer.conversionRatio, max: 200 * Renderer.conversionRatio };
	var bg_2_speed = 4;
	var bg_2_y = Renderer.screenHeight - (200 * Renderer.conversionRatio);
	var bg_2 = new ParallaxObjectLayer(bg_2_sprites, bg_2_frequency, bg_2_widthRange, bg_2_heightRange, bg_2_speed, bg_2_y);
	this.layers.push(bg_2);

	var bg_3_sprites = [
		Renderer.getSprite("tree_1"),
	];
	var bg_3_frequency = { min: 25, max: 100 };
	var bg_3_widthRange = { min: 125 * Renderer.conversionRatio, max: 175 * Renderer.conversionRatio };
	var bg_3_heightRange = { min: 400 * Renderer.conversionRatio, max: 500 * Renderer.conversionRatio };
	var bg_3_speed = 8;
	var bg_3_y = Renderer.screenHeight - (100 * Renderer.conversionRatio);
	var bg_3 = new ParallaxObjectLayer(bg_3_sprites, bg_3_frequency, bg_3_widthRange, bg_3_heightRange, bg_3_speed, bg_3_y);
	this.layers.push(bg_3);

	var bg_4_sprites = [
		Renderer.getSprite("tree_1"),
	];
	var bg_4_frequency = { min: 50, max: 150 };
	var bg_4_widthRange = { min: 250 * Renderer.conversionRatio, max: 300 * Renderer.conversionRatio };
	var bg_4_heightRange = { min: 600 * Renderer.conversionRatio, max: 800 * Renderer.conversionRatio };
	var bg_4_speed = 16;
	var bg_4_y = Renderer.screenHeight;
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