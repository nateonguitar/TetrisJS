This is a typescript project.

Make sure you have Typescript installed.
`npm install -g typescript`

From a terminal, compile with `tsc`, run `tsc -w` if you want to auto-recompile on saving a file.

------

The `lib` directory is the game engine.

Import all lib files into the index.html, then:

```
let options: Options = {
    screenWidth: 500,
    screenHeight: 750,
}
let gameLauncher = new GameLauncher(options);
```

to launch the game.

-------

It is recommended to then make a 

```
class GameController extends GameObject {

}
```

and do whatever you want.  Very similar to Unity.  Any class that extends from GameObject will automatically be registered with the GameManager and your `update()` and `draw()` functions will run if you override them.