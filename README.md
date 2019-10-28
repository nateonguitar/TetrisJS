## If you are developing the engine itself
Clone the project and build it.
It can be easily built using `npm run build` from the command line.
It will transpile the code into the `./dist` directory with the TypeScript typings files.

* Known issue: If the `dist` directory exits it will fail to compile. Delete it first.

-------------------

## Installing to use in your own game:

`npm install game-object-engine` 

-------------------

## You will need TypeScript for developing the engine or using the engine to create a game.

`npm install typescript` 

-------------------

## Running your first application example:

Put your images somewhere useful in your project, we'll use the `Images` directory.

* __Images/Player.png__
* __Images/Overworld.png__

Create a Player class that extends `GameObject` :

* __GameObjects/Player.ts__

``` 
export class Player extends GameObject {

	private speed = 0.1;

	// All options in the super() call can be set at a later time,
	// but if these will never change or you want some defaults, best to set them here.
	constructor() {
		super(<GameObjectParams>{
			layer: 1,
			imageSrc: "Images/Player.png",
			// optional
			name: "player"
			// You can create a transform here, but if you leave it out a Transform with size (1, 1) and position(0, 0) will be created.
		});

		// if you like most of what was created in the transform,
		// go ahead and override some now
		this.transform.size = new Vector2(0.75, 1); // a little thinner in the x axis
	}

	// override this function inhereted from GameObject to control behavior
	public update(): void {
		// some basic controls

		// for simplicity we haven't used Time.deltaTime but it's a good idea to, like:
		// `p.x -= this.speed * Time.deltaTime`
		// This has the benefit of making your game not slow down if your framerate ever drops.
		let p = this.transform.position;
		if (Input.keys(Keys.ArrowLeft)) {
			p.x -= this.speed;
		}
		if (Input.keys(Keys.ArrowRight)) {
			p.x += this.speed;
		}
		if (Input.keys(Keys.ArrowUp)) {
			p.y -= this.speed;
		}
		if (Input.keys(Keys.ArrowDown)) {
			p.y += this.speed;
		}
	}
}
```

Create the Overworld that extends from GameObject:

* __GameObjects/Overworld.ts__

``` 
export class OverworldBackground extends GameObject {
	constructor(b) {
		super({
			layer: 0,
			imageSrc: "Images/Overworld.png",
		});
		// make it kinda big (60 times bigger than the player is tall)
		this.transform.size = new Vector2(60, 60);
		// shift it so its center is at the origin
		this.transform.position = boundarySize.scale(-0.5);
	}
}
```

Create a class that extends `Level` and a LevelController that extends `GameObject` .
Let's say we make an OverworldLevel and an OverworldController.

``` 
export class OverworldLevel extends Level {
	constructor() {
		super(<LevelParams>{
			managingGameObjectClass: OverworldController,
			imageSrcs: [
				'Images/Player.png',
				'Images/Overworld.png'
			],
			// Override the unitSize here if you'd like to,
			// all objects scale according to the unit size.
			// A unitSize of 25 means all Transforms with a size of
			// Vector2(1, 1) will be 25 x 25 pixels in size.
			unitSize: 25
		});
	}
}

export class OverworldController extends GameObject {
	private player: Player = null;
	private background: OverworldBackground = null;

	constructor() {
		super();
		this.player = new Player();
		this.background = new OverworldBackground();
	}

	// override
	public update(): void {
		// put level specific logic here if you'd like.
		// Remember that GameObjects should handle their own update() calls.
		// Maybe put a timer logic or something here?

		// you can swap to another level (once you create one) by calling
		// GameManager.loadLevel('Level2');
	}
}
```

create an `index.ts` file
import GameLauncher, and GameOptions from the engine and any of your classes, 
then create a function that will run on window load:

``` 
function gameLauncher() {
	new GameLauncher(<GameOptions>{
		parentElementID: "game-holder",
		screenWidth: 800,
		screenHeight: 750,
		imageAntiAliasing: false,
		layers: 3,
		backgroundColor: "#001100",
		border: "1px solid #008800",
		// allow showing debug tools by pressing ctrl + shift + alt + z
		allowToggleDebug: true,
		// have debug tools open by default
		showDebug: true,

		// you must register any Level classes here to be able to switch to them.
		levelClasses: {
			// 'Level2': Level2
			'Overworld': OverworldLevel,
		},
		// if not provided the levelClasses[0] will be used,
		initialLevel: 'OverworldLevel'
	});
}

// run the gameLauncher() function on page load.
window.addEventListener('load', gameLauncher, false);
```

In your HTML file you'd like to have your game in, make sure you have a `<div id="game-holder"></div>` 
as the entry point. The game will inject itself here automatically (you can set a different `id` to look for in the GameLauncher options)

``` 
<html>
<head>
	<!-- import scripts here -->
	<!-- a bundler like webpack or gulp will generate a single file -->
	<!-- otherwize import all of the file you'll need -->
    <script src="dist/bundle.js"></script>
</head>
<body>
	<div id="game-holder"></div>
</body>
</html>
```

build the project with `tsc` or set up a build script for webpack to `"build": "tsc & webpack"` (or whatever your project happens to need)

