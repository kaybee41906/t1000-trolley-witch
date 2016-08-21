// train_car_manager.js

var TrainCarManager = {};

TrainCarManager.initialize = function() {
	this.trainCars = [];

	var car1 = new TrainCar(Renderer.getSprite("train_1"), {x: -10 * Renderer.conversionRatio, y: Config.trainLevel * Renderer.conversionRatio});
	var car2 = new TrainCar(Renderer.getSprite("train_1"), {x: 4500 * Renderer.conversionRatio, y: Config.trainLevel * Renderer.conversionRatio});
	var car3 = new TrainCar(Renderer.getSprite("train_1"), {x: 9500 * Renderer.conversionRatio, y: Config.trainLevel * Renderer.conversionRatio});

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
	});
}

TrainCarManager.render = function() {
	$.each(this.trainCars, function(key, car) {
		car.render();
	});
}