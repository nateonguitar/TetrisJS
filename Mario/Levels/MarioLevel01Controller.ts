class MarioLevel01Controller extends MarioLevelController {
	constructor() {
		super();
	}

	update(): void {
		this.handleCameraZoom();
	}
}
