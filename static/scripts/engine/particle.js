//particle.js

function Particle(position, size, angle, force, sprite) {
	this.position = position;
	this.size = size;
	this.angle = angle;
	this.force = force;
	this.sprite = sprite;

	this.gravForce = {x:0, y:0.1};
	this.maxVelocity = { x: 20, y: 20 };

	this.velocity = { x: this.force * Math.sin(this.angle), y: this.force * Math.cos(this.angle) };
}

Particle.prototype.update = function() {
	this.velocity = Physics.applyForce(this.velocity, this.gravForce, this.maxVelocity);

	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;
}

Particle.prototype.render = function() {
	var ctx = Renderer.context;
	var img = Renderer.getResource(this.sprite);
	ctx.drawImage(img, this.position.x, this.position.y, this.size, this.size);
}