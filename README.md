This is a typescript project.

Make sure you have Typescript installed.
`npm install -g typescript`

From a terminal, compile with `tsc`, run `tsc -w` if you want to auto-recompile on saving a file.

------

The `lib` directory is the game engine.

Import all lib files into the index.html

```
<html>
<head>
	<!-- library import -->
	<!-- YOU MUST IMPORT THESE-->
	<script src="js/lib/GameManager.js"></script>
	<script src="js/lib/GameObject.js"></script>
	<script src="js/lib/Transform.js"></script>
	<script src="js/lib/Vector2.js"></script>
	<script src="js/lib/Input.js"></script>
	<script src="js/lib/Time.js"></script>
	<script src="js/lib/GameLauncher.js"></script>
	<!-- End required import-->

	<!-- your own code imports -->
	<script src="js/Shapes/Piece.js"></script>
	<script src="js/Shapes/Cube.js"></script>
	<script src="js/Shapes/Line.js"></script>
	<script src="js/Shapes/LL.js"></script>
	<script src="js/Shapes/LR.js"></script>
	<script src="js/Grid.js"></script>
	<script src="js/GameController.js"></script>
</head>

```

then in a script tag:

```
<div style="padding:10px; background-color: grey;">
    <div id="game-holder"></div>
</div>

<script type="text/JavaScript">
    // all parameters are optional, they have defaults
    let gameLauncher = new GameLauncher({
        parentElementID: "game-holder", // default: null, directly to body if not provided or id not found
        screenWidth: 250,               // default: 800
        screenHeight: 450,              // default: 600
        imageAntiAliasing: true,        // default: false
        layers: 3,                      // default: 1
        showDebug: true,                // default: false
        backgroundColor: "#dd0000",     // default: "#000000"
        border: "1px solid red",        // default: "1px solid #444444"
        originCenter: false,            // default: true, false == origin top left
    });
    // Note: HTML5 canvas runs much smoother without antialiasing
</script>
```

to launch the game.

-------

It is recommended to then make a 

```
class GameController extends GameObject {

}
```

and do whatever you want.  Very similar to Unity.  Any class that extends from GameObject will automatically be registered with the GameManager and your `update()` and `draw()` functions will run if you override them.


--------

You can override some styles using the game-canvas and game-debug ids

```
<style type="text/css">
    #game-holder {
        padding:10px;
        background-color: grey;
    }
    #game-canvas {
        box-shadow: 2px -2px 2px #000;
    }
    #game-debug {
        border: 1px solid #ff0000;
        background-color: #dddddd;
    }
</style>
```
