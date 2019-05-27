class SquareCollider extends Collider {
	constructor(position: Vector2, size: Vector2) {
		super();
		this.position = position.clone();
		this.size = size.clone();
	}
}
