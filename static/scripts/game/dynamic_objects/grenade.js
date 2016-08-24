//grenade.js

function Grenade(position, angle, force) {
	this.width = Config.grenadeWidth * Renderer.conversionRatio;
	this.height = Config.grenadeHeight * Renderer.conversionRatio;

	this.sprite = Renderer.getSprite("pumpkin");
	this.position = position;
	this.angle = degToRad(angle);
	this.force = force;

	this.time = Main.gameTime;

	this.velocity = { x: this.force * Math.sin(this.angle), y: this.force * Math.cos(this.angle) };

	this.maxVelocity = { x: 500, y: 500 };
	this.boundingBox = new AABB(this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height);

	//explosion variables
	var sizeRange = {min:10, max:30};
	var forceRange = {min:10, max:15};
	var density = 2;
	var duration = 60;
	var frequency = 1;
	this.explosionParticleSystem = new ParticleSystem(sizeRange, density, duration, frequency, forceRange, Renderer.getSprite("smoke_1"));
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
	this.velocity = Physics.applyForce(this.velocity, {x:0, y:0.1}, this.maxVelocity)

	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;

	this.boundingBox.update(this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height)
}

Grenade.prototype.explode = function() {

}

Grenade.prototype.render = function() {
	var ctx = Renderer.context;
	var img = Renderer.getResource(this.sprite);
	ctx.drawImage(img, this.position.x, this.position.y, this.width, this.height);
}