//parallax_layer.js

function ParallaxLayer(sprite, speed, width, height) {
	this.sprite = sprite;
	
	// SCROLL RIGHT
	//this.velocity = { x: speed, y: 0 };
	//this.position = {x: -width + Renderer.screenWidth, y: 0};
	//this.secondPosition = {x: (-width * 2) + Renderer.screenWidth, y: 0};

	// SCROLL LEFT
	this.velocity = { x: -speed, y: 0 };
	this.position = {x:0, y:0};
	this.secondPosition = {x: width, y: 0};

	this.width = width;
	this.height = height;
}

ParallaxLayer.prototype.update = function() {
	this.position = addVector(this.position, this.velocity);
	this.secondPosition = addVector(this.secondPosition, this.velocity);


	// SCROLL RIGHT
	/*if(this.position.x > Renderer.screenWidth) {
		this.position.x  = this.secondPosition.x - this.width;
	}

	if(this.secondPosition.x > Renderer.screenWidth) {
		this.secondPosition.x = this.position.x - this.width;
	}*/

	// SCROLL LEFT
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