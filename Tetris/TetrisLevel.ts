class TetrisLevel extends Level {
	// override
	public init() {
		this.managingGameObject = new TetrisController();
		this.images = [];
	}
}
