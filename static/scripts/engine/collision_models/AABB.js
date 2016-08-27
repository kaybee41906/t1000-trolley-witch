//AABB

function AABB(minX, minY, maxX, maxY) {
	this.min = {x: minX, y: minY};
	this.max = {x: maxX, y: maxY};
}

AABB.prototype.update = function(minX, minY, maxX, maxY) {
	this.min = {x: minX, y: minY};
	this.max = {x: maxX, y: maxY};
}

AABB.prototype.compareAABBAABB = function(other) {
	if(this.max.x < other.min.x || this.min.x > other.max.x) return false;
	if(this.max.y < other.min.y || this.min.y > other.max.y) return false;
	return true;
}

AABB.prototype.comparePoint = function(x, y) {
	if((x >= this.min.x && x <= this.max.x) && 
		(y >= this.min.y && y <= this.max.y))
		return true;
	return false;
}

AABB.prototype.compareCircle = function(circlePos, radius) {
	var compare = {x:circlePos.x, y:circlePos.y};

	if(compare.x > this.min.x) compare.x = this.min.x;
	if(compare.x < this.max.x) compare.x = this.max.x;
	if(compare.y > this.min.y) compare.y = this.min.y;
	if(compare.y < this.max.y) compare.y = this.max.y;

	return distance(compare, circlePos) < radius;
}