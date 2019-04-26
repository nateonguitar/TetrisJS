class SpritesheetAnimation {
	public transforms: Transform[] = [];
	public imageSrc: string;
	public index: number = 0;

	public msPerFrame: number = 100;
	private msSinceLastIndexChange: number = 0;

	constructor(
		imageSrc: string,
		transforms: Transform[],
		msPerFrame: number = 100
	) {
		this.imageSrc = imageSrc;
		this.transforms = transforms;
		this.msPerFrame = msPerFrame;
	}

	public update(): void {
		this.msSinceLastIndexChange += Time.deltaTime;
		// example is 100 msPerFrame, 105 msSinceLastIndexChange
		if (this.msSinceLastIndexChange >= this.msPerFrame) {
			this.msSinceLastIndexChange -= this.msPerFrame;
			// now msSinceLastIndex == 5 so we don't lose some time from update latency
			this.index++;
			if (this.index >= this.transforms.length) {
				this.index = 0;
			}
		}
	}
}
