//physics.js

var Physics = {};

Physics.initialize = function() {
	this.maxVelocity = {};

	this.resize();
}

Physics.resize = function() {
	this.gravity = 0.75 * Renderer.conversionRatio;
	this.maxVelocity.x = 15 * Renderer.conversionRatio;
	this.maxVelocity.y = 15 * Renderer.conversionRatio;
}

Physics.applyForce = function(velocity, force) {
	velocity.x += force.x;
	velocity.y += force.y;

	velocity = this.clampVelocity(velocity);
	return velocity;
}

Physics.applyGravity = function(velocity) {
	velocity.y += this.gravity;

	velocity = this.clampVelocity(velocity);

	return velocity;
}

Physics.clampVelocity = function(velocity) {
	velocity.x = velocity.x > this.maxVelocity.x ? this.maxVelocity.x : velocity.x;
	velocity.y = velocity.y > this.maxVelocity.y ? this.maxVelocity.y : velocity.y;

	return velocity;
}