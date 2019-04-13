class TestCube extends GameObject {

	private color: string = '#';

	private speedX: number = (1 + Math.random()) / 10;
	private speedY: number = (1 + Math.random()) / 10;

	private image: any = null;

	private useimage: boolean = false;

	constructor() {
		super();

		if (this.useimage) {
			this.transform.size = new Vector2(13, 18).scale(1 + Math.random() * 3);
			this.image = new Image;
			this.image.src = "mario.png";
		}
		else {
			this.transform.size = new Vector2(1, 1).scale(3 + Math.random() * 3);
			// set random color
			let allowedColorChars: string = '0123456789abcdef';
			for (let i=0; i<6; i++) {
				let randomCharIndex: number = Math.floor(Math.random() * 16);
				this.color += allowedColorChars.charAt(randomCharIndex);
			}
		}
	}

	// override
	public update(): void {
		let options = GameManager.getOptions();
		let p = this.transform.position;
		let s = this.transform.size;
		p.x += this.speedX * Time.deltaTime;
		p.y += this.speedY * Time.deltaTime;


		// collisions with the sides ofthe game window
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
		// right
		if (p.x > options.screenWidth - s.x) {
			this.speedX *= -1;
			p.x = options.screenWidth - s.x;
		}
		// bottom
		if (p.y > options.screenHeight - s.y) {
			this.speedY *= -1;
			p.y = options.screenHeight - s.y;
		}
	}

	// override
	public draw(): void {
		GameManager.context.fillStyle = this.color;
		let p = this.transform.position;
		let s = this.transform.size;

		if (this.useimage) {
			GameManager.context.drawImage(this.image, p.x, p.y, s.x, s.y);
		}
		else {
			GameManager.context.fillRect(p.x, p.y, s.x, s.y);
		}
	}
}
