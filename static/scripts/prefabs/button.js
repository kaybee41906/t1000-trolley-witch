/* 
*	file: button.js
*
*	description: Contains the information required to create a button including listeners and a renderer
*
*/

function Button(x, y, width, height, sprite, callback) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.sprite = sprite;
	this.callback = callback;
}

Button.prototype.resize = function(x, y, height, width) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

Button.prototype.render = function() {
	var ctx = Renderer.context;
	var img = Renderer.getResource(this.sprite);
	ctx.drawImage(img, this.x, this.y, this.width, this.height)
}

Button.prototype.onClick = function(event) {
	console.log("[%s], [%s]", event.pageX, event.pageY);
}