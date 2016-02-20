
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var setup = setup_game({
	canvas:         canvas,
	n_tiles:        [6, 9, 10],
	sidebar_frac:   1/3,
	pa_pad_frac:    1/7
})

// http://www.colourlovers.com/palette/1473/Ocean_Five
var colors = {
	sidebar:      "#00A0B0",
	bounding_box: "#00A0B0",
	pabg:         "#6A4A3C",
	grid:         "#CC333F",
	tileSide:     "#EB6841",
	tileTop:      "#EDC951"
}

var game_state = init_state(setup);

var draw_game = function(ctx, setup, colors, game_state) {
	ctx.clearRect(setup.pa.l, setup.pa.t, setup.pa.w, setup.pa.h);
	draw_bg(ctx, setup, colors);
	draw_tiles(ctx, setup, colors, game_state);
	draw_cursor_tile(ctx, setup.pa, colors.sidebar, game_state.cursor_tile) 
}

var clickHandler = function(e) {
	game_state.h[game_state.cursor_tile[0]][game_state.cursor_tile[1]] += 1; // put to function
	draw_game(ctx, setup, colors, game_state);
}

var mouseMoveHandler = function(setup, game_state) { return function(e) {
	game_state.cursor_tile = locate_cursor_tile(e.clientX, e.clientY, setup)
	draw_game(ctx, setup, colors, game_state);
}}

draw_game(ctx, setup, colors, game_state);
canvas.addEventListener('click', clickHandler, false);
canvas.addEventListener('mousemove', mouseMoveHandler(setup, game_state), false);
