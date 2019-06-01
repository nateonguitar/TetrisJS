class FroggerLandingObject extends GameObject {
	constructor(position: Vector2, name: string) {
		super({layer: 1, name: name});
		this.transform.position = position.clone();
		this.transform.size.y = FroggerMainLevelController.unitHeight;
	}
}
