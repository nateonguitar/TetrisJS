class Camera {
	private _position: Vector2 = null;

	private gameObjectToFollow: GameObject = null;

	constructor() {
		this._position = Vector2.zero;
	}

	public follow(gameObject: GameObject): void {
		this.gameObjectToFollow = gameObject;
	}

	public set position(pos:Vector2) {
		this._position = pos.clone();
	}

	public get position(): Vector2 {
		return this._position.clone();
	}

	public update(): void {
		if (this.gameObjectToFollow) {
			let o = this.gameObjectToFollow;
			this._position = o.transform.position.clone();
			this._position.add(o.transform.size.clone().scale(0.5));
		}
	}
}
