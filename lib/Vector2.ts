// TODO: implement some of this functionality.  All we did was zero to start out with
//       https://gist.github.com/Dalimil/3daf2a0c531d7d030deb37a7bfeff454
class Vector2 {
	public x: number;
	public y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	/** Returns a Vector2 with x=0, y=0 */
	static get zero(): Vector2 {
		return new Vector2(0, 0);
	}
}
