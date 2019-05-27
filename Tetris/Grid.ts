class Grid extends GameObject {
	// override
	public layer: number = 0;

	constructor() {
		super();
		let o = GameManager.options;
		this.transform.size = new Vector2(o.screenWidth, o.screenHeight);
		GameManager.camera.follow(this);
	}

	// override
	public update(): void {

	}

	// override
	public draw(): void {
		let size: number = 25;
		Canvas.setStrokeStyle("#aaaaaa");
		// NOTE: pieces are 25 wide and 25 tall
		for (let i=0; i<this.transform.size.y; i+=size) {
			for (let j=0; j<this.transform.size.x; j+=size) {
				Canvas.strokeRect(j, i, size, size);
			}
		}
	}
}
