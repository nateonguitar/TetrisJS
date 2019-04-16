class Tree extends GameObject {

	private boundarySize;

	private imageShifts = {
		perDirection: 120,
		shifts: 0,
		direction: 1,
		speed: 1,
	};

	constructor(boundarySize:Vector2) {
		super({
			layer: 3,
			imageSrc: "Zelda/Overworld.png",
		});

		this.boundarySize = boundarySize.clone();
		this.transform.size = new Vector2(16,22).scale(4);

		this.transform.position = this.boundarySize.clone();
		this.transform.position.scale(0.5);
		this.transform.position.subtract(this.transform.size.clone().scale(0.5));
		this.transform.position.add(this.transform.size);

		this.imageSprite = {
			x: 0,
			y: 0,
			width: this.transform.size.x/2,
			height: this.transform.size.y/2
		}
	}

	// override
	public update(): void {
		this.imageSprite.x += this.imageShifts.speed * this.imageShifts.direction;
		this.imageSprite.y += this.imageShifts.speed/2 * this.imageShifts.direction;
		this.imageShifts.shifts++;
		if (this.imageShifts.shifts > this.imageShifts.perDirection) {
			this.imageShifts.shifts = 0;
			this.imageShifts.direction *= -1;
		}
	}
}
