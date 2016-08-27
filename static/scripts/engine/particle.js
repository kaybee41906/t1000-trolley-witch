//particle.js

function Particle(position, size, angle, force, sprite, life) {
	this.position = position;
	this.size = size;
	this.angle = angle;
	this.force = force;
	this.sprite = sprite;
	this.life = life;

	this.gravForce = {x:-0.3, y:0.01};
	this.maxVelocity = { x: 20, y: 20 };

	this.velocity = { x: this.force * Math.sin(this.angle), y: this.force * Math.cos(this.angle) };
}

Particle.prototype.update = function() {
	if(this.life > 0) {
		this.velocity = Physics.applyForce(this.velocity, this.gravForce, this.maxVelocity);

		this.position = addVector(this.position, this.velocity);

		this.life--;
	}
}

Particle.prototype.dead = function() {
	return this.life <= 0;
}

Particle.prototype.render = function() {
	var ctx = Renderer.context;
	var img = Renderer.getResource(this.sprite);
	ctx.drawImage(img, this.position.x, this.position.y, this.size, this.size);
}