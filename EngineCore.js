//--------------------------------------------------------------------------
//                                      Global variables
//--------------------------------------------------------------------------

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var SCREENWIDTH = canvas.width;
var SCREENHEIGHT = canvas.height;

var speed = 7;
var bulletSpeed = 1;



var timer = 0;
var maxTimer = 50;
var timerBool = false;

//--------------------------------------------------------------------------
//                                       Core functions
//--------------------------------------------------------------------------

function clearScreen() 
{
	var col = Math.floor(Math.random() * 0xffffff).toString(16);
    context.fillStyle = "#ADD8E6";
    context.fillRect(0, 0, SCREENWIDTH, SCREENHEIGHT);
}

function loadImage(filename) {
    var image = new Image();
    image.src = filename;
    return image;
}

//--------------------------------------------------------------------------
//                                      keyboard
//--------------------------------------------------------------------------

var key = new Array();

function onKey(e) {
    e = e || window.event;
    key[e.keyCode] = (e.type == "keydown");
}

document.addEventListener("keydown", onKey);
document.addEventListener("keyup", onKey);