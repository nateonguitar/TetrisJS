class MarioGameTileBricksBrown extends MarioGameTile {
	constructor() {
		super({
			hasCollider: true,
			allowPassThrough: false,
			breakFromBeneath: true,
			spritesheetAnimationSet: new SpritesheetAnimationSet({
				spritesheetAnimations: {
					"idle":	new SpritesheetAnimation({
						imageSrc: MarioGameTile.spriteSheet,
						transforms: [ new Transform(new Vector2(MarioGameTile.spriteSize.x*2, 0), MarioGameTile.spriteSize), ],
						msPerFrame: 10000,
						loop: false
					}),
				},
				startAnimationName: "idle",
			})
		});
	}
}
