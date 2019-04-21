class SpritesheetAnimationSet {
	public _currentAnimationName: string = null;
	public spritesheetAnimations: { [k in string]: SpritesheetAnimation } = {};

	public get currentAnimationName(): string {
		return this._currentAnimationName;
	}

	public set currentAnimationName(name:string) {
		this._currentAnimationName = name;
		// on swapping animations we should always start it over
		this.spritesheetAnimations[this._currentAnimationName].index = 0;
	}

	constructor(spritesheetAnimations:{ [k in string]: SpritesheetAnimation }, startAnimationName:string) {
		this.spritesheetAnimations = spritesheetAnimations;
		this._currentAnimationName = startAnimationName;
	}

	public get imageSrc(): string {
		return this.spritesheetAnimations[this._currentAnimationName].imageSrc;
	}

	public get currentAnimationTransform(): Transform {
		let currentAnimation: SpritesheetAnimation = this.spritesheetAnimations[this._currentAnimationName];
		return currentAnimation.transforms[currentAnimation.index];
	}

	public update(): void {
		if (this._currentAnimationName) {
			this.spritesheetAnimations[this._currentAnimationName].update();
		}
	}
}
