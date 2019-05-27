class ZeldaOverworldController extends GameObject {
	private player: ZeldaPlayer = null;
	private background: ZeldaOverworldBackground = null;

	private enemies: ZeldaSoldier[] = [];

	constructor() {
		super({
			layer: 0
		});

		let boundarySize = new Vector2(
			GameManager.options.screenWidth * 2,
			GameManager.options.screenHeight * 2
		);
		GameManager.camera.position = boundarySize.scale(0.5);

		this.background = new ZeldaOverworldBackground(boundarySize);

		this.player = new ZeldaPlayer(boundarySize);

		// camera follow
		GameManager.camera.follow(this.player);

		for (let i=0; i<30; i++) {
			this.enemies.push(new ZeldaSoldierGreen(boundarySize));
			this.enemies.push(new ZeldaSoldierBlue(boundarySize));
		}

		Debug.track(this.player);
	}

	public update() {

	}
}
