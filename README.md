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
	<script src="js/lib/StressTestSquare.js"></script>
	<script src="js/lib/Camera.js"></script>
	<script src="js/lib/Canvas.js"></script>
	<script src="js/lib/GameLauncher.js"></script>
	<!-- End required import-->

	<!-- my own code imports -->
	<script src="js/Tetris/Shapes/Piece.js"></script>
	<script src="js/Tetris/Shapes/Cube.js"></script>
	<script src="js/Tetris/Shapes/Line.js"></script>
	<script src="js/Tetris/Shapes/LL.js"></script>
	<script src="js/Tetris/Shapes/LR.js"></script>
	<script src="js/Tetris/Grid.js"></script>
	<script src="js/Tetris/TetrisController.js"></script>
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
        let gameLauncher = new GameLauncher({
            // all parameters are optional, they have defaults
            parentElementID: "game-holder", // default: null, directly to body if not provided or id not found
            screenWidth: 1000,              // default: 800
            screenHeight: 800,              // default: 600
            imageAntiAliasing: false,       // default: false
            layers: 4,                      // default: 1
            showDebug: true,                // default: false
            backgroundColor: "#001100",     // default: "#000000"
            border: "1px solid #008800",    // default: "1px solid #444444"
            originCenter: true,             // default: true, false == origin top left
            onLoad: () => {
                var zeldaController = new ZeldaController();
            }
        });
    }

    window.addEventListener('load', runZelda, false);
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
