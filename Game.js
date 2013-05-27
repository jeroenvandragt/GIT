//---------------------------------------------------------------------------------------
//									Load the sprite
//---------------------------------------------------------------------------------------
var sprite = loadSprite("./image.png");
var enemy = loadSprite("./enemy.png");
//var testEnemy = drawImage("./enemy.png", 10, 10);

var score = 0

//---------------------------------------------------------------------------------------
//									Set the sprites
//---------------------------------------------------------------------------------------
sprite.x = 700;
sprite.y = 650;
sprite.rotation = -90;

enemy.x = Math.random() * canvas.width;
enemy.y = -50;
enemy.rotation = -90;

var enemyList = new Array();

function update()
{
	if	(key[37]) sprite.move(0,-speed);
	if	(key[39]) sprite.move(0,speed);
	//if	(key[38]) sprite.move(	 5,	0);
	//if	(key[40]) sprite.move(	-5,	0);	
	
	
	if(!timerBool) timer ++;

	if(timer == maxTimer) 
	{
		timer = 0;
		timerBool = true;
	}	
	
	if	(key[32])
	{
		if(timerBool) 
		{
			drawBullet();
			timerBool = false;
		}	
	}
	
	enemy.y += 5;
	
	if(enemy.y == SCREENHEIGHT) score --;
	
	if ((sprite.x - 50) <= 0) sprite.x = 50;
	if ((sprite.x + 50) >= SCREENWIDTH)
	{
		sprite.x = SCREENWIDTH - 50;
	}

	if(sprite.hitTestObject(enemy))
	{
		alert("Collision!");
	}
//---------------------------------------------------------------------------------------
//									Draw all the objects
//---------------------------------------------------------------------------------------

clearScreen();
sprite.draw();
spawnEnemy();

updateBullets();

context.fillStyle = "#000000";
context.fillText(bulletSpeed, 8, 12);
}
setInterval(update, 25); 
//setInterval(bullets[bullets.length - 1].updateBullets, 25);

function Enemy( startX, startY ) 
{
	x = startX;
	y = startY;
	enemy.draw();
}

function updateEnemies()
{
	
}

function spawnEnemy()
{
	for(var i = 0; i < 5; i ++)
	{
		enemy.draw();
	}
}
