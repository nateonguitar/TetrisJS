class GameObject {

    public transform: Transform = new Transform();

    constructor() {
        GameManager.registerGameObject(this);
    }

    // override this if you want anything to happen
    public update(): void {

    }

    // override this if you want anything to happen
    public draw(): void {

    }
}