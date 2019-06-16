interface LevelParams {
	managingGameObjectClass: Function,
	imageSrcs?: string[],
	/**
	 * Additional space to update around viewport.
	 * Vector2(10, 10) will give a 5 pixel bounding addition all the way around the viewport.
	 * null is the same as Vector2(0, 0)
	 **/
	extraViewportPadding?: Vector2,
	unitSize?: number,
	backgroundColor?: string,
}

class Level {
	// Inherit from this class.
	// Leave your constructor empty.
	// Override the init() function with the contents:
	// - Set the managingGameObject like this.managingGameObject = OverworldController
	// - set the images array for each image you will.
	public gameObjects: GameObject[] = [];

	private _cachedImages: {[k:string]: any} = {};
	private imageSrcs: string[] = [];
	private managingGameObjectClass: Function;
	public managingGameObject: GameObject = null;

	public updatesSkipped: number = 0;

	public extraViewportPadding: Vector2 = null;

	public unitSize: number = 50;
	public backgroundColor: string = "#000000";

	constructor(params:LevelParams) {
		for (let key in params) {
			this[key] = params[key];
		}

		for (let src of this.imageSrcs) {
			let img = new Image();
			img.src = src;
			if (this._cachedImages[src]) {
				console.warn("Duplicate image source:");
				console.warn("- Class:  " + this.constructor.name);
				console.warn("- Source: " + src);
			}
			this._cachedImages[src] = img;
		}
	}

	public init(): void {
		this.managingGameObject = new (<any>this.managingGameObjectClass)();
		this.managingGameObject.neverSkipUpdate = true;
	}

	public get cachedImages(): {[k:string]: any} { return this._cachedImages; }

	public update(): void {
		let camera = GameManager.camera;
		this.updatesSkipped = 0;
		for (let gameObject of this.gameObjects) {
			gameObject.inViewOfCamera = camera.inViewOfGameObject(gameObject, this.extraViewportPadding);
			if (gameObject.neverSkipUpdate || gameObject.inViewOfCamera) {
				gameObject.update();
			}
			else {
				this.updatesSkipped++;
			}
		}
	}

	public draw(): void {
		let handledGameObjects: GameObject[] = [];

		// loop through our layers
		for (let i=0; i<GameManager.options.layers; i++) {
			// draw gameobjects on that layer
			for (let j=0; j<this.gameObjects.length; j++) {
				let gameObject = this.gameObjects[j];
				if (gameObject.inViewOfCamera) {
					if (gameObject.getLayer() == i) {
						handledGameObjects.push(gameObject);
						gameObject.draw();
					}
				}
				else {
					handledGameObjects.push(gameObject);
				}
			}
		}

		if (handledGameObjects.length < this.gameObjects.length) {
			for (let gameObject of this.gameObjects) {
				if (handledGameObjects.indexOf(gameObject) == -1) {
					console.warn(
						gameObject.constructor.name +
						" GameObject was not drawn, did you set its layers properly?"
					);
				}
			}
		}
	}

	public updateAnimations(): void {
		for (let gameObject of this.gameObjects) {
			gameObject.updateAnimations();
		}
	}

	public registerGameObject(gameObject: GameObject): void {
		this.gameObjects.push(gameObject);
	}
}
