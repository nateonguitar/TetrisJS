class MarioLevelController extends GameObject {

	protected backBarrier: BackBarrier;
	public player: MarioPlayer;

	protected tileFlags: string[][] = [
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', '?',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', 'btb', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', '?',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', 'btb', ' ', ' ', '?', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', '?',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', 'btb', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', 'tbl', 'ttl', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', 'tbr', 'ttr', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', '?',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', 'btb', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', '?',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', 'btb', ' ', ' ', '?', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', '?',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', 'btb', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', 'tbl', 'ttl', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', 'tbr', 'ttr', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', '?',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', 'btb', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', '?',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', 'btb', ' ', ' ', '?', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', '?',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', 'btb', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', 'tbl', 'ttl', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', 'tbr', 'ttr', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['rb', 'rb', ' ',   ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	];

	protected flagMap: any = {
		' '   : null,
		'?'   : MarioGameTileQuestionMark,
		'bb'  : MarioGameTileBricksBrown,
		'btb' : MarioGameTileBricksTopBrown,
		'rb'  : MarioGameTileRocksBrown,
		'tbl' : MarioGameTileTubeBottomLeft,
		'tbr' : MarioGameTileTubeBottomRight,
		'ttl' : MarioGameTileTubeTopLeft,
		'ttr' : MarioGameTileTubeTopRight
	};

	protected tiles: GameObject[][] = [];

	constructor() {
		super({layer: 0});
		this.backBarrier = new BackBarrier();
		this.player = new MarioPlayer();
		Debug.track(this.player);
		Debug.track(this.backBarrier);
		this.buildLevel();
	}

	/**
	 * Uses `tileFlags`, a 2d array of strings, to build the level.
	 * Remember, the original mario has 15 tiles vertically,
	 * but we'll build the level at a 90 degree angle.
	 *
	 * The `tileFlags` list (which you should override in each level) defaults to the start
	 * of the first level of the original mario.
	 */
	protected buildLevel(): void {
		for (let i=0; i<this.tileFlags.length; i++) {
			let row = this.tileFlags[i];
			for(let j=0; j<row.length; j++) {
				let flag = row[j];
				if (this.flagMap[flag] === null) {
					this.tiles.push(null);
				}
				else if (!this.flagMap[flag]) {
					console.warn("Flag '" + flag + '" does not match a known tile type.');
				}
				else {
					let tile = new this.flagMap[flag];
					tile.transform.position.y = 15 - j;
					tile.transform.position.x = i;
					this.tiles.push();
				}
			}
		}
	}

	protected handleCameraZoom(): void {
		if (Input.keys(Keys.Key1) && GameManager.unitSize > 5) {
			GameManager.currentLevel.unitSize -= 0.5;
		}
		if (Input.keys(Keys.Key2) && GameManager.unitSize < 500) {
			GameManager.currentLevel.unitSize += 0.5;
		}
	}
}
