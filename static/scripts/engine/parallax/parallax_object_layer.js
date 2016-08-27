//parallax_object_layer.js

function ParallaxObjectLayer(sprites, frequencyRange, widthRange, heightRange, speed, y) {
	this.sprites = sprites;
	this.frequencyRange = frequencyRange;
	this.widthRange = widthRange;
	this.heightRange = heightRange;
	this.speed = speed;
	this.y = y;

	this.currentFrequency = randomRange(this.frequencyRange.min, this.frequencyRange.max);
	this.frequencyTimer = this.currentFrequency;

	this.objects = [];

	this.createObject();
}

ParallaxObjectLayer.prototype.createObject = function() {
	var spriteIndex = randomRange(0, this.sprites.length-1);
	var sprite = this.sprites[spriteIndex];

	var width = randomRange(this.widthRange.min, this.widthRange.max);
	var height = randomRange(this.heightRange.min, this.heightRange.max);

	var position = {x: -width, y: this.y - height };

	var obj = new ParallaxObject(sprite, position, width, height, this.speed);
	this.objects.push(obj);
}

ParallaxObjectLayer.prototype.update = function() {
	this.frequencyTimer--;
	if(this.frequencyTimer <= 0) {
		this.createObject();
		this.currentFrequency = randomRange(this.frequencyRange.min, this.frequencyRange.max);
		this.frequencyTimer = this.currentFrequency;
	}

	$.each(this.objects, function(key, obj) {
		obj.update();
	});

	for(var i = 0; i < this.objects.length; i++) {
		if(this.objects[i].dead) {
			this.objects.splice(i, 1);
			i--;
		}
	}
}

ParallaxObjectLayer.prototype.render = function() {
	$.each(this.objects, function(key, obj) {
		obj.render();
	});
}