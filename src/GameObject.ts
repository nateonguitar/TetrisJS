import {
	Transform,
	Collider,
	SpritesheetAnimationSet,
	GameManager,
	RectCollider,
	Vector2,
	Canvas,
	TextAlignType
} from "./";

export interface GameObjectParams {
	collider?: Collider;
	colliderColor?: string;

	imageBounds?: Transform;
	imageSrc?: string;
	spritesheetAnimationSet?: SpritesheetAnimationSet;

	layer?: number;

	neverSkipUpdate?: boolean;

	name?: string;

	shape?: string;
	shapeStrokeStyle?: string;
	shapeFillStyle?: string;

	transform?: Transform;
	showTransform?: boolean;

	/** text that will be drawn over the game object */
	text?: string;
	textFont?: string;
	textColor?: string;
	textAlign?: TextAlignType;
	textBold?: boolean;
	textItalic?: boolean;
}

export class GameObject {
	///////////
	// Params
	///////////
	public layer: number = 0;
	public neverSkipUpdate: boolean = false;
	public name: string = '';
	/** for single image objects, if this is set it won't use animations */
	public imageSrc: string = null;
	/** for single image objects, if this is set it won't use animations. Set this to draw part of the image */
	public imageBounds: Transform = null;
	public spritesheetAnimationSet: SpritesheetAnimationSet = null;
	/** Can be any type of collider, Collider is the parent class each collider type inherets from */
	public collider: Collider = null;
	/** For debugging: transform color will be red if not specified */
	public colliderColor: string = null;
	public transform: Transform = new Transform({});
	public currentCollidingObjects: GameObject[] = [];
	public text: string = null;
	public textFont: string = null;
	public textColor: string = null;
	public textAlign: TextAlignType = null;
	public textBold: boolean = false;
	public textItalic: boolean = false;

	/** For debugging */
	public showTransform: boolean = false;
	/** For debugging: transform color will be red if not specified */
	public transformColor: string = null;

	public shape: string = null;
	/** basic shape fill color */
	public shapeFillStyle: string = null;
	/** basic shape stroke color */
	public shapeStrokeStyle: string = null;

	//////////////
	// Not Params
	//////////////

	/* Will be an instance of `Image` but TypeScript doesn't like to type anything with Image. **/
	public image: any = null;
	public inViewOfCamera: boolean = false;
	public children: Array<GameObject> = [];

	constructor(params: GameObjectParams = <GameObjectParams>{}) {
		for (let key in params) {
			this[key] = params[key];
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

	public get absoluteSize(): Vector2 { return this.transform.size.scale(this.unitSize); }
	public get absolutePosition(): Vector2 { return this.transform.position.scale(this.unitSize); }

	/** convenience method to get GameManager.unitSize (which is a convenience for getting the current level's unit size) */
	public get unitSize(): number { return GameManager.unitSize; }

	/** Override this */
	public onCollisionEnter(other: GameObject): void { }

	/** Override this */
	public onCollisionLeave(other: GameObject): void { }

	/** Override this */
	public onNoPassthroughTouch(other: GameObject, side: string): void { }

	public handleCollision(other: GameObject, passThroughWhiteListed: boolean): boolean {
		if (!this.collider) return false;

		let colliding = false;

		if (this.collider instanceof RectCollider && other.collider instanceof RectCollider) {

			let minDistance = this.rectColliderSize().magnitude() + other.rectColliderSize().magnitude();
			let distance = this.colliderPosition().distance(other.colliderPosition());
			if (distance > minDistance) return false;

			let objScreenSize = this.rectColliderSize().scale(this.unitSize);
			let otherScreenSize = other.rectColliderSize().scale(this.unitSize);

			let objScreenPos = this.colliderPosition().scale(this.unitSize).subtract(objScreenSize.scale(0.5));
			let otherScreenPos = other.colliderPosition().scale(this.unitSize).subtract(otherScreenSize.scale(0.5));

			if (
				objScreenPos.x < otherScreenPos.x + otherScreenSize.x &&
				objScreenPos.x + objScreenSize.x > otherScreenPos.x &&
				objScreenPos.y < otherScreenPos.y + otherScreenSize.y &&
				objScreenPos.y + objScreenSize.y > otherScreenPos.y
			) {

				// no whitelist means we allow everything to pass through
				// empty whitelist means we allow nothing to pass through
				if (!other.collider.allowPassThroughWhitelist) {
					colliding = true;
				}
				else if (passThroughWhiteListed) {
					colliding = true;
				}
				// not in whitelist, don't allow to pass through
				else {
					let ap = this.colliderPosition();
					let as = this.rectColliderSize();
					let bp = other.colliderPosition();
					let bs = other.rectColliderSize();

					let distances = [
						// dist from obj top to other bottom
						Math.abs((ap.y - as.y/2) - (bp.y + bs.y/2)), // top
						Math.abs((ap.y + as.y/2) - (bp.y - bs.y/2)), // bottom
						Math.abs((ap.x - as.x/2) - (bp.x + bs.x/2)), // left
						Math.abs((ap.x + as.x/2) - (bp.x - bs.x/2)), // right
					];
					let smallestDistanceIndex = distances.indexOf(Math.min(...distances));

					let newPosition = this.transform.position.clone();
					// closest to top
					if (smallestDistanceIndex == 0) {
						newPosition.y = bp.y + bs.y/2 + as.y/2 + this.transform.position.y - ap.y;
					}
					// closest to bottom
					else if (smallestDistanceIndex == 1) {
						newPosition.y = bp.y - bs.y/2 - as.y/2 + this.transform.position.y - ap.y;
					}
					// closest to left
					else if (smallestDistanceIndex == 2) {
						newPosition.x = bp.x + bs.x/2 + as.x/2 + this.transform.position.x - ap.x;
					}
					// closest to right
					else {
						newPosition.x = bp.x - bs.x/2 - as.x/2 + this.transform.position.x - ap.x;
					}

					this.transform.position = newPosition;

					// objects only barely collided, if object barriers are touching and not
					// pressing into eachother, we don't need to report it.
					// This allows Mario to stand next to a pipe, but if you press right on the dpad, it'll register.
					if (distances[smallestDistanceIndex] > 0.1) {
						let side = null;
						switch (smallestDistanceIndex) {
							case 0: side = 'top'; break;
							case 1: side = 'bottom'; break;
							case 2: side = 'left'; break;
							case 3: side = 'right'; break;
						}
						this.onNoPassthroughTouch(other, side);
					}
				}
			}
		}

		return colliding;
	}
}
