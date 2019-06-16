class MarioGameTileHillCenterGreen extends MarioGameTile {
	constructor() {
		super({
			hasCollider: false,
			allowPassThrough: true,
			breakFromBeneath: false,
			spritesheetAnimationSet: new SpritesheetAnimationSet(
				{
					"idle":	new SpritesheetAnimation(
						MarioGameTile.spriteSheet,
						[ new Transform(new Vector2(MarioGameTile.spriteSize.x*9, MarioGameTile.spriteSize.y*9), MarioGameTile.spriteSize), ],
						10000,
					),
				},
				"idle" // start animation name
			)
		});
	}
}
