class ZeldaController extends GameObject {

	private player: Player = null;
	private background: Background = null;
	public enemies: Soldier[] = [];

	public layer = 0;

	constructor() {
		super();
		let boundarySize = new Vector2(
			GameManager.options.screenWidth * 2,
			GameManager.options.screenHeight * 2
		);
		this.background = new Background(boundarySize);
		this.player = new Player(boundarySize);

		for (let i=0; i<50; i++) {
			this.enemies.push(new Soldier(boundarySize));
		}
		GameManager.camera.setPosition(boundarySize.clone().scale(0.5));
	}

	public update() {

	}
}
