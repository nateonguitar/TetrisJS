class GameObject {

	public transform: Transform = new Transform();
	protected layer: number = 0;


	/** basic shape fill color */
	protected fillStyle: string = null;

	/** basic shape stroke color */
	protected strokeStyle: string = null;

	protected shape: string = null;

	/**
	 * Will be an instance of `Image` but TypeScript doesn't like using that type for some reason.
	 *
	 * Will be used for both single image GameObjects and recycled if this game object has a SpriteSheetAnimationSet
	 **/
	private image: any = null;

	/** for single image objects, if this is set it won't use animations */
	protected _imageSrc: string = null;
	/** for single image objects, if this is set it won't use animations. Set this to draw part of the image */
	protected spritesheetBounds: { x:number, y:number, width:number, height:number } = null;

	protected spritesheetAnimationSet: SpritesheetAnimationSet = null;

	public set imageSrc(src:string) {
		this._imageSrc = src;
		this.image.src = src;
	}

	constructor(options: object = {}) {
		this.image = new Image();

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

	public updateAnimations(): void {
		if (this.spritesheetAnimationSet) {
			this.spritesheetAnimationSet.update();
		}
	}

	// override this if you want anything else to happen
	public draw(): void {
		if (this.spritesheetAnimationSet) {
			this.image.src = this.spritesheetAnimationSet.imageSrc;
			let animationTransform = this.spritesheetAnimationSet.currentAnimationTransform;
			Canvas.drawPartialImage(
				this.image,
				this.transform.position.x,
				this.transform.position.y,
				this.transform.size.x,
				this.transform.size.y,
				animationTransform.position.x,
				animationTransform.position.y,
				animationTransform.size.x,
				animationTransform.size.y
			);
		}
		else if (this.image.src) {
			if (this.spritesheetBounds) {
				Canvas.drawPartialImage(
					this.image,
					this.transform.position.x,
					this.transform.position.y,
					this.transform.size.x,
					this.transform.size.y,
					this.spritesheetBounds.x,
					this.spritesheetBounds.y,
					this.spritesheetBounds.width,
					this.spritesheetBounds.height
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
		for (let key in this as any) {
			delete this[key];
		}
	}
}
