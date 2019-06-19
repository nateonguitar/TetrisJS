class MarioGameTileQuestionMark extends MarioGameTile {



	constructor() {
		super({
			hasCollider: true,
			allowPassThrough: false,
			breakFromBeneath: false,
			spritesheetAnimationSet: new SpritesheetAnimationSet(
				{
					"idle": new SpritesheetAnimation({
						imageSrc: MarioGameTile.spriteSheet,
						transforms: [
							new Transform(new Vector2(MarioGameTile.spriteSize.x * 24, 0), MarioGameTile.spriteSize),
						],
						msPerFrame: 10000
					}),
					"flash": new SpritesheetAnimation({
						imageSrc: MarioGameTile.spriteSheet,
						transforms: [
							new Transform(new Vector2(MarioGameTile.spriteSize.x * 25, 0), MarioGameTile.spriteSize),
							new Transform(new Vector2(MarioGameTile.spriteSize.x * 26, 0), MarioGameTile.spriteSize),
						],
						msPerFrame: 200
					}),
					"spent": new SpritesheetAnimation({
						imageSrc: MarioGameTile.spriteSheet,
						transforms: [ new Transform(new Vector2(0, 0), MarioGameTile.spriteSize), ],
						msPerFrame: 10000,
					}),
				},
				"idle" // start animation name
			)
		});
	}

	// override
	public onHitFromBeneath(): void {
		console.log("Coin!");
		let manager = <MarioLevelController> GameManager.currentLevel.managingGameObject;
		manager.replaceTile(this, MarioGameTileBricksBrown);
	}
}
