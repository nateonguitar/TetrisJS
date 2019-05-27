class FroggerMainLevelController extends GameObject {

	private player: FroggerPlayer = null;
	private river: FroggerRiver = null;

	public static unitHeight: number = 100;

	constructor() {
		super({
			layer: 0,
		});

		this.player = new FroggerPlayer(FroggerMainLevelController.unitHeight * 10);
		this.river = new FroggerRiver(FroggerMainLevelController.unitHeight * 10);
		Debug.track(this.player);

	}

	// override
	public update(): void {

	}
}
