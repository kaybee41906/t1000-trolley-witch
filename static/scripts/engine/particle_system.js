// particle_system.js

function ParticleSystem(size, density, duration, frequency, force, sprite) {
	this.size = size;
	this.density = density;
	this.sprite = sprite;
	this.duration = duration;
	this.frequency = frequency;
	this.force = force;

	this.spawnTimer = 0;
	this.runTime = 0;

	this.particles = [];

	this.active = false;
}

ParticleSystem.prototype.resize = function() {
	console.log("resize");
}

ParticleSystem.prototype.running = function() {
	if(this.active || this.particles.length > 0)
		return true;
	return false;
}

ParticleSystem.prototype.destroy = function() {
	this.particles = [];
}

ParticleSystem.prototype.start = function(position) {
	this.position = position;
	this.active = true;
}

ParticleSystem.prototype.update = function() {
	if(this.active) {
		if(this.particles.length < this.density) {
			this.spawnTimer--;
			if(this.spawnTimer <= 0) {
				this.spawnTimer = this.frequency;

				for(var i = 0; i < this.density; i++) {
					var angle = randomRange(90, 270);
					angle = degToRad(angle);

					var force = randomRange(this.force.min, this.force.max);
					var size = randomRange(this.size.min, this.size.max);

					this.particles.push(new Particle(this.position, size, angle, force, this.sprite, this.duration));
				}
			}
		}
		this.runTime++;
		if(this.runTime >= this.duration) {
			this.active = false;
			this.runTime = 0;
			this.spawnTimer = 0;
		}
	}

	$.each(this.particles, function(key, particle) {
		particle.update();
	});

	for(var i = 0; i < this.particles.length; i++) {
		if(this.particles[i].position.y >= Renderer.screenHeight ||
			this.particles[i].position.x < -this.particles[i].size) {
			this.particles.splice(i, 1);
			i--;
		}
	}
}

ParticleSystem.prototype.render = function() {
	$.each(this.particles, function(key, particle) {
		particle.render();
	});
}