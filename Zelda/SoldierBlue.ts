class SoldierBlue extends Soldier {

	constructor(boundarySize:Vector2) {
		super();
		this.imageSrc = "Zelda/SoldierBlue.png";
		this.boundarySize = boundarySize.clone();
		this.init();
	}
}
