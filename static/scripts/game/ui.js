//ui.js

var UI = {};

UI.initialize = function() {
	
}

UI.update = function() {
	
}

UI.render = function() {
	var ctx = Renderer.context;
	ctx.font = "25px OrangeJuice";
	ctx.fillStyle = "white";
	ctx.fillText("Shield Stamina", 100, 30);
	ctx.fillText("Lives: x" + Player.lives, Renderer.screenWidth - 100, 30);
	ctx.fillText("iFrames: " + Player.iFrameTimer, Renderer.screenWidth - 100, 75);
	ctx.fillStyle = "gray";
	ctx.fillRect(20, 40, Player.maxStamina, 30);
	if(Player.overloaded || Player.overloadedHolding) {
		ctx.fillStyle="red";
	} else {
		ctx.fillStyle = "blue";
	}
	ctx.fillRect(20, 40, Player.stamina, 30);
}