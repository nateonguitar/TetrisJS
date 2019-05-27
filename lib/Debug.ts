class Debug {
	// will dynamically add to this
	private static debugDom: {[k:string]: HTMLElement} = {};

	/** miliseconds between display updates */
	private static timeBetweenDisplayUpdates = 125;
	private static timeOfLastDisplayUpdate = 0;

	private static trackedGameObjects: GameObject[] = [];

	public static track(gameObject: GameObject): void {
		this.trackedGameObjects.push(gameObject);
	}

	public static untrack(gameObject: GameObject): void {
		for (let i=this.trackedGameObjects.length-1; i>=0; i--) {
			if (this.trackedGameObjects[i] == gameObject) {
				this.trackedGameObjects.splice(i, 1);
			}
		}
	}

	public static reset(): void {
		this.trackedGameObjects = [];
		this.timeOfLastDisplayUpdate = 0;
	}

	public static create(options:any): void {
		let style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = `
			.debug-sub-header {
				text-decoration: underline;
			}
			#game-debug {
				padding: 3px;
				font-family: Courier;
				max-width: 600px;
				overflow-x: scroll;
				color: inherit !important;
			}
			#table-debug {
				color: inherit !important;
			}
			#table-debug td {
				vertical-align: top;
				whitespace: no-wrap;
			}
			#table-debug td {
				vertical-align: top;
				whitespace: no-wrap;
				padding-top: 1px;
				padding-bottom: 1px;
				white-space: pre-wrap;
			}
			#table-debug td:nth-child(1) {
				font-weight: bold;
			}
		`;
		document.getElementsByTagName('head')[0].appendChild(style);

		this.debugDom["div_outer"] = document.createElement("div");
		this.debugDom["div_outer"].id = "game-debug";
		let parentElement = document.getElementById(options.parentElementID);

		let el = parentElement ? parentElement : document.body;
		el.appendChild(this.debugDom["div_outer"]);

		this.debugDom["table_debug"] = document.createElement("table");
		this.debugDom["table_debug"].id = 'table-debug';
		this.debugDom["div_outer"].appendChild(this.debugDom["table_debug"]);
	}

	public static update(params): void {
		// update every x miliseconds
		if (Time.time > this.timeBetweenDisplayUpdates + this.timeOfLastDisplayUpdate) {
			this.timeOfLastDisplayUpdate = Time.time;

			let separator = '<tr><td colspan="2"><hr></td></tr>';

			let fps = Utils.fps().toFixed(1);
			let gameObjectsLength = params.gameObjectsLength;
			let cameraFollowing = (((GameManager.camera.following() || <any>{}).constructor || <any>{}).name) || '';
			let cameraPosition = GameManager.camera.position;
			let cachedImages = Object.keys(GameManager.currentLevel.cachedImages).join("\n");

			let html = `
				<tr>
					<td colspan="2" class="debug-sub-header">Game</td>
				</tr>
				<tr>
					<td>FPS:</td>
					<td>${fps}</td>
				</tr>
				<tr>
					<td>Game Objects:</td>
					<td>${gameObjectsLength}</td>
				</tr>
				${separator}
				<tr>
					<td colspan="2" class="debug-sub-header">Camera</td>
				</tr>
				<tr>
					<td>Position:</td>
					<td>${cameraPosition}</td>
				</tr>
				<tr>
					<td>Following:</td>
					<td>${cameraFollowing}</td>
				</tr>
				${separator}
				<tr>
					<td colspan="2" class="debug-sub-header">Cached</td>
				</tr>
				<tr>
					<td>Images:</td>
					<td style="white-space:pre-wrap;">${cachedImages}</td>
				</tr>
			`;

			if (this.trackedGameObjects.length) {
				html += `
					${separator}
					<tr>
						<td colspan="2" class="debug-sub-header">Tracked GameObjects</td>
					</tr>
				`;
				let padSize = 12;
				for (let tracked of this.trackedGameObjects) {
					html += `
						<tr>
							<td>${tracked.constructor.name}:</td>
							<td style="white-space:pre-wrap;">`;
					html += this.padEndNbsp("layer",    padSize) + `${tracked.layer}<br>`;
					html += this.padEndNbsp("position", padSize) + `${tracked.transform.position}<br>`;
					html += this.padEndNbsp("size",     padSize) + `${tracked.transform.size}<br>`;
					html += this.padEndNbsp("image",    padSize) + `${((tracked.image || {}).src) || ''}`;

					let animationInfo = (<GameObject>tracked).getCurrentSpritesheetAnimationInfo();
					if (animationInfo) {
						html += "<br>" + this.padEndNbsp("anim name",  padSize) + animationInfo.name;
						html += "<br>" + this.padEndNbsp("anim index", padSize) + animationInfo.index;
					}

					if (tracked.collider) {
						html += "<br>" + this.padEndNbsp("col pos",    padSize) + tracked.collider.transform.position;
						html += "<br>" + this.padEndNbsp("col size",   padSize) + tracked.collider.transform.size;
						if (tracked.currentCollidingObjects.length == 0) {
							html += "<br>" + this.padEndNbsp("collisions", padSize) + '[]';
						}
						else {
							html += "<br>" + this.padEndNbsp("collisions", padSize) + '[';
							for (let col of tracked.currentCollidingObjects) {
								html += "<br>" + this.padEndNbsp("", padSize + 2) + col.constructor.name;
							}
							html += "<br>" + this.padEndNbsp("", padSize) + ']';
						}
					}

					html += `
							</td>
						</tr>
					`;
				}
			}

			this.debugDom['table_debug'].innerHTML = html;
		}
	}

	private static padEndNbsp(str: string, num: number): string {
		return this.padEnd(str, num, "&nbsp;");
	}

	private static padEnd(str:string, num:number, pad:string): string {
		for (let i=str.length; i<num+1; i++) {
			str += pad;
		}
		return str;
	}
}
