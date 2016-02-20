
// Function to determine whether p lies on left or right side of p1->p2, left being negative
var which_side = function(p1, p2, p) {
	var x1 = p1[0];
	var y1 = p1[1];
	var x2 = p2[0];
	var y2 = p2[1];
	var x  = p[0];
	var y  = p[1];

	// | x1 y1 1 |
	// | x2 y2 1 |
	// | x  y  1 |
	var det = x * (y1 - y2) - y * (x1 - x2) + (x1 * y2 - x2 * y1)

	return det / Math.abs(det)
}

var locate_cursor_tile = function(absx, absy, setup) {
	
	var x = absx - setup.offsetLeft
	var y = absy - setup.offsetTop

	if (x > setup.pa.r || x < setup.pa.l || y > setup.pa.b || y < setup.pa.t) {
		return [null, null]
	} 
	var cursor_i = null;
	var cursor_j = null;

	// for each row, check if the cursor is left of right border and right of left border (in iso)
	for (var i = 0; i < setup.pa.nx; i++) {

		var p = [x, y];

		// left border
		var p1_l = to_cart_coords(setup.pa, [i, 0, 0]);
		var p2_l = to_cart_coords(setup.pa, [i, setup.pa.ny, 0]);

		// right border
		var p1_u = to_cart_coords(setup.pa, [i + 1, 0, 0]);
		var p2_u = to_cart_coords(setup.pa, [i + 1, setup.pa.ny, 0]);

		if (which_side(p1_l, p2_l, p) === 1 && which_side(p1_u, p2_u, p) === -1) { 
			cursor_i = i;
			break;
		}
	}

	// for each column, do something similar
	for (var j = 0; j < setup.pa.ny; j++) {
		var p = [x, y];

		// left border
		var p1_l = to_cart_coords(setup.pa, [0, j, 0]);
		var p2_l = to_cart_coords(setup.pa, [setup.pa.nx, j, 0]);

		// right border
		var p1_u = to_cart_coords(setup.pa, [0, j + 1, 0]);
		var p2_u = to_cart_coords(setup.pa, [setup.pa.nx, j + 1, 0]);

		if (which_side(p1_l, p2_l, p) === -1 && which_side(p1_u, p2_u, p) === 1) { 
			cursor_j = j;
			break;
		}
	}

	return [cursor_i, cursor_j];

}

