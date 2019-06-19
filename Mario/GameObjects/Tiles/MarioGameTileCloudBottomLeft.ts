class MarioGameTileCloudBottomLeft extends MarioGameTile {
	constructor() {
		super({
			hasCollider: false,
			allowPassThrough: true,
			breakFromBeneath: false,
			spritesheetAnimationSet: new SpritesheetAnimationSet(
				{
					"idle":	new SpritesheetAnimation({
						imageSrc: MarioGameTile.spriteSheet,
						transforms: [ new Transform(new Vector2(MarioGameTile.spriteSize.x*0, MarioGameTile.spriteSize.y*21), MarioGameTile.spriteSize), ],
						msPerFrame: 10000,
					}),
				},
				"idle" // start animation name
			)
		});
	}
}
