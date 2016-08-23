//grenade.js

function Grenade(position, angle, force) {
	this.width = Config.grenadeWidth * Renderer.conversionRatio;
	this.height = Config.grenadeHeight * Renderer.conversionRatio;

	this.sprite = Renderer.getSprite("pumpkin");
	this.position = position;
	this.angle = angle;
	this.force = force;

	this.time = Main.gameTime;

	this.velocity = { x: 0, y: 0 };
	this.maxVelocity = { x: 500, y: 500 };
	this.boundingBox = new AABB(this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height)
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
	if(this.position.x + this.width < 0 ||
		this.position.y + this.height < 0 ||
		this.position.x > Renderer.screenWidth ||
		this.position.y > Renderer.screenHeight )
		return false;
	return true;
}

Grenade.prototype.update = function() {
	//console.log(Main.gameTim);
	var dt = Main.gameTime - this.time;
	this.velocity = Physics.applyTrajectory(this.position, this.force, dt, this.angle, this.maxVelocity);

	//this.velocity = Physics.applyForce(this.velocity, this.force, { x: this.maxVelocity.x * 10, y: this.maxVelocity.y * 10});
	//this.velocity = Physics.applyGravity(this.velocity, this.maxVelocity);

	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;

	this.boundingBox.update(this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height)
}

Grenade.prototype.render = function() {
	var ctx = Renderer.context;
	var img = Renderer.getResource(this.sprite);
	ctx.drawImage(img, this.position.x, this.position.y, this.width, this.height);
}