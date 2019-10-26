import GameManager from "./GameManager";

export default class GameLauncher {
	constructor(options: object = {}) {
		GameManager.start(options);
	}
}
