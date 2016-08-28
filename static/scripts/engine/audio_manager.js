// audio_manager.js

var AudioManager = {};

AudioManager.initialize = function() {
	this.backgroundMusic = document.createElement("audio");
	this.backgroundMusic.src = "static/audio/music/main.ogg";
	this.backgroundMusic.type = "audio/ogg";
	this.backgroundMusic.volume = Config.musicVolume;
	this.backgroundMusic.loop = true;
	this.backgroundMusic.play();

	document.body.appendChild(this.backgroundMusic);

	this.clips = [];
	this.clips.push(new AudioClip("static/audio/effects/button_press.mp3", "audio/mpeg", "button_press"));
	this.clips.push(new AudioClip("static/audio/effects/foot_fall.mp3", "audio/mpeg", "foot_fall"));
	this.clips.push(new AudioClip("static/audio/effects/land.mp3", "audio/mpeg", "land"));
	this.clips.push(new AudioClip("static/audio/effects/jump.mp3", "audio/mpeg", "jump"));
	this.clips.push(new AudioClip("static/audio/effects/death.mp3", "audio/mpeg", "death"));
	this.clips.push(new AudioClip("static/audio/effects/grenade_throw.mp3", "audio/mpeg", "grenade_throw"));
	this.clips.push(new AudioClip("static/audio/effects/hit.mp3", "audio/mpeg", "hit"));
	this.clips.push(new AudioClip("static/audio/effects/shield_cast.mp3", "audio/mpeg", "shield_cast"));
	this.clips.push(new AudioClip("static/audio/effects/explosion.mp3", "audio/mpeg", "explosion"));
	this.clips.push(new AudioClip("static/audio/effects/train.mp3", "audio/mpeg", "train"));
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

AudioManager.stopAll = function() {
	$.each(this.clips, function(key, clip){
		clip.stop();
	});
}

AudioManager.update = function() {

}