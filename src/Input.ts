import {Vector2, Canvas, GameObject, GameManager, Keys } from './';

export class Input {
	private static _keyDowns: { [key:string]:boolean } = {}

	private static mousedownListeners: Function[] = [];
	private static mouseupListeners: Function[] = [];
	private static mousePos: Vector2 = Vector2.zero;

	public static init(): void {
		document.onkeydown = Input.getKeyDown;
		document.onkeyup = Input.getKeyUp;
		for (let c of [Canvas.gameCanvas]) {
			c.addEventListener('mousedown', this.mousedown);
			c.addEventListener('mouseup', this.mouseup);
			c.addEventListener('mousemove', this.mousemove);
		}
	}

	private static mousedown(event:MouseEvent): void {
		Input.mouseUpOrDown(event, Input.mousedownListeners);
	}

	private static mouseup(event:MouseEvent): void {
		Input.mouseUpOrDown(event, Input.mouseupListeners);
	}

	private static mousemove(event:MouseEvent): void {
		Input.mousePos = new Vector2((<any>event).layerX, (<any>event).layerY);
	}

	private static mouseUpOrDown(event:MouseEvent, listeners:Function[]): void {
		let clickPos = this.getAbsoluteClickPosition(event);
		for (let i=0; i<listeners.length; i++) {
			let clickedObjects: GameObject[] = GameManager.currentLevel.gameObjects.filter(obj => {
				let size = obj.absoluteSize;
				let pos = obj.absolutePosition.subtract(size.scale(0.5));
				if (
					clickPos.x >= pos.x &&
					clickPos.y >= pos.y &&
					clickPos.x <= pos.x + size.x &&
					clickPos.y <= pos.y + size.y
				) {
					return true;
				}
				return false;
			});
			listeners[i](clickPos, clickedObjects);
		}
	}

	public static getAbsoluteClickPosition(event:MouseEvent): Vector2 {
		let screenSize = GameManager.screenSize.clone();
		let clickPos = new Vector2((<any>event).layerX, (<any>event).layerY);
		let cameraPos = GameManager.camera.worldspacePosition;

		// shift for camera positioning
		return clickPos.add(cameraPos).subtract(screenSize.scale(0.5));
	}

	public static getWorldspaceMousePosition(): Vector2 {
		return Input.mousePos
			.add(GameManager.camera.worldspacePosition)
			.subtract(GameManager.screenSize.scale(0.5))
			.scale(1/GameManager.unitSize);
	}

	/** `Input.keys(Keys.UP)` will return `true` if key is pressed */
	public static keys(key: string): boolean {
		if (Input._keyDowns[key]) {
			return true;
		}
		return false;
	}


	private static getKeyDown(e:KeyboardEvent): void {
		Input._keyDowns[Keys[e.code]] = true;
	}

	private static getKeyUp(e: KeyboardEvent): void {
		Input._keyDowns[Keys[e.code]] = false;
	}

	public static registerMouseDown(toBind: object, func:Function): void {
		Input.mousedownListeners.push(func.bind(toBind));
	}

	public static registerMouseUp(toBind: object, func:Function): void {
		Input.mouseupListeners.push(func.bind(toBind));
	}
}
