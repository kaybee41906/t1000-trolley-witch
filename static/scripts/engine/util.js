//util.js

function randomRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function degToRad(deg) {
	return deg * Math.PI/180;
}