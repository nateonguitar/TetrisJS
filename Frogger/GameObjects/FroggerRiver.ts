class FroggerRiver extends GameObject {

	private blue: string     = "#003388";
	private darkBlue: string = "#002244";
	private brown: string    = "#654321";
	private black: string    = "#000000";

	constructor(levelHeight:number) {
		super({layer: 0});
		let o = GameManager.options;
		this.transform.size = new Vector2(o.screenWidth, levelHeight);
	}

	public draw(): void {

		// draw river water
		Canvas.setFillStyle(this.blue);
		Canvas.fillRect(0, 0, this.transform.size.x, this.transform.size.y);

		// draw banks
		Canvas.setFillStyle(this.brown);
		Canvas.fillRect(0, 0, this.transform.size.x, FroggerMainLevelController.unitHeight);
		let bank2TopLeft = new Vector2(0, this.transform.size.y - FroggerMainLevelController.unitHeight);
		let bank2Size = new Vector2(this.transform.size.x, FroggerMainLevelController.unitHeight);
		Canvas.fillRect(bank2TopLeft.x, bank2TopLeft.y, bank2Size.x, bank2Size.y);

		Canvas.setFillStyle(this.darkBlue);
		let unitHeight = FroggerMainLevelController.unitHeight;
		let numUnits = Math.floor(this.transform.size.y / unitHeight);
		for (let i=0; i<numUnits; i++) {
			Canvas.fillRect(
				0,
				i*unitHeight,
				this.transform.size.x,
				2
			);
		}
	}
}
