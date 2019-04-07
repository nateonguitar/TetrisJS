class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /** Returns a Vector2 with x=0, y=0 */
    static get zero() {
        return new Vector2(0, 0);
    }
}
