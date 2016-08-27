//parallax_layer.js

function ParallaxLayer(sprite, speed, startPosition, width, height) {
	this.sprite = sprite;
	this.velocity = { x: -speed, y: 0 };
	this.position = {x: startPosition.x, y: startPosition.y};
	this.secondPosition = startPosition;
	this.secondPosition.x = startPosition.x + width;
	
	this.width = width;
	this.height = height;
}

ParallaxLayer.prototype.update = function() {
	this.position = addVector(this.position, this.velocity);
	this.secondPosition = addVector(this.secondPosition, this.velocity);

	if(this.position.x < -this.width) {
		this.position.x  = this.secondPosition.x + this.width;
	}

	if(this.secondPosition.x < -this.width) {
		this.secondPosition.x = this.position.x + this.width;
	}
}

ParallaxLayer.prototype.render = function() {
	var ctx = Renderer.context;
	var img = Renderer.getResource(this.sprite);
	//console.log(this.position);
	ctx.drawImage(img, this.position.x, this.position.y, this.width, this.height);
	ctx.drawImage(img, this.secondPosition.x, this.secondPosition.y, this.width, this.height);
}