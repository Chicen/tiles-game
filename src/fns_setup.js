
// game screen stuff
var setup_game = function (init) {
	var w  = init.canvas.width;
	var h  = init.canvas.height;
	var le = init.canvas.width * init.sidebar_frac;
	
	var padding = (w - le) * init.pa_pad_frac;
	var currTileType = ''
	return {
		w: w,
		h: h,
		offsetLeft: canvas.offsetLeft,
		offsetTop: canvas.offsetTop,
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
		},
		currTile: 2
	};
}

var init_state = function(setup) {
	var game_state = {};

	game_state.h = new Array(setup.pa.nx);
	game_state.c = new Array(setup.pa.nx); //tile color
	for (var i = 0; i < setup.pa.nx; i++){
		game_state.h[i] = new Array(setup.pa.ny);
		game_state.c[i] = new Array(setup.pa.ny);
		for (var j = 0; j < setup.pa.ny; j++) {
			game_state.h[i][j] = 0;
			game_state.c[i][j] = 0;	
		}
	}
	return game_state;
}
