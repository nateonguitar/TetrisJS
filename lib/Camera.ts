class Camera {
	public position: Vector2 = null;

	private gameObjectToFollow: GameObject = null;

	constructor() {
		this.position = Vector2.zero;
	}

	public follow(gameObject: GameObject): void {
		this.gameObjectToFollow = gameObject;
	}

	public following(): GameObject {
		return this.gameObjectToFollow;
	}

	public update(): void {
		if (this.gameObjectToFollow) {
			let o = this.gameObjectToFollow;
			this.position = o.transform.position
		}
	}

	public inViewOf(gameObject: GameObject): boolean {
		let screenWidth = GameManager.options.screenWidth;
		let screenHeight = GameManager.options.screenHeight;
		let pos = gameObject.transform.position;
		let offset = gameObject.transform.size.scale(0.5);
		return (
			pos.x + offset.x > this.position.x - screenWidth/2 &&
			pos.y + offset.y > this.position.y - screenHeight/2 &&
			pos.x - offset.x < this.position.x + screenWidth/2 &&
			pos.y - offset.y < this.position.y + screenHeight/2
		);
	}
}
