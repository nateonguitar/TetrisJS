class MarioGameTileCloudBottomLeft extends MarioGameTile {
	constructor() {
		super({
			hasCollider: false,
			allowPassThrough: true,
			breakFromBeneath: false,
			spritesheetAnimationSet: new SpritesheetAnimationSet(
				{
					"idle":	new SpritesheetAnimation(
						MarioGameTile.spriteSheet,
						[ new Transform(new Vector2(MarioGameTile.spriteSize.x*0, MarioGameTile.spriteSize.y*21), MarioGameTile.spriteSize), ],
						10000,
					),
				},
				"idle" // start animation name
			)
		});
	}
}
