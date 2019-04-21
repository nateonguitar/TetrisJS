class SoldierGreen extends Soldier {

	private currentAnimationName: string = null;
	constructor(boundarySize: Vector2) {
		super();
		this.boundarySize = boundarySize.clone();

		this.currentAnimationName = "walkDown";
		this.spritesheetAnimationSet = new SpritesheetAnimationSet(
			{
				"walkDown":	new SpritesheetAnimation(
					'Zelda/SoldierGreenWalkDownSpritesheet.png',
					[
						new Transform(new Vector2(0, 0  ), new Vector2(22, 38)),
						new Transform(new Vector2(0, 38 ), new Vector2(22, 38)),
						new Transform(new Vector2(0, 76 ), new Vector2(22, 38)),
						new Transform(new Vector2(0, 114), new Vector2(22, 38)),
					],
					200
				),
				"walkSide":	new SpritesheetAnimation(
					'Zelda/SoldierGreenWalkSideSpritesheet.png',
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
	}
}
