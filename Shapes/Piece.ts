class Piece extends GameObject {

	public arrangement: boolean[][] = [];
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
		GameManager.context.lineWidth = 1;
		GameManager.context.strokeStyle = this.outerColor;
		GameManager.context.fillStyle = this.innerColor;
		for (let i = 0; i < this.arrangement.length; i++) {
			for (let j = 0; j < this.arrangement[i].length; j++) {
				if (!this.arrangement[i][j]) continue;

				GameManager.context.strokeRect(
					this.transform.position.x + this.transform.size.x * j,
					this.transform.position.y + this.transform.size.y * i,
					this.transform.size.x,
					this.transform.size.y
				);
				GameManager.context.fillRect(
					this.transform.position.x + 1 + this.transform.size.x * j,
					this.transform.position.y + 1 + this.transform.size.y * i,
					this.transform.size.x - 2,
					this.transform.size.y - 2
				);
			}
		}
	}
}
