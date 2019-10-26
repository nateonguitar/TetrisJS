import GameObject from "./GameObject";
import Vector2 from "./Vector2";
import GameManager from "./GameManager";
import Transform from "./Transform";
import Collider from "./Collider";
import SpritesheetAnimationSet from "./SpritesheetAnimationSet";

type TextAlignType = 'center' | 'left' | 'right';

interface GameObjectParams {
	collider?: Collider;
	colliderColor?: string;

	imageBounds?: Transform;
	imageSrc?: string;
	spritesheetAnimationSet?: SpritesheetAnimationSet;

	layer?: number;

	neverSkipUpdate?: boolean;

	name?: string;

	shape?: string;
	shapeStrokeStyle?: string;
	shapeFillStyle?: string;

	transform?: Transform;
	showTransform?: boolean;

	/** text that will be drawn over the game object */
	text?: string;
	textFont?: string;
	textColor?: string;
	textAlign?: TextAlignType;
	textBold?: boolean;
	textItalic?: boolean;
}


interface HudGameObjectParams {
	gameObjectParams?: GameObjectParams;
}

/** Defaults anchor to HudAnchors.Center */
export default class HudGameObject extends GameObject {

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
