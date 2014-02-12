// Map Generator for Isometric View
// Author: Donald Jones
// * Feb 10, 2014: Added Tolerance Value for "smoothing" algorithm. Still needs work.


var tile = function(x, y,z, type){
	this.x = x;
	this.y = y;
	this.z = z;
	this.type = type;
};

var map = function(name, width, height, randomMap, toleranceValue){
	this.name = name;
	this.width = width;
	this.height = height;
	this.random = randomMap;
	this.tiles = new Array(height);
	this.tolerancevalue = toleranceValue || 25;

	this.generateRiver = function () {
		var T = 25;
		for (var i=0; i < this.height; i++)
		{
			this.tiles[i] = new Array(width);
			this.avg_height = 0;
			for (var j = 0; j < this.width; j++)
			{
				var h = Math.floor((Math.random()*T));;
				if (this.tiles[i][j-1])
				{
					//River
					if (this.tiles[i-1])
					{
						if (this.tiles[i-1][j].z < 5)
						{
							h = 2;
							this.tiles[i-1][j].z = 2;
							this.tiles[i-1][j-1].z =2;
						}
						else {
							h = (this.tiles[i-1][j].z + h + this.tiles[i-1][j-1].z) / 3;
							var heightdiff = this.tiles[i-1][j].z - h;
							if (h > this.tolerancevalue)
							{
								h = Math.round(h - (tolerancevalue / 2));
							}	
						}
					}
					else
					{
						h = (this.tiles[i][j-1].z + h) / 2;	
					}
					
				}
				var t_type = 'grass';
				this.tiles[i][j] = new tile(j,i,Math.round(h),t_type);
			}

		}
	};

	this.generateTrees = function() {
		for (var i=0; i < this.height; i++)
		{
			for (var j=0; j < this.width; j++)
			{
				if (this.tiles[i][j].z > 3)
				{
					var r = Math.floor((Math.random()*15));;
					if (r == 3)
					{
						this.tiles[i][j].tree = true;
					}
				}
			}
		}
	};

	this.generateCoastal = function () {
		for (var i = 0; i < this.height; i++)
		{

		}
	};


	this.generate = function (){
		var T = this.tolerancevalue;
		var baseT = this.tolerancevalue;
		for (var i=0; i < this.height; i++)
		{
			var row = [];
			var t_type = 'grass';
			for (var j=0; j < this.width; j++)
			{
				var tmp = new tile(j,i,40,t_type);
				if (this.random) {
					var previoustile1;
					var previoustile2;
					var h =0;
					h = Math.floor((Math.random()*T)+1);
					if (i > 0)
					{
						if (typeof this.tiles[j] !== 'undefined')
						{
							if (typeof this.tiles[j][i-1] !== 'undefined')
							{
								previoustile1 = this.tiles[j][i-1];
							}
						}

					}

					else if (this.tiles.length > 1 && j > 0)
					{
						if (typeof this.tiles[j-1]!== 'undefined')
						{
							if (typeof this.tiles[j-1][i]!== 'undefined')
							{
								previoustile2 = this.tiles[j-1][i];
							}
						}
					}

					if (previoustile1)
					{
						h = (previoustile1.z + h) / 2;
						console.log(h);
						if (previoustile2)
						{
							if (T > 1) {
								var avg_height = (previoustile1.z + previoustile2.z + h) / 3;
								h = avg_height;
								T--;
							} else {
								this.tiles[j][i-1].z = h;
								this.tiles[j-1][i].z = h;
								T++;
							}
							
						}
					}
					if (T > baseT)
					{
						T--;
					}
					else if (T < baseT)
					{
						T++;
					}
					else
					{
						T--;
					}
					
					
					tmp = new tile(j,i,Math.round(h),t_type);
				}
				 
				if (t_type == 'grass')
				{
					 t_type = 'rock';
				}
				else if (t_type == 'rock')
				{
					 t_type = 'grass';
				}
				//row.push(tmp);
				row[j] = tmp;
			}
			this.tiles[i] = row;
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