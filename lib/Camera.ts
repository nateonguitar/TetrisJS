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

	public inViewOf(gameObject: GameObject, extraPadding:Vector2=null): boolean {
		let camSize = new Vector2(GameManager.options.screenWidth, GameManager.options.screenHeight);
		if (extraPadding) {
			camSize = camSize.add(extraPadding);
		}
		let pos = gameObject.transform.position;
		let offset = gameObject.transform.size.scale(0.5);
		return (
			pos.x + offset.x > this.position.x - camSize.x/2 &&
			pos.y + offset.y > this.position.y - camSize.y/2 &&
			pos.x - offset.x < this.position.x + camSize.x/2 &&
			pos.y - offset.y < this.position.y + camSize.y/2
		);
	}
}
