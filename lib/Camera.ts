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
}
