class FroggerPlayer extends GameObject {

	private spriteSize: Vector2 = new Vector2(57, 77);
	private levelHeight: number = 0;

	// jumping
	private jumping: boolean = false;
	private pressedSpace: boolean = false;
	private jumpStartTime: number = 0;
	private jumpDuration: number = 450;
	private targetDestination: Vector2 = null;

	constructor(levelHeight:number) {
		super({
			layer: 2,
			name: null
		});

		this.levelHeight = levelHeight;

		this.spritesheetAnimationSet = new SpritesheetAnimationSet(
			{
				"idle":	new SpritesheetAnimation(
					'Frogger/Images/FroggerSpritesheet.png',
					[
						new Transform(new Vector2(0, 0), this.spriteSize),
					],
				),
				"jumping":	new SpritesheetAnimation(
					'Frogger/Images/FroggerSpritesheet.png',
					[
						new Transform(new Vector2(0,                   0), this.spriteSize),
						new Transform(new Vector2(this.spriteSize.x,   0), this.spriteSize),
						new Transform(new Vector2(this.spriteSize.x*2, 0), this.spriteSize),
						new Transform(new Vector2(this.spriteSize.x*3, 0), this.spriteSize),
						new Transform(new Vector2(this.spriteSize.x*4, 0), this.spriteSize),
						new Transform(new Vector2(this.spriteSize.x*5, 0), this.spriteSize),
					],
					75
				),
			},
			"idle" // start animation name
		)

		this.setInitialSize();
		this.setInitialPosition();
		this.setCollider();

		GameManager.camera.follow(this);
	}



	// override
	public update(): void {
		this.handleInput();
		if (this.targetDestination) {
			this.transform.position = this.transform.position.moveTowards(this.targetDestination, 4 );
			let atTargetDestination = this.transform.position.subtract(this.targetDestination).magnitude() == 0;
			if (atTargetDestination) {
				this.targetDestination = null;
				// snap to spaces
				let unitHeight = FroggerMainLevelController.unitHeight;
				let y = this.transform.position.y;
				this.transform.position.y = Math.floor(y / unitHeight) * unitHeight + this.transform.size.y/2;
			}
		}

		if (this.transform.position.y < 0) {
			this.targetDestination = null;
			this.spritesheetAnimationSet.currentAnimationName = "idle";
			this.setInitialPosition();
		}
	}

	private setInitialSize(): void {
		let t = this.transform;
		t.size = this.spriteSize.scale(1.5);
		t.size.x = Math.floor(t.size.x);
		t.size.y = Math.floor(t.size.y);
	}

	private setInitialPosition(): void {
		let tSize = this.transform.size;
		let x = GameManager.options.screenWidth/2 + tSize.x/2;
		let y = this.levelHeight;
		this.transform.position = new Vector2(x, y).subtract(tSize.scale(0.5));
		// so our snapping is right on
		this.transform.position = new Vector2(
			Math.floor(this.transform.position.x),
			Math.floor(this.transform.position.y)
		);
	}

	private setCollider(): void {
		let tSize = this.transform.size;
		let colliderPosition = new Vector2(0, 0.1);
		let colliderSize = new Vector2(0.8, 0.5);
		this.collider = new SquareCollider(colliderPosition, colliderSize);
	}

	private handleInput(): void {
		if (Input.keys(Keys.Space) && !this.jumping) {
			this.pressedSpace = true;
		}

		let speed = 2;
		if (Input.keys(Keys.ArrowUp)) {
			this.transform.position.y -= speed;
		}
		if (Input.keys(Keys.ArrowDown)) {
			this.transform.position.y += speed;
		}

		if (Input.keys(Keys.ArrowLeft)) {
			this.transform.position.x -= speed;
		}
		if (Input.keys(Keys.ArrowRight)) {
			this.transform.position.x += speed;
		}

		if (Input.keys(Keys.KeyA)) {
			this.transform.size.x -= speed;
		}
		if (Input.keys(Keys.KeyD)) {
			this.transform.size.x += speed;
		}
		if (Input.keys(Keys.KeyW)) {
			this.transform.size.y += speed;
		}
		if (Input.keys(Keys.KeyS)) {
			this.transform.size.y -= speed;
		}

		// space keyup
		if (this.pressedSpace && !Input.keys(Keys.Space)) {
			this.spritesheetAnimationSet.currentAnimationName = "jumping";
			this.pressedSpace = false;
			this.jumping = true;
			this.jumpStartTime = Time.time;
			this.targetDestination = this.transform.position.subtract(new Vector2(0, FroggerMainLevelController.unitHeight));
		}

		if (this.jumping && this.jumpStartTime + this.jumpDuration <= Time.time) {
			this.jumping = false;
			this.spritesheetAnimationSet.currentAnimationName = 'idle';
		}
	}
}
