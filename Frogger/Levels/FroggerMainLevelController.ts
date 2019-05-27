class FroggerMainLevelController extends GameObject {

	private player: FroggerPlayer = null;
	private river: FroggerRiver = null;

	private logs: FroggerLandingObject[] = [];

	public static unitHeight: number = 115;

	constructor() {
		super({
			layer: 0,
		});

		this.player = new FroggerPlayer(FroggerMainLevelController.unitHeight * 10);
		this.river = new FroggerRiver(FroggerMainLevelController.unitHeight * 10);


		let log = new FroggerLogSmall(new Vector2(this.player.transform.position.x, 0));
		log.setCollider();
		log.transform.position.y = this.river.transform.size.y*2/4;
		this.logs.push(log);

		Debug.track(this.player);
		Debug.track(this.logs[0]);

	}

	// override
	public update(): void {

	}
}
