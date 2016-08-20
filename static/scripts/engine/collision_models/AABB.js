//AABB

function AABB(minX, minY, maxX, maxY) {
	this.min = {'x': minX, 'y': minY};
	this.max = {'x': maxX, 'y': maxY};
}

AABB.prototype.compareAABBAABB = function(other) {
	console.log("WORKING")
}

AABB.prototype.comparePoint = function(x, y) {
	if((x >= this.min.x && x <= this.max.x) && 
		(y >= this.min.y && y <= this.max.y))
		return true;
	return false;
}