// player.js

var Player = {};

Player.initialize = function() {
	this.position = {'x': Config.playerStartX * Renderer.conversionRatio, 
					 'y': Config.playerStartY * Renderer.conversionRatio};
	this.width = Config.playerWidth * Renderer.conversionRatio;
	this.height = Config.playerHeight * Renderer.conversionRatio;

	this.velocity = {'x': 0, 'y': 0};

	this.sprite = Renderer.getSprite("character_placeholder");

	this.jumping = false;
	this.falling = false;
	this.jumpRelease = true;

	this.jumpForce = {'x': 0, 'y': -0.6};

	this.jumpStartY = this.position.y;
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
				Physics.applyForce(this.velocity, this.jumpForce);
			} else {
				this.falling = true;
			}
		}
		else {
			Physics.applyGravity(this.velocity);
			if((this.position.y + this.height) >= (Config.trainLevel * Renderer.conversionRatio)) {
				this.velocity.y = 0;
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