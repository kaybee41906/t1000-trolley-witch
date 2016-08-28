// train_car_manager.js

var TrainCarManager = {};

TrainCarManager.initialize = function() {
	this.trainCars = [];
	this.lastCar = 2;

	var car1 = new TrainCar(Renderer.getSprite("train_1"), {x: 0 * Renderer.conversionRatio, y: Config.trainLevel * Renderer.conversionRatio});
	var car2 = new TrainCar(Renderer.getSprite("train_1"), {x: 4500 * Renderer.conversionRatio, y: Config.trainLevel * Renderer.conversionRatio});
	var car3 = new TrainCar(Renderer.getSprite("train_1"), {x: 9000 * Renderer.conversionRatio, y: Config.trainLevel * Renderer.conversionRatio});

	this.trainCars.push(car1);
	this.trainCars.push(car2);
	this.trainCars.push(car3);
}

TrainCarManager.resize = function() {
	$.each(this.trainCars, function(key, car) {
		car.resize();
	});
}

TrainCarManager.update = function() {
	$.each(this.trainCars, function(key, car) {
		car.update();
		if((car.position.x + (Config.trainWidth * Renderer.conversionRatio)) < -10) {
			car.position.x = this.trainCars[this.lastCar].position.x + car.width + (Config.trainGap * Renderer.conversionRatio);
			this.lastCar = this.trainCars.indexOf(car);
		}
	}.bind(TrainCarManager));
	AudioManager.playOneOff("train");
}

TrainCarManager.render = function() {
	$.each(this.trainCars, function(key, car) {
		car.render();
	});
}