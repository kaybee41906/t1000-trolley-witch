//lady.js

var Lady = {};

Lady.initialize = function() {
	this.position = {x: Config.ladyStartX * Renderer.conversionRatio,
					 y: Config.ladyStartY * Renderer.conversionRatio};

	this.width = Config.ladyWidth * Renderer.conversionRatio;
	this.height = Config.ladyHeight * Renderer.conversionRatio;

	this.velocity = {x: 0, y: 0};

	var legSprites = [];
	legSprites.push(Renderer.getSprite("lady_legs_1"));
	legSprites.push(Renderer.getSprite("lady_legs_2"));
	legSprites.push(Renderer.getSprite("lady_legs_3"));
	legSprites.push(Renderer.getSprite("lady_legs_4"));
	legSprites.push(Renderer.getSprite("lady_legs_5"));
	legSprites.push(Renderer.getSprite("lady_legs_6"));
	this.legAnim = new Animation(legSprites, Config.animationTimer);

	this.currentAnim = this.legAnim;
	this.torsoSprite = Renderer.getSprite("lady_torso_1");

	this.jumping = false;
	this.falling = false;
	this.jumpRelease = true;
	this.jumpForce = {x: 0, y: -5};
	this.jumpStartY = this.position.y;
	this.maxVelocity = {x: 0, y:15};

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
	var car = this.checkTrainCarAABB();
	if(!car) {
		this.falling = true;
	}

	if(this.jumping) {
		this.blocking = false;
		if(this.position.y >= (this.jumpStartY - (Config.playerJumpArc * Renderer.conversionRatio))) {
			this.velocity = Physics.applyForce(this.velocity, this.jumpForce, this.maxVelocity);
		} else {
			this.falling = true;
			this.jumping = false;
		}
	}

	if(this.falling) {
		this.blocking = false;
		this.velocity = Physics.applyGravity(this.velocity, this.maxVelocity);
		if(car) {
			if(!((this.position.y + this.height) > car.position.y + 10)) {
				this.velocity.y = 0;
				this.position.y = (Config.trainLevel * Renderer.conversionRatio) - this.height;
				this.falling = false;
				AudioManager.playOneOff("land");
			}
			else {
				this.dead = true;
			}
		}
	}

	this.position.y += this.velocity.y;
	this.boundingBox.update(this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height);

	this.nextTrain();

	this.currentAnim.update();
}

Lady.nextTrain = function() {
	var collided = false;
	$.each(TrainCarManager.trainCars, function(key, car){
		if(this.position.x + this.width >= car.position.x + car.width) {
			this.jumping = true;
			AudioManager.playOneOff("jump");
		}
	}.bind(Lady));
	return collided;
}

Lady.checkTrainCarAABB = function() {
	var collided = false;
	$.each(TrainCarManager.trainCars, function(key, car){
		if(this.boundingBox.compareAABBAABB(car.boundingBox)) {
			collided = car;
		}
	}.bind(Lady));
	return collided;
}

Lady.render = function() {
	this.currentAnim.render(this.position.x, this.position.y, this.width, this.height);
	var ctx = Renderer.context;
	var img = Renderer.getResource(this.torsoSprite);
	ctx.drawImage(img, this.position.x, this.position.y, this.width, this.height);
}