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

Physics.applyTrajectory = function(position, velocity, dt, angle, maxVelocity) {
	var newVelocity = {x: 0, y:0};
	newVelocity.x = position.x + (velocity.x * dt) * Math.cos(angle);

	var gravityMod = (this.gravity * (dt * dt)) / 2;
	newVelocity.y = position.y + (velocity.y * dt) * Math.sin(angle) - gravityMod;

	newVelocity = this.clampVelocity(velocity, maxVelocity);

	return newVelocity;
}