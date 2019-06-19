class MarioGameTileHillTopGreen extends MarioGameTile {
	constructor() {
		super({
			hasCollider: false,
			allowPassThrough: true,
			breakFromBeneath: false,
			spritesheetAnimationSet: new SpritesheetAnimationSet({
				spritesheetAnimations: {
					"idle":	new SpritesheetAnimation({
						imageSrc: MarioGameTile.spriteSheet,
						transforms: [ new Transform(new Vector2(MarioGameTile.spriteSize.x*9, MarioGameTile.spriteSize.y*8), MarioGameTile.spriteSize), ],
						msPerFrame: 10000,
					}),
				},
				startAnimationName: "idle"
			})
		});
	}
}
