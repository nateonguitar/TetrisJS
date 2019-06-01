/**
 * A Collider positioned at (0,0) will be centered on the GameObject anchored in the center of the Collider.
 *
 * @param `position`
 * - Relative position, Vector2(0, 0.5) will shift the collider half way up the GameObject.
 *
 * @param `size`
 * - Relative size, Vector2(0, 0.5) will shrink the collider to half the size of the GameObject.
 */
class SquareCollider extends Collider {

	constructor(position: Vector2, size: Vector2) {
		super();
		this.position = position.clone();
		this.size = size.clone();
	}
}
