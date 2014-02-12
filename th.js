// JavaScript Isometric View Renderer
// Author: Donald Jones
// * Feb. 10, 2014: Restructured rendering to help avoid some "seams" between tiles. Also added tolerance paramter to map constructor.

var tilesize = 15;
var grid = false;
var randomMap = true;

window.onload = function() {
	var sf = document.getElementById('surface');
	var context = sf.getContext('2d');
	context.translate(sf.width / 2, sf.height /4);
	context.scale(1,0.5);
	context.rotate(45 * Math.PI / 180);
	var newmap = new map("test",50,50, randomMap, 25);
	newmap.generateRiver();
	newmap.generateTrees();

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
	ctx.moveTo(end1.x, end1.y);
	ctx.lineTo(end2.x, end2.y);
	ctx.lineTo(end4.x, end4.y);
	ctx.lineTo(end3.x, end3.y);
	ctx.lineTo(end1.x, end1.y);
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

	if (tile.tree)
	{
		var start_x = Math.floor((end1.start_x+end4.x)/2);
		var start_y = Math.floor((end1.start_y+end4.y)/2);
		var end_x = start_x - tilesize - Math.floor(Math.random()*5);
		var end_y = start_y - tilesize - Math.floor(Math.random()*5);
		ctx.beginPath();
		ctx.moveTo(start_x,start_y);
		ctx.lineTo(end_x, end_y);
		ctx.closePath();
		//ctx.strokeStyle = '#5C4033';
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 3;
		ctx.stroke();


		ctx.beginPath();
		ctx.moveTo(end_x,end_y);
		ctx.lineTo(end_x + 15 * -Math.cos(Math.PI / 4),end_y + 15 * -Math.sin(Math.PI / 4));
		ctx.moveTo(end_x,end_y);
		ctx.lineTo(end_x + 15 * -Math.cos(Math.PI / 6),end_y + 15 * -Math.sin(Math.PI / 6));
		ctx.moveTo(end_x,end_y);
		ctx.lineTo(end_x + 15 * -Math.cos(Math.PI / 3),end_y + 15 * -Math.sin(Math.PI / 3));
		ctx.closePath();
		ctx.lineWidth = 1;
		ctx.stroke();

	//	ctx.beginPath();
//		ctx.arc(end_x, end_y, 15, -1.1 * -Math.cos(Math.PI / 4), 1.9 * -Math.sin(Math.PI / 4), true);
//		ctx.lineWidth = 1;
//		ctx.strokeStyle = '#2F4F2F';
//		ctx.stroke();

	}
}