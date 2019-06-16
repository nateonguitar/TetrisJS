interface MarioLevelControllerParams {
	tileFlags?: string[][];
}

class MarioLevelController extends GameObject {

	protected backBarrier: BackBarrier;
	public player: MarioPlayer;

	// first level example image: https://www.spriters-resource.com/fullview/20592/
	protected tileFlags: string[][] = [
		['rb', 'rb'],
		['rb', 'rb'],
		['rb', 'rb'],
		['rb', 'rb'],
		['rb', 'rb'],
		['rb', 'rb', '', '', '', '?'],
		['rb', 'rb'],
		['rb', 'rb'],
		['rb', 'rb'],
		['rb', 'rb', '', '', '', 'btb'],
		['rb', 'rb', '', '', '', '?',],
		['rb', 'rb', '', '', '', 'btb', '', '', '?'],
		['rb', 'rb', '', '', '', '?'],
		['rb', 'rb', '', '', '', 'btb'],
		['rb', 'rb'],
		['rb', 'rb'],
		['rb', 'rb'],
		['rb', 'rb', 'tbl', 'ttl'],
		['rb', 'rb', 'tbr', 'ttr'],
		['rb', 'rb'],
		['rb', 'rb'],
		['rb', 'rb'],
	];

	protected flagMap: any = {
		''    : null,
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

	constructor(params:MarioLevelControllerParams) {
		super({layer: 0});
		if (params.tileFlags) {
			this.tileFlags = params.tileFlags;
		}
		else {
			console.warn("Warning: Using default level tiles.  You need to pass tileFlags into the MarioLevel super() call");
		}
		this.backBarrier = new BackBarrier();
		this.player = new MarioPlayer();
		Debug.trackGameObject(this.player);
		this.buildLevel();
	}

	public destroyTile(tile: MarioGameTile): void {
		for (let i=0; i<this.tiles.length; i++) {
			let row = this.tiles[i];
			for (let j=0; j<row.length; j++) {
				if (row[j] == tile) {
					row[j] = null;
				}
			}
		}
		GameManager.destroy(tile);
	}

	/**
	 * Uses `tileFlags`, a 2d array of strings, to build the level.
	 * Remember, the original mario has 15 tiles vertically,
	 * but we'll build the level at a 90 degree angle.
	 *
	 * The `tileFlags` list (which you should override in each level) defaults to the start
	 * of the first level of the original mario.
	 *
	 * If called after level is already built it will replace any tiles that have been destroyed.
	 */
	public buildLevel(): void {
		this.backBarrier.init();
		this.player.init();

		// build tiles
		for (let i=0; i<this.tileFlags.length; i++) {
			// create empty row if it doesn't exist already
			if (!this.tiles[i]) {
				this.tiles[i] = [];
			}
			let tileRow = this.tiles[i];

			// fill row with tiles from flags
			let flagRow = this.tileFlags[i];
			for(let j=0; j<flagRow.length; j++) {
				let flag = flagRow[j];

				let TileClass = this.flagMap[flag];

				// add null if its not already there
				if (TileClass === null && tileRow[j] !== null) {
					tileRow[j] = null;
				}
				else if (TileClass === undefined) {
					console.warn("Flag '" + flag + "' does not match a known tile type.");
				}
				else if (!tileRow[j] && TileClass !== null) {
					let tile = new TileClass();
					tile.transform.position.y = 15 - j;
					tile.transform.position.x = i;
					this.tiles[i][j] = tile;
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
