class MarioPlayer extends GameObject {

	public maxVelocity: Vector2 = new Vector2(0.2, 0.2);
	public velocity: Vector2 = Vector2.zero;
	public velocityChange: number = 0.005;
	private startPosition = new Vector2(2, 13);

	constructor() {
		super({	layer: 2 });

		let tileSize = new Vector2(17, 16);

		this.spritesheetAnimationSet = new SpritesheetAnimationSet(
			{
				"idle":	new SpritesheetAnimation(
					'Images/SpriteSheet.png',
					[
						new Transform(new Vector2(216, 398), tileSize),
					],
					10000
				),
				"jumping":	new SpritesheetAnimation(
					'Images/SpriteSheet.png',
					[
						new Transform(new Vector2(366, 398), tileSize),
					],
					10000
				),
			},
			'idle' // start animation name
		);

		this.transform.position = this.startPosition.clone();
		this.setDefaultCollider();
	}

	update(): void {
		this.handleMovement();
		this.transform.position = this.transform.position.add(this.velocity);

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

		if (this.transform.position.y > 14.5) {
			console.log('dead');
			this.transform.position = this.startPosition.clone();
			(<any> GameManager.currentLevel.managingGameObject).backBarrier.init();
		}
	}

	private handleMovement(): void {
		if (Input.keys(Keys.Space)) {
			this.spritesheetAnimationSet.currentAnimationName = "jumping";
			this.velocity.y = -0.15;
		}


		if (Input.keys(Keys.ArrowRight)) {
			if (this.velocity.x < 0) {
				this.velocity.x += this.velocityChange*2;
			}
			else {
				this.velocity.x += this.velocityChange;
			}
			if (this.velocity.x > this.maxVelocity.x) {
				this.velocity.x = this.maxVelocity.x;
			}
		}
		else if (Input.keys(Keys.ArrowLeft)) {
			if (this.velocity.x > 0) {
				this.velocity.x -= this.velocityChange*2;
			}
			else {
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
				this.spritesheetAnimationSet.currentAnimationName = 'idle';
				this.velocity.y = 0;
			}
			if (side == 'top') {
				this.velocity.y = 0;
			}

		}
	}
}
