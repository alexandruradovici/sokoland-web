var s_HelloWorld = "res/HelloWorld.png";
var s_CloseNormal = "res/CloseNormal.png";
var s_CloseSelected = "res/CloseSelected.png";
var s_iphone_level1_png = "res/iphone_level1.png";
var s_iphone_puzzle_plist = "res/iphone_puzzle.plist";
var s_iphone_puzzle_png = "res/iphone_puzzle.png";

var g_ressources = [
    //image
    {type:"image", src:s_HelloWorld},
    {type:"image", src:s_CloseNormal},
    {type:"image", src:s_CloseSelected},
    {type:"image", src:s_iphone_level1_png},
    {type:"image", src:s_iphone_puzzle_png},

    //plist
    {type:"plist", src:s_iphone_puzzle_plist}

    //fnt

    //tmx

    //bgm

    //effect
];

var str = 
["        # # # # #                   ",
"        # . . . #                   ",  
"        # .o. . #                   ", 
"    # # # % % %o# #                 ",  
"    # % % %o. %o% #                 ",  
"# # # % f % & & % # . . ^ ^ ^ ^ ^ ^ ",  
"# . . % f % & & % # # # f . . + + ^ ",  
"# % %o% % %o% % % % % %|% . . + + ^ ",  
"# # # # # % f f f % # # f . . + + ^ ",  
"        # % % % % % # # ^ ^ ^ ^ ^ ^ ",  
"        # # # # # # #               "];


function getTextureName(n)
{
	switch (n)
	{
		case '#':
			return "bushes.png";
			
		case 'f':
			return "flowers.png";
			
		case '?':
			return "carrots.png";
			
		case '^':
			return "tree.png";
			
		case '&':
			return "rock.png";
            
        case '~':
			return "water.png";
			
		case '%':
			return "gravel.png";
			
		case '.':
			return "grass.png";

		case '/':
			return "bridge.png";
			
		case '+':
            // TODO schimbat poza
			return "landing_success.png";
			
		case 'o':
			return "egg.png";
            
        case 's':
			return "egg_success.png";
            
        case '=':
			return "landing_success.png";

		case '|':
			return "player_bunny.png";
			
		default:
			return "gravel.png";
	}
}

function loadLevel ()
{
	level = new Array (str[2].length/2);
	for (var i=0; i<level.length; i++)
	{
		level[i] = new Array (str.length);
		for (var j=0; j<level[i].length; j++)
		{
			level[i][j] = str[j][i*2];
		}
	}
	//console.log (level);
	return level;
}

function loadObjects ()
{
	objects = new Array (str[2].length/2);
	for (var i=0; i<objects.length; i++)
	{
		objects[i] = new Array (str.length);
		for (var j=0; j<objects[i].length; j++)
		{
			objects[i][j] = str[j][i*2+1];
		}
	}
	//console.log (level);
	return objects;
}


function X(data)
{
	return 30+25*data;
}

function Y(data)
{
	return 20*data;
}
function TO_Y (data)
{
	return 3+11-data-1;
}

function IS_WALL(data)
{
	return data == '#';
}

function IS_FLOOR(data)
{
	return (data=='?' || data=='^' || data=='&' || data=='~' || data=='%' || data=='.' || data=='/' || data == 'f' || data=='+');
}

function TO_Z(data)
{
	return (data+1)*100;
}

function TO_Z_S(data)
{
	return (data+1)*100+1;
}

function TO_PLAYER_Z(data)
{
	return (data+1)*100+2;
}

function TO_OBJECT_Z(data)
{
	return (data+1)*100+2;
}

function MAY_WALK (data)
{
	return (data=='%' || data=='.' || data=='/' || data=='+' || data=='=')
}

function IS_OBJECT (data)
{
	return (data=='o' || data=='s');
}

function mayMoveObject(x, y, dir, ground, objects, LM, LN)
{
	var move = true;
	if (IS_OBJECT(objects[x][y]))
	{
		move = false;
		switch (dir)
		{
			case 1:
				if (x>0)
				{
					if (!IS_OBJECT(objects[x-1][y]) && MAY_WALK(ground[x-1][y])) move = true;	
				}
				break;

			case 2:
				if (x<LM)
				{
					if (!IS_OBJECT(objects[x+1][y]) && MAY_WALK(ground[x+1][y])) move = true;	
				}
				break;
				
			case 3:
				if (y>0)
				{
					if (!IS_OBJECT(objects[x][y-1]) && MAY_WALK(ground[x][y-1])) move = true;	
				}
				break;
				
			case 4:
				if (y<LN)
				{
					if (!IS_OBJECT(objects[x][y+1]) && MAY_WALK(ground[x][y+1])) move = true;	
				}
				break;
				
		}
	}
	return move;
}

function mayMoveTo(x, y, dir, playerx, playery, LM, LN, ground, objects)
{
	// CCLOG (@"x: %d y: %d / playerx: %d playery: %d", x, y, playerx, playery);
	if ((Math.abs(x-playerx) + Math.abs(y-playery) == 1) && x>=0 && x<LM && y<LN && y>=0 && MAY_WALK(ground[x][y]) && mayMoveObject (x, y, dir, ground, objects, LM, LN)) return true;
	else return false;
}

function OBJECT_TAG (x, y)
{
	return (10000*x+10*y+1);
}


