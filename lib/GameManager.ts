/** GM stands for GameManager */

interface Options {
	screenWidth: number;
	screenHeight: number;
	imageAntiAliasing: boolean;
	layers: number;
	showDebug: boolean;
}

class GameManager {

	private static _canvas: HTMLCanvasElement = null;
	public static context: CanvasRenderingContext2D = null;

	private static _gameObjects: GameObject[] = [];

	private static _options: Options = {
		screenWidth: 800,
		screenHeight: 600,
    	// HTML5 canvas runs much smoother without antialiasing
		imageAntiAliasing: false,
		layers: 1,
		showDebug: false,
	};

	// will dynamically add to this
	private static debugDom: {[k:string]: HTMLElement} = {};

	public static start(options: Object = {}): void {
		// if an option is passed in override our defaults
		for (let key in options) {
			this._options[key] = options[key];
		}

		document.addEventListener('DOMContentLoaded', () => GameManager.gameLauncher(), false);
	}

	public static getOptions() { return GameManager._options; }

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
		this.createCanvas();
		this.createDebug();
		Input.init();

		this.context = this._canvas.getContext("2d");
		this.context.imageSmoothingEnabled = this._options.imageAntiAliasing;
		this.context.shadowBlur = 0;

		// calling update once will start it infinitely running
		requestAnimationFrame(this.gameLoop.bind(this));
	}

	private static createCanvas(): void {
		// create the canvas
		this._canvas = document.createElement("canvas");
		this._canvas.classList.add("canvas");
		this._canvas.width = this._options.screenWidth;
		this._canvas.height = this._options.screenHeight;
		document.body.appendChild(this._canvas);
	}

	private static createDebug(): void {
		if (this._options.showDebug) {
			let style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = `
				#debug {
					border: 1px solid black;
					padding: 3px;
					font-size: 10pt;
					width: ` +
					// -6 for the padding
					((this._options.screenWidth > 250 ? this._options.screenWidth : 250) - 6) +
					`px
				}
				#debug h3 {
					text-align: center;
					text-decoration: underline;
					margin-top: 0;
					margin-bottom: 0;
				}
				#debug p {
					margin-top: 0;
					margin-bottom: 0;
				}
			`;
			document.getElementsByTagName('head')[0].appendChild(style);

			this.debugDom["divOuter"] = document.createElement("div");
			this.debugDom["divOuter"].id = "debug";
			document.body.appendChild(this.debugDom["divOuter"]);

			this.debugDom["paraFPS"] = document.createElement("p");
			this.debugDom.divOuter.appendChild(this.debugDom["paraFPS"]);

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

		if (this._options.showDebug) {
			this.debugDom.paraFPS.innerText = 'FPS: ' + this.fps().toFixed(1);
		}
	}


	private static draw(): void {
		this.context.clearRect(0, 0, this._canvas.width, this._canvas.height);
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
