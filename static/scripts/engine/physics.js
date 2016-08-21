//physics.js

var Physics = {};

Physics.initialize = function() {
	this.resize();
}

Physics.resize = function() {
	this.gravity = 4.5 * Renderer.conversionRatio;
	this.maxGravVelocity = {x: 0, y: 9.8};
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
	velocity.x = velocity.x > maxVelocity.x ? maxVelocity.x : velocity.x;
	velocity.x = velocity.x < -maxVelocity.x ? -maxVelocity.x : velocity.x;

	velocity.y = velocity.y > maxVelocity.y ? maxVelocity.y : velocity.y;
	velocity.y = velocity.y < -maxVelocity.y ? -maxVelocity.y : velocity.y;

	return velocity;
}