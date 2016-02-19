
// game screen stuff
var setup_game = function (init) {
	var w  = init.canvas.width;
	var h  = init.canvas.height;
	var le = init.canvas.width * init.sidebar_frac;
	
	var padding = (w - le) * init.pa_pad_frac;

	return {
		w: w,
		h: h,
		le: le, // Left edge of game area
		pa: { // Stuff relating to play area
			l: le + padding,
			r: w - padding,
			t: padding,
			b: h - padding,
			w: w - le - 2 * padding,
			h: h - 2 * padding,
			nx: init.n_tiles[0], 
			ny: init.n_tiles[1],
			nz: init.n_tiles[2]
		}
	};
}

var init_state = function(setup) {
	var game_state = new Array(setup.pa.nx);
	for (var i = 0; i < setup.pa.nx; i++){
		game_state[i] = new Array(setup.pa.ny);
		for (var j = 0; j < setup.pa.ny; j++) {
			game_state[i][j] = 0;
		}
	}
	return game_state;
}
