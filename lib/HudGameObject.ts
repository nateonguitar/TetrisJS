enum HudAnchors {
	Center,
	TopLeft,
	TopCenter,
	TopRight,
	RightCenter,
	BottomRight,
	BottomCenter,
	BottomLeft,
	LeftCenter
}

interface HudGameObjectParams {
	gameObjectParams?: GameObjectParams;
	anchor?: HudAnchors;
}

/** Defaults anchor to HudAnchors.Center */
class HudGameObject extends GameObject {

	public anchor: HudAnchors;

	constructor(params:HudGameObjectParams) {
		super(params.gameObjectParams || {});
		this.neverSkipUpdate = true;
		this.anchor = params.anchor || HudAnchors.Center;
	}

	public getHudDrawPosition(): Vector2 {
		return this.transform.position.scale(this.unitSize);
	}

	/** Overridden from GameObject */
	public get absoluteSize(): Vector2 { return this.transform.size.scale(this.unitSize); }

	/** Overridden from GameObject */
	public get absolutePosition(): Vector2 { return this.transform.position.scale(this.unitSize); }

	/** Overridden from GameObject */
	public get unitSize(): number { return GameManager.hudUnitSize; }
}
