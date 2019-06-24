class FroggerRiverBank extends GameObject {
	constructor() {
		super({
			layer: 1,
			shape: "square",
			shapeFillStyle: "#654321" // brown
		});
		this.transform.size = new Vector2(16, 1);
	}
}
