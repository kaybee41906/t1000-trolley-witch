// audio_manager.js

var AudioManager = {};

AudioManager.initialize = function() {
	this.backgroundMusic = document.createElement("audio");
	this.backgroundMusic.src = "static/audio/music/music_1.mp3";
	this.backgroundMusic.type = "audio/mpeg";

	document.body.appendChild(this.backgroundMusic);

	this.clips = [];

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