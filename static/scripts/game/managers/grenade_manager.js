//grenade_manager.js

var GrenadeManager = {};

GrenadeManager.initialize = function() {
	this.grenadeFrequency = { min: 100, max: 200 };
	this.grenadeAngle = { min: 130, max: 170 };
	this.grenadeForce = { min: 10, max: 20 };

	this.currentGrenadeTimer = Math.floor(Math.random() * (this.grenadeFrequency.max - this.grenadeFrequency.min + 1)) + this.grenadeFrequency.min;

	this.spawn = { x: Lady.position.x + Lady.width/2, y: Lady.position.y + Lady.height/2 };

	this.grenades = [];
}

GrenadeManager.addGrenade = function() {
	var angle = Math.floor(Math.random() * (this.grenadeAngle.max - this.grenadeAngle.min + 1)) + this.grenadeAngle.min;
	var force = Math.floor(Math.random() * (this.grenadeForce.max - this.grenadeForce.min + 1)) + this.grenadeForce.min;

	var position = { x: this.spawn.x, y: this.spawn.y };
	var grenade = new Grenade(position, angle, force);
	this.grenades.push(grenade);
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
			this.addGrenade();
			this.currentGrenadeTimer = Math.floor(Math.random() * (this.grenadeFrequency.max - this.grenadeFrequency.min + 1)) + this.grenadeFrequency.min;
		}
	}

	$.each(this.grenades, function(key, grenade) {
		grenade.update();
	});

	for(var i = 0; i < this.grenades.length; i++) {
		if(!this.grenades[i].inBounds()) {
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