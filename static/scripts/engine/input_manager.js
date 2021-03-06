// InputManager

var InputManager = {};

InputManager.initialize = function() {
	this.keys = {
		'SPACE': 32,
		'UP_ARROW': 38,
		'DOWN_ARROW': 40,
		'ESCAPE': 27,
		"ONE": 49,
		"TWO": 50,
		"THREE": 51,
		"FOUR": 52,
		"Z": 90,
		"X": 88
	}

	this.keysDown = {};
	this.mouseDown = false;
	this.mouse = {'x': 0, 'y': 0}

	window.addEventListener('keydown', InputManager.onKeyDown.bind(this), false);
	window.addEventListener('keyup', InputManager.onKeyUp.bind(this), false);
	window.addEventListener('mousemove', InputManager.onMouseMove.bind(this), false);
	window.addEventListener('mousedown', InputManager.onMouseDown.bind(this), false);
	window.addEventListener('mouseup', InputManager.onMouseUp.bind(this), false);
}

InputManager.onMouseMove = function(event) {
	this.mouse.x = event.clientX;
	this.mouse.y = event.clientY;
}

InputManager.onMouseDown = function(event) {
	this.mouseDown = true;
}

InputManager.onMouseUp = function(event) {
	this.mouseDown = false;
}

InputManager.onKeyDown = function(event) {
	this.keysDown[event.which] = true;
}

InputManager.onKeyUp = function(event) {
	this.keysDown[event.which] = false;
}

InputManager.keyDown = function(key) {
	return !!this.keysDown[key]
}