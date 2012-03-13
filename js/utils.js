// Math utilities

function degToRad(degrees) {
	return degrees * Math.PI / 180;
}

function cosd(degrees) {
	return Math.cos(degrees * 0.017453292519943295);
}

function sind(degrees) {
	return Math.sin(degrees * 0.017453292519943295);
}

function rand(lo, hi, rng) {
	//rng = rng || Math;
	return lo + ~~(rng.random() * (hi - lo + 1));
}

function randf(lo, hi, rng) {
	//rng = rng || Math;
	return lo + (hi - lo) * (rng.random());
}

function sign(num) { return ((num > 0) ? 1 : ((num < 0) ? -1 : 0)); }

function fract(num) {
	return num - Math.floor(num);
}

function distance(x1, y1, x2, y2) {
	var dx = x2-x1, dy = y2-y1;
	return Math.sqrt(dx*dx + dy*dy);
}

function getAngle(x1, y1, x2, y2) {
	return Math.atan2(y2-y1, x2-x1);
}

function blend(a, b, f) {
	return a*f + b*(1.0-f);
}

function blendMul(a, b) {
	return (a * b) >> 8;
}

function clamp(x, a, b) {
	return x < a ? a : ( x > b ? b : x );
}

function mapRange(x, in_min, in_max, out_min, out_max) {
	return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

// Convert float [-1,1] to integer [0,255]
function convertNoise(value) {
	return ~~(256 * (value * 0.5 + 0.5)); // ~~ is floor
}

// Exponent filter for making cloud like heightmaps
function expFilter(value, cover, sharpness) {
	var c = value - (255.0 - cover);
	value = 255.0 - (Math.pow(sharpness, c < 0 ? 0 : c) * 255.0);
	return ~~(value); // floor
}

function clone(obj) {
	// Handle the 3 simple types, and null or undefined
	if (null === obj || "object" != typeof obj) return obj;
	var copy;

	// Handle Date
	if (obj instanceof Date) {
		copy = new Date();
		copy.setTime(obj.getTime());
		return copy;
	}

	// Handle Array
	if (obj instanceof Array) {
		copy = [];
		for (var i = 0, len = obj.length; i < len; ++i)
			copy[i] = clone(obj[i]);
		return copy;
	}

	// Handle Object
	if (obj instanceof Object) {
		copy = {};
		for (var attr in obj)
			if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
		return copy;
	}

	throw new Error("Unable to copy obj! Its type isn't supported.");
}
