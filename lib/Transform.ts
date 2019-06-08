class Transform {
	public position: Vector2;
	public size: Vector2;
	public rotation: number;

	constructor(
		position: Vector2 = new Vector2(0, 0),
		size:     Vector2 = new Vector2(1, 1),
		rotation: number  = 0
	) {
		this.position = position;
		this.size     = size;
		this.rotation = rotation;
	}
}
