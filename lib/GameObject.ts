class GameObject {

	public transform: Transform = new Transform();
	protected layer: number = 0;


	/** basic shape fill color */
	protected fillStyle: string = null;

	/** basic shape stroke color */
	protected strokeStyle: string = null;

	protected shape: string = null;

	/** will be an instance of `Image` but TypeScript doesn't like using that type for some reason */
	private image: any = null;
	protected _imageSrc: string = null;
	/** Set this to draw part of the image */
	protected imageSprite: { x:number, y:number, width:number, height:number } = null;

	public set imageSrc(src:string) {
		if (src != null) {
			if (this.image == null) {
				this.image = new Image;
			}
			this.image.src = src;
		}
	}

	constructor(options: object = {}) {
		for (let key in options) {
			this[key] = options[key];
		}

		GameManager.registerGameObject(this);
	}

	public getLayer(): number {
		return this.layer;
	}

	// override this if you want anything to happen
	public update(): void { }

	// override this if you want anything else to happen
	public draw(): void {
		if (this.image) {
			if (this.imageSprite) {
				Canvas.drawPartialImage(
					this.image,
					this.transform.position.x,
					this.transform.position.y,
					this.transform.size.x,
					this.transform.size.y,
					this.imageSprite.x,
					this.imageSprite.y,
					this.imageSprite.width,
					this.imageSprite.height
				);
			}
			else {
				Canvas.drawImage(
					this.image,
					this.transform.position.x,
					this.transform.position.y,
					this.transform.size.x,
					this.transform.size.y
				);
			}
		}
		else {
			if (this.fillStyle) {
				Canvas.setFillStyle(this.fillStyle);
				if (this.shape == "square") {
					Canvas.fillRect(
						this.transform.position.x,
						this.transform.position.y,
						this.transform.size.x,
						this.transform.size.y
					);
				}
			}
			if (this.strokeStyle) {
				Canvas.setStrokeStyle(this.strokeStyle);
				if (this.shape == "square") {
					Canvas.strokeRect(
						this.transform.position.x,
						this.transform.position.y,
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
