//lady.js

var Lady = {};

Lady.initialize = function() {
	this.position = {x: Config.ladyStartX * Renderer.conversionRatio,
					 y: Config.ladyStartY * Renderer.conversionRatio};

	this.width = Config.ladyWidth * Renderer.conversionRatio;
	this.height = Config.ladyHeight * Renderer.conversionRatio;

	var legSprites = [];
	legSprites.push(Renderer.getSprite("lady_legs_1"));
	legSprites.push(Renderer.getSprite("lady_legs_2"));
	legSprites.push(Renderer.getSprite("lady_legs_3"));
	legSprites.push(Renderer.getSprite("lady_legs_4"));
	legSprites.push(Renderer.getSprite("lady_legs_5"));
	legSprites.push(Renderer.getSprite("lady_legs_6"));
	this.legAnim = new Animation(legSprites, Config.animationTimer);

	this.currentAnim = this.legAnim;
	this.torso = Renderer.getSprite("lady_torso_1");

	this.boundingBox = new AABB(this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height);
}

Lady.resize = function() {
	var oldPos = this.position;
	oldPos.x = oldPos.x / Renderer.previousConversion;
	oldPos.y = oldPos.y / Renderer.previousConversion;

	this.position.x = oldPos.x * Renderer.conversionRatio;
	this.position.y = oldPos.y * Renderer.conversionRatio;

	this.width = Config.ladyWidth * Renderer.conversionRatio;
	this.height = Config.ladyHeight * Renderer.conversionRatio;
}

Lady.update = function() {
	this.currentAnim.update();
}

Lady.render = function() {
	this.currentAnim.render(this.position.x, this.position.y, this.width, this.height);
	var ctx = Renderer.context;
	var img = Renderer.getResource(this.torsoSprite);
	//ctx.drawImage(img, this.position.x, this.position.y, this.width, this.height);
}