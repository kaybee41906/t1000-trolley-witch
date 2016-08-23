// player.js

var Player = {};

Player.initialize = function() {
	this.position = {x: Config.playerStartX * Renderer.conversionRatio, 
					 y: Config.playerStartY * Renderer.conversionRatio};
	this.width = Config.playerWidth * Renderer.conversionRatio;
	this.height = Config.playerHeight * Renderer.conversionRatio;

	this.velocity = {x: 0, y: 0};

	//this.sprite = Renderer.getSprite("albus_1");
	var scorpiusStdSprites = [];
	scorpiusStdSprites.push(Renderer.getSprite("scorpius_1"));
	scorpiusStdSprites.push(Renderer.getSprite("scorpius_2"));
	scorpiusStdSprites.push(Renderer.getSprite("scorpius_3"));
	scorpiusStdSprites.push(Renderer.getSprite("scorpius_4"));
	scorpiusStdSprites.push(Renderer.getSprite("scorpius_5"));
	scorpiusStdSprites.push(Renderer.getSprite("scorpius_6"));
	this.scorpiusStdAnim = new Animation(scorpiusStdSprites, Config.animationTimer);

	var scorpiusSpellSprites = [];
	scorpiusSpellSprites.push(Renderer.getSprite("scorpius_s1"));
	scorpiusSpellSprites.push(Renderer.getSprite("scorpius_s2"));
	scorpiusSpellSprites.push(Renderer.getSprite("scorpius_s3"));
	scorpiusSpellSprites.push(Renderer.getSprite("scorpius_s4"));
	scorpiusSpellSprites.push(Renderer.getSprite("scorpius_s5"));
	scorpiusSpellSprites.push(Renderer.getSprite("scorpius_s6"));
	this.scorpiusSpellAnim = new Animation(scorpiusSpellSprites, Config.animationTimer);

	var albusStdSprites = [];
	albusStdSprites.push(Renderer.getSprite("albus_1"));
	albusStdSprites.push(Renderer.getSprite("albus_2"));
	albusStdSprites.push(Renderer.getSprite("albus_3"));
	albusStdSprites.push(Renderer.getSprite("albus_4"));
	albusStdSprites.push(Renderer.getSprite("albus_5"));
	albusStdSprites.push(Renderer.getSprite("albus_6"));
	this.albusStdAnim = new Animation(albusStdSprites, Config.animationTimer);

	var albusSpellSprites = [];
	albusSpellSprites.push(Renderer.getSprite("albus_s1"));
	albusSpellSprites.push(Renderer.getSprite("albus_s2"));
	albusSpellSprites.push(Renderer.getSprite("albus_s3"));
	albusSpellSprites.push(Renderer.getSprite("albus_s4"));
	albusSpellSprites.push(Renderer.getSprite("albus_s5"));
	albusSpellSprites.push(Renderer.getSprite("albus_s6"));
	this.albusSpellAnim = new Animation(albusSpellSprites, Config.animationTimer);

	this.shieldSprite = Renderer.getSprite("shield");

	this.currentAnim = this.albusStdAnim;

	this.jumping = false;
	this.falling = false;
	this.jumpRelease = true;

	this.blocking = false;

	this.maxStamina = 100;
	this.stamina = this.maxStamina;
	this.overloadRecoveryPoint = 25;
	this.staminaDrainRate = 2;
	this.staminaRecoverRate = 0.5;
	this.overloaded = false;
	this.overloadedHolding = false;

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
			}
			else {
				this.dead = true;
			}
		}
	}

	if(!this.blocking) {
		if(this.stamina < this.maxStamina) {
			this.stamina += this.staminaRecoverRate;
			if(this.overloaded && this.stamina >= this.overloadRecoveryPoint) {
				this.overloaded = false;
			}
			if(this.stamina >= this.maxStamina) {
				this.stamina = this.maxStamina;
			}
		}
		if(!this.jumping && !this.falling && !this.stamina <= 0 && !this.overloaded && !this.overloadedHolding) {
			if(InputManager.keyDown(InputManager.keys.DOWN_ARROW)) {
				this.blocking = true;
			}
		}	
	} else {
		this.stamina -= this.staminaDrainRate;
		if(this.stamina <= 0) {
			this.stamina = 0;
			this.overloaded = true;
			this.blocking = false;
			this.overloadedHolding = true;
			console.log("drained");
		}
		if(!InputManager.keyDown(InputManager.keys.DOWN_ARROW)) {
			this.blocking = false;
		}
	}

	if(this.overloadedHolding && !InputManager.keyDown(InputManager.keys.DOWN_ARROW)) {
		console.log("release");
		this.overloadedHolding = false;
	}

	this.position.y += this.velocity.y;
	this.boundingBox.update(this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height);

	if(InputManager.keyDown(InputManager.keys.ONE)) {
		this.albusStdAnim.setFrame(this.currentAnim.currentFrame, this.currentAnim.animationTick);
		this.currentAnim = this.albusStdAnim;
	}
	if(InputManager.keyDown(InputManager.keys.TWO)) {
		this.albusSpellAnim.setFrame(this.currentAnim.currentFrame, this.currentAnim.animationTick);
		this.currentAnim = this.albusSpellAnim;
	}
	if(InputManager.keyDown(InputManager.keys.THREE)) {
		this.scorpiusStdAnim.setFrame(this.currentAnim.currentFrame, this.currentAnim.animationTick);
		this.currentAnim = this.scorpiusStdAnim;
	}
	if(InputManager.keyDown(InputManager.keys.FOUR)) {
		this.scorpiusSpellAnim.setFrame(this.currentAnim.currentFrame, this.currentAnim.animationTick);
		this.currentAnim = this.scorpiusSpellAnim;
	}

	this.currentAnim.update();
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
	ctx.font = "25px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Shield Stamina", 100, 30);
	ctx.fillStyle = "gray";
	ctx.fillRect(20, 40, this.maxStamina * 2, 30);
	if(this.overloaded || this.overloadedHolding) {
		ctx.fillStyle="red";
	} else {
		ctx.fillStyle = "blue";
	}
	ctx.fillRect(20, 40, this.stamina * 2, 30);

	ctx = Renderer.context;
	this.currentAnim.render(this.position.x, this.position.y, this.width, this.height);
	if(this.blocking) {
		var img = Renderer.getResource(this.shieldSprite);
		ctx.drawImage(img, this.position.x, this.position.y, this.width, this.height);
	}
}