class FroggerLandingObject extends GameObject {
	constructor(position: Vector2) {
		super({layer: 1});
		this.transform.position = position.clone();
		this.transform.size.y = FroggerMainLevelController.unitHeight;
	}

	public setCollider(): void {
		this.collider = new SquareCollider(Vector2.zero, this.transform.size);
	}
}
