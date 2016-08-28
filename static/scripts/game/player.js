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
	this.scorpiusStdAnim = new Animation(scorpiusStdSprites, Config.animationTimer, false);

	var scorpiusSpellSprites = [];
	scorpiusSpellSprites.push(Renderer.getSprite("scorpius_s1"));
	scorpiusSpellSprites.push(Renderer.getSprite("scorpius_s2"));
	scorpiusSpellSprites.push(Renderer.getSprite("scorpius_s3"));
	scorpiusSpellSprites.push(Renderer.getSprite("scorpius_s4"));
	scorpiusSpellSprites.push(Renderer.getSprite("scorpius_s5"));
	scorpiusSpellSprites.push(Renderer.getSprite("scorpius_s6"));
	this.scorpiusSpellAnim = new Animation(scorpiusSpellSprites, Config.animationTimer, false);

	var albusStdSprites = [];
	albusStdSprites.push(Renderer.getSprite("albus_1"));
	albusStdSprites.push(Renderer.getSprite("albus_2"));
	albusStdSprites.push(Renderer.getSprite("albus_3"));
	albusStdSprites.push(Renderer.getSprite("albus_4"));
	albusStdSprites.push(Renderer.getSprite("albus_5"));
	albusStdSprites.push(Renderer.getSprite("albus_6"));
	this.albusStdAnim = new Animation(albusStdSprites, Config.animationTimer, false);

	var albusSpellSprites = [];
	albusSpellSprites.push(Renderer.getSprite("albus_s1"));
	albusSpellSprites.push(Renderer.getSprite("albus_s2"));
	albusSpellSprites.push(Renderer.getSprite("albus_s3"));
	albusSpellSprites.push(Renderer.getSprite("albus_s4"));
	albusSpellSprites.push(Renderer.getSprite("albus_s5"));
	albusSpellSprites.push(Renderer.getSprite("albus_s6"));
	this.albusSpellAnim = new Animation(albusSpellSprites, Config.animationTimer, false);

	this.shieldSprite = Renderer.getSprite("shield");

	this.currentAnim = this.albusStdAnim;
	console.log(Main.selectedCharacter);
	if(Main.selectedCharacter) {
		this.currentAnim = this.albusStdAnim;
	} else {
		this.currentAnim = this.scorpiusStdAnim;
	}
	console.log(this.currentAnim);
	console.log(Main.selectedCharacter);

	this.blocking = false;

	this.maxStamina = 200;
	this.stamina = this.maxStamina;
	this.overloadRecoveryPoint = 50;
	this.staminaDrainRate = 2;
	this.staminaRecoverRate = 1;
	this.overloaded = false;
	this.overloadedHolding = false;

	this.jumping = false;
	this.falling = false;
	this.jumpRelease = true;
	this.jumpForce = {x: 0, y: -5};

	this.jumpStartY = this.position.y;
	this.maxVelocity = {x: 0, y:15};

	this.boundingBox = new AABB(this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height);
	this.dead = false;

	this.lives = 3;
	this.iFrames = 30;
	this.iFrameTimer = 0;
	this.hit = false;
}

Player.update = function() {
	if(!this.dead) {
		var car = this.checkTrainCarAABB();
		if(!car) {
			this.falling = true;
		}

		if(this.hit) {
			this.iFrameTimer++;
			if(this.iFrameTimer >= this.iFrames) {
				this.hit = false;
				this.iFrameTimer = 0;
			}
		}

		if(InputManager.keyDown(InputManager.keys.UP_ARROW) && (!this.jumping && !this.falling) && this.jumpRelease) {
			this.jumping = true;
			this.jumpRelease = false;
			AudioManager.playOneOff("jump");
		}
		if(!InputManager.keyDown(InputManager.keys.UP_ARROW)) {
			this.jumpRelease = true;
		}

		if(this.jumping) {
			//this.blocking = false;
			if(this.position.y >= (this.jumpStartY - (Config.playerJumpArc * Renderer.conversionRatio))) {
				this.velocity = Physics.applyForce(this.velocity, this.jumpForce, this.maxVelocity);
			} else {
				this.falling = true;
				this.jumping = false;
			}
		}

		if(this.falling) {
			//this.blocking = false;
			this.velocity = Physics.applyGravity(this.velocity, this.maxVelocity);
			if(car) {
				if(!((this.position.y + this.height) > car.position.y + 10)) {
					this.velocity.y = 0;
					this.position.y = (Config.trainLevel * Renderer.conversionRatio) - this.height;
					this.falling = false;
					AudioManager.playOneOff("land");
				}
				else {
					this.die();
				}
			}
		}

		if(!this.jumping && !this.falling) {
			AudioManager.playOneOff("foot_fall");
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
			//if(!this.jumping && !this.falling && !this.stamina <= 0 && !this.overloaded && !this.overloadedHolding) {
			if(!this.stamina <= 0 && !this.overloaded && !this.overloadedHolding) {
				if(InputManager.keyDown(InputManager.keys.DOWN_ARROW)) {
					AudioManager.playOneOff("shield_cast");
					this.blocking = true;
					if(Main.selectedCharacter) {
						this.currentAnim = this.albusSpellAnim;
					} else {
						this.currentAnim = this.scorpiusSpellAnim;
					}
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
				if(Main.selectedCharacter) {
					this.currentAnim = this.albusStdAnim;
				} else {
					this.currentAnim = this.scorpiusStdAnim;
				}
			}
			if(!InputManager.keyDown(InputManager.keys.DOWN_ARROW)) {
				this.blocking = false;
				if(Main.selectedCharacter) {
					this.currentAnim = this.albusStdAnim;
				} else {
					this.currentAnim = this.scorpiusStdAnim;
				}
			}
		}

		if(this.overloadedHolding && !InputManager.keyDown(InputManager.keys.DOWN_ARROW)) {
			this.overloadedHolding = false;
		}
	} else {
		this.velocity = Physics.applyGravity(this.velocity, this.maxVelocity);
		if(AudioManager.getClip("death").source.ended) {
			Main.changeState(Main.gameState, GameState.GameOver);
		}
	}

		this.position.y += this.velocity.y;
		this.boundingBox.update(this.position.x, this.position.y, this.position.x + this.width, this.position.y + this.height);

		/*if(InputManager.keyDown(InputManager.keys.ONE)) {
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
		}*/

		this.currentAnim.update();
}

Player.registerHit = function() {
	if(!this.hit) {
		AudioManager.playOneOff("hit");
		this.hit = true;
		this.lives--;
		if(this.lives <= 0)
			this.die();
	}
}

Player.die = function() {
	this.dead = true;
	AudioManager.playOneOff("death");
	console.log(AudioManager.clips[0]);
	
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
	ctx.fillText("Lives: x" + this.lives, Renderer.screenWidth - 100, 30);
	ctx.fillText("iFrames: " + this.iFrameTimer, Renderer.screenWidth - 100, 75);
	ctx.fillStyle = "gray";
	ctx.fillRect(20, 40, this.maxStamina, 30);
	if(this.overloaded || this.overloadedHolding) {
		ctx.fillStyle="red";
	} else {
		ctx.fillStyle = "blue";
	}
	ctx.fillRect(20, 40, this.stamina, 30);

	ctx = Renderer.context;
	this.currentAnim.render(this.position.x, this.position.y, this.width, this.height);
	if(this.blocking) {
		var img = Renderer.getResource(this.shieldSprite);
		ctx.drawImage(img, this.position.x, this.position.y, this.width, this.height);
	}
}