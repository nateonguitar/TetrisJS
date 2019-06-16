class GameObject {
	public layer: number = 0;
	public neverSkipUpdate: boolean = false;
	public inViewOfCamera: boolean = false;

	public children: Array<GameObject> = [];

	public transform: Transform = new Transform();
	public drawTransform: boolean = false;
	public drawTransformColor: string = null;

	public currentCollidingObjects: GameObject[] = [];

	public name: string = '';

	/** basic shape fill color */
	public fillStyle: string = null;

	/** basic shape stroke color */
	public strokeStyle: string = null;

	public shape: string = null;

	/** Can be any type of collider, Collider is the parent class each collider type inherets from */
	public collider: Collider = null;
	public drawColliderColor: string = null;

	/* Will be an instance of `Image` but TypeScript doesn't like to type anything with Image. **/
	public image: any = null;

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

	public addChild(child: GameObject): void {
		this.children.push(child);
	}

	public setDefaultCollider(): void {
		this.collider = new RectCollider({
			position: Vector2.zero,
			size: new Vector2(1, 1)
		});
	}

	public colliderPosition(): Vector2 {
		let t = this.transform;
		let colPos = this.collider.position.clone();
		colPos.x *= t.size.x;
		colPos.y *= -t.size.y; // flipping to feel more natural to users
		return t.position.add(colPos);
	}

	public rectColliderSize(): Vector2 {
		if (this.collider &&  this.collider instanceof RectCollider) {
			let tSize = this.transform.size.abs();
			let colSize = this.collider.size.abs();
			colSize.x *= tSize.x;
			colSize.y *= tSize.y;
			return colSize;
		}
		return null;
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
		Canvas.drawGameObject(this);
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

	public get absoluteSize(): Vector2 { return this.transform.size.scale(GameManager.unitSize); }
	public get absolutePosition(): Vector2 { return this.transform.position.scale(GameManager.unitSize); }
	public get unitSize(): number { return GameManager.unitSize; }

	public onCollisionEnter(other: GameObject): void {
		// console.warn("Detected a collision with this => " + this.constructor.name + " and other => " + other.constructor.name);
	}

	public onCollisionLeave(other: GameObject): void {
		// console.warn("Collision leave with this => " + this.constructor.name + " and other => " + other.constructor.name);
	}

	public onNoPassthroughTouch(other: GameObject, side: string): void {
		// console.warn("Collision !allowPassThrough with this => " + this.constructor.name + " and other => " + other.constructor.name);
	}
}
