// audio_manager.js

var AudioManager = {};

AudioManager.initialize = function() {
	this.backgroundMusic = document.createElement("audio");
	this.backgroundMusic.src = "static/audio/music/music_1.mp3";
	this.backgroundMusic.type = "audio/mpeg";

	document.body.appendChild(this.backgroundMusic);

	this.clips = [];
	this.clips.push(new AudioClip("static/audio/effects/button_press.mp3", "mpeg", "button_press"));
	this.clips.push(new AudioClip("static/audio/effects/foot_fall.mp3", "mpeg", "foot_fall"));
	this.clips.push(new AudioClip("static/audio/effects/land.mp3", "mpeg", "land"));
	this.clips.push(new AudioClip("static/audio/effects/jump.mp3", "mpeg", "jump"));
	this.clips.push(new AudioClip("static/audio/effects/death.mp3", "mpeg", "death"));
	this.clips.push(new AudioClip("static/audio/effects/grenade_throw.mp3", "mpeg", "grenade_throw"));
	this.clips.push(new AudioClip("static/audio/effects/hit.mp3", "mpeg", "hit"));
	this.clips.push(new AudioClip("static/audio/effects/shield_cast.mp3", "mpeg", "shield_cast"));
	this.clips.push(new AudioClip("static/audio/effects/explosion.mp3", "mpeg", "explosion"));
}

AudioManager.getClip = function(name) {
	var returnVal = null;

	$.each(this.clips, function(key, clip){
		if(clip.name == name)
			returnVal = clip;
	});

	return returnVal;
}

AudioManager.playOneOff = function(clip) {
	var audioClip = this.getClip(clip)
	if(audioClip != null) {
		audioClip.play();
	}
}

AudioManager.update = function() {
	//this.backgroundMusic.play();
}