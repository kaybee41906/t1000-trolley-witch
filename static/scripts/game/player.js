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
}

Player.update = function() {
	if(InputManager.keyDown(InputManager.keys.UP_ARROW) && !this.jumping && this.jumpRelease) {
		this.jumping = true;
		this.jumpRelease = false;
	}
	if(!InputManager.keyDown(InputManager.keys.UP_ARROW)) {
		this.jumpRelease = true;
	}

	if(this.jumping) {
		if(!this.falling) {
			if(this.position.y >= (this.jumpStartY - (Config.playerJumpArc * Renderer.conversionRatio))) {
				this.velocity = Physics.applyForce(this.velocity, this.jumpForce, this.maxVelocity);
			} else {
				this.falling = true;
			}
		}
		else {
			this.velocity = Physics.applyGravity(this.velocity, this.maxVelocity);
			if((this.position.y + this.height) >= (Config.trainLevel * Renderer.conversionRatio)) {
				this.velocity.y = 0;
				this.position.y = (Config.trainLevel * Renderer.conversionRatio) - this.height;
				this.falling = false;
				this.jumping = false;
			}
		}
	}

	this.position.y += this.velocity.y;
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