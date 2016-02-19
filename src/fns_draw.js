
var to_cart_coords = function(pa, coords) {
	var x = coords[0];
	var y = coords[1];
	var z = coords[2];
	return [
		pa.l + ((x - y + pa.ny) * pa.w / (pa.nx + pa.ny)), 															// x
		pa.b - ((x + y) * pa.w / (pa.nx + pa.ny) * 0.5) - z * (pa.h - pa.w / 2) / pa.nz // y
	];
}

var draw_iso_path = function(ctx, pa, path_coords) {

	ctx.beginPath();

	var curr_cart = to_cart_coords(pa, path_coords[0]);
	ctx.moveTo(curr_cart[0], curr_cart[1]);
	for (i = 1; i < path_coords.length; i++) {
		curr_cart = to_cart_coords(pa, path_coords[i]);
		ctx.lineTo(curr_cart[0], curr_cart[1]);
	}

	ctx.stroke();
}

var draw_iso_box_wireframe = function (ctx, pa, nearest, furthest) {

	var x1 = nearest[0];
	var y1 = nearest[1];
	var z1 = nearest[2];

	var x2 = furthest[0];
	var y2 = furthest[1];
	var z2 = furthest[2];

	draw_iso_path(ctx, pa, [
		[x1, y1, z1],
		[x2, y1, z1],
		[x2, y2, z1],
		[x1, y2, z1],
		[x1, y1, z1],
	]);
	draw_iso_path(ctx, pa, [
		[x1, y1, z2],
		[x2, y1, z2],
		[x2, y2, z2],
		[x1, y2, z2],
		[x1, y1, z2],
	]);
	draw_iso_path(ctx, pa, [[x1, y1, z1], [x1, y1, z2]]);
	draw_iso_path(ctx, pa, [[x2, y1, z1], [x2, y1, z2]]);
	draw_iso_path(ctx, pa, [[x2, y2, z1], [x2, y2, z2]]);
	draw_iso_path(ctx, pa, [[x1, y2, z1], [x1, y2, z2]]);
}

var draw_iso_box_solid = function(ctx, pa, nearest, furthest, strokeStyle, fillStyleSide, fillStyleTop) {

	var x1 = nearest[0];
	var y1 = nearest[1];
	var z1 = nearest[2];

	var x2 = furthest[0];
	var y2 = furthest[1];
	var z2 = furthest[2];

	ctx.strokeStyle = strokeStyle
	ctx.fillStyle = fillStyleSide
	draw_iso_path(ctx, pa, [
		[x1, y1, z1],
		[x2, y1, z1],
		[x2, y1, z2],
		[x1, y1, z2],
		[x1, y1, z1],
	])
	ctx.fill();

	draw_iso_path(ctx, pa, [
		[x1, y1, z1],
		[x1, y2, z1],
		[x1, y2, z2],
		[x1, y1, z2],
		[x1, y1, z1],
	])
	ctx.stroke();
	ctx.fill();

	ctx.strokeStyle = strokeStyle
	ctx.fillStyle = fillStyleTop
	draw_iso_path(ctx, pa, [
		[x1, y1, z2],
		[x1, y2, z2],
		[x2, y2, z2],
		[x2, y1, z2],
		[x1, y1, z2],
	])
	ctx.stroke();
	ctx.fill();
}

var draw_tile = function(ctx, pa, colors, i, j, h) {
	draw_iso_box_solid(ctx, pa, [i, j, 0], [i + 1, j + 1, h], colors.grid, colors.tileSide, colors.tileTop);
}

var draw_tiles = function(ctx, setup, colors, game_state) {
	ctx.strokeStyle = colors.grid;
	ctx.setLineDash([0, 0]);

	// Needs to be furthest to nearest
	for (var i = setup.pa.nx; i > 0; i--) {
		for (var j = setup.pa.ny; j > 0; j--) {
			draw_tile(ctx, setup.pa, colors, i-1, j-1, game_state[i-1][j-1]);
		}
	}

}

var draw_bg = function(ctx, setup, colors) {

	ctx.fillStyle = colors.sidebar;
	ctx.fillRect(0, 0, setup.le, setup.h);

	ctx.fillStyle = colors.pabg; 
	ctx.fillRect(setup.le, 0, setup.w - setup.le, setup.h);

	ctx.strokeStyle = colors.grid;
	ctx.setLineDash([1, 3]);
	ctx.strokeRect(setup.pa.l, setup.pa.t, setup.pa.w, setup.pa.h);

	ctx.strokeStyle = colors.bounding_box;
	draw_iso_box_wireframe(ctx, setup.pa, [0, 0, 0], [setup.pa.nx, setup.pa.ny, setup.pa.nz])
}


