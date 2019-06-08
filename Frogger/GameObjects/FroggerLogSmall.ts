class FroggerLogSmall extends FroggerLandingObject {
	constructor(position: Vector2, name: string) {
		super(position, name);
		let spriteStartPoint = new Vector2(389, 258);
		let spriteSize = new Vector2(183, 57);
		this.spritesheetAnimationSet = new SpritesheetAnimationSet(
			{
				"idle":	new SpritesheetAnimation(
					'Frogger/Images/FroggerSpritesheet.png',
					[ new Transform(spriteStartPoint, spriteSize), ],
					10000,
				),
			},
			"idle" // start animation name
		);
		this.transform.size.x = FroggerMainLevelController.unitHeight * 2;
	}
}
