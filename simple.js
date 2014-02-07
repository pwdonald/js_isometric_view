var tilesize = 20;

window.onload = function() {
	var newmap = new map('new',900,700);

	newmap.generate();
	newmap.draw();
};

var tile = function(x,y,type){
	this.x = x;
	this.y = y;
	this.type = type;
};

var map = function(name, width, height){
	this.name = name;
	this.width = width;
	this.height = height;
	this.tiles = [];

	this.draw = function(){
		for (var i=0; i < this.tiles.length; i++){
			for (var j=0; j < this.tiles[i].length; j++){
				drawTile(this.tiles[i][j]);
			}
		}
	};

	this.generate = function() {
		var map_tile_width = this.width / tilesize || 300;
		var map_tile_height = this.height / tilesize || 300;

		for (var i = 0; i < map_tile_height; i++) {
			var row = [];
			var type = "grass";
			for (var j=0; j < map_tile_width; j++){
				if (type === "grass")
				{
					type = "rock";
				}
				else
				{
					type = "grass";
				}
				var tmp = new tile(j,i,type);
				row.push(tmp);
			}
			this.tiles.push(row);
		}
	};
};

function drawTile(tile){
	var canvas = document.getElementById('surface');
	var context = canvas.getContext('2d');
	context.beginPath();
	if (tile.type === "rock")
	{
		context.fillStyle = 'black';
	}
	else
	{
		context.fillStyle = 'green';
	}
	context.rect(tile.x * tilesize, tile.y * tilesize, tilesize,tilesize);
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = 'blue';
	context.stroke();
	context.fillStyle = 'white';
	context.font = '5pt Arial';
	context.fillText(tile.x + ',' + tile.y, tile.x * tilesize, tile.y * tilesize + (tilesize - 1));
	context.closePath();
}





