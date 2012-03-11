/*jshint browser:true trailing:true latedef:true */

var term, eng; // Can't be initialized yet because DOM is not ready

var pl = { x: 1024, y: 1024 }; // Player position, FIXME: Make a proper class
var viewLevel = 0;

// "Main loop"
function tick() {
	eng.update(pl.x, pl.y); // Update tiles
	var plc = term.get(term.cx, term.cy); // Player character
	plc.setChar("@");
	plc.setColor(255,255,255);
	term.render(); // Render
}

function switchViewLevel() {
	if (viewLevel === 0) viewLevel = 1;
	else viewLevel = 0;

	if (viewLevel === 0) eng.setTileFunc((new Starmap()).getTile);
	else eng.setTileFunc((new SolarSystem()).getTile);
}

// Key press handler - movement & collision handling
function onKeyDown(k) {
	var movedir = { x: 0, y: 0 }; // Movement vector
	if (k === ut.KEY_LEFT || k === ut.KEY_H) movedir.x = -1;
	else if (k === ut.KEY_RIGHT || k === ut.KEY_L) movedir.x = 1;
	else if (k === ut.KEY_UP || k === ut.KEY_K) movedir.y = -1;
	else if (k === ut.KEY_DOWN || k === ut.KEY_J) movedir.y = 1;
	if (k === ut.KEY_ENTER) switchViewLevel();
	if (movedir.x === 0 && movedir.y === 0) return;
	pl.x += movedir.x;
	pl.y += movedir.y;
	tick();
}

// Initialize stuff
function init() {
	// Initialize Viewport, i.e. the place where the characters are displayed
	term = new ut.Viewport(document.getElementById("game"), 61, 31);
	// Initialize Engine, i.e. the Tile manager
	eng = new ut.Engine(term, (new Starmap()).getTile);
	// Initialize input
	ut.initInput(onKeyDown);
	// Render
	tick();
	setInterval(tick, 100);
}
