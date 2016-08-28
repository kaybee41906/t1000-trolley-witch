//grenade_manager.js

var GrenadeManager = {};

GrenadeManager.initialize = function() {
	this.grenadeFrequency = { min: 100, max: 200 };
	this.grenadeAngle = { min: 130, max: 170 };
	this.grenadeForce = { min: 10, max: 15 };

	this.currentGrenadeTimer = Math.floor(Math.random() * (this.grenadeFrequency.max - this.grenadeFrequency.min + 1)) + this.grenadeFrequency.min;

	this.spawn = { x: Lady.position.x + (Lady.width * Config.grenadeMagicX), y: Lady.position.y + (Lady.height * Config.grenadeMagicY) };

	this.grenades = [];
}

GrenadeManager.addGrenade = function() {
	var angle = randomRange(this.grenadeAngle.min, this.grenadeAngle.max);
	var force = randomRange(this.grenadeForce.min, this.grenadeForce.max);

	var position = { x: this.spawn.x, y: this.spawn.y };
	var grenade = new Grenade(position, angle, force);
	this.grenades.push(grenade);

	AudioManager.playOneOff("grenade_throw");
}

GrenadeManager.resize = function() {
	$.each(this.grenades, function(key, grenade) {
		grenade.resize();
	});
}

GrenadeManager.update = function() {
	if(this.currentGrenadeTimer >= 0) {
		this.currentGrenadeTimer--;
		if(this.currentGrenadeTimer <= 0) {
			Lady.throwGrenade();
			this.currentGrenadeTimer = randomRange(this.grenadeFrequency.min, this.grenadeFrequency.max);
		}
	}

	$.each(this.grenades, function(key, grenade) {
		grenade.update();
	});

	for(var i = 0; i < this.grenades.length; i++) {
		if(this.grenades[i].explosionDone && this.grenades[i].smokingDone) {
			this.grenades[i].explosionParticleSystem.destroy();
			this.grenades.splice(i, 1);
			i--;
		}
	}
}

GrenadeManager.render = function() {
	var ctx = Renderer.context;
	ctx.font = "25px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Grenade Spawn In: " + this.currentGrenadeTimer, 500, 30);
	ctx.fillText("Grenade Count: " + this.grenades.length, 500, 50);

	$.each(this.grenades, function(key, grenade) {
		grenade.render();
	});
}