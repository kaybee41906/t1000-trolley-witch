//parallax_object.js

function ParallaxObject(sprite, position, width, height, speed) {
	this.sprite = sprite;
	this.position = position;
	this.width = width;
	this.height = height;
	this.velocity = { x: speed, y: 0 };

	this.dead = false;
}

ParallaxObject.prototype.update = function() {
	this.position = addVector(this.position, this.velocity);

	if(this.position.x + width <= 0) {
		this.dead = true;
	}
}

ParallaxObject.prototype.render = function() {
	var ctx = Renderer.context;
	var img = Renderer.getResource(this.sprite);
	ctx.drawImage(img, this.position.x, this.position.y, this.width, this.height);
}