
function PlanetDetail() {
	this.size = 128;
	this.type = "detail";

	this.getTile = function(x, y) {
		return ut.NULLTILE;
	};

	this.getShortDescription = function() {
		return "planet surface";
	};

	this.getDescription = function() {
		return "planet surface";
	};

	// TODO: Check for planet
	throw "Find clear ground to land on.";
}
