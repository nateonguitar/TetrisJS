import { GameObject, GameObjectParams, Vector2, GameManager } from "./";

export interface HudGameObjectParams {
	gameObjectParams?: GameObjectParams;
}

/** Defaults anchor to HudAnchors.Center */
export class HudGameObject extends GameObject {

	constructor(params:HudGameObjectParams) {
		super(params.gameObjectParams || {});
		this.neverSkipUpdate = true;
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
