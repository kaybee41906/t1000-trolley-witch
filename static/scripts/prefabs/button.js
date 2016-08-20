/* 
*	file: button.js
*
*	description: Contains the information required to create a button including listeners and a renderer
*
*/

function Button(x, y, width, height, sprite, callback) {
	this.baseDims = {'x': x, 'y': y, 'width': width, 'height': height};
	this.x = this.baseDims.x * Renderer.conversionRatio;
	this.y = this.baseDims.y * Renderer.conversionRatio;
	this.width = this.baseDims.width * Renderer.conversionRatio;
	this.height = this.baseDims.height * Renderer.conversionRatio;
	this.sprite = sprite;
	this.callback = callback;
	this.boundingBox = new AABB(this.x, 
								this.y, 
								this.x + this.width, 
								this.y + this.height);
	this.pushed = false;
}

Button.prototype.resize = function() {
	this.x = this.baseDims.x * Renderer.conversionRatio;
	this.y = this.baseDims.y * Renderer.conversionRatio;
	this.width = this.baseDims.width * Renderer.conversionRatio;
	this.height = this.baseDims.height * Renderer.conversionRatio;
	this.boundingBox = new AABB(this.x, this.y, this.x + this.width, this.y + this.height)
}

Button.prototype.render = function() {
	var ctx = Renderer.context;
	var img = Renderer.getResource(this.sprite);
	ctx.drawImage(img, this.x, this.y, this.width, this.height)
}

Button.prototype.update = function() {
	if(this.boundingBox.comparePoint(InputManager.mouse.x, InputManager.mouse.y)) {
		if(InputManager.mouseDown){
			this.pushed = true;
		}
		if(this.pushed && !InputManager.mouseDown) {
			this.callback();
		}
	}
	else {
		this.pushed = false;
	}
}