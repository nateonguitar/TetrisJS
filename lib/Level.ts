class Level {
	// Inherit from this class.
	// Leave your constructor empty.
	// Override the init() function with the contents:
	// - Set the managingGameObject like this.managingGameObject = ZeldaController
	// - set the images array for each image you will.
	public managingGameObject: GameObject = null;
	public images: string[] = [];
	public gameObjects: GameObject[] = [];

	private _cachedImages: any[] = [];

	constructor() {

	}

	// override this
	public init(): void { }

	public get cachedImages(): any[] {
		return this._cachedImages;
	}

	public update(): void {
		console.log(this.gameObjects);
		for (let gameObject of this.gameObjects) {
			gameObject.update();
		}
	}

	public draw(): void {
		Canvas.wipe();
		let drawnObjects: GameObject[] = [];

		// loop through our layers
		for (let i=0; i<GameManager.options.layers; i++) {
			// draw gameobjects on that layer
			for (let j=0; j<this.gameObjects.length; j++) {
				let gameObject = this.gameObjects[j];
				if (gameObject.getLayer() == i) {
					drawnObjects.push(gameObject);
					gameObject.draw();
				}
			}
		}

		if (drawnObjects.length < this.gameObjects.length) {
			for (let gameObject of this.gameObjects) {
				if (drawnObjects.indexOf(gameObject) == -1) {
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
