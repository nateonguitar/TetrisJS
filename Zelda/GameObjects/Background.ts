class Background extends GameObject {

	constructor(boundarySize: Vector2) {
		super({
			layer: 0,
			imageSrc: "Zelda/Images/Overworld.png",
		});
		this.transform.size = boundarySize.clone();
		this.transform.position = this.transform.size.scale(0.5);
	}
}
