enum Keys {
	Tab,
	ControlLeft,
	ControlRight,
	AltLeft,
	AltRight,
	ShiftLeft,
	ShiftRight,
	Backquote,
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
	private static _KEYS: {[key:string]: Keys} = {
		'Tab': Keys.Tab,
		'Backquote': Keys.Backquote,
		'ControlLeft': Keys.ControlLeft,
		'ControlRight': Keys.ControlRight,
		'AltLeft': Keys.AltLeft,
		'AltRight': Keys.AltRight,
		'ShiftLeft': Keys.ShiftLeft,
		'ShiftRight': Keys.ShiftRight,
		'Escape': Keys.Escape,
		'Space': Keys.Space,
		'ArrowLeft': Keys.ArrowLeft,
		'ArrowUp': Keys.ArrowUp,
		'ArrowRight': Keys.ArrowRight,
		'ArrowDown': Keys.ArrowDown,
		'Digit0': Keys.Key0,
		'Digit1': Keys.Key1,
		'Digit2': Keys.Key2,
		'Digit3': Keys.Key3,
		'Digit4': Keys.Key4,
		'Digit5': Keys.Key5,
		'Digit6': Keys.Key6,
		'Digit7': Keys.Key7,
		'Digit8': Keys.Key8,
		'Digit9': Keys.Key9,
		'KeyA': Keys.KeyA,
		'KeyB': Keys.KeyB,
		'KeyC': Keys.KeyC,
		'KeyD': Keys.KeyD,
		'KeyE': Keys.KeyE,
		'KeyF': Keys.KeyF,
		'KeyG': Keys.KeyG,
		'KeyH': Keys.KeyH,
		'KeyI': Keys.KeyI,
		'KeyJ': Keys.KeyJ,
		'KeyK': Keys.KeyK,
		'KeyL': Keys.KeyL,
		'KeyM': Keys.KeyM,
		'KeyN': Keys.KeyN,
		'KeyO': Keys.KeyO,
		'KeyP': Keys.KeyP,
		'KeyQ': Keys.KeyQ,
		'KeyR': Keys.KeyR,
		'KeyS': Keys.KeyS,
		'KeyT': Keys.KeyT,
		'KeyU': Keys.KeyU,
		'KeyV': Keys.KeyV,
		'KeyW': Keys.KeyW,
		'KeyX': Keys.KeyX,
		'KeyY': Keys.KeyY,
		'KeyZ': Keys.KeyZ,
		'F1': Keys.F1,
		'F2': Keys.F2,
		'F3': Keys.F3,
		'F4': Keys.F4,
		'F5': Keys.F5,
		'F6': Keys.F6,
		'F7': Keys.F7,
		'F8': Keys.F8,
		'F9': Keys.F9,
		'F10': Keys.F10,
		'F11': Keys.F11,
		'F12': Keys.F12,
	};

	private static _keyDowns: { [key:number]:boolean } = {}

	public static init(): void {
		document.onkeydown = Input.getKeyDown;
		document.onkeyup = Input.getKeyUp;
	}

	/** `Input.keys(Keys.UP)` will return `true` if key is pressed */
	public static keys(key: Keys): boolean {
		if (Input._keyDowns[key]) {
			return true;
		}
		return false;
	}


	private static getKeyDown(e) {
		e = e || window.event;
		Input._keyDowns[Input._KEYS[e.code]] = true;
	}

	private static getKeyUp(e) {
		e = e || window.event;
		Input._keyDowns[Input._KEYS[e.code]] = false;
	}
}
