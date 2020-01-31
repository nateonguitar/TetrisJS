/** GM stands for GameManager */
import {
	Camera,
	Level,
	Vector2,
	Input,
	Canvas,
	GameObject,
	Time,
	Debug,
	RectCollider,
	Keys
} from './';

export interface GameOptions {
    parentElementID?: string;
    screenWidth?: number;
    screenHeight?: number;
    imageAntiAliasing?: boolean;
    layers?: number;
    showDebug?: boolean;
    backgroundColor?: string;
    border?: string;
    allowToggleDebug?: boolean;
    levelClasses: {
        [k: string]: any;
	};
	/**default: null, first entry of levelClasses will be used if not set */
    initialLevel?: string;
    font?: string;
}

export class GameManager {
	public static camera: Camera = null;
	public static currentLevel: Level = null;
	public static screenSize: Vector2 = null;
	public static options: GameOptions = {
		parentElementID: null,
		screenWidth: 800,
		screenHeight: 600,
    	// HTML5 canvas runs much smoother without antialiasing
		imageAntiAliasing: false,
		layers: 1,
		showDebug: false,
		backgroundColor: "#000000",
		border: "1px solid #444444",
		allowToggleDebug: false,
		levelClasses: {},
		initialLevel: '',
		font: 'monospace'
	};

	public static showingDebug: boolean = false;
	private static pressedZ: boolean = false;

	public static collidersTotal = 0;
	public static collidersChecked = 0;

	private static gameIsRunning: boolean = false;

	/** Anything we want to start before we run the main loop */
	public static start(options: Object = {}): void {
		// if an option is passed in override our defaults
		for (let key in options) {
			this.options[key] = options[key];
		}

		this.screenSize = Vector2.zero;
		if (this.options.screenWidth) {
			this.screenSize.x = this.options.screenWidth;
		}
		if (this.options.screenHeight) {
			this.screenSize.y = this.options.screenHeight;
		}

		if (Object.keys(this.options.levelClasses).length == 0) {
			console.error("You must provide at least one level in the `levelClasses` options.")
		}

		this.camera = new Camera();
		Canvas.create();

		// input MUST be initialized after canvas as it registers click events
		Input.init();

		// no issues creating game
		this.gameIsRunning = true;

		// calling gameLoop once will start it infinitely running
		requestAnimationFrame(() => {
			this.gameLoop.bind(this)();

			let firstDefinedLevel = null;
			for (let level in this.options.levelClasses) {
				firstDefinedLevel = level;
				break;
			}
			if (!firstDefinedLevel) {
				console.error('No `levelClasses` provided in options')
				return;
			}

			if (this.options.initialLevel) {
				this.loadLevel(this.options.initialLevel);
			}
			else {
				this.loadLevel(firstDefinedLevel);
			}
		});

	}

	public static close(): void {
		this.gameIsRunning = false;
		this.camera = null;
		Canvas.close();
		this.currentLevel.close();
	}

	public static get unitSize() { return this.currentLevel.unitSize; }
	public static get hudUnitSize() { return this.currentLevel.hudUnitSize; }

	public static registerGameObject(gameObject: GameObject): void {
		this.currentLevel.registerGameObject(gameObject);
	}

	/** Will set all references to the GameObject from any other GameObject to null and de-register it from the GameManager */
	public static destroy(gameObject: GameObject): void {
		// remove all references to collisions
		for (let obj of this.currentLevel.gameObjects) {
			let removeIndex = obj.currentCollidingObjects.indexOf(gameObject);
			if (removeIndex != -1) {
				obj.currentCollidingObjects.splice(removeIndex, 1);
			}
		}

		// remove reference to the game object from here in this class
		for (let i=0; i<this.currentLevel.gameObjects.length; i++) {
			if (this.currentLevel.gameObjects[i] == gameObject) {
				this.currentLevel.gameObjects.splice(i, 1);
				break;
			}
		}

		// remove all references to the game object from other game objects
		for (let obj of this.currentLevel.gameObjects) {
			obj.removeAllReferencesToGameObject(gameObject);
		}
	}

	/** main game loop */
	private static gameLoop(frame: DOMHighResTimeStamp = null): void {
		if (!this.gameIsRunning) return;
		requestAnimationFrame(this.gameLoop.bind(this));
		Time.update();
		this.update();
		if (this.currentLevel) {
			this.currentLevel.updateAnimations();
			Canvas.wipe();

			this.currentLevel.draw();
			if (this.showingDebug) {
				Canvas.drawUnitSizeGrid();
			}
		}
	}

	private static update(): void {
		if (!this.currentLevel) return;
		if (!this.gameIsRunning) return;
		this.currentLevel.update();


		this.handleCollisions();

		// might have a game object its following
		this.camera.update();

		if (this.showingDebug) {
			Debug.update();
		}

		if (
			this.options.allowToggleDebug &&
			Input.keys(Keys.ControlLeft) &&
			Input.keys(Keys.AltLeft) &&
			Input.keys(Keys.ShiftLeft)
		) {
			if (Input.keys(Keys.KeyZ)) {
				this.pressedZ = true;
			}

			if (this.pressedZ && !Input.keys(Keys.KeyZ)) {
				this.pressedZ = false;
				this.showingDebug = !this.showingDebug;

				if (this.showingDebug) {
					Debug.start(this.options);
				}
				else {
					Debug.stop();
				}
			}
		}
	}

	private static handleCollisions(): void {
		this.collidersChecked = 0;
		this.collidersTotal = 0;
		let objs = this.currentLevel.gameObjects;
		for (let i=0; i<objs.length; i++) {
			let obj = objs[i];
			if (!obj.collider) continue;

			// detect collisions
			for (let j=0; j<objs.length; j++) {
				let other = objs[j];
				if (!other.collider) continue;
				if (obj == other) continue;

				// both have colliders

				if (obj.inViewOfCamera && other.inViewOfCamera) {
					this.collidersTotal++;
					this.collidersChecked++;
					let passThroughWhiteListed = false;

					if((other.collider.allowPassThroughWhitelist || []).length) {
						for (let type of other.collider.allowPassThroughWhitelist) {
							if (obj instanceof type) {
								passThroughWhiteListed = true;
							}
						}
					}

					let colliding = obj.handleCollision(other, passThroughWhiteListed);


					if (colliding) {
						// if not currently known to be colliding
						if (obj.currentCollidingObjects.indexOf(other) == -1) {
							obj.currentCollidingObjects.push(other);
							obj.onCollisionEnter(other);
						}
					}
					else {
						// if we aren't colliding any more
						if (obj.currentCollidingObjects.indexOf(other) != -1) {
							for (let k=obj.currentCollidingObjects.length-1; k>=0; k--) {
								if (obj.currentCollidingObjects[k] == other) {
									obj.currentCollidingObjects.splice(k, 1);
									obj.onCollisionLeave(other);
								}
							}
						}
					}
				}
			}
		}
	}

	public static loadLevel(levelName: string): void {
		if (!this.options.levelClasses[levelName]) {
			console.error(
				`Level class of name ${levelName} was never defined. ` +
				`Make sure you register it in your game launcher.`
			);
			return;
		}
		if (this.showingDebug) {
			Debug.reset();
		}
		this.camera.follow(null);
		this.currentLevel = new (<any> this.options.levelClasses[levelName])();
		this.currentLevel.init();
		let backgroundColor = this.currentLevel.backgroundColor || this.options.backgroundColor;
		if (backgroundColor) {
			Canvas.setBackgroundColor(backgroundColor);
		}
	}
}
