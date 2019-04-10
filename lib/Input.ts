enum Keys {
	Tab,
	Ctrl,
	Alt,
	Escape,
	Space,
	ArrowUp,
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	Key0,
	Key1,
	Key2,
	Key3,
	Key4,
	Key5,
	Key6,
	Key7,
	Key8,
	Key9,
	KeyA,
	KeyB,
	KeyC,
	KeyD,
	KeyE,
	KeyF,
	KeyG,
	KeyH,
	KeyI,
	KeyJ,
	KeyK,
	KeyL,
	KeyM,
	KeyN,
	KeyO,
	KeyP,
	KeyQ,
	KeyR,
	KeyS,
	KeyT,
	KeyU,
	KeyV,
	KeyW,
	KeyX,
	KeyY,
	KeyZ,
	F1,
	F2,
	F3,
	F4,
	F5,
	F6,
	F7,
	F8,
	F9,
	F10,
	F11,
	F12,
}

class Input {
	private static _KEYS: {[key:number]: Keys} = {
		9: Keys.Tab,
		17: Keys.Ctrl,
		18: Keys.Alt,
		27: Keys.Escape,
		32: Keys.Space,
		37: Keys.ArrowLeft,
		38: Keys.ArrowUp,
		39: Keys.ArrowRight,
		40: Keys.ArrowDown,
		48: Keys.Key0,
		49: Keys.Key1,
		50: Keys.Key2,
		51: Keys.Key3,
		52: Keys.Key4,
		53: Keys.Key5,
		54: Keys.Key6,
		55: Keys.Key7,
		56: Keys.Key8,
		57: Keys.Key9,
		65: Keys.KeyA,
		66: Keys.KeyB,
		67: Keys.KeyC,
		68: Keys.KeyD,
		69: Keys.KeyE,
		70: Keys.KeyF,
		71: Keys.KeyG,
		72: Keys.KeyH,
		73: Keys.KeyI,
		74: Keys.KeyJ,
		75: Keys.KeyK,
		76: Keys.KeyL,
		77: Keys.KeyM,
		78: Keys.KeyN,
		79: Keys.KeyO,
		80: Keys.KeyP,
		81: Keys.KeyQ,
		82: Keys.KeyR,
		83: Keys.KeyS,
		84: Keys.KeyT,
		85: Keys.KeyU,
		86: Keys.KeyV,
		87: Keys.KeyW,
		88: Keys.KeyX,
		89: Keys.KeyY,
		90: Keys.KeyZ,
		112: Keys.F1,
		113: Keys.F2,
		114: Keys.F3,
		115: Keys.F4,
		116: Keys.F5,
		117: Keys.F6,
		118: Keys.F7,
		119: Keys.F8,
		120: Keys.F9,
		121: Keys.F10,
		122: Keys.F11,
		123: Keys.F12,
	};

	private static _keyDowns: { [key:number]:boolean } = {}

	public static init(): void {
		document.onkeydown = Input.getKeyDown;
		document.onkeyup = Input.getKeyUp;
	}

	/** `Input.KEYS(Keys.UP)` will return `true` if key is pressed */
	public static keys(key: Keys): boolean {
		if (Input._keyDowns[key]) {
			return true;
		}
		return false;
	}


	private static getKeyDown(e) {
		e = e || window.event;
		Input._keyDowns[Input._KEYS[e.keyCode]] = true;
	}

	private static getKeyUp(e) {
		e = e || window.event;
		Input._keyDowns[Input._KEYS[e.keyCode]] = false;
	}
}
