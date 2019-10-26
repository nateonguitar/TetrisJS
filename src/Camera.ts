import Vector2 from "./Vector2";
import GameObject from "./GameObject";
import GameManager from "./GameManager";
import HudGameObject from "./HudGameObject";

export default class Camera {
	private _worldspacePosition: Vector2 = null;
	private _previousWorldspacePosition: Vector2 = null;

	private gameObjectToFollow: GameObject = null;

	constructor() {
		this._worldspacePosition = Vector2.zero;
	}


	public get worldspacePosition(): Vector2 {
		return this._worldspacePosition.clone();
	}

	public set worldspacePosition(position: Vector2) {
		this._worldspacePosition = position.clone().scale(GameManager.currentLevel.unitSize);
	}

	public follow(gameObject: GameObject): void {
		this.gameObjectToFollow = gameObject;
	}

	public following(): GameObject {
		return this.gameObjectToFollow;
	}

	public update(): void {
		if (this.gameObjectToFollow) {
			this._worldspacePosition = this.gameObjectToFollow.absolutePosition;
		}


		// record the current worldspace position case we resize the current level's unitSize.  Without this the camera feels like it shifts weird
		// because it stays in the same absolute position but the rest of the world resizes.
		else if (this._previousWorldspacePosition) {
			this._worldspacePosition = this._previousWorldspacePosition.scale(GameManager.currentLevel.unitSize);
		}
		this._previousWorldspacePosition = this._worldspacePosition.scale(1/GameManager.currentLevel.unitSize);
	}

	/** returns true if gameObject instanceof HudGameObject */
	public inViewOfGameObject(gameObject: GameObject, extraPadding:Vector2=null): boolean {
		if (gameObject instanceof HudGameObject) {
			return true;
		}
		return this.inViewOf(gameObject.absolutePosition, gameObject.absoluteSize, extraPadding);
	}

	public inViewOf(position: Vector2, size: Vector2, extraPadding:Vector2=null): boolean {
		let camSize = GameManager.screenSize.clone();
		if (extraPadding) {
			camSize = camSize.add(extraPadding);
		}
		let offset = size.scale(0.5);
		return (
			position.x + offset.x > this._worldspacePosition.x - camSize.x/2 &&
			position.y + offset.y > this._worldspacePosition.y - camSize.y/2 &&
			position.x - offset.x < this._worldspacePosition.x + camSize.x/2 &&
			position.y - offset.y < this._worldspacePosition.y + camSize.y/2
		);
	}

	public relativeWorldspacePosition(v: Vector2): Vector2 {
		return v.subtract(this._worldspacePosition);
	}
}
