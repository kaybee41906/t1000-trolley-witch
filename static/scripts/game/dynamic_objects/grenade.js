//grenade.js

function Grenade(position, angle, force) {
	this.width = Config.grenadeWidth * Renderer.conversionRatio;
	this.height = Config.grenadeHeight * Renderer.conversionRatio;

	this.sprite = Renderer.getSprite("pumpkin");
	this.position = position;
	this.angle = degToRad(angle);
	this.force = force;
	this.drag = {x: -0.01, y: 0};

	this.time = Main.gameTime;

	this.exploded = false;
	this.smoking = false;
	this.explosionDone = false;
	this.smokingDone = false;

	this.velocity = { x: this.force * Math.sin(this.angle), y: this.force * Math.cos(this.angle) };

	this.maxVelocity = { x: 500, y: 500 };
	this.boundingBox = new AABB(this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height);

	//explosion variables
	var sizeRange = {min:50, max:300};
	var forceRange = {min:1, max:15};
	var eForceRange = {min:1, max:7.5};
	var density = 200;
	var duration = 1;
	var frequency = 1;
	var lifeRange = {min:100, max:200};
	var explosionLifeRange = {min:25, max:50};
	var smokeSprite = Renderer.getSprite("smoke_3");
	var explosionSprite = Renderer.getSprite("explosion_2");
	this.smokeParticleSystem = new ParticleSystem(sizeRange, density, duration, frequency, forceRange, lifeRange, smokeSprite);
	this.explosionParticleSystem = new ParticleSystem(sizeRange, density, duration, frequency, eForceRange, explosionLifeRange, explosionSprite);

	this.smokeDelay = 20;
	this.explosionRadius = 150 * Renderer.conversionRatio;
	this.explosionDuration = 30;
}

Grenade.prototype.resize = function(){
	var oldPos = this.position;
	oldPos.x = oldPos.x / Renderer.previousConversion;
	oldPos.y = oldPos.y / Renderer.previousConversion;

	this.position.x = oldPos.x * Renderer.conversionRatio;
	this.position.y = oldPos.y * Renderer.conversionRatio;

	this.width = Config.grenadeWidth * Renderer.conversionRatio;
	this.height = Config.grenadeHeight * Renderer.conversionRatio;

	this.boundingBox.update(this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height)
}

Grenade.prototype.inBounds = function() {
	if(this.position.y > Renderer.screenHeight || 
		this.position.x < 0)
		return false;
	return true;
}

Grenade.prototype.update = function() {
	if(!this.exploded && !this.smoking) {
		this.velocity = Physics.applyForce(this.velocity, {x:0, y:0.1}, this.maxVelocity)
		this.velocity = Physics.applyForce(this.velocity, this.drag, this.maxVelocity);

		this.position = addVector(this.position, this.velocity);

		this.boundingBox.update(this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height);

		if(this.position.y >= (Config.trainLevel - 100) * Renderer.conversionRatio)
			this.explode();
	} else {
		this.position = addVector(this.position, {x: -10.3, y:0});
		this.explosionDuration--;

		if(this.damaging()) {
			var pos = {x: this.position.x + (this.explosionRadius * 2), y: this.position.y}
			if(Player.boundingBox.compareCircle(pos, this.explosionRadius)) {
				if(!Player.blocking) {
					Player.registerHit();
				}
				else {
					console.log("block");
				}
			}
		}

		if(this.smoking && !this.smokingDone) {
			this.smokeParticleSystem.update();

			if(!this.smokeParticleSystem.running()) {
				this.smokingDone = true;
			}
		}
		if(this.exploded && !this.explosionDone) {
			this.explosionParticleSystem.update();

			if(!this.explosionParticleSystem.running()) {
				this.explosionDone = true;
			}
		}
		this.smokeDelay--;
		if(this.smokeDelay <= 0 && !this.smoking) {
			this.smoke();
		}
	}
}

Grenade.prototype.explode = function() {
	this.explosionParticleSystem.start(this.position);
	this.exploded = true;
}

Grenade.prototype.smoke = function() {
	this.smokeParticleSystem.start(this.position);
	this.smoking = true;
}

Grenade.prototype.damaging = function() {
	return this.explosionDuration > 0;
}

Grenade.prototype.render = function() {
	if(!this.exploded && !this.smoking) {
		var ctx = Renderer.context;
		var img = Renderer.getResource(this.sprite);
		ctx.drawImage(img, this.position.x, this.position.y, this.width, this.height);
	} else {
		this.smokeParticleSystem.render();
		this.explosionParticleSystem.render();

		// DEBUGGING BLAST RADIUS
		/*if(this.damaging()) {
			var ctx = Renderer.context;
			ctx.beginPath();
			ctx.arc(this.position.x + (this.explosionRadius * 2), this.position.y, this.explosionRadius, 0, 2*Math.PI);
			ctx.lineWidth = 5;
      		ctx.strokeStyle = '#003300';
			ctx.stroke();
		}*/
	}
}