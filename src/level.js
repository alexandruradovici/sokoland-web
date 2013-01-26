
function getShaddow(name, x, y)
{
	var shaddow = cc.Sprite.createWithSpriteFrameName(name);
	shaddow.setAnchorPoint(new cc.Point(1,1));
	shaddow.setPosition (X(x),Y(TO_Y(y)));
	return shaddow;
}

var layer = cc.Layer.extend({

	bunnyX : 0,
	bunnyY : 0,
	objX: 0,
	objY: 0,
	objX2: 0,
	objY2: 0,
	player : null,
	l11 : null,
	o11 : null,
	LM: 0,
	LN: 0,

    init:function () {
        this._super();
        cc.SpriteFrameCache.getInstance().addSpriteFrames (s_iphone_puzzle_plist, s_iphone_puzzle_png);        
        
        this.l11 = loadLevel ();
       
       	this.LM = this.l11.length;
       	this.LN = this.l11[2].length;
       	
       	var MAX_M = this.LM-1;
       	var MAX_N = this.LN-1;
       	
       	console.log (this.LM+" "+this.LN);
       
        for (var i = 0; i<this.LM; i++)
        {
        	for (var j = 0; j<this.LN; j++)
        	{
        		if (this.l11[i][j]!=' ')
				{
					//console.log (i+" "+j);
					var texture = getTextureName(this.l11[i][j]);
					//console.log (texture);
					var object = cc.Sprite.createWithSpriteFrame (cc.SpriteFrameCache.getInstance().getSpriteFrame(texture));
					//console.log (object.getContentSize());
					object.setAnchorPoint (new cc.Point(1,1));
					object.setPosition (X(i), Y(TO_Y(j)));
					//[this.l11sprites addChild:object z:TO_Z(y) tag:LEVEL_TAG(x,y)];
					/*if (IS_TARGET(this.l11[x][y]))
					{
						// CCLOG (@"%d %d %d %d", x, y, (objects[x][y]!='2')?2:3, X_Y_N_TO_DATA(x, y, ((objects[x][y]!='2')?2:3)));
						object.tag = X_Y_N_TO_DATA(x, y, ((objects[x][y]!='2')?2:3));
						[destinations addObject:object];
					}*/
					this.addChild (object, TO_Z(j));
				}

        	}
        }
        
        for (var i=0; i<this.LM; i++)
		for (var j=0; j<this.LN; j++)
		{
			if (IS_FLOOR(this.l11[i][j]))
			{
				console.log ("floor");
				if (i>0 && IS_WALL(this.l11[i-1][j]))
				{
					var shaddow = getShaddow("SW.png", i, j);
					this.addChild(shaddow, TO_Z_S(j));// z:TO_S_Z(j)];
				}
				if (i<MAX_M && IS_WALL(this.l11[i+1][j]))
				{
					var shaddow = getShaddow("SE.png", i, j);
					this.addChild(shaddow, TO_Z_S(j));
					//CCSprite *shaddow = [self getShaddow:@"SE.png" x:i y:j];
					//[this.l11sprites addChild:shaddow z:TO_S_Z(j)];
				}
				if (j>0 && IS_WALL(this.l11[i][j-1]))
				{
					var shaddow = getShaddow("SN.png", i, j);
					this.addChild(shaddow, TO_Z_S(j));
					//CCSprite *shaddow = [self getShaddow:@"SN.png" x:i y:j];
					//[this.l11sprites addChild:shaddow z:TO_S_Z(j)];
				}
				if (i>0 && j>0 && IS_FLOOR(this.l11[i-1][j]) && IS_FLOOR(this.l11[i][j-1]) && IS_WALL(this.l11[i-1][j-1]))
				{
					var shaddow = getShaddow("SNW.png", i, j);
					this.addChild(shaddow, TO_Z_S(j));
					//CCSprite *shaddow = [self getShaddow:@"SNW.png" x:i y:j];
					//[this.l11sprites addChild:shaddow z:TO_S_Z(j)];
				}
				if (i<MAX_M && j>0 && IS_FLOOR(this.l11[i+1][j]) && IS_FLOOR(this.l11[i][j-1]) && IS_WALL(this.l11[i+1][j-1]))
				{
					var shaddow = getShaddow("SNE.png", i, j);
					this.addChild(shaddow, TO_Z_S(j));
					//CCSprite *shaddow = [self getShaddow:@"SNE.png" x:i y:j];
					//[this.l11sprites addChild:shaddow z:TO_S_Z(j)];
				}
				if (i>0 && j<MAX_N && IS_FLOOR(this.l11[i-1][j]) && IS_FLOOR(this.l11[i][j+1]) && IS_WALL(this.l11[i-1][j+1]))
				{
					var shaddow = getShaddow("SSW.png", i, j);
					this.addChild(shaddow, TO_Z_S(j));
					//CCSprite *shaddow = [self getShaddow:@"SSW.png" x:i y:j];
					//[this.l11sprites addChild:shaddow z:TO_S_Z(j)];
				}
				if (i<MAX_M && j<MAX_N && IS_FLOOR(this.l11[i+1][j]) && IS_FLOOR(this.l11[i][j+1]) && IS_WALL(this.l11[i+1][j+1]))
				{
					var shaddow = getShaddow("SSE.png", i, j);
					this.addChild(shaddow, TO_Z_S(j));
					//CCSprite *shaddow = [self getShaddow:@"SSE.png" x:i y:j];
					//[this.l11sprites addChild:shaddow z:TO_S_Z(j)];
				}
			}
		}
		
		this.o11 = loadObjects ();
		
		//bunnyX = 0;
		//bunnyY = 0;
		
		for (var i = 0; i<this.LM; i++)
        {
        	for (var j = 0; j<this.LN; j++)
        	{
        		if (this.o11[i][j]!=' ' && this.o11[i][j]!='|')
				{
					//console.log (i+" "+j);
					var texture = getTextureName(this.o11[i][j]);
					console.log (texture);
					var object = cc.Sprite.createWithSpriteFrame (cc.SpriteFrameCache.getInstance().getSpriteFrame(texture));
					//console.log (object.getContentSize());
					object.setAnchorPoint (new cc.Point(1,1));
					object.setPosition (X(i), Y(TO_Y(j)));
					//[this.l11sprites addChild:object z:TO_Z(y) tag:LEVEL_TAG(x,y)];
					/*if (IS_TARGET(this.l11[x][y]))
					{
						// CCLOG (@"%d %d %d %d", x, y, (objects[x][y]!='2')?2:3, X_Y_N_TO_DATA(x, y, ((objects[x][y]!='2')?2:3)));
						object.tag = X_Y_N_TO_DATA(x, y, ((objects[x][y]!='2')?2:3));
						[destinations addObject:object];
					}*/
					this.addChild (object, TO_OBJECT_Z(j), OBJECT_TAG (i, j));
				}
				if (this.o11[i][j]=='|')
				{
					this.bunnyX = i;
					this.bunnyY = j;
				}

        	}
        }

		this.player = cc.Sprite.createWithSpriteFrame (cc.SpriteFrameCache.getInstance().getSpriteFrame('player_bunny_down.png'));
		this.player.setAnchorPoint (new cc.Point(1,1));
        this.player.setPosition (X(this.bunnyX),Y(TO_Y(this.bunnyY)));
        
        console.log (this.bunnyX+" "+this.bunnyY);
        
        this.addChild (this.player, TO_PLAYER_Z(this.bunnyY), 2);
        
        var bg = cc.Sprite.create (s_iphone_level1_png);
        
        bg.setAnchorPoint (new cc.Point (0,0));
        bg.setPosition (0,0);
        this.addChild (bg, 0);
        
        this.setTouchEnabled (true);
    },
    
    onTouchesEnded:function(pTouch, pEvent)
    {
    	touchLocation = pTouch[0].getLocation();
    	console.log ("click");
    	var bX = this.bunnyX;
    	var bY = this.bunnyY;
        if(touchLocation.x < 120)
        {
            bX--;
            dir = 1;
        }
        else if (touchLocation.x > 360)
        {
            bX++
            dir = 2;
        }
        else
        {
        	if(touchLocation.y < 120)
        	{
            	bY++;
            	dir = 4;
            }
        	else if (touchLocation.y > 200)
        	{
            	bY--;
            	dir = 3;
            }
            
        }
        
        if (dir > 0)
        {
        	if (mayMoveTo (bX, bY, dir, this.bunnyX, this.bunnyY, this.LM, this.LN, this.l11, this.o11))
            {
            	this.bunnyX = bX;
            	this.bunnyY = bY;
            	movePlayer (this, this.player, this.bunnyX, this.bunnyY, dir);
            	if (IS_OBJECT (this.o11[bX][bY]))
				{
					this.objX = bX;
					this.objY = bY;
					moveObject (this, this.getChildByTag (OBJECT_TAG (bX, bY)), bX, bY, dir, this.o11);
				}
            }
		}
    },
    
    handleKey:function(e)
    {
    	console.log (e);
        if(e === cc.KEY.left)
        {
            this._currentRotation--;

        }
        else if(e === cc.KEY.right)
            this._currentRotation++;

        if(this._currentRotation < 0) this._currentRotation = 360;
        if(this._currentRotation > 360) this._currentRotation = 0;
    },
    
    playerPlace :function(data)
    {
    	this.removeChildByTag (2);
        this.addChild (this.player, TO_PLAYER_Z(this.bunnyY), 2);
    },
    
    objectPlace :function(obj)
    {
    	obj = this.getChildByTag (OBJECT_TAG(this.objX, this.objY));
    	this.removeChildByTag (OBJECT_TAG(this.objX, this.objY));
        this.addChild (obj, TO_OBJECT_Z(this.objY2), OBJECT_TAG (this.objX2, this.objY2));
    }

});

function movePlayer (object, player, x, y, l)
{
	if (l == 3)
	{
		player.runAction (cc.Sequence.create (
		[cc.MoveTo.create (0.2, new cc.Point (X(x),Y(TO_Y(y)))), 
						cc.CallFunc.create (object.playerPlace, object, null)]));
	}
	else
	{
		object.playerPlace (null);
		player.runAction (cc.MoveTo.create (0.2, new cc.Point (X(x),Y(TO_Y(y)))));
	}
}

function moveObject (obj, object, x, y, l, objects)
{
	var x2 = x;
	var y2 = y;
	switch (dir)
	{
		case 1:
		{
			x2 = x-1;
			break;
		}
			
		case 2:
		{
			x2 = x + 1;
			break;
		}
		
		case 3:
		{
			y2 = y - 1;
			break;
		}
		
		case 4:
		{
			y2 = y +1;
			break;
		}
	}
	objects[x2][y2] = objects[x][y];
	objects[x][y] = ' ';
	x=x2;
	y=y2;
	obj.objX2 = x2;
	obj.objY2 = y2;
	if (l == 3)
	{
		object.runAction (cc.Sequence.create (
		[cc.MoveTo.create (0.2, new cc.Point (X(x),Y(TO_Y(y)))), 
						cc.CallFunc.create (object.objectPlace, obj, object)]));
	}
	else
	{ 
		console.log ("obj move");
		obj.objectPlace (object);
		object.runAction (cc.MoveTo.create (0.2, new cc.Point (X(x),Y(TO_Y(y)))));
	}
}


var level = cc.Scene.extend({
	onEnter:function ()
	{
		this._super ();
		
		la = new layer();
        this.addChild(la);
        la.init();
	}
});
