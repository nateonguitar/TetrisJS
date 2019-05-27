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

		this.buildLogs();

		Debug.track(this.player);
		Debug.track(this.logs[0]);
	}

	// override
	public update(): void {

	}

	private buildLogs(): void {
		let unitHeight = FroggerMainLevelController.unitHeight;
		let log1 = new FroggerLogSmall(new Vector2(this.player.transform.position.x, 0));
		log1.transform.position.y = this.river.transform.position.y + unitHeight*6 - log1.transform.size.y/2;
		this.logs.push(log1);

		let log2 = new FroggerLogSmall(new Vector2(this.player.transform.position.x, 0));
		log2.transform.position.y = this.river.transform.position.y + unitHeight*8 - log2.transform.size.y/2;
		this.logs.push(log2);

		for (let l of this.logs) {
			l.setCollider();
		}
	}
}
