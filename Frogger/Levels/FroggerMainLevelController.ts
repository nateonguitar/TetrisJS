class FroggerMainLevelController extends GameObject {

	private player: FroggerPlayer = null;
	private river: FroggerRiver = null;

	private logs: FroggerLandingObject[] = [];

	public static unitHeight: number = 115;

	constructor() {
		super({
			layer: 0,
		});

		let unitHeight = FroggerMainLevelController.unitHeight;

		this.player = new FroggerPlayer(unitHeight * 10);
		this.river = new FroggerRiver(unitHeight * 10);

		Debug.track(this.player);
		this.buildLogs();

		GameManager.camera.follow(this.player);
	}

	// override
	public update(): void {

	}

	private buildLogs(): void {
		let unitHeight = FroggerMainLevelController.unitHeight;

		for (let i=0; i<3; i++) {
			let log = new FroggerLogSmall(new Vector2(this.player.transform.position.x, 0), i.toString());
			log.transform.position.y = this.river.transform.position.y - this.river.transform.size.y/2 + unitHeight*i*2 + unitHeight*4 - log.transform.size.y/2;
			this.logs.push(log);
		}
	}
}
