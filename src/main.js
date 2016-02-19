
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var setup = setup_game(canvas, [4, 5, 6], 1/3, 1/7)

var colors = {
	sidebar: "#00A0B0",
	pabg:    "#6A4A3C",
	grid:    "#EDC951"
}

draw_bg(ctx, setup, colors)

ctx.strokeStyle = colors.grid
ctx.setLineDash([1, 3])
ctx.fillStyle = colors.sidebar
draw_iso_path(ctx, setup.pa, [[0, 0, 0], [1, 0, 0], [1, 1, 0], [2, 1, 0], [2, 1, 1]])

ctx.strokeStyle = colors.sidebar
draw_iso_box(ctx, setup.pa, [0, 0, 0], [setup.pa.nx, setup.pa.ny, setup.pa.nz])

ctx.strokeStyle = colors.grid
draw_iso_box(ctx, setup.pa, [0, 3, 0], [1, 5, 2])
draw_iso_box(ctx, setup.pa, [2, 2, 0], [3, 3, 6])
