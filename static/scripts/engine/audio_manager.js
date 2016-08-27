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

	for (var key in this.clips) {
		if(this.clips.hasOwnProperty(key)) {
			$.each(this.clips[key], function(key, val) {
				if(val.name == name) {
					returnVal = val;
				}
			});
		}
	}
	return returnVal;
}

AudioManager.playOneOff = function(clip) {
	
}

AudioManager.update = function() {
	//this.backgroundMusic.play();
}