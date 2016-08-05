/* 
*	file: renderer.js
*
*	description: Contains the render related functions and variables
*
*/

var Renderer = {};

Renderer.initialize = function() {
	console.log(window);
	this.screenWidth = window.innerWidth;
	this.screenHeight = window.innerHeight;

	this.canvas = document.createElement("canvas");
	document.body.appendChild(this.canvas);

	this.canvas.width = this.screenWidth;
	this.canvas.height = this.screenHeight;

	this.context = this.canvas.getContext("2d");
	this.context.save();
}

Renderer.resize = function() {
	this.screenWidth = $(window).width();
	this.screenHeight = $(window).height();

	this.canvas.width = this.screenWidth;
	this.canvas.height = this.screenHeight;

	this.context = this.canvas.getContext("2d");
	this.context.save();
}

Renderer.render = function() {
	this.context.fillStyle = "#6495ed";
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.restore();
}