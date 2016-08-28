//animation.js

function Animation(frames, timing, once) {
	this.frames = frames;
	this.loopTime = timing;
	this.animationTick = 0;
	this.currentFrame = 0;
	this.once = once;
	this.finished = false;
}

Animation.prototype.setFrame = function(frame, tick) {
	this.currentFrame = frame;
	this.animationTick = tick;
}

Animation.prototype.update = function() {
	this.animationTick++;
	if(this.animationTick >= this.loopTime) {
		this.currentFrame++;
		this.animationTick = 0;
		if(this.currentFrame >= this.frames.length){
			if(this.once)
				this.finished = true;
			this.currentFrame = 0;
		}
	}
}

Animation.prototype.render = function(x, y, width, height) {
	var ctx = Renderer.context;
	var img = Renderer.getResource(this.frames[this.currentFrame]);
	ctx.drawImage(img, x, y, width, height);
}