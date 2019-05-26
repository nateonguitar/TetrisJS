class GameObject {

	public children: Array<GameObject> = [];
	public transform: Transform = new Transform();
	protected layer: number = 0;


	/** basic shape fill color */
	protected fillStyle: string = null;

	/** basic shape stroke color */
	protected strokeStyle: string = null;

	protected shape: string = null;

	/** Can be any type of collider, Collider is the parent class each collider type inherets from */
	public collider: Collider = null;

	/* Will be an instance of `Image` but TypeScript doesn't like to type anything with Image. **/
	private image: any = null;

	/** for single image objects, if this is set it won't use animations */
	protected imageSrc: string = null;
	/** for single image objects, if this is set it won't use animations. Set this to draw part of the image */
	protected spritesheetBounds: { x:number, y:number, width:number, height:number } = null;

	protected spritesheetAnimationSet: SpritesheetAnimationSet = null;

	constructor(options: object = {}) {

		for (let key in options) {
			this[key] = options[key];
		}

		if (this.imageSrc) {
			this.image = GameManager.currentLevel.cachedImages[this.imageSrc];
		}

		GameManager.registerGameObject(this);
	}

	public getCurrentSpritesheetAnimationInfo(): any {
		if (this.spritesheetAnimationSet) {
			let name = this.spritesheetAnimationSet.currentAnimationName;
			return {
				name: name,
				index: this.spritesheetAnimationSet.spritesheetAnimations[name].index,
			};
		}

		return null;
	}

	public addChild(child: GameObject) {
		this.children.push(child);
	}



	public getLayer(): number {
		return this.layer;
	}

	// override this if you want anything to happen
	public update(): void { }

	public updateAnimations(): void {
		if (this.spritesheetAnimationSet) {
			this.spritesheetAnimationSet.update();
		}
	}

	// override this if you want anything else to happen
	public draw(): void {
		if (this.spritesheetAnimationSet) {
			this.image = GameManager.currentLevel.cachedImages[this.spritesheetAnimationSet.imageSrc];
			let animationTransform = this.spritesheetAnimationSet.currentAnimationTransform;
			Canvas.drawGameObjectPartialImage(
				this.image,
				this,
				animationTransform.position.x,
				animationTransform.position.y,
				animationTransform.size.x,
				animationTransform.size.y
			);
		}
		else if (this.imageSrc) {
			this.image = GameManager.currentLevel.cachedImages[this.imageSrc];
			if (this.spritesheetBounds) {
				Canvas.drawGameObjectPartialImage(
					this.image,
					this,
					this.spritesheetBounds.x,
					this.spritesheetBounds.y,
					this.spritesheetBounds.width,
					this.spritesheetBounds.height
				);
			}
			else {
				Canvas.drawGameObjectImage(this.image, this);
			}
		}
		else {
			if (this.fillStyle) {
				Canvas.setFillStyle(this.fillStyle);
				if (this.shape == "square") {
					Canvas.fillGameObjectRect(this);
				}
			}
			if (this.strokeStyle) {
				Canvas.setStrokeStyle(this.strokeStyle);
				if (this.shape == "square") {
					Canvas.strokeGameObjectRect(this);
				}
			}
		}
	}

	public removeAllReferencesToGameObject(gameObject: GameObject) {
		for (let key in this as any) {
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
