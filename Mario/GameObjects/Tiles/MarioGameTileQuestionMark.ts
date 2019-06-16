class MarioGameTileQuestionMark extends MarioGameTile {
	constructor() {
		super({
			hasCollider: true,
			allowPassThrough: false,
			breakFromBeneath: false,
			spritesheetAnimationSet: new SpritesheetAnimationSet(
				{
					"idle": new SpritesheetAnimation(
						MarioGameTile.spriteSheet,
						[ new Transform(new Vector2(MarioGameTile.spriteSize.x * 24, 0), MarioGameTile.spriteSize), ],
						10000,
					),
					"spent": new SpritesheetAnimation(
						MarioGameTile.spriteSheet,
						[ new Transform(new Vector2(0, 0), MarioGameTile.spriteSize), ],
						10000,
					),
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
