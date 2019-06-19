class FroggerLogSmall extends FroggerLandingObject {
	constructor(name: string) {
		super(name);
		let spriteStartPoint = new Vector2(389, 258);
		let spriteSize = new Vector2(183, 57);
		this.spritesheetAnimationSet = new SpritesheetAnimationSet(
			{
				"idle":	new SpritesheetAnimation({
					imageSrc: 'Images/FroggerSpritesheet.png',
					transforms: [ new Transform(spriteStartPoint, spriteSize), ],
					msPerFrame: 10000,
				}),
			},
			"idle" // start animation name
		);
		this.transform.size.x = 2;
		this.collider.allowPassThroughWhitelist = [];
	}
}
