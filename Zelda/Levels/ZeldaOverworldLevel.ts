class ZeldaOverworldLevel extends Level {
	constructor() {
		super(<LevelParams>{
			managingGameObjectClass: ZeldaOverworldController,
			imageSrcs: [
				'Zelda/Images/Link.png',
				'Zelda/Images/Overworld.png',
				'Zelda/Images/SoldierBlue.png',
				'Zelda/Images/SoldierGreenWalkDownSpritesheet.png',
				'Zelda/Images/SoldierGreenWalkSideSpritesheet.png',
			],
			// allow half the viewport size around the viewport to update off screen
			extraViewportPadding: new Vector2(GameManager.options.screenWidth, GameManager.options.screenHeight).scale(0.5)
		});
	}
}
