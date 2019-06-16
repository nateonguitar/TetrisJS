interface MarioLevelParams {
	managingGameObjectClass: Function,
	backgroundColor: string,
}

class MarioLevel extends Level {
    constructor(params:MarioLevelParams) {
		super(<LevelParams>{
			managingGameObjectClass: params.managingGameObjectClass,
			imageSrcs: [
				'Images/SpriteSheet.png',
				'Images/SpriteSheetTiles.png'
            ],
            unitSize: 50,
            backgroundColor: params.backgroundColor,
		});
	}
}
