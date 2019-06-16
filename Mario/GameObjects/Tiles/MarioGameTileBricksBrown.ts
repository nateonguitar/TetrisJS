class MarioGameTileBricksBrown extends MarioGameTile {
	constructor() {
		super({
			hasCollider: true,
			allowPassThrough: false,
			breakFromBeneath: true,
			spritesheetAnimationSet: new SpritesheetAnimationSet(
				{
					"idle":	new SpritesheetAnimation(
						MarioGameTile.spriteSheet,
						[ new Transform(new Vector2(MarioGameTile.spriteSize.x*2, 0), MarioGameTile.spriteSize), ],
						10000,
					),
				},
				"idle" // start animation name
			)
		});
	}
}
