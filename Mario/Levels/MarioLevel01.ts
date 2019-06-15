class MarioLevel01 extends Level {
    constructor() {
		super(<LevelParams>{
			managingGameObjectClass: MarioLevel01Controller,
			imageSrcs: [
				'Images/SpriteSheet.png',
            ],
            unitSize: 50,
            backgroundColor: "#5c94fc",
		});
	}
}
