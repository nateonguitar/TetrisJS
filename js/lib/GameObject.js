class GameObject {
    constructor() {
        this.transform = new Transform();
        GameManager.registerGameObject(this);
    }
    // override this if you want anything to happen
    update() {
    }
    // override this if you want anything to happen
    draw() {
    }
}
