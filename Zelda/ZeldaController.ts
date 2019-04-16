class ZeldaController extends GameObject {
	private player: Player = null;
	private background: Background = null;
	private enemies: Soldier[] = [];

	private tree: Tree = null;

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

		for (let i=0; i<50; i++) {
			this.enemies.push(new Soldier(boundarySize));
		}

		this.player = new Player(boundarySize);

		this.tree = new Tree(boundarySize);

		// camera follow
		// GameManager.camera.follow(this.enemies[0]);
		GameManager.camera.follow(this.player);


	}

	public update() {

	}
}
