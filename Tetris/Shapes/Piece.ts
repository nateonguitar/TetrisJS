class Piece extends GameObject {

	// GameObject overrides
	public arrangement: boolean[][] = [];
	public layer: number = 1;

	// class speicific
	protected innerColor: string = '#aaaaaa';
	protected outerColor: string = '#000000';
	protected movingDown: boolean = true;

	constructor() {
		super();
	}

	// overriding GameObject's update()
	public update(): void {
		this.transform.position.y += 0.1;
	}

	public draw(): void {
		for (let i = 0; i < this.arrangement.length; i++) {
			for (let j = 0; j < this.arrangement[i].length; j++) {
				if (!this.arrangement[i][j]) continue;
				let t = this.transform;
				let s = t.size;
				let p = t.position.clone();
				p.x += j;
				p.y += i;
				Canvas.strokeRect(p, s, this.outerColor);
				Canvas.fillRect(p, s, this.innerColor);
			}
		}
	}
}
