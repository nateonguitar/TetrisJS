/** GM stands for GameManager */

interface Options {
	screenWidth: number;
	screenHeight: number;
}

class GameManager {
	public static deltaTime: number = 0;

	private static _time: number = 0;
	private static _canvas: HTMLCanvasElement = null;
	public static context: CanvasRenderingContext2D = null;

	private static _gameObjects: GameObject[] = [];

	private static _options: Options = {
		screenWidth: 50,
		screenHeight: 50,
	};

	public static get time() { return GameManager._time; }
	public static get getOptions() { return GameManager._options; }



	public static start(options: Object = {}): void {
		for (let key in options) {
			this._options[key] = options[key];
		}

		document.addEventListener('DOMContentLoaded', () => GameManager.gameLauncher(), false);
	}

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
		// create the canvas
		this._canvas = document.createElement("canvas");
		this._canvas.classList.add("canvas");
		this._canvas.width = this._options.screenWidth;
		this._canvas.height = this._options.screenHeight;
		document.body.appendChild(this._canvas);

		Input.init();

		this.context = this._canvas.getContext("2d");
		this.context.shadowBlur = 0;

		// calling update once will start it infinitely running
		requestAnimationFrame(this.gameLoop.bind(this));
	}

	/** main game loop */
	private static gameLoop(frame: DOMHighResTimeStamp = null): void {
		requestAnimationFrame(this.gameLoop.bind(this));
		let currentTime: number = (new Date()).getTime();
		this.deltaTime = currentTime - this._time;
		this._time = currentTime;
		this.update();
		this.draw();
	}

	private static update(): void {
		for (let gameObject of this._gameObjects) {
			gameObject.update();
		}
	}


	private static draw(): void {
		this.context.clearRect(0, 0, this._canvas.width, this._canvas.height);
		for (let gameObject of this._gameObjects) {
			gameObject.draw();
		}
	}

	private static isFunction(functionToCheck): boolean {
		return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
	}

	public static fps(): number {
		return 1000 / this.deltaTime;
	}
}
