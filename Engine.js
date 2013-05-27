var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var image = new Image();
image.src = "image.png";

var ang = 0;

image.onload = function()
{
	//alert(this.width);
	//alert(this.height);
}

function update()
{
	context.fillStyle = "#ffffff";
	context.fillRect(0,0,canvas.width,canvas.height);
	
	context.save();
	
	context.setTransform(	1,0,
							0,1,
							700,300);
	//context.translate(700,300);
	//context.rotate(ang * 0.0175);
	//ang++;
	
	context.drawImage(image,-50,-50);

	
	context.restore();

}
setInterval(update,25);