import { Collider, Vector2 } from "./";

export interface ColliderParams {
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

/**
 * A Collider positioned at (0,0) will be centered on the GameObject anchored in the center of the Collider.
 *
 * @param `position`
 * - Relative position, Vector2(0, 0.5) will shift the collider half way up the GameObject.
 *
 * @param `size`
 * - Relative size, Vector2(0, 0.5) will shrink the collider to half the size of the GameObject.
 */
export class RectCollider extends Collider {

	public size: Vector2;

	constructor(params:ColliderParams) {
		super(params);
		this.size = (params.size || new Vector2(1, 1)).clone();
	}
}
