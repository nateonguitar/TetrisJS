class Player extends GameObject {

	private speed = 4;
	private boundarySize: Vector2 = null;

	private holdingMouse: boolean = false;
	private zWasPressed: boolean = false;

	constructor(boundarySize:Vector2) {
		super({
			layer: 2,
			imageSrc: "Zelda/Images/Link.png",
		});

		this.boundarySize = boundarySize.clone();
		this.transform.size = new Vector2(16,22).scale(2);

		this.transform.position = this.boundarySize.clone();
		this.transform.position.scale(0.5);
		this.transform.position.subtract(this.transform.size.clone().scale(0.5));

		Input.registerMouseDown(this, this.mousedown);
		Input.registerMouseUp(this, this.mouseup);
	}

	// override
	public update(): void {
		this.handleMovement();
		if (this.holdingMouse) {
			this.transform.size.x += 1;
			this.transform.size.y += 1;
		}
		if (Input.keys(Keys.Space) && this.transform.size.x > 20) {
			this.transform.size.x -= 1;
			this.transform.size.y -= 1;
		}

		// swap levels to zelda
		if (Input.keys(Keys.KeyZ)) {
			this.zWasPressed = true;
		}
		if (!Input.keys(Keys.KeyZ) && this.zWasPressed) {
			GameManager.loadLevel("Tetris");
		}
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

	private mousedown(coords:Vector2, gameObjects:GameObject[]): void {
		for (let obj of gameObjects) {
			if (obj == this) {
				this.holdingMouse = true;
			}
		}
	}

	private mouseup(coords:Vector2, gameObjects:GameObject[]): void {
		this.holdingMouse = false;
	}
}
