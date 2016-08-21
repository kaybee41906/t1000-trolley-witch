// player.js

var Player = {};

Player.initialize = function() {
	this.position = {x: Config.playerStartX * Renderer.conversionRatio, 
					 y: Config.playerStartY * Renderer.conversionRatio};
	this.width = Config.playerWidth * Renderer.conversionRatio;
	this.height = Config.playerHeight * Renderer.conversionRatio;

	this.velocity = {x: 0, y: 0};

	this.sprite = Renderer.getSprite("albus_1");

	this.jumping = false;
	this.falling = false;
	this.jumpRelease = true;

	this.jumpForce = {x: 0, y: -5};

	this.jumpStartY = this.position.y;
	this.maxVelocity = {x: 0, y:15};

	this.boundingBox = new AABB(this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height);
	this.dead = false;
}

Player.update = function() {
	var car = this.checkTrainCarAABB();
	if(!car) {
		this.falling = true;
	}

	if(InputManager.keyDown(InputManager.keys.UP_ARROW) && (!this.jumping && !this.falling) && this.jumpRelease) {
		this.jumping = true;
		this.jumpRelease = false;
	}
	if(!InputManager.keyDown(InputManager.keys.UP_ARROW)) {
		this.jumpRelease = true;
	}

	if(this.jumping) {
		if(this.position.y >= (this.jumpStartY - (Config.playerJumpArc * Renderer.conversionRatio))) {
			this.velocity = Physics.applyForce(this.velocity, this.jumpForce, this.maxVelocity);
		} else {
			this.falling = true;
			this.jumping = false;
		}
	}

	if(this.falling) {
		this.velocity = Physics.applyGravity(this.velocity, this.maxVelocity);
		if(car) {
			if(!((this.position.y + this.height) > car.position.y + 10)) {
				this.velocity.y = 0;
				this.position.y = (Config.trainLevel * Renderer.conversionRatio) - this.height;
				this.falling = false;
			}
			else {
				this.dead = true;
			}
		}
	}

	this.position.y += this.velocity.y;
	this.boundingBox.update(this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height);
}

Player.checkTrainCarAABB = function() {
	var collided = false;
	$.each(TrainCarManager.trainCars, function(key, car){
		if(this.boundingBox.compareAABBAABB(car.boundingBox)) {
			collided = car;
		}
	}.bind(Player));
	return collided;
}

Player.resize = function() {
	var oldPos = this.position;
	oldPos.x = oldPos.x / Renderer.previousConversion;
	oldPos.y = oldPos.y / Renderer.previousConversion;

	this.position.x = oldPos.x * Renderer.conversionRatio;
	this.position.y = oldPos.y * Renderer.conversionRatio;

	this.width = Config.playerWidth * Renderer.conversionRatio;
	this.height = Config.playerHeight * Renderer.conversionRatio;
}

Player.render = function() {
	var ctx = Renderer.context;
	var img = Renderer.getResource(this.sprite);
	ctx.drawImage(img, this.position.x, this.position.y, this.width, this.height);
}