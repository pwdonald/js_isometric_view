var tilesize = 32;
var grid = false;

window.onload = function() {
	var sf = document.getElementById('surface');
	var context = sf.getContext('2d');
	context.translate(sf.width / 2, sf.height /4);
	context.scale(1,0.5);
	context.rotate(45 * Math.PI / 180);
	var newmap = new map('test', 15,15);
	newmap.generate();
	newmap.draw();
	drawCube2(new tile(0,0,'grass'));
	drawCube2(new tile(1,0,'grass'));
	drawCube2(new tile(2,0,'grass'));
	drawCube2(new tile(3,0,'grass'));
	drawCube2(new tile(4,0,'grass'));
	drawCube2(new tile(5,0,'grass'));
	drawCube2(new tile(6,0,'grass'));
	drawCube2(new tile(7,0,'grass'));
	drawCube2(new tile(8,0,'grass'));
	drawCube2(new tile(9,0,'grass'));
	drawCube2(new tile(10,0,'grass'));
	drawCube2(new tile(11,0,'grass'));
	drawCube2(new tile(12,0,'grass'));
	drawCube2(new tile(13,0,'grass'));
	drawCube2(new tile(14,0,'grass'));

	drawCube2(new tile(0,1,'grass'));
	drawCube2(new tile(0,2,'grass'));
	drawCube2(new tile(0,3,'grass'));
	drawCube2(new tile(0,4,'grass'));
	drawCube2(new tile(0,5,'grass'));
	drawCube2(new tile(0,6,'grass'));
	drawCube2(new tile(0,7,'grass'));
	drawCube2(new tile(0,8,'grass'));
	drawCube2(new tile(0,9,'grass'));
	drawCube2(new tile(0,10,'grass'));
	drawCube2(new tile(0,11,'grass'));
	drawCube2(new tile(0,12,'grass'));
	drawCube2(new tile(0,13,'grass'));
	drawCube2(new tile(0,14,'grass'));

	drawCube2(new tile(5,7,'grass'));
	drawCube2(new tile(5,8,'grass'));
	//drawCube2(new tile(11,0,'grass'));
	drawCube2(new tile(7,8,'grass'));
};

var tile = function(x, y, type){
	this.x = x;
	this.y = y;
	this.type = type;
};

var map = function(name, width, height){
	this.name = name;
	this.width = width;
	this.height = height;
	this.tiles = [];

	this.generate = function (){
		for (var i=0; i < this.height; i++)
		{
			var row = [];
			var t_type = 'grass';
			for (var j=0; j < this.width; j++)
			{
				var tmp = new tile(j,i,t_type);
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
				drawTile(this.tiles[j][i]);
			}
		}
	};
};

function drawTile(tile){
	var canvas = document.getElementById('surface');
	var ctx = canvas.getContext('2d');
	if (tile.type == 'grass') {
		ctx.fillStyle = 'green';
	}
	if (tile.type == 'rock') {
		ctx.fillStyle = 'gray';
	}
	ctx.beginPath();
	ctx.rect(tile.x * tilesize, tile.y * tilesize,tilesize,tilesize);
	ctx.fill();
	ctx.strokeStyle = ctx.fillStyle;
	ctx.lineWidth = 1;
	ctx.stroke();
	if (grid === true)
	{
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'blue';
		ctx.stroke();
		ctx.font = "10px Arial";
		ctx.fillStyle = 'white';
		ctx.fillText(tile.x + ',' + tile.y, tile.x * tilesize,tile.y * tilesize + (tilesize - 1));
	}
	ctx.closePath();
	//drawLine(tile.x, tile.y, tilesize, 45);
	//drawLine(tile.x + tilesize, tile.y, tilesize, 45);
	//drawLine(tile.x, tile.y + tilesize, tilesize, 45);
	//ctx.translate((tile.x * tilesize) / 2, (tile.y * tilesize) / 2)
}

function drawLine(startx, starty, length, color)
{
	var endx = (startx * tilesize) + length * -Math.cos(Math.PI / 4);
	var endy = (starty* tilesize) + length * -Math.sin(Math.PI / 4);
	var canvas = document.getElementById('surface');
	var ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.moveTo((startx * tilesize), (starty * tilesize));
	ctx.lineTo(endx, endy);
	if (grid === true)
	{
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.stroke();
	}
	ctx.closePath();
	return {x: endx, y: endy, start_x: startx * tilesize, start_y: starty * tilesize};
}

function drawLineSegment(pixel_startx, pixel_starty, pixel_endx, pixel_endy, color)
{
	var canvas = document.getElementById('surface');
	var ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.moveTo(pixel_startx, pixel_starty);
	ctx.lineTo(pixel_endx, pixel_endy);
	if (grid === true)
	{
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.stroke();
	}
	ctx.closePath();
}

function drawCube(tile)
{
	var end1 = drawLine(tile.x,tile.y,tilesize*2, 'red');
	var end2 = drawLine(tile.x + 1,tile.y, tilesize*2, 'purple');
	var end3 = drawLine(tile.x,tile.y+1, tilesize*2, 'white');
	var end4 = drawLine(tile.x +1,tile.y + 1, tilesize*2, 'black');

	drawLineSegment(end1.x, end1.y, end2.x, end2.y,'orange');
	drawLineSegment(end1.x, end1.y, end3.x, end3.y,'orange');
	drawLineSegment(end3.x, end3.y, end4.x, end4.y,'orange');
	drawLineSegment(end4.x, end4.y, end2.x, end2.y,'orange');
}

function drawCube2(tile)
{
	var end1 = drawLine(tile.x,tile.y,tilesize*2, 'red');
	var end2 = drawLine(tile.x + 1,tile.y, tilesize*2, 'purple');
	var end3 = drawLine(tile.x,tile.y+1, tilesize*2, 'white');
	var end4 = drawLine(tile.x +1,tile.y + 1, tilesize*2, 'black');

	var canvas = document.getElementById('surface');
	var ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.moveTo(end1.x, end1.y);
	ctx.lineTo(end2.x, end2.y);
	ctx.lineTo(end4.x, end4.y);
	ctx.lineTo(end3.x, end3.y);
	ctx.lineTo(end1.x, end1.y);
	ctx.closePath();
	ctx.fillStyle = 'gray';
	ctx.fill();
	ctx.strokeStyle = ctx.fillStyle;
	ctx.lineWidth = 2.5;
	ctx.stroke();
	if (grid === true)
	{
		ctx.strokeStyle = 'blue';
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.font = "10px Arial";
		ctx.fillStyle = 'white';
		ctx.fillText(tile.x + ',' + tile.y, end1.x,end1.y + (tilesize - 1));
	}
	//side
	ctx.beginPath();
	ctx.moveTo(end2.start_x, end2.start_y);
	console.log(end2);
	ctx.lineTo(end4.start_x, end4.start_y);
	ctx.lineTo(end4.x, end4.y);
	ctx.lineTo(end2.x, end2.y);
	ctx.lineTo(end2.start_x, end2.start_y);
	ctx.closePath();
	ctx.fillStyle = '#7F3300';
	ctx.fill();
	ctx.strokeStyle = ctx.fillStyle;
	ctx.lineWidth = 2;
	ctx.stroke();
	if (grid === true)
	{
		ctx.strokeStyle = 'blue';
		ctx.lineWidth = 2;
		ctx.stroke();
	}

		//side
	ctx.beginPath();
	ctx.moveTo(end3.start_x, end3.start_y);
	ctx.lineTo(end4.start_x, end4.start_y);
	ctx.lineTo(end4.x, end4.y);
	ctx.lineTo(end3.x, end3.y);
	ctx.lineTo(end3.start_x, end3.start_y);
	ctx.closePath();
	ctx.fillStyle = '#301300';
	ctx.fill();
	if (grid === true)
	{
		ctx.strokeStyle = 'blue';
		ctx.lineWidth = 2;
		ctx.stroke();
	}

}