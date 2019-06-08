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
			this.position = this.gameObjectToFollow.transform.position.clone();
		}
	}

	public inViewOfGameObject(gameObject: GameObject, extraPadding:Vector2=null): boolean {
		return this.inViewOf(gameObject.transform.position, gameObject.transform.size, extraPadding);
	}

	public inViewOf(position: Vector2, size: Vector2, extraPadding:Vector2=null): boolean {
		let camSize = GameManager.screenSize.clone();
		if (extraPadding) {
			camSize = camSize.add(extraPadding);
		}
		let offset = size.scale(0.5);
		return (
			position.x + offset.x > this.position.x - camSize.x/2 &&
			position.y + offset.y > this.position.y - camSize.y/2 &&
			position.x - offset.x < this.position.x + camSize.x/2 &&
			position.y - offset.y < this.position.y + camSize.y/2
		);
	}

	public relativePosition(v: Vector2): Vector2 {
		return v.subtract(this.position);
	}
}
