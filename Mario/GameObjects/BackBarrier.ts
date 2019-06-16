class BackBarrier extends GameObject {
	constructor() {
		super();
		this.collider = new RectCollider(
			new Transform(
				new Vector2(-8.85, 0), // position
				new Vector2(2, 20) // size
			)
		);
		this.transform.position.y = 9;
		this.transform.position.x = 7.5;
	}

	public update(): void {
		let player = (<MarioLevelController> GameManager.currentLevel.managingGameObject).player;
		// follow player any time he is farther than the center of the screen
		if (player.transform.position.x > this.transform.position.x) {
			this.transform.position.x = player.transform.position.x;
		}

		if (this.currentCollidingObjects.indexOf(player) >= 0) {
			player.transform.position.x = this.transform.position.x - 7.35;
			player.velocity.x = 0;
		}
	}
}
