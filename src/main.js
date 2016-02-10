
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

// game screen stuff
var gs = {
	w: canvas.width,
	h: canvas.height,
	le: canvas.width/3
}
// play area stuff
var pa = {
	pl: (gs.w - gs.le) / 7, // padding left
	pr: (gs.w - gs.le) / 7, // padding right
	pt: (gs.w - gs.le) / 7, // padding top
	pb: (gs.w - gs.le) / 7, // padding bottom
	xn: 4,                  // num of tiles in x dir
	yn: 4,                  // num of tiles in y dir
	zn: 10                  // num of tiles in z dir
}

var colors = {
	sidebar: "#00A0B0",
	pabg:    "#6A4A3C",
	grid:    "#EDC951"
}

draw_bg(gs, pa, colors)
