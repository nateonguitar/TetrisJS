import Transform from "./Transform";
import Time from "./Time";

interface SpritesheetAnimationParams {
	transforms: Transform[];
	imageSrc: string;
	startIndex?: number;
	msPerFrame?: number;
	loop?: boolean;
}

export default class SpritesheetAnimation {
	public transforms: Transform[] = [];
	public imageSrc: string;
	public index: number;
	public loop: boolean;

	public msPerFrame: number = 100;
	private msSinceLastIndexChange: number = 0;

	constructor(params: SpritesheetAnimationParams) {
		this.imageSrc = params.imageSrc;
		this.transforms = params.transforms;
		this.msPerFrame = params.msPerFrame || 100;
		this.index = params.startIndex || 0;
		this.loop = params.loop === undefined ? true : params.loop;
	}

	public update(): void {
		this.msSinceLastIndexChange += Time.deltaTime;
		// example is 100 msPerFrame, 105 msSinceLastIndexChange
		if (this.msSinceLastIndexChange >= this.msPerFrame) {
			this.msSinceLastIndexChange -= this.msPerFrame;
			// now msSinceLastIndex == 5 so we don't lose some time from update latency
			this.index++;
			if (this.index >= this.transforms.length) {
				this.index = this.loop ? 0 : this.transforms.length - 1;
			}
		}
	}
}
