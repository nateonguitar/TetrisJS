class Player extends GameObject {

	public layer = 2;

	private speed = 3;

	constructor(boundarySize:Vector2) {
		super({imageSrc: "Zelda/Link.png"});
		this.transform.size = new Vector2(16,22).scale(2);
		this.transform.position = new Vector2(
			boundarySize.x/2 - this.transform.size.x / 2,
			boundarySize.y/2 - this.transform.size.y / 2
		);
		GameManager.camera.follow(this);
	}

	// override
	public update(): void {
		this.handleMovement();
	}

	private handleMovement(): void {
		// don't allow repeat moves, have to press the button again
		// left
		if (Input.keys(Keys.ArrowLeft)) {
			this.transform.position.x -= this.speed;
		}
		// right
		if (Input.keys(Keys.ArrowRight)) {
			this.transform.position.x += this.speed;
		}
		// up
		if (Input.keys(Keys.ArrowUp)) {
			this.transform.position.y -= this.speed;
		}
		// up
		if (Input.keys(Keys.ArrowDown)) {
			this.transform.position.y += this.speed;
		}
	}
}
