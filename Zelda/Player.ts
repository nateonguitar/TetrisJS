class Player extends GameObject {

	private speed = 4;
	private boundarySize: Vector2 = null;

	constructor(boundarySize:Vector2) {
		super({
			layer: 2,
			imageSrc: "Zelda/Link.png",
		});

		this.boundarySize = boundarySize.clone();
		this.transform.size = new Vector2(16,22).scale(2);

		this.transform.position = this.boundarySize.clone();
		this.transform.position.scale(0.5);
		this.transform.position.subtract(this.transform.size.clone().scale(0.5));
	}

	// override
	public update(): void {
		this.handleMovement();
	}

	private handleMovement(): void {
		// don't allow repeat moves, have to press the button again
		// left
		let p = this.transform.position;
		if (Input.keys(Keys.ArrowLeft)) {
			p.x -= this.speed;
		}
		// right
		if (Input.keys(Keys.ArrowRight)) {
			p.x += this.speed;
		}
		// up
		if (Input.keys(Keys.ArrowUp)) {
			p.y -= this.speed;
		}
		// up
		if (Input.keys(Keys.ArrowDown)) {
			p.y += this.speed;
		}

		if (this.transform.position.x < 0) {
			this.transform.position.x = 0;
		}
		if (this.transform.position.y < 0) {
			this.transform.position.y = 0;
		}
		if (this.transform.position.x > this.boundarySize.x - this.transform.size.x) {
			this.transform.position.x = this.boundarySize.x - this.transform.size.x;
		}
		if (this.transform.position.y > this.boundarySize.y - this.transform.size.y) {
			this.transform.position.y = this.boundarySize.y - this.transform.size.y;
		}
	}
}
