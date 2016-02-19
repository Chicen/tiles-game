
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var setup = setup_game({
	canvas:         canvas,
	n_tiles:        [6, 9, 10],
	sidebar_frac:   1/3,
	pa_pad_frac:    1/7
})

var colors = {
	sidebar:      "#00A0B0",
	bounding_box: "#00A0B0",
	pabg:         "#6A4A3C",
	grid:         "#EDC951",
	tileSide:     "#00A0B0",
	tileTop:      "#EDC951"
}

var game_state = init_state(setup);

var draw_game = function(ctx, setup, colors, game_state) {
	ctx.clearRect(setup.pa.l, setup.pa.t, setup.pa.w, setup.pa.h);
	draw_bg(ctx, setup, colors);
	draw_tiles(ctx, setup, colors, game_state);
}

draw_game(ctx, setup, colors, game_state);

var clickHandler = function(e) {
	xRand = getRandomInt(0, setup.pa.nx);
	yRand = getRandomInt(0, setup.pa.ny);
	(game_state[xRand])[yRand] = (game_state[xRand])[yRand] + 1;
	draw_game(ctx, setup, colors, game_state);
}

canvas.addEventListener('click', clickHandler, false);
