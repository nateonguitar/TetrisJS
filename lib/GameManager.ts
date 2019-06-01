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
	drawTransforms: boolean,
	drawColliders: boolean
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
		drawTransforms: false,
		drawColliders: false,
	};


	/** Anything we want to start before we run the main loop */
	public static start(options: Object = {}): void {
		// if an option is passed in override our defaults
		for (let key in options) {
			this._options[key] = options[key];
		}

		if (Object.keys(this._options.levelClasses).length == 0) {
			console.error("You must provide at least one level in the `levelClasses` options.")
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

			let firstDefinedLevel = null;
			for (let level in this._options.levelClasses) {
				firstDefinedLevel = level;
				break;
			}
			if (!firstDefinedLevel) {
				console.error('No `levelClasses` provided in options')
				return;
			}

			if (this._options.initialLevel) {
				this.loadLevel(this._options.initialLevel);
			}
			else {
				this.loadLevel(firstDefinedLevel);
			}
		});

	}

	public static get camera() { return GameManager._camera; }
	public static get options() { return GameManager._options; }

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

		this.handleCollisions();

		if (this._options.showDebug) {
			Debug.update();
		}
	}

	private static handleCollisions(): void {
		let objs = this.currentLevel.gameObjects;
		for (let i=0; i<objs.length; i++) {
			let obj = objs[i];
			if (!obj.collider) continue;

			// detect collisions
			for (let j=0; j<objs.length; j++) {
				let other = objs[j];
				if (!other.collider) continue;
				if (obj == other) continue;

				let objColSize = obj.collider.size.abs();
				let otherColSize = other.collider.size.abs();

				let objColPos = obj.colliderPosition();
				let otherColPos = other.colliderPosition();

				// if collision
				if (
					objColPos.x < otherColPos.x + otherColSize.x &&
					objColPos.x + objColSize.x > otherColPos.x &&
					objColPos.y < otherColPos.y + otherColSize.y &&
					objColPos.y + objColSize.y > otherColPos.y
				) {
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

	public static loadLevel(levelName: string): void {
		if (!this._options.levelClasses[levelName]) {
			console.error(
				`Level class of name ${levelName} was never defined. ` +
				`Make sure you register it in your game launcher.`
			);
			return;
		}
		Debug.reset();
		this.camera.follow(null);
		this.currentLevel = new (<any> this.options.levelClasses[levelName])();
		this.currentLevel.init();
	}
}
