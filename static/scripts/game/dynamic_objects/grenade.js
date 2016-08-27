//grenade.js

function Grenade(position, angle, force) {
	this.width = Config.grenadeWidth * Renderer.conversionRatio;
	this.height = Config.grenadeHeight * Renderer.conversionRatio;

	this.sprite = Renderer.getSprite("pumpkin");
	this.position = position;
	this.angle = degToRad(angle);
	this.force = force;

	this.time = Main.gameTime;

	this.exploded = false;
	this.explosionDone = false;

	this.velocity = { x: this.force * Math.sin(this.angle), y: this.force * Math.cos(this.angle) };

	this.maxVelocity = { x: 500, y: 500 };
	this.boundingBox = new AABB(this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height);

	//explosion variables
	var sizeRange = {min:50, max:300};
	var forceRange = {min:10, max:15};
	var density = 200;
	var duration = 1;
	var frequency = 1;
	var smokeSprite = Renderer.getSprite("smoke_3");
	var explosionSprite = Renderer.getSprite("explosion_1");
	this.smokeParticleSystem = new ParticleSystem(sizeRange, density, duration, frequency, forceRange, smokeSprite);
	this.explosionParticleSystem = new ParticleSystem(sizeRange, density, duration, frequency, forceRange, explosionSprite);
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
	if(!this.exploded) {
		this.velocity = Physics.applyForce(this.velocity, {x:0, y:0.1}, this.maxVelocity)

		this.position = addVector(this.position, this.velocity);

		this.boundingBox.update(this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height);

		if(this.position.y >= Config.trainLevel * Renderer.conversionRatio)
			this.explode();
	} else {
		this.smokeParticleSystem.update();

		if(!this.smokeParticleSystem.running())
			this.explosionDone = true;
	}
}

Grenade.prototype.explode = function() {
	this.explosionParticleSystem.start(this.position);
	this.smokeParticleSystem.start(this.position);
	this.exploded = true;
}

Grenade.prototype.render = function() {
	if(!this.exploded) {
		var ctx = Renderer.context;
		var img = Renderer.getResource(this.sprite);
		ctx.drawImage(img, this.position.x, this.position.y, this.width, this.height);
	} else {
		this.smokeParticleSystem.render();
		this.explosionParticleSystem.render();
	}
}