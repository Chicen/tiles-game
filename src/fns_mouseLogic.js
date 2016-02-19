
var locateCursorTile = function(x, y, game_state) {
	
}

var mouseMoveHandler = function(game_state) {
	return function(e) {
		game_state.cursor = locateCursorTile(e.clientX, e.clientY, game_state)
	}
}
