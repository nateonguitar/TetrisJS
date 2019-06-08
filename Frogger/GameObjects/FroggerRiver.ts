class FroggerRiver extends GameObject {

	private blue: string     = "#003388";
	private darkBlue: string = "#002244";
	private hunkSize: Vector2 = new Vector2(this.transform.size.x, FroggerMainLevelController.unitHeight);
	private topBank: FroggerRiverBank = null;
	private bottomBank: FroggerRiverBank = null;

	constructor(levelHeight:number) {
		super({layer: 0});
		let screenSize = GameManager.screenSize;
		this.transform.size = new Vector2(screenSize.x, levelHeight);
		this.transform.position = this.transform.size.scale(0.5);
		this.topBank = new FroggerRiverBank();
		this.bottomBank = new FroggerRiverBank();

		this.topBank.transform.position.x = screenSize.x/2;
		this.topBank.transform.position.y += this.hunkSize.y/2;


		this.bottomBank.transform.position = new Vector2(
			screenSize.x/2,
			levelHeight - this.hunkSize.y/2
		);
	}

	public draw(): void {
		let t = this.transform;
		let p = t.position;
		let s = t.size;

		// draw river water
		Canvas.fillRect(p, s, this.blue);

		// draw separator lines
		let numUnits = Math.floor(this.transform.size.y / this.hunkSize.y);
		for (let i=0; i<numUnits; i++) {
			Canvas.fillRect(
				new Vector2(t.size.x/2, i*this.hunkSize.y),
				new Vector2(this.transform.size.x, 2),
				this.darkBlue
			);
		}
	}
}
