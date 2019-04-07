// TODO: implement some of functionality.  All we did was zero to start out with
//       https://gist.github.com/Dalimil/3daf2a0c531d7d030deb37a7bfeff454
class Vector2 {
	public x: number;
	public y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	static get zero(): Vector2 {
		return new Vector2(0, 0);
	}

	public clone(): Vector2 {
		return new Vector2(this.x, this.y)
	}

	public add(vector) {
		return new Vector2(this.x + vector.x, this.y + vector.y);
	}

	public subtract(vector) {
		return new Vector2(this.x - vector.x, this.y - vector.y);
	}

	public scale(scalar) {
		return new Vector2(this.x * scalar, this.y * scalar);
	}

	public dot(vector) {
		return (this.x * vector.x + this.y + vector.y);
	}

	public moveTowards(vector, t) {
		t = Math.min(t, 1);
		var diff = vector.subtract(this);
		return this.add(diff.scale(t));
	}

	public magnitude() {
		return Math.sqrt(this.magnitudeSqr());
	}

	public magnitudeSqr() {
		return (this.x * this.x + this.y * this.y);
	}

	public distance(vector) {
		return Math.sqrt(this.distanceSqr(vector));
	}

	public distanceSqr(vector) {
		var deltaX = this.x - vector.x;
		var deltaY = this.y - vector.y;
		return (deltaX * deltaX + deltaY * deltaY);
	}

	public normalize() {
		var mag = this.magnitude();
		var vector = this.clone();
		if (Math.abs(mag) < 1e-9) {
			vector.x = 0;
			vector.y = 0;
		} else {
			vector.x /= mag;
			vector.y /= mag;
		}
		return vector;
	}

	public angle() {
		return Math.atan2(this.y, this.x);
	}

	public rotate(alpha) {
		var cos = Math.cos(alpha);
		var sin = Math.sin(alpha);
		var vector = new Vector2(0, 0);
		vector.x = this.x * cos - this.y * sin;
		vector.y = this.x * sin + this.y * cos;
		return vector;
	}

	public toString() {
		return ("[" + this.x + "; " + this.y + "]");
	}
}
