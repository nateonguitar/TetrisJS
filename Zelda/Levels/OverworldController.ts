class OverworldController extends GameObject {
	private player: Player = null;
	private background: Background = null;

	private enemies: Soldier[] = [];

	constructor() {
		super({
			layer: 0
		});

		let boundarySize = new Vector2(
			GameManager.options.screenWidth * 2,
			GameManager.options.screenHeight * 2
		);
		GameManager.camera.position = boundarySize.clone().scale(0.5);

		this.background = new Background(boundarySize);

		this.player = new Player(boundarySize);

		// camera follow
		GameManager.camera.follow(this.player);

		for (let i=0; i<250; i++) {
			this.enemies.push(new SoldierBlue(boundarySize));
			this.enemies.push(new SoldierGreen(boundarySize));
		}
	}

	public update() {

	}
}
