import { GameManager, GameOptions } from "./";

export class GameLauncher {
	constructor(options: GameOptions = <GameOptions>{}) {
		GameManager.start(options);
	}
}
