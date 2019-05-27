class SquareCollider extends Collider {
	constructor(transform: Transform) {
		super();
		this.transform = new Transform(transform.position.clone(), transform.size.clone());
	}
}
