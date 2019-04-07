/** GM stands for GameManager */
class GameManager {
    static get Keys() {
        const k = {
            UP: GameManager._up,
            DOWN: GameManager._down,
            LEFT: GameManager._left,
            RIGHT: GameManager._right,
        };
        return k;
    }
    static get time() { return GameManager._time; }
    static get getOptions() { return GameManager._options; }
    static start(options = {}) {
        for (let key in options) {
            this._options[key] = options[key];
        }
        document.onkeydown = GameManager.getKeyDown;
        document.onkeyup = GameManager.getKeyUp;
        document.addEventListener('DOMContentLoaded', () => GameManager.gameLauncher(), false);
    }
    static registerGameObject(gameObject) {
        this._gameObjects.push(gameObject);
    }
    /** Anything we want to start before we run the main loop */
    static gameLauncher() {
        // create the canvas
        this._canvas = document.createElement("canvas");
        this._canvas.classList.add("canvas");
        this._canvas.width = this._options.screenWidth;
        this._canvas.height = this._options.screenHeight;
        document.body.appendChild(this._canvas);
        this.context = this._canvas.getContext("2d");
        this.context.shadowBlur = 0;
        // calling update once will start it infinitely running
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    /** main game loop */
    static gameLoop(frame = null) {
        requestAnimationFrame(this.gameLoop.bind(this));
        let currentTime = (new Date()).getTime();
        this.deltaTime = currentTime - this._time;
        this._time = currentTime;
        this.update();
        this.draw();
    }
    static update() {
        for (let gameObject of this._gameObjects) {
            gameObject.update();
        }
    }
    static draw() {
        this.context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        for (let gameObject of this._gameObjects) {
            gameObject.draw();
        }
    }
    static isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
    static fps() {
        return 1000 / this.deltaTime;
    }
    static getKeyDown(e) {
        e = e || window.event;
        if (e.keyCode == '38') {
            GameManager._up = true;
        }
        if (e.keyCode == '40') {
            GameManager._down = true;
        }
        if (e.keyCode == '37') {
            GameManager._left = true;
        }
        if (e.keyCode == '39') {
            GameManager._right = true;
        }
    }
    static getKeyUp(e) {
        e = e || window.event;
        if (e.keyCode == '38') {
            GameManager._up = false;
        }
        if (e.keyCode == '40') {
            GameManager._down = false;
        }
        if (e.keyCode == '37') {
            GameManager._left = false;
        }
        if (e.keyCode == '39') {
            GameManager._right = false;
        }
    }
}
GameManager.deltaTime = 0;
GameManager._time = 0;
GameManager._canvas = null;
GameManager.context = null;
GameManager._gameObjects = [];
GameManager._up = false;
GameManager._down = false;
GameManager._left = false;
GameManager._right = false;
GameManager._options = {
    screenWidth: 50,
    screenHeight: 50,
};
