class SoldierGreen extends Soldier {

	private currentAnimationName: string = null;
	private holdingMouse: boolean = false;

	constructor(boundarySize: Vector2) {
		super();
		this.boundarySize = boundarySize.clone();

		this.currentAnimationName = "walkDown";
		this.spritesheetAnimationSet = new SpritesheetAnimationSet(
			{
				"walkDown":	new SpritesheetAnimation(
					'Zelda/Images/SoldierGreenWalkDownSpritesheet.png',
					[
						new Transform(new Vector2(0, 0  ), new Vector2(22, 38)),
						new Transform(new Vector2(0, 38 ), new Vector2(22, 38)),
						new Transform(new Vector2(0, 76 ), new Vector2(22, 38)),
						new Transform(new Vector2(0, 114), new Vector2(22, 38)),
					],
					200
				),
				"walkSide":	new SpritesheetAnimation(
					'Zelda/Images/SoldierGreenWalkSideSpritesheet.png',
					[
						new Transform(new Vector2(0, 0 ), new Vector2(31, 27)),
						new Transform(new Vector2(0, 27), new Vector2(31, 27)),
						new Transform(new Vector2(0, 54), new Vector2(31, 27)),
					],
					200
				)
			},
			this.currentAnimationName // start animation name
		);

		Input.registerMouseDown(this, this.mousedown);
		Input.registerMouseUp(this, this.mouseup);

		this.init();
	}

	// override
	public update(): void {
		if (Math.random() < 0.01) {
			if (this.currentAnimationName == "walkDown") {
				this.currentAnimationName = "walkSide";
			}
			else {
				this.currentAnimationName = "walkDown";
			}
			this.spritesheetAnimationSet.currentAnimationName = this.currentAnimationName;
		}
		this.handleMovement();

		if (this.holdingMouse) {
			this.speedX = 0;
			this.speedY = 0;
			this.transform.position = Input.getMousePosition().subtract(this.transform.size.clone().scale(0.5));
		}
		else if (this.speedX == 0) {
			this.setRandomDirection();
		}
	}

	private mousedown(coords:Vector2, gameObjects:GameObject[]): void {
		for (let obj of gameObjects) {
			if (obj == this) {
				this.holdingMouse = true;
			}
		}
	}

	private mouseup(coords:Vector2, gameObjects:GameObject[]): void {
		this.holdingMouse = false;
	}
}
