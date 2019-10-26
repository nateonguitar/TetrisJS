This is a typescript project.

From a terminal:
- `npm build` will compile the code into the `dist` directory,
- If the `dist` directory exits it will fail to compile.  Delete it first.

------

Installation: `npm install game-object-engine`

# The rest of this readme is due to change from a major re-factor.

The `lib` directory is the game engine.

Import all lib files into the index.html

```
<html>
<head>
	<!-- YOU MUST IMPORT THESE-->
	<script src="js/lib/Camera.js"></script>
	<script src="js/lib/Canvas.js"></script>
	<script src="js/lib/Debug.js"></script>
	<script src="js/lib/GameLauncher.js"></script>
	<script src="js/lib/GameManager.js"></script>
	<script src="js/lib/GameObject.js"></script>
	<script src="js/lib/Input.js"></script>
	<script src="js/lib/Level.js"></script>
	<script src="js/lib/SpritesheetAnimation.js"></script>
	<script src="js/lib/SpritesheetAnimationSet.js"></script>
	<script src="js/lib/StressTestSquare.js"></script>
	<script src="js/lib/Time.js"></script>
	<script src="js/lib/Transform.js"></script>
	<script src="js/lib/Utils.js"></script>
	<script src="js/lib/Vector2.js"></script>
	<!-- End required import-->

	<!-- my own code imports -->
	<script src="js/Zelda/Levels/OverworldController.js"></script>
	<script src="js/Zelda/Levels/OverworldLevel.js"></script>
	<script src="js/Zelda/GameObjects/Background.js"></script>
	<script src="js/Zelda/GameObjects/Player.js"></script>
	<script src="js/Zelda/GameObjects/Soldier.js"></script>
	<script src="js/Zelda/GameObjects/SoldierGreen.js"></script>
	<script src="js/Zelda/GameObjects/SoldierBlue.js"></script>
</head>

```

then in a script tag:

```
<div style="padding:10px; background-color: grey;">
    <div id="game-holder"></div>
</div>

<script type="text/JavaScript">
    function runZelda() {
        // Note: HTML5 canvas runs much smoother without antialiasing
        new GameLauncher({
            // all parameters are optional, they have defaults
            parentElementID: "game-holder",    // default: null, directly to body if not provided or id not found
            screenWidth: 1000,                 // default: 800
            screenHeight: 800,                 // default: 600
            imageAntiAliasing: false,          // default: false
            layers: 4,                         // default: 1
            showDebug: true,                   // default: false
            backgroundColor: "#001100",        // default: "#000000"
            border: "1px solid #008800",       // default: "1px solid #444444",
            levelClasses: {                    // default: {} and will error if no entries defined
                'Overworld': OverworldLevel,
                'LinksHouse': LinksHouseLevel,
            },
            initialLevel: 'Overworld'          // default: null, first entry of levelClasses will be used if not set
        });
    }

    window.addEventListener('load', runZelda, false);
</script>
```

to launch the game.

-------

Your Levels must inheret from `Level` and provide a `managingGameObjectClass` in the constructor => super params

```
class OverworldLevel extends Level {
	constructor() {
		super(<LevelParams>{
			managingGameObjectClass: ZeldaController,
			imageSrcs: [
				'Zelda/Images/Link.png',
				'Zelda/Images/Overworld.png',
				'Zelda/Images/SoldierBlue.png',
				'Zelda/Images/SoldierGreenWalkDownSpritesheet.png',
				'Zelda/Images/SoldierGreenWalkSideSpritesheet.png',
			],
		});
	}
}
```


and do whatever you want.

Very similar to Unity.  Any class that extends from GameObject will automatically be registered with the GameManager's currentLevel 
and all GameObjects' `update()` and `draw()` functions will run if you override them.


--------

You can override some styles using the game-canvas and game-debug ids

```
<style type="text/css">
    body, html {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }
    #game-holder {
        padding:10px;
        background-color: grey;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0;
    }
    #game-canvas {
        /* box-shadow: 2px -2px 2px #000; */
    }
    #game-debug {
        border: 1px solid #330000;
        background-color: #220000;
        color: white;
    }
</style>
```
