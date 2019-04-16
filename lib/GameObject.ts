class GameObject {

	public children: Array<GameObject> = [];
	public transform: Transform = new Transform();
	protected layer: number = 0;

	constructor() {
		// TODO: Come up with a way to remove game objects,
		//       we need to remove all references to make JavaScripts garbage collector work properly.
		GameManager.registerGameObject(this);
	}

	public getLayer(): number {
		return this.layer;
	}

	// override this if you want anything to happen
	public update(): void { }

	// override this if you want anything to happen
	public draw(): void { }

	public removeAllReferencesToGameObject(gameObject: GameObject) {
		for (let key in <any>this) {
			if (this[key] != null) {
				// remove gameObject from arrays:
				// like if this.cars[3] === gameObject
				if (this[key].constructor === Array) {
					for (let i=this[key].length-1; i>=0; i--) {
						if (this[key][i] === gameObject) {
							this[key][i] = null;
						}
					}
				}

				// remove direct references to gameObject:
				// like if this.car === gameObject
				else if (this[key] === gameObject) {
					this[key] = null;
				}

				// remove object references:
				// like if this.car.driver === gameObject
				else if (typeof this[key] === 'object') {
					for (let objKey in this[key]) {
						if (this[key][objKey] === gameObject) {
							this[key][objKey] = null;
						}
					}
				}
			}
		}
	}
}
