var root;

//--------------------------------------------------------------------------
//                                  Sprite()
//--------------------------------------------------------------------------
function Sprite() {
    this.m_image = null;
    this.m_matrix = [1, 0, 0, 1, 0, 0];
    this.m_rotation = 0;
    this.m_width = 0;
    this.m_height = 0;
    this.m_parent = null;
    this.m_childs = new Array();
    this.invalidate();
    if (root != null) {
        root.addChild(this);
    }
}

//--------------------------------------------------------------------------
//                                  addChild
//--------------------------------------------------------------------------
Sprite.prototype.addChild = function(sprite) {
    if (sprite.m_parent != null) {
        sprite.m_parent.removeChild(sprite);
    }
    sprite.m_parent = this;
    this.m_childs.push(sprite);
}

//--------------------------------------------------------------------------
//                                  removeChild
//--------------------------------------------------------------------------
Sprite.prototype.removeChild = function(sprite) {
    if (sprite.m_parent != this) return;
    sprite.m_parent = null;
    var index = this.m_childs.indexOf(sprite);
    this.m_childs.splice(index, 1);
}

//--------------------------------------------------------------------------
//                                  Sprite.x
//--------------------------------------------------------------------------
Object.defineProperty(Sprite.prototype, "x", {
	set:function(value) {
		this.m_matrix[4] = value;
        this.invalidate();
	},
	get:function() {
		return this.m_matrix[4];
	}    
});

//--------------------------------------------------------------------------
//                                  Sprite.y
//--------------------------------------------------------------------------
Object.defineProperty(Sprite.prototype, "y", {
	set:function(value) {
		this.m_matrix[5] = value;
        this.invalidate();
	},
	get:function() {
		return this.m_matrix[5];
	}    
});

//--------------------------------------------------------------------------
//                                  Sprite.rotation
//--------------------------------------------------------------------------
Object.defineProperty(Sprite.prototype, "rotation", {
	set:function(value) {
    this.m_rotation = value;
    this.invalidate();
    var rad = value * 0.0175;
    var cs = Math.cos(rad);
    var sn = Math.sin(rad);
    this.m_matrix[0] =  cs;
    this.m_matrix[1] =  sn;
    this.m_matrix[2] = -sn;
    this.m_matrix[3] =  cs;
	},
	get:function(){
		return this.m_rotation;
	}
});

//--------------------------------------------------------------------------
//                                  Sprite.move()
//--------------------------------------------------------------------------
Sprite.prototype.move = function(x, y) {
    var vx = this.m_matrix[0] * x + this.m_matrix[2] * y;
    var vy = this.m_matrix[1] * x + this.m_matrix[3] * y;
    this.x += vx;
    this.y += vy;
}

//--------------------------------------------------------------------------
//                                  Sprite.turn()
//--------------------------------------------------------------------------
Sprite.prototype.turn = function(ang) {
    this.rotation += ang;
}


//--------------------------------------------------------------------------
//                                  Sprite.setImage()
//--------------------------------------------------------------------------
Sprite.prototype.setImage = function(filename) {
    var image = loadImage(filename);
    
    var sprite = this;
    image.onload = function() {
        sprite.m_width = this.width;
        sprite.m_height = this.height;
        sprite.m_image = image;
        this.onload = null;
    }
}

//--------------------------------------------------------------------------
//                                  Sprite.draw()
//--------------------------------------------------------------------------
Sprite.prototype.draw = function() {
    context.save();
    
    context.transform(
        this.m_matrix[0], 
        this.m_matrix[1], 
        this.m_matrix[2], 
        this.m_matrix[3], 
        this.m_matrix[4], 
        this.m_matrix[5]);
        
    if (this.m_image != null) 
        context.drawImage(this.m_image, -this.m_width/2, -this.m_height/2);
        
    for (var i=0; i<this.m_childs.length; i++) {
        var child = this.m_childs[i];
        child.draw();
    }    
        
    context.setTransform(1, 0, 0, 1, 0, 0);
    var aabb = this.aabb;
    context.beginPath();
    context.moveTo(aabb.x1, aabb.y1);
    context.lineTo(aabb.x2, aabb.y1);
    context.lineTo(aabb.x2, aabb.y2);
    context.lineTo(aabb.x1, aabb.y2);
    context.lineTo(aabb.x1, aabb.y1);
    context.stroke();

    context.restore();
    
}

Object.defineProperty(Sprite.prototype, "globalMatrix", {
    get : function() {
        var mat;
        if (this.m_parent != null) {
            mat = this.m_parent.globalMatrix;
        } else {
            mat = [1, 0, 0, 1, 0, 0];
        }
        
        var mat2 = mat;
        var mat1 = this.m_matrix;
        
        var m11 = mat2[0] * mat1[0] + mat2[2] * mat1[1];
        var m12 = mat2[1] * mat1[0] + mat2[3] * mat1[1];
        var m21 = mat2[0] * mat1[2] + mat2[2] * mat1[3];
        var m22 = mat2[1] * mat1[2] + mat2[3] * mat1[3];
        var tx  = mat2[0] * mat1[4] + mat2[2] * mat1[5] + mat2[4];
        var ty  = mat2[1] * mat1[4] + mat2[3] * mat1[5] + mat2[5];
        return [m11, m12, m21, m22, tx, ty];
    }
});

Sprite.prototype.transformPoint = function(x, y) {
    var matrix = this.globalMatrix;
    var tx = matrix[0] * x + matrix[2] * y + matrix[4];
    var ty = matrix[1] * x + matrix[3] * y + matrix[5];
    return { x:tx, y:ty };
}

Sprite.prototype.recalcAABB = function() {
    var point1 = this.transformPoint(-this.m_width/2, -this.m_height/2);
    var point2 = this.transformPoint( this.m_width/2, -this.m_height/2);
    var point3 = this.transformPoint( this.m_width/2,  this.m_height/2);
    var point4 = this.transformPoint(-this.m_width/2,  this.m_height/2);
    var left    = Math.min(point1.x, Math.min(point2.x, Math.min(point3.x, point4.x)));
    var right   = Math.max(point1.x, Math.max(point2.x, Math.max(point3.x, point4.x)));
    var top     = Math.min(point1.y, Math.min(point2.y, Math.min(point3.y, point4.y)));
    var bottom  = Math.max(point1.y, Math.max(point2.y, Math.max(point3.y, point4.y)));
    this.m_aabb = { x1:left, y1:top, x2:right, y2:bottom };
    this.m_invalidate = false;
}

//--------------------------------------------------------------------------
//                                  invalidate()
//--------------------------------------------------------------------------
Sprite.prototype.invalidate = function() {
    this.m_invalidate = true;
    for (var i=0; i<this.m_childs.length; i++) {
        var child = this.m_childs[i];
        child.invalidate();
    }
}

//--------------------------------------------------------------------------
//                                  Sprite.aabb
//--------------------------------------------------------------------------
Object.defineProperty(Sprite.prototype, "aabb", {
    get: function() {
        if (this.m_invalidate) this.recalcAABB();
        return this.m_aabb;
    }
});

//--------------------------------------------------------------------------
//                                  hitTestObject()
//--------------------------------------------------------------------------
Sprite.prototype.hitTestObject = function(sprite) {
    var aabb1 = this.aabb;
    var aabb2 = sprite.aabb;
    if (aabb1.x2 < aabb2.x1) return false;
    if (aabb2.x2 < aabb1.x1) return false;
    if (aabb1.y2 < aabb2.y1) return false;
    if (aabb2.y2 < aabb1.y1) return false;
    return true;
}

//--------------------------------------------------------------------------
//                                  loadSprite()
//--------------------------------------------------------------------------
function loadSprite(filename) {
    var sprite = new Sprite();
    sprite.setImage(filename);
    return sprite;
}

//--------------------------------------------------------------------------
//                                  drawFrame()
//--------------------------------------------------------------------------
function drawFrame() {
    clearScreen();
    root.draw();
}

//--------------------------------------------------------------------------
//                                  create root
//--------------------------------------------------------------------------
root = new Sprite();

