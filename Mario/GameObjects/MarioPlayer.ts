class MarioPlayer extends GameObject {

	public maxVelocity: Vector2 = new Vector2(0.2, 0.2);
	public velocity: Vector2 = Vector2.zero;
	public velocityChange: number = 0.0055;
	private startPosition = new Vector2(2, 13);
	private allowedToJump: boolean = true;
	private jumping = false;
	private skidding = false;
	private currentAnimationName = null;
	private minJumpPressDuration = 200;
	private jumpStartTime = 0;
	private pressedSpace: boolean = false;
	private velocityAtJumpTime = 0;
	private bumpedTop = false;

	constructor() {
		super({	layer: 2 });

		let tileSize = new Vector2(17, 16);

		this.currentAnimationName = 'idle';
		this.spritesheetAnimationSet = new SpritesheetAnimationSet({
			spritesheetAnimations: {
				"smallIdle": new SpritesheetAnimation({
					imageSrc: 'Images/SpriteSheet.png',
					transforms: [
						new Transform({ position: new Vector2(216, 398), size: tileSize }),
					],
					msPerFrame: 10000
				}),
				"smallJump": new SpritesheetAnimation({
					imageSrc: 'Images/SpriteSheet.png',
					transforms: [
						new Transform({ position: new Vector2(366, 398), size: tileSize }),
					],
					msPerFrame: 10000
				}),
				"smallRun": new SpritesheetAnimation({
					imageSrc: 'Images/SpriteSheet.png',
					transforms: [
						new Transform({ position: new Vector2(246, 398), size: tileSize }),
						new Transform({ position: new Vector2(276, 398), size: tileSize }),
						new Transform({ position: new Vector2(306, 398), size: tileSize }),
						new Transform({ position: new Vector2(276, 398), size: tileSize }),
					],
					msPerFrame: 75
				}),
				"smallSkid": new SpritesheetAnimation({
					imageSrc: 'Images/SpriteSheet.png',
					transforms: [
						new Transform({ position: new Vector2(336, 398), size: tileSize }),
					],
					msPerFrame: 10000
				}),
			},
			startAnimationName: 'smallIdle'
		});

		this.transform.position = this.startPosition.clone();
		this.setDefaultCollider();
	}

	public init(): void {
		this.transform.position = this.startPosition.clone();
	}

	update(): void {
		this.handleMovement();
		this.trackValues();
		this.handleSpritesheetSwapping();

		this.transform.position = this.transform.position.add(this.velocity);

		Debug.trackValue({label: 'player velocity', value: this.velocity.toString()})

		// make mario face the right way
		if (
			this.velocity.x < 0 && this.transform.size.x > 0 ||
			this.velocity.x > 0 && this.transform.size.x < 0
		) {
			this.transform.size.x = -this.transform.size.x;
		}
		this.velocity.y += this.velocityChange * 2;
		if (this.velocity.y >= this.maxVelocity.y) {
			this.velocity.y = this.maxVelocity.y;
		}

		this.handleDeathDetection();
	}

	private handleMovement(): void {
		// key mappings
		let buttons = {
			A: Input.keys(Keys.Slash) || Input.keys(Keys.Space),
			B: Input.keys(Keys.Period) || Input.keys(Keys.ShiftLeft),
			Left: Input.keys(Keys.KeyA) || Input.keys(Keys.ArrowLeft),
			Right: Input.keys(Keys.KeyD) || Input.keys(Keys.ArrowRight)
		}

		////////////////////////////////////
		// JUMPING
		if (buttons.A) {
			if (this.allowedToJump && !this.pressedSpace) {
				this.pressedSpace = true;
				this.jumpStartTime = Time.time;
				this.velocityAtJumpTime = Math.abs(this.velocity.x);
				this.velocity.y = -this.maxVelocity.y;
			}
			if (!this.bumpedTop && this.getMaxJumpTime() > Time.time) {
				this.velocity.y = -this.maxVelocity.y;
				this.jumping = true;
			}
		}
		if (!buttons.A) {
			this.pressedSpace = false;
		}

		// Mario isn't allowed to jump if he's falling.
		// This isn't for his downward arc, this is for falling off of a ledge.
		if (this.jumping || this.velocity.y > 0.125) {
			this.allowedToJump = false;
			this.jumping = true;
			this.setAnimation('jump');
		}

		////////////////////////////////////
		// LEFT AND RIGHT MOVEMENT
		let speed = buttons.Left || buttons.Right ? this.velocityChange : 0;
		if (buttons.Left) {
			speed *= -1;
		}

		if (Math.abs(this.velocity.x) > this.maxVelocity.x * 0.45 ) {
			speed *= (buttons.B) ? 2 : 1;
		}
		this.velocity.x += speed;
		if (this.velocity.x < -this.maxVelocity.x) {
			this.velocity.x = -this.maxVelocity.x;
		}
		if (this.velocity.x > this.maxVelocity.x) {
			this.velocity.x = this.maxVelocity.x;
		}

		if (buttons.Right) {
			if (this.velocity.x < 0) {
				this.velocity.x += this.velocityChange * (buttons.B ? 1 : 0.5);
				this.skidding = true;
			}
			else {
				this.skidding = false;
			}
		}
		else if (buttons.Left) {
			if (this.velocity.x > 0) {
				this.velocity.x -= this.velocityChange * (buttons.B ? 2 : 1);
				this.skidding = true;
			}
			else {
				this.skidding = false;
			}
		}
		else {
			// bring velocity back down to zero
			if (this.velocity.x < 0) {
				this.velocity.x += this.velocityChange * 2;
			}
			else if (this.velocity.x > 0) {
				this.velocity.x -= this.velocityChange * 2;
			}

			if (Math.abs(this.velocity.x) < this.velocityChange * 2) {
				this.velocity.x = 0;
			}
		}
	}

	private getMaxJumpTime(): number {
		return this.jumpStartTime + this.minJumpPressDuration + this.velocityAtJumpTime * 500;
	}

	private handleDeathDetection(): void {
		if (this.transform.position.y > 17.5) {
			this.transform.position = this.startPosition.clone();
			(<any> GameManager.currentLevel.managingGameObject).buildLevel();
		}
	}

	private handleSpritesheetSwapping(): void {
		if (this.jumping) {
			if (this.currentAnimationName != 'jump') {
				this.setAnimation('jump');
			}
			return;
		}

		if (this.velocity.x == 0) {
			this.setAnimation('idle');
		}
		else if (this.skidding) {
			this.setAnimation('skid');
		}
		else {
			this.setAnimation('run');
		}
	}

	private setAnimation(name: string): void {
		this.currentAnimationName = name;
		let smallAnimations = {
			'jump': 'smallJump',
			'run': 'smallRun',
			'idle': 'smallIdle',
			'skid': 'smallSkid'
		}

		let animName = smallAnimations[name];

		if (this.spritesheetAnimationSet.currentAnimationName != animName) {
			this.spritesheetAnimationSet.currentAnimationName = animName;
		}
	}



	onNoPassthroughTouch(other: GameObject, side: string): void {
		if (other instanceof MarioGameTile) {
			if (side == 'right' || side == 'left') {
				this.velocity.x = 0;
			}
			if (side == 'bottom') {
				this.jumping = false;
				this.allowedToJump = true;
				this.velocity.y = 0;
				this.bumpedTop = false;
			}
			if (side == 'top') {
				this.velocity.y = 0;
				this.allowedToJump = false;
				this.bumpedTop = true;
				other.onHitFromBeneath();
			}
		}
	}

	public die(): void {

	}

	private trackValues(): void {
		// Debug.trackValue({
		// 	label: "jump time",
		// 	value: this.getMaxJumpTime().toString()
		// });
		// Debug.trackValue({
		// 	label: "Time.time",
		// 	value: Time.time.toString()
		// })
		// Debug.trackValue({
		// 	label: "Max > Time",
		// 	value: this.getMaxJumpTime() > Time.time
		// })
		// Debug.trackValue({
		// 	label: "pressedSpace",
		// 	value: this.pressedSpace.toString()
		// })

	}
}
