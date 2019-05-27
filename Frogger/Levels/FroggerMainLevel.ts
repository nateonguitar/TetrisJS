class FroggerMainLevel extends Level {
	constructor() {
		super(<LevelParams>{
			managingGameObjectClass: FroggerMainLevelController,
			imageSrcs: [
				'Frogger/Images/FroggerSpritesheet.png',
			],
		});
	}
}
