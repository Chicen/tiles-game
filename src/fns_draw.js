// Final draw stuff resides here


var draw_bg = function(gs, pa, colors) {

	ctx.fillStyle = colors.sidebar
	ctx.fillRect(0, 0, gs.le, gs.h)

	ctx.fillStyle = colors.pabg 
	ctx.fillRect(gs.le, 0, gs.w - gs.le, gs.h)

	ctx.strokeStyle = colors.grid
	ctx.setLineDash([1, 3])
	ctx.strokeRect(gs.le + pa.pl, pa.pt, (gs.w - pa.pr) - (gs.le + pa.pl), (gs.h - pa.pb) - (pa.pt))

}

