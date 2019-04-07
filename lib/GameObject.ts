class GameObject {

	public transform: Transform = new Transform();

	constructor() {
		// TODO: Come up with a way to remove game objects,
		//       we need to remove all references to make JavaScripts garbage collector work properly.
		GameManager.registerGameObject(this);
	}

	// override this if you want anything to happen
	public update(): void {

	}

	// override this if you want anything to happen
	public draw(): void {

	}
}
