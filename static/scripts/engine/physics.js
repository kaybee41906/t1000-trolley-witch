//physics.js

var Physics = {};

Physics.initialize = function() {
	this.maxVelocity = {};

	this.resize();
}

Physics.resize = function() {
	this.gravity = 4.5 * Renderer.conversionRatio;
	this.maxGravVelocity = {x: 0, y: 5};
	console.log(this.maxVelocity);
}

Physics.applyForce = function(velocity, force, maxVelocity) {
	velocity.x += force.x;
	velocity.y += force.y;

	velocity = this.clampVelocity(velocity, maxVelocity);
	return velocity;
}

Physics.applyGravity = function(velocity) {
	velocity.y += this.gravity;

	velocity = this.clampVelocity(velocity, this.maxGravVelocity);

	return velocity;
}

Physics.clampVelocity = function(velocity, maxVelocity) {
	velocity.x = velocity.x > this.maxVelocity.x ? this.maxVelocity.x : velocity.x;
	velocity.x = velocity.x < -this.maxVelocity.x ? -this.maxVelocity.x : velocity.x;

	velocity.y = velocity.y > this.maxVelocity.y ? this.maxVelocity.y : velocity.y;
	velocity.y = velocity.y < -this.maxVelocity.y ? -this.maxVelocity.y : velocity.y;

	return velocity;
}