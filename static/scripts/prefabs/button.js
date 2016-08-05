/* 
*	file: button.js
*
*	description: Contains the information required to create a button including listeners and a renderer
*
*/

function Button(x, y, width, height, callback) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

Button.prototype.resize = function(x, y, height, width) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

Button.prototype.onClick = function(event) {
	console.log("[%s], [%s]", event.pageX, event.pageY);
}