interface ColliderParams {
	position: Vector2;
	/** size defaults to `new Vector2(1, 1)` in RectCollider */
	size: Vector2;
}

class Collider {

	public position: Vector2;

	constructor(params:ColliderParams) {
		this.position = params.position.clone();
	}
}
