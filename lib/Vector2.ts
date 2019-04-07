class Vector2 {
    public x: number;
    public y: number;

    constructor(x: number, y:number) {
        this.x = x;
        this.y = y;
    }

    /** Returns a Vector2 with x=0, y=0 */
    static get zero(): Vector2 {
        return new Vector2(0, 0);
    }
}