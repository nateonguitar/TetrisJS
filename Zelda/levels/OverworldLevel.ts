class OverworldLevel extends Level {
	// override
	public init(): void {
		this.managingGameObject = new ZeldaController();
		this.images = [
			'Link.png',
			'Overworld.png',
			'SoldierBlue.png',
			'SoldierGreenWalkDownSpritesheet.png',
			'SoldierGreenWalkSideSpritesheet.png',
		];
	}
}
