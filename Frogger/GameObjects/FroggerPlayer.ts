class FroggerPlayer extends GameObject {

	// jumping
	private jumping: boolean = false;
	private pressedSpace: boolean = false;
	private jumpStartTime: number = 0;
	private jumpDuration: number = 450;
	private targetDestination: Vector2 = null;

	constructor(levelHeight:number) {
		super({ layer: 2 });

		let spriteSize = new Vector2(57, 77);
		this.spritesheetAnimationSet = new SpritesheetAnimationSet(
			{
				"idle":	new SpritesheetAnimation(
					'Frogger/Images/FroggerSpritesheet.png',
					[
						new Transform(new Vector2(0,              0), spriteSize),
					],
				),
				"jumping":	new SpritesheetAnimation(
					'Frogger/Images/FroggerSpritesheet.png',
					[
						new Transform(new Vector2(0,              0), spriteSize),
						new Transform(new Vector2(spriteSize.x,   0), spriteSize),
						new Transform(new Vector2(spriteSize.x*2, 0), spriteSize),
						new Transform(new Vector2(spriteSize.x*3, 0), spriteSize),
						new Transform(new Vector2(spriteSize.x*4, 0), spriteSize),
						new Transform(new Vector2(spriteSize.x*5, 0), spriteSize),
					],
					75
				),
			},
			"idle" // start animation name
		)
		this.transform.size = spriteSize.scale(1.5);
		let x = GameManager.options.screenWidth/2
		let y = levelHeight - spriteSize.y/2;
		this.transform.position = new Vector2(x, y).subtract(this.transform.size.scale(0.5));
		// so our snapping is right on
		this.transform.position = new Vector2(
			Math.floor(this.transform.position.x),
			Math.floor(this.transform.position.y)
		);
		GameManager.camera.follow(this);
	}

	// override
	public update(): void {
		this.handleInput();
		if (this.targetDestination) {
			this.transform.position = this.transform.position.moveTowards(this.targetDestination, 4);
			let atTargetDestination = this.transform.position.subtract(this.targetDestination).magnitude() == 0;
			if (atTargetDestination) {
				this.targetDestination = null;
				// snap to spaces
				let unitHeight = FroggerMainLevelController.unitHeight;
				let y = this.transform.position.y;
				debugger;
				this.transform.position.y = Math.floor(y / unitHeight) * unitHeight;
			}
		}
	}

	private handleInput(): void {
		if (Input.keys(Keys.Space) && !this.jumping) {
			this.pressedSpace = true;
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
