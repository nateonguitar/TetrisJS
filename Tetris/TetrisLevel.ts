class TetrisLevel extends Level {
	constructor() {
		super(<LevelParams>{
			managingGameObjectClass: TetrisController
		});
	}
}
