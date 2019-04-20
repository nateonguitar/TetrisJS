class Background extends GameObject {

	constructor(size: Vector2) {
		super({
			layer: 0,
			imageSrc: "Zelda/Overworld.png",
		});
		this.transform.size = size;
	}
}
