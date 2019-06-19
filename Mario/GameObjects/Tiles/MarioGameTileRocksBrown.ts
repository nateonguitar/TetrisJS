class MarioGameTileRocksBrown extends MarioGameTile {
	constructor() {
		super({
			hasCollider: true,
			allowPassThrough: false,
			breakFromBeneath: false,
			spritesheetAnimationSet: new SpritesheetAnimationSet({
				spritesheetAnimations: {
					"idle":	new SpritesheetAnimation({
						imageSrc: MarioGameTile.spriteSheet,
						transforms: [ new Transform(new Vector2(0, 0), MarioGameTile.spriteSize), ],
						msPerFrame: 10000,
					}),
				},
				startAnimationName: "idle"
			})
		});
	}
}
