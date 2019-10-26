import Vector2 from "./Vector2";

interface ColliderParams {
	position: Vector2;
	/** size defaults to `new Vector2(1, 1)` in RectCollider */
	size: Vector2;
	/**
	 * What class names do we allow to pass through.
	 * Null whitelist means we allow everything to pass through.
	 * Empty whitelist means we allow nothing to pass through.
	 */
	allowPassThroughWhitelist?: any[];
}

export default class Collider {
	public position: Vector2;
	public allowPassThroughWhitelist: any[] = null;

	constructor(params:ColliderParams) {
		this.position = params.position.clone();

		if ((params.allowPassThroughWhitelist || []).length) {
			this.allowPassThroughWhitelist = params.allowPassThroughWhitelist;
		}
	}
}
