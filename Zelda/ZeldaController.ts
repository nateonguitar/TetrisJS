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
		GameManager.camera.position = boundarySize.clone().scale(0.5);

		this.background = new Background(boundarySize);

		for (let i=0; i<50; i++) {
			this.enemies.push(new Soldier(boundarySize));
		}
		this.player = new Player(boundarySize);

		// camera follow
		// GameManager.camera.follow(this.enemies[0]);
		GameManager.camera.follow(this.player);
	}

	public update() {

	}
}
