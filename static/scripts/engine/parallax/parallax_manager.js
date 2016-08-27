//parallax_manager.js

var ParallaxManager = {};

ParallaxManager.initialize = function() {
	this.layers = [];

	var bg = new ParallaxLayer(Renderer.getSprite("test_bg_1"), 0.5, zeroVector(), 5760 * Renderer.conversionRatio, Renderer.canvas.height);
	this.layers.push(bg);
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