var tilesize = 32;
var grid = false;
var canvas = document.createElement('canvas');
canvas.width = 4500;
canvas.height = 4500;
var viewCanvas = document.getElementById('surface');
var viewContext = viewCanvas.getContext('2d');
var vw;

document.onkeydown = function(evt)
{
	evt = evt || window.event;
	//alert(evt.keyCode);
	if (evt.keyCode == 39) vw.x = vw.x + 1;
	if (evt.keyCode == 37) vw.x = vw.x - 1;
	if (evt.keyCode == 40) vw.y = vw.y + 1;
	if (evt.keyCode == 38) vw.y = vw.y - 1;
	vw.drawView();
}


window.onload = function() {
	vw = new viewport(50,50);
	var context = canvas.getContext('2d');
	context.translate(3200, 500);
	//context.scale(1,0.5);
	context.rotate(45 * Math.PI / 180);
	var newmap = new map("test",100,100);
	newmap.generate();
	newmap.draw();
	vw.drawView();
};

var viewport = function(x,y){
	this.x = x;
	this.y = y;
	this.drawView = function() {
		viewx = this.x * tilesize;
		viewy = this.y * tilesize;
		viewContext.clearRect(0,0,viewCanvas.width,viewCanvas.height);
		viewContext.drawImage(canvas,viewx,viewy,viewCanvas.width, viewCanvas.height,0,0,viewCanvas.width,viewCanvas.height);
	};
};

function drawLine(startx, starty, length, color)
{
	var endx = (startx * tilesize) + length * -Math.cos(Math.PI / 4);
	var endy = (starty* tilesize) + length * -Math.sin(Math.PI / 4);
	//var canvas = document.getElementById('surface');
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

function drawTile(tile)
{

	var end1 = drawLine(tile.x,tile.y,tile.z, 'red');
	var end2 = drawLine(tile.x + 1,tile.y, tile.z, 'purple');
	var end3 = drawLine(tile.x,tile.y+1, tile.z, 'white');
	var end4 = drawLine(tile.x +1,tile.y + 1, tile.z, 'black');

	//var canvas = document.getElementById('surface');
	var ctx = canvas.getContext('2d');
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
	if (tile.z > 64)
	{
		ctx.fillStyle = 'gray';
	}
	if (tile.z > 100)
	{
		ctx.fillStyle = 'beige';
	}
	ctx.fill();
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