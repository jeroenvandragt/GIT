	var bullets = new Array();
	var spriteList = new Array();
	var bulletSprite = loadSprite("./bullet.png");

	
	//var x = sprite.x;
	//var y = sprite.y;
		
	/*function Bullet()
	{
		this.x = sprite.x;
		this.y = sprite.y - 10;
		
	//	bulletSprite.x = sprite.x;
	//	bulletSprite.y = sprite.y;
	}*/
		
	/*function createBullet()
	{
		var bullet = new Bullet();
		bullet.init();
	//	spriteList.push(bulletSprite);
		bullets.push(bullet);
	}*/
		
	/*function updateBullets()
	{
		for(var i = 0; i < bulletList.length; i++)
		{
			var bullet = bullets[i];
			context.fillStyle = "#ff0000";
			context.fillRect(bullet.x, bullet.y , 2, 2);
				
			bullet.y = bullet.y -2;
		//	bulletSprite.draw();
		}
	}*/
	
	function newBullet(x,y) 
	{
		this.x = x;
		this.y = y;
    }

    function updateBullets() 
	{
		
	//	bulletSprite.y ++;
	//	bulletSprite.x ++;
		for(var i = 0; i < bullets.length; i++)
		{
			var bullet = bullets[i];
			var sprite = spriteList[i];
			
			
			bulletSprite.draw();
			sprite.y -= 1;
			
			bullet.move(2,0);
			
		//	context.fillStyle = "#ff0000";
		//	context.fillRect(bullet.x, bullet.y , 2, 2);
			
		}	
    }

	function drawBullet() 
	{
        var bullet = new newBullet(sprite.x,sprite.y);
		bulletSprite.x = sprite.x;
		bulletSprite.y = sprite.y - 55;
		
        bullets.push(bullet);
		//spriteList.push(bulletSprite);
	}
