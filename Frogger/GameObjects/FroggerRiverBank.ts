class FroggerRiverBank extends GameObject {
	constructor() {
		super({
			layer: 1,
			shape: "square",
			fillStyle: "#654321" // brown
		});
		this.transform.size = new Vector2(GameManager.screenSize.x, FroggerMainLevelController.unitHeight);
	}
}
