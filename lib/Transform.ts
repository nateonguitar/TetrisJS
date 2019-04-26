class Transform {
	public position: Vector2;
	public size: Vector2;

	constructor(
		position: Vector2 = new Vector2(0, 0),
		size:     Vector2 = new Vector2(1, 1)
	) {
		this.position = position;
		this.size     = size;
	}
}
