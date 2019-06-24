class StressTestSquare extends GameObject {

	private speedX: number = (1 + Math.random()) / 10;
	private speedY: number = (1 + Math.random()) / 10;

	private useImage: boolean = false;

	// overrides
	public shapeFillStyle: string = '#';
	public shape: string = 'rectangle';

	constructor(imageSrc: string = null) {
		super({ imageSrc: imageSrc });

		if (imageSrc) {
			this.imageSrc = imageSrc;
			this.transform.size = new Vector2(13, 18).scale(1 + Math.random() * 3);
		}
		else {
			this.transform.size = new Vector2(1, 1).scale(3 + Math.random() * 3);
			// set random color
			let allowedColorChars: string = '0123456789abcdef';
			for (let i=0; i<6; i++) {
				let randomCharIndex: number = Math.floor(Math.random() * 16);
				this.shapeFillStyle += allowedColorChars.charAt(randomCharIndex);
			}
		}
	}

	// override
	public update(): void {
		let options = GameManager.options;
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
}
