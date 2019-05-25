/** GM stands for GameManager */

interface Options {
	parentElementID: string;
	screenWidth: number;
	screenHeight: number;
	imageAntiAliasing: boolean;
	layers: number;
	showDebug: boolean;
	backgroundColor: string;
	border: string;
	levelClasses: {[k:string]: Level},
	initialLevel: string,
}

class GameManager {
	public static _camera: Camera = null;

	public static currentLevel: Level = null;

	private static _options: Options = {
		parentElementID: null,
		screenWidth: 800,
		screenHeight: 600,
    	// HTML5 canvas runs much smoother without antialiasing
		imageAntiAliasing: false,
		layers: 1,
		showDebug: false,
		backgroundColor: "#000000",
		border: "1px solid #444444",
		levelClasses: {},
		initialLevel: '',
	};


	/** Anything we want to start before we run the main loop */
	public static start(options: Object = {}): void {
		// if an option is passed in override our defaults
		for (let key in options) {
			this._options[key] = options[key];
		}

		if (!this.options.initialLevel  || !this.options.levelClasses[this.options.initialLevel]) {
			console.error("You must define `levelClasses` and an `initialLevel` in the GameLauncher options");
			return;
		}

		this._camera = new Camera();
		Canvas.create();

		// input MUST be initialized after canvas as it registers click events
		Input.init();

		if (this._options.showDebug) {
			Debug.create(this._options);
		}


		// calling gameLoop once will start it infinitely running
		requestAnimationFrame(() => {
			this.gameLoop.bind(this)();
			this.loadLevel(this._options.initialLevel);
		});

	}

	public static get camera() { return GameManager._camera; }
	public static get options() { return GameManager._options; }

	public static registerGameObject(gameObject: GameObject): void {
		this.currentLevel.registerGameObject(gameObject);
	}

	/** Will set all references to the GameObject from any other GameObject to null and de-register it from the GameManager */
	public static destroy(gameObject: GameObject): void {
		// remove all references to the game object from other game objects
		for (let obj of this.currentLevel.gameObjects) {
			obj.removeAllReferencesToGameObject(gameObject);
		}

		// remove reference to the game object from here in this class
		for (let i=0; i<this.currentLevel.gameObjects.length; i++) {
			if (this.currentLevel.gameObjects[i] == gameObject) {
				this.currentLevel.gameObjects.splice(i, 1);
				break;
			}
		}
	}

	/** main game loop */
	private static gameLoop(frame: DOMHighResTimeStamp = null): void {
		requestAnimationFrame(this.gameLoop.bind(this));
		Time.update();
		this.update();
		if (this.currentLevel) {
			this.currentLevel.updateAnimations();
			this.currentLevel.draw();
		}
	}

	private static update(): void {
		if (!this.currentLevel) return;
		this.currentLevel.update();

		// might have a game object its following
		this.camera.update();

		if (this._options.showDebug) {
			Debug.update({ gameObjectsLength: this.currentLevel.gameObjects.length });
		}
	}

	public static loadLevel(levelName: string): void {
		if (!this._options.levelClasses[levelName]) {
			console.error(
				`Level class of name ${levelName} was never defined.
				Make sure you register it in your game launcher.`
			);
			return;
		}

		if (this.currentLevel) {
			for (let gameObject of this.currentLevel.gameObjects) {
				GameManager.destroy(gameObject);
			}
		}

		this.currentLevel = new (<any> this.options.levelClasses[levelName])();
		this.currentLevel.init();
	}
}
