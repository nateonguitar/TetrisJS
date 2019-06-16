class MarioPlayer extends GameObject {

	public maxVelocity: Vector2 = new Vector2(0.2, 0.2);
	public velocity: Vector2 = Vector2.zero;
	public velocityXChange: number = 0.005;
	private jumping: boolean = false;
	private pressedSpace: boolean = false;

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

		this.transform.position.y = 13;
		this.transform.position.x = 2;
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

	}

	private handleMovement(): void {
		if (Input.keys(Keys.Space) && !this.jumping) {
			this.pressedSpace = true;
		}


		if (Input.keys(Keys.ArrowRight)) {
			if (this.velocity.x < 0) {
				this.velocity.x += this.velocityXChange*2;
			}
			else {
				this.velocity.x += this.velocityXChange;
			}
			if (this.velocity.x > this.maxVelocity.x) {
				this.velocity.x = this.maxVelocity.x;
			}
		}
		else if (Input.keys(Keys.ArrowLeft)) {
			if (this.velocity.x > 0) {
				this.velocity.x -= this.velocityXChange*2;
			}
			else {
				this.velocity.x -= this.velocityXChange;
			}

			if (this.velocity.x < -this.maxVelocity.x) {
				this.velocity.x = -this.maxVelocity.x;
			}
		}
		else {
			// bring velocity back down to zero
			if (this.velocity.x < 0) {
				this.velocity.x += this.velocityXChange * 2;
			}
			else if (this.velocity.x > 0) {
				this.velocity.x -= this.velocityXChange * 2;
			}

			if (Math.abs(this.velocity.x) < this.velocityXChange * 2) {
				this.velocity.x = 0;
			}
		}

		// space keyup
		if (this.pressedSpace && !Input.keys(Keys.Space)) {
			this.spritesheetAnimationSet.currentAnimationName = "jumping";
			this.pressedSpace = false;
			this.jumping = true;
		}
	}
}
