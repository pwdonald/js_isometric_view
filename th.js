// JavaScript Isometric View Renderer
// Author: Donald Jones
// * Feb. 10, 2014: Restructured rendering to help avoid some "seams" between tiles. Also added tolerance paramter to map constructor.

var tilesize = 5;
var grid = false;
var randomMap = true;

window.onload = function() {
	var sf = document.getElementById('surface');
	var context = sf.getContext('2d');
	context.translate(sf.width / 2, sf.height /4);
	context.scale(1,0.5);
	context.rotate(45 * Math.PI / 180);
	var newmap = new map("test",125,100, randomMap, 15);
	newmap.generate();
	newmap.draw();
};

function drawLine(startx, starty, length, color)
{
	var endx = (startx * tilesize) + length * -Math.cos(Math.PI / 4);
	var endy = (starty* tilesize) + length * -Math.sin(Math.PI / 4);
	var canvas = document.getElementById('surface');
	var ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.moveTo((startx * tilesize), (starty * tilesize));
	ctx.lineTo(Math.floor(endx), Math.floor(endy));
	if (grid === true)
	{
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.stroke();
	}
	ctx.closePath();
	return {x: Math.floor(endx), y: Math.floor(endy), start_x: startx * tilesize, start_y: starty * tilesize};
}

function drawTile(tile)
{
	var end1 = drawLine(tile.x,tile.y,tile.z, 'red');
	var end2 = drawLine(tile.x + 1,tile.y, tile.z, 'purple');
	var end3 = drawLine(tile.x,tile.y+1, tile.z, 'white');
	var end4 = drawLine(tile.x+1,tile.y+1, tile.z, 'black');

	var canvas = document.getElementById('surface');
	var ctx = canvas.getContext('2d');

	ctx.strokeStyle = ctx.fillStyle;
	ctx.lineWidth = 0;
	//ctx.stroke();
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
	//console.log(end2);
	ctx.lineTo(end4.start_x, end4.start_y);
	ctx.lineTo(end4.x, end4.y);
	ctx.lineTo(end2.x, end2.y);
	ctx.lineTo(end2.start_x, end2.start_y);
	ctx.closePath();
	ctx.fillStyle = '#7F3300';
	ctx.fill();
	ctx.strokeStyle = ctx.fillStyle;
	//ctx.lineWidth = 2;
	//ctx.stroke();
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

	ctx.beginPath();

	ctx.moveTo(end1.x+.5, end1.y+.5);
	ctx.lineTo(end2.x+.5, end2.y+.5);
	ctx.lineTo(end4.x+.5, end4.y+.5);
	ctx.lineTo(end3.x+.5, end3.y+.5);
	ctx.lineTo(end1.x+.5, end1.y+.5);
	ctx.closePath();
	ctx.fillStyle = 'green';
	if (tile.z < 3)
	{
		ctx.fillStyle = 'blue';
	}
	if (tile.z > 50)
	{
		ctx.fillStyle = 'gray';
	}
	ctx.fill();

}