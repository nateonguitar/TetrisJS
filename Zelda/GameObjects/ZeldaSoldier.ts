class ZeldaSoldier extends GameObject {
	protected speedX: number = 0;
	protected speedY: number = 0;

	protected boundarySize: Vector2;

	constructor() {
		super({
			layer: 1,
		});
	}

	protected init(): void {
		this.setRandomDirection();

		this.transform.size = new Vector2(13, 18).scale(3 + Math.random());

		this.transform.position = new Vector2(
			Math.random() * (this.boundarySize.x - this.transform.size.x),
			Math.random() * (this.boundarySize.y - this.transform.size.y),
		);

		this.setDefaultCollider();
	}

	// override
	public update(): void {
		this.handleMovement();
	}

	protected setRandomDirection(): void {
		this.speedX = (-0.5 + Math.random()) / 3;
		this.speedY = (-0.5 + Math.random()) / 3;
	}

	protected handleMovement(): void {
		let p = this.transform.position;
		let s = this.transform.size;
		p.x += this.speedX * Time.deltaTime;
		p.y += this.speedY * Time.deltaTime;

		// left
		if (p.x < 0) {
			this.speedX *= -1;
			p.x = 0;
		}
		// top
		if (p.y < 0) {
			this.speedY *= -1;
			p.y = 0;
		}

		if (this.boundarySize) {
			// right
			if (p.x > this.boundarySize.x - s.x) {
				this.speedX *= -1;
				p.x = this.boundarySize.x - s.x;
			}
			// bottom
			if (p.y > this.boundarySize.y - s.y) {
				this.speedY *= -1;
				p.y = this.boundarySize.y - s.y;
			}
		}
	}
}
