//train_car.js

function TrainCar(sprite, position) {
	this.width = Config.trainWidth * Renderer.conversionRatio;
	this.height = Config.trainHeight * Renderer.conversionRatio;
	this.sprite = sprite;
	this.position = position;
	this.velocity = {x:0, y:0};
	this.trainAcceleration = {x:-0.3, y:0};
	this.maxTrainVelocity = {x:0.3, y:0};
}

TrainCar.prototype.resize = function() {
	var oldPos = this.position;
	oldPos.x = oldPos.x / Renderer.previousConversion;
	oldPos.y = oldPos.y / Renderer.previousConversion;

	this.position.x = oldPos.x * Renderer.conversionRatio;
	this.position.y = oldPos.y * Renderer.conversionRatio;

	this.width = Config.trainWidth * Renderer.conversionRatio;
	this.height = Config.trainHeight * Renderer.conversionRatio;
}

TrainCar.prototype.update = function() {
	this.velocity = Physics.applyForce(this.velocity, this.trainAcceleration, this.maxTrainVelocity);
	console.log(this.velocity)

	this.position.x += this.velocity.x;
}

TrainCar.prototype.render = function() {
	var ctx = Renderer.context;
	var img = Renderer.getResource(this.sprite);
	ctx.drawImage(img, this.position.x, this.position.y, this.width, 1000);
}