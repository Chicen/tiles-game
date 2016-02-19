
// game screen stuff
var setup_game = function (canvas, n, sidebar_frac, padding_frac) {
	var w  = canvas.width;
	var h  = canvas.height;
	var le = canvas.width * sidebar_frac;
	
	var padding = (w - le) * padding_frac;

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
			nx: n[0], 
			ny: n[1],
			nz: n[2]
		}
	};
}

var draw_bg = function(ctx, setup, colors) {

	ctx.fillStyle = colors.sidebar;
	ctx.fillRect(0, 0, setup.le, setup.h);

	ctx.fillStyle = colors.pabg; 
	ctx.fillRect(setup.le, 0, setup.w - setup.le, setup.h);

	ctx.strokeStyle = colors.grid;
	ctx.setLineDash([1, 3]);
	ctx.strokeRect(setup.pa.l, setup.pa.t, setup.pa.w, setup.pa.h);

}

var to_cart_coords = function(pa, coords) {
	var x = coords[0];
	var y = coords[1];
	var z = coords[2];
	return [
		pa.l + ((x - y + pa.ny) * pa.w / (pa.nx + pa.ny)), 															// x
		pa.b - ((x + y) * pa.w / (pa.nx + pa.ny) * 0.5) - z * (pa.h - pa.w / 2) / pa.nz // y
	];
}

var to_iso_coords = function(coords, setup, pa) {
	// Depends on the game state, because stuff may obstruct
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

var draw_iso_box = function (ctx, pa, nearest, furthest) {

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
	draw_iso_path(ctx, pa, [[x1, y1, z1], [x1, y1, z2]])
	draw_iso_path(ctx, pa, [[x2, y1, z1], [x2, y1, z2]])
	draw_iso_path(ctx, pa, [[x2, y2, z1], [x2, y2, z2]])
	draw_iso_path(ctx, pa, [[x1, y2, z1], [x1, y2, z2]])
}
