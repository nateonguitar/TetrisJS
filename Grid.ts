class Grid extends GameObject {
	// override
	protected layer: number = 0;

	constructor() {
		super();
		this.transform.size = new Vector2(GameManager.getOptions().screenWidth, GameManager.getOptions().screenHeight);
	}

	// override
	public update(): void {

	}

	// override
	public draw(): void {
		let size: number = 25;
		GameManager.context.strokeStyle = "#aaaaaa";
		// NOTE: pieces are 25 wide and 25 tall
		for (let i=0; i<this.transform.size.y; i+=size) {
			for (let j=0; j<this.transform.size.x; j+=size) {
				GameManager.context.strokeRect(j, i, size, size);
			}
		}
	}
}
