var tile = function(x, y,z, type){
	this.x = x;
	this.y = y;
	this.z = z;
	this.type = type;
};

var map = function(name, width, height, randomMap){
	this.name = name;
	this.width = width;
	this.height = height;
	this.tiles = [];
	if (typeof random == 'undefined'){
		this.random = true;
	} else {
		this.random = random;
	}

	this.generate = function (){
		for (var i=0; i < this.height; i++)
		{
			var row = [];
			var t_type = 'grass';
			for (var j=0; j < this.width; j++)
			{
				var tmp = new tile(j,i,Math.floor((Math.random()*128)+1),t_type);
				if (!this.random) {
					tmp = new tile(j,i,10,t_type);
				} 	
				 
				if (t_type == 'grass')
				{
					 t_type = 'rock';
				}
				else if (t_type == 'rock')
				{
					 t_type = 'grass';
				}
				row.push(tmp);
			}
			this.tiles.push(row);
		}
	};

	this.draw = function(){
		for (var i=0; i < this.height; i++)
		{
			for (var j=0; j < this.width; j++)
			{
				drawTile(this.tiles[i][j]);
			}
		}
	};

	this.drawScreen = function(x, y, screenwidth, screenheight) {

		mapx = 0;
		mapy = 0;

		for (var j=0; j < screenheight; j++)
		{
			for (var i =0; i < screenwidth; i++)
			{
				mapx = i + x;
				mapy = j + y;

				var tile = this.tiles[mapy][mapx];
				drawTile(tile);
			}
		}


	};
};