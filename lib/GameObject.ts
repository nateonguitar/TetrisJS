class GameObject {

	public transform: Transform = new Transform();
	protected layer: number = 0;
	protected imageSrc: string = null;

	/** basic shape fill color */
	protected fillStyle: string = null;

	/** basic shape stroke color */
	protected strokeStyle: string = null;

	protected shape: string = null;

	/** will be an instance of `Image` but TypeScript doesn't like using that type for some reason */
	private image: any = null;

	constructor(options: object = {}) {
		for (let key in options) {
			this[key] = options[key];
		}

		GameManager.registerGameObject(this);

		if (this.imageSrc) {
			this.image = new Image;
			this.image.src = this.imageSrc;
		}
	}

	public getLayer(): number {
		return this.layer;
	}

	// override this if you want anything to happen
	public update(): void { }

	// override this if you want anything else to happen
	public draw(): void {
		if (this.image) {
			Canvas.context.drawImage(
				this.image,
				this.transform.position.x - GameManager.camera.position.x,
				this.transform.position.y - GameManager.camera.position.y,
				this.transform.size.x,
				this.transform.size.y
			);
		}
		else {
			if (this.fillStyle) {
				Canvas.context.fillStyle = this.fillStyle;
				if (this.shape == "square") {
					Canvas.context.fillRect(
						this.transform.position.x - GameManager.camera.position.x,
						this.transform.position.y - GameManager.camera.position.y,
						this.transform.size.x,
						this.transform.size.y
					);
				}
			}
			if (this.strokeStyle) {
				Canvas.context.strokeStyle = this.strokeStyle;
				if (this.shape == "square") {
					Canvas.context.strokeRect(
						this.transform.position.x - GameManager.camera.position.x,
						this.transform.position.y - GameManager.camera.position.y,
						this.transform.size.x,
						this.transform.size.y
					);
				}
			}
		}
	}

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
