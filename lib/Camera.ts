class Camera {
	private _position: Vector2 = null;

	private gameObjectToFollow: GameObject = null;

	constructor() {
		this._position = Vector2.zero;
	}

	public follow(gameObject: GameObject): void {
		this.gameObjectToFollow = gameObject;
	}

	public get position(): Vector2 {
		return this._position;
	}

	public update(): void {
		if (this.gameObjectToFollow) {
			let go = this.gameObjectToFollow;
			this._position.x = -go.transform.position.x - go.transform.size.x/2;
			this._position.y = -go.transform.position.y - go.transform.size.y/2;
		}
	}
}
