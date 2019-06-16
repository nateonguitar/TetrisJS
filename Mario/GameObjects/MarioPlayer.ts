class MarioPlayer extends GameObject {

	public maxVelocity: Vector2 = new Vector2(0.2, 0.2);
	public velocity: Vector2 = Vector2.zero;
	public velocityChange: number = 0.005;
	private startPosition = new Vector2(2, 13);
	private jumping = false;
	private skidding = false;
	private currentAnimationName = null;

	constructor() {
		super({	layer: 2 });

		let tileSize = new Vector2(17, 16);

		this.currentAnimationName = 'idle';
		this.spritesheetAnimationSet = new SpritesheetAnimationSet(
			{
				"smallIdle": new SpritesheetAnimation(
					'Images/SpriteSheet.png',
					[
						new Transform(new Vector2(216, 398), tileSize),
					],
					10000
				),
				"smallJump": new SpritesheetAnimation(
					'Images/SpriteSheet.png',
					[
						new Transform(new Vector2(366, 398), tileSize),
					],
					10000
				),
				"smallRun": new SpritesheetAnimation(
					'Images/SpriteSheet.png',
					[
						new Transform(new Vector2(246, 398), tileSize),
						new Transform(new Vector2(276, 398), tileSize),
						new Transform(new Vector2(306, 398), tileSize),
						new Transform(new Vector2(276, 398), tileSize),
					],
					75
				),
				"smallSkid": new SpritesheetAnimation(
					'Images/SpriteSheet.png',
					[
						new Transform(new Vector2(336, 398), tileSize),
					],
					10000
				),
			},
			'smallIdle' // start animation name
		);

		this.transform.position = this.startPosition.clone();
		this.setDefaultCollider();
	}

	update(): void {
		this.handleMovement();
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

	public init(): void {
		this.transform.position = this.startPosition.clone();
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

	private handleMovement(): void {
		if (Input.keys(Keys.Space)) {
			this.velocity.y = -0.15;
			this.jumping = true;
		}


		if (Input.keys(Keys.ArrowRight)) {
			if (this.velocity.x < 0) {
				this.velocity.x += this.velocityChange*2;
				this.skidding = true;
			}
			else {
				this.skidding = false;
				this.velocity.x += this.velocityChange;
			}
			if (this.velocity.x > this.maxVelocity.x) {
				this.velocity.x = this.maxVelocity.x;
			}
		}
		else if (Input.keys(Keys.ArrowLeft)) {
			if (this.velocity.x > 0) {
				this.velocity.x -= this.velocityChange*2;
				this.skidding = true;
			}
			else {
				this.skidding = false;
				this.velocity.x -= this.velocityChange;
			}

			if (this.velocity.x < -this.maxVelocity.x) {
				this.velocity.x = -this.maxVelocity.x;
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

	onNoPassthroughTouch(other: GameObject, side: string): void {
		if (other instanceof MarioGameTile) {
			if (side == 'right' || side == 'left') {
				this.velocity.x = 0;
			}
			if (side == 'bottom') {
				this.jumping = false;
				this.velocity.y = 0;
				this.velocity.y = 0;
			}
			if (side == 'top') {
				this.velocity.y = 0;
				other.onHitFromBeneath();
			}
		}
	}

	public die(): void {

	}
}
