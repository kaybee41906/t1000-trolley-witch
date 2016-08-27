//audio_clip.js

function AudioClip(clip, type, name) {
	this.source = document.createElement("audio");
	this.source.src = clip;
	this.source.type = type;
	this.name = name;
}

AudioClip.prototype.play = function() {
	this.source.play();
}

AudioClip.prototype.pause = function() {
	this.source.pause();
}

AudioClip.prototype.stop = function() {
	this.source.stop();
}