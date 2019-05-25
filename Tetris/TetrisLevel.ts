class TetrisLevel extends Level {
	// override
	public init(): void {
		this.managingGameObject = new TetrisController();
		this.images = [];
	}
}
