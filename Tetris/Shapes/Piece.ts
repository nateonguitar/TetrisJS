class Piece extends GameObject {

	// GameObject overrides
	public arrangement: boolean[][] = [];
	public layer: number = 1;

	// class speicific
	protected innerColor: string = '#aaaaaa';
	protected outerColor: string = '#000000';
	protected movingDown: boolean = true;

	static get size(): number { return 25; }

	constructor() {
		super();
		this.transform.size = new Vector2(Piece.size, Piece.size);
	}

	// overriding GameObject's update()
	public update(): void {
		this.transform.position.y += 3;
	}

	public draw(): void {
		this.drawPart();
	}

	protected drawPart(): void {
		Canvas.setLineWidth(1);
		Canvas.setStrokeStyle(this.outerColor);
		for (let i = 0; i < this.arrangement.length; i++) {
			for (let j = 0; j < this.arrangement[i].length; j++) {
				if (!this.arrangement[i][j]) continue;

				Canvas.strokeRect(
					new Vector2(
						this.transform.position.x + this.transform.size.x * j,
						this.transform.position.y + this.transform.size.y * i
					),
					new Vector2(
						this.transform.size.x,
						this.transform.size.y
					),
					this.innerColor
				);
				Canvas.fillRect(
					new Vector2(
						this.transform.position.x + 1 + this.transform.size.x * j,
						this.transform.position.y + 1 + this.transform.size.y * i
					),
					new Vector2(
						this.transform.size.x - 2,
						this.transform.size.y - 2
					),
					this.innerColor
				);
			}
		}
	}
}
