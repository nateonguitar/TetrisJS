class Background extends GameObject {

	constructor(size: Vector2) {
		super({ imageSrc: "Zelda/Overworld.png" });
		this.transform.size = size;
	}
}
