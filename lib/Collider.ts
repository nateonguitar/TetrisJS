interface ColliderParams {
	position: Vector2;
	/** size defaults to `new Vector2(1, 1)` in RectCollider */
	size: Vector2;
	allowPassThrough?: boolean;
}

class Collider {

	public position: Vector2;
	public allowPassThrough = true;

	constructor(params:ColliderParams) {
		this.position = params.position.clone();

		if (params.allowPassThrough === false) {
			this.allowPassThrough = false;
		}
	}
}
