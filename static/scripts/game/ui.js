//ui.js

var UI = {};

UI.initialize = function() {
	this.staminaBarPos = {x: 20 * Renderer.conversionRatio, y: 40 * Renderer.conversionRatio};

	this.lifeSprite = Renderer.getSprite("albus_life");
	if(!Main.selectedCharacter) {
		this.lifeSprite = Renderer.getSprite("scorpius_life");
	}

	this.lifePositionX = Renderer.screenWidth - (300 * Renderer.conversionRatio);
	this.lifePositionY = 20 * Renderer.conversionRatio;
	this.lifeSize = 75 * Renderer.conversionRatio;

	this.progressSize = 45 * Renderer.conversionRatio;
	this.progressStartPos = {x: 20 * Renderer.conversionRatio + (Player.maxStamina * Renderer.conversionRatio) + (75 * Renderer.conversionRatio),
							 y: 50 * Renderer.conversionRatio};
	this.progressEndPos = {x: this.lifePositionX - 75 * (Renderer.conversionRatio), y: 50 * Renderer.conversionRatio};
	console.log(this.staminaBarPos);

	this.progressPosition = {x: this.progressStartPos.x, y: this.progressStartPos.y - (20 * Renderer.conversionRatio)}

	this.progressDistance = this.progressEndPos.x - this.progressStartPos.x;
}

UI.update = function() {
	var progressRatio = EndGame.gameTimer / EndGame.gameLength;
	var travelDistance = this.progressDistance * progressRatio;

	this.progressPosition.x = this.progressStartPos.x + travelDistance;
}

UI.render = function() {
	// Stamina Bar
	var ctx = Renderer.context;
	ctx.font = "25px OrangeJuice";
	ctx.fillStyle = "white";
	ctx.fillText("Shield Stamina", 125 * Renderer.conversionRatio, 30 * Renderer.conversionRatio);
	ctx.fillStyle = "gray";
	ctx.fillRect(this.staminaBarPos.x, this.staminaBarPos.y, Player.maxStamina * Renderer.conversionRatio, 50 * Renderer.conversionRatio);
	if(Player.overloaded || Player.overloadedHolding) {
		ctx.fillStyle="red";
	} else {
		ctx.fillStyle = "green";
	}
	ctx.fillRect(this.staminaBarPos.x, this.staminaBarPos.y, Player.stamina * Renderer.conversionRatio, 50 * Renderer.conversionRatio);

	// Life
	ctx = Renderer.context;
	var img = Renderer.getResource(this.lifeSprite);
	if(Player.lives >= 1)
		ctx.drawImage(img, this.lifePositionX, this.lifePositionY, this.lifeSize, this.lifeSize);
	if(Player.lives >= 2)
		ctx.drawImage(img, this.lifePositionX + this.lifeSize, this.lifePositionY, this.lifeSize, this.lifeSize);
	if(Player.lives >= 3)
		ctx.drawImage(img, this.lifePositionX + this.lifeSize + this.lifeSize, this.lifePositionY, this.lifeSize, this.lifeSize);

	// Progress
	ctx = Renderer.context;
	var img = Renderer.getResource(this.lifeSprite);
	ctx.lineWidth = 10;
	ctx.beginPath();
	ctx.moveTo(this.progressStartPos.x, this.progressStartPos.y);
	ctx.lineTo(this.progressEndPos.x, this.progressEndPos.y);
	ctx.stroke();

	ctx.drawImage(img, this.progressPosition.x, this.progressPosition.y, this.progressSize, this.progressSize);
}