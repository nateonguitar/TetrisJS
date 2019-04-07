class Piece extends GameObject {
    constructor() {
        super();
        this.arrangement = [];
        this.innerColor = '#aaaaaa';
        this.outerColor = '#000000';
        this.movingDown = true;
        this.transform.size = new Vector2(Piece.size, Piece.size);
    }
    static get size() { return 25; }
    // overriding GameObject's update()
    update() {
        this.transform.position.y += 1;
    }
    draw() {
        this.drawPart();
    }
    drawPart() {
        GameManager.context.lineWidth = 1;
        GameManager.context.strokeStyle = this.outerColor;
        GameManager.context.fillStyle = this.innerColor;
        for (let i = 0; i < this.arrangement.length; i++) {
            for (let j = 0; j < this.arrangement[i].length; j++) {
                if (!this.arrangement[i][j])
                    continue;
                GameManager.context.strokeRect(this.transform.position.x + this.transform.size.x * j, this.transform.position.y + this.transform.size.y * i, this.transform.size.x, this.transform.size.y);
                GameManager.context.fillRect(this.transform.position.x + 1 + this.transform.size.x * j, this.transform.position.y + 1 + this.transform.size.y * i, this.transform.size.x - 2, this.transform.size.y - 2);
            }
        }
    }
}
