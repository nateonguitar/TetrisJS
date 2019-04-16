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
	originCenter: boolean;
}

class GameManager {
	public static _camera: Camera = null;

	private static _gameObjects: GameObject[] = [];

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
		originCenter: true,
	};

	// will dynamically add to this
	private static debugDom: {[k:string]: HTMLElement} = {};

	public static start(options: Object = {}): void {

		this._camera = new Camera();
		// if an option is passed in override our defaults
		for (let key in options) {
			this._options[key] = options[key];
		}

		document.addEventListener('DOMContentLoaded', () => GameManager.gameLauncher(), false);
	}

	public static get camera() { return GameManager._camera; }
	public static get options() { return GameManager._options; }

	public static registerGameObject(gameObject: GameObject): void {
		this._gameObjects.push(gameObject);
	}

	/** Will set all references to the GameObject from any other GameObject to null and de-register it from the GameManager */
	public static destroy(gameObject: GameObject): void {
		// remove all references to the game object from other game objects
		for (let obj of this._gameObjects) {
			obj.removeAllReferencesToGameObject(gameObject);
		}

		// remove reference to the game object from here in this class
		for (let i=0; i<this._gameObjects.length; i++) {
			if (this._gameObjects[i] == gameObject) {
				this._gameObjects.splice(i, 1);
				break;
			}
		}
	}

	/** Anything we want to start before we run the main loop */
	public static gameLauncher(): void {
		Canvas.create();
		this.createDebug();
		Input.init();
		// calling update once will start it infinitely running
		requestAnimationFrame(this.gameLoop.bind(this));
	}



	private static createDebug(): void {
		if (this._options.showDebug) {
			let style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = `
				#game-debug {
					padding: 3px;
					font-size: 10pt;
					width: ` +
						// -6 for the padding
						((this._options.screenWidth > 250 ? this._options.screenWidth : 250) - 6) +
					`px;
				}
				#game-debug p {
					margin-top: 0;
					margin-bottom: 0;
				}
			`;
			document.getElementsByTagName('head')[0].appendChild(style);

			this.debugDom["divOuter"] = document.createElement("div");
			this.debugDom["divOuter"].id = "game-debug";
			let parentElement = document.getElementById(this._options.parentElementID);

			let el = parentElement ? parentElement : document.body;
			el.appendChild(this.debugDom["divOuter"]);

			this.debugDom["paraFPS"] = document.createElement("p");
			this.debugDom.divOuter.appendChild(this.debugDom["paraFPS"]);

			this.debugDom["paraGameObjects"] = document.createElement("p");
			this.debugDom.divOuter.appendChild(this.debugDom["paraGameObjects"]);

			this.debugDom["paraFPS"] = document.createElement("p");
			this.debugDom.divOuter.appendChild(this.debugDom["paraFPS"]);
		}
	}

	/** main game loop */
	private static gameLoop(frame: DOMHighResTimeStamp = null): void {
		requestAnimationFrame(this.gameLoop.bind(this));
		Time.update();
		this.update();
		this.draw();
	}

	private static update(): void {
		for (let gameObject of this._gameObjects) {
			gameObject.update();
		}

		// might have a game object its following
		this.camera.update();

		if (this._options.showDebug) {
			this.debugDom["paraGameObjects"].innerText = 'GameObjects: ' + this._gameObjects.length;
			this.debugDom["paraFPS"].innerText = 'FPS: ' + this.fps().toFixed(1);
		}
	}


	private static draw(): void {
		Canvas.wipe();
		let drawnObjects: GameObject[] = [];

		// loop through our layers
		for (let i=0; i<this._options.layers; i++) {
			// draw gameobjects on that layer
			for (let j=0; j<this._gameObjects.length; j++) {
				let gameObject = this._gameObjects[j];
				if (gameObject.getLayer() == i) {
					drawnObjects.push(gameObject);
					gameObject.draw();
				}
			}
		}

		if (drawnObjects.length < this._gameObjects.length) {
			for (let gameObject of this._gameObjects) {
				if (drawnObjects.indexOf(gameObject) == -1) {
					console.warn(gameObject.constructor.name + " GameObject was not drawn, did you set its layers properly?");
				}
			}
		}
	}

	private static isFunction(functionToCheck): boolean {
		return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
	}

	public static fps(): number {
		return 1000 / Time.deltaTime;
	}
}
