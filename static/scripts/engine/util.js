//util.js

function randomRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function degToRad(deg) {
	return deg * Math.PI/180;
}

function addVector(v1, v2) {
	return {x: v1.x + v2.x, y: v1.y + v2.y};
}

function zeroVector() {
	return {x: 0, y: 0};
}