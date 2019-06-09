class ZeldaOverworldBackground extends GameObject {

	constructor(boundarySize: Vector2) {
		super({
			layer: 0,
			imageSrc: "Zelda/Images/Overworld.png",
		});
		this.transform.size = boundarySize.clone();
		this.transform.position = boundarySize.scale(0.5);
	}
}
