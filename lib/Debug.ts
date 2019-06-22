interface DebugTrackValue {
	label: string,
	value: any
}

class Debug {
	private static trackedValues: DebugTrackValue[] = [];

	private static maxFPSSoFar = 0;
	// will dynamically add to this
	private static debugDom: {[k:string]: HTMLElement} = {};

	/** miliseconds between display updates */
	private static timeBetweenDisplayUpdates = 100;
	private static timeOfLastDisplayUpdate = 0;

	private static style: any = null;

	private static trackedGameObjects: GameObject[] = [];

	private static debugWindowParentElement: any = null;

	public static trackValue(obj:DebugTrackValue): void {
		let existing = this.trackedValues.find(v => v.label == obj.label);
		if (existing == null) {
			this.trackedValues.push(obj);
		}
		else {
			existing.value = obj.value;
		}
	}

	public static untrackValue(obj:DebugTrackValue): void {
		for (let i=this.trackedValues.length-1; i>=0; i--) {
			let tracked = this.trackedValues[i];
			if (tracked.label == obj.label) {
				this.trackedValues.splice(i, 1);
			}
		}
	}

	public static trackGameObject(gameObject: GameObject): void {
		this.trackedGameObjects.push(gameObject);
	}

	public static untrackGameObject(gameObject: GameObject): void {
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

	public static start(options:any): void {
		this.style = document.createElement('style');
		this.style.type = 'text/css';
		this.style.innerHTML = `
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
		document.getElementsByTagName('head')[0].appendChild(this.style);

		this.debugDom["div_outer"] = document.createElement("div");
		this.debugDom["div_outer"].id = "game-debug";
		let parentElement = document.getElementById(options.parentElementID);

		this.debugWindowParentElement = parentElement ? parentElement : document.body;
		this.debugWindowParentElement.appendChild(this.debugDom["div_outer"]);

		this.debugDom["table_debug"] = document.createElement("table");
		this.debugDom["table_debug"].id = 'table-debug';
		this.debugDom["div_outer"].appendChild(this.debugDom["table_debug"]);
	}

	public static stop(): void {
		document.getElementsByTagName('head')[0].removeChild(this.style);
		this.debugWindowParentElement.removeChild(this.debugDom["div_outer"]);
	}

	public static update(): void {
		// update every x miliseconds
		if (Time.time > this.timeBetweenDisplayUpdates + this.timeOfLastDisplayUpdate) {
			let padSizeOuter = 18;
			this.timeOfLastDisplayUpdate = Time.time;

			let separator = '<tr><td colspan="2"><hr></td></tr>';

			let fps = Utils.fps();
			if (fps > this.maxFPSSoFar) {
				this.maxFPSSoFar = fps;
			}

			let fpsToFixed = fps.toFixed(1);
			let gameObjectsLength = GameManager.currentLevel.gameObjects.length;
			let updatesSkipped = GameManager.currentLevel.updatesSkipped;

			let following = GameManager.camera.following();
			let cameraFollowing = (((following || <any>{}).constructor || <any>{}).name) || '';
			if ((following || <any>{}).name) {
				cameraFollowing += ' ' + following.name;
			}
			let cameraPosition = GameManager.camera.worldspacePosition;

			let cachedImages = Object.keys(GameManager.currentLevel.cachedImages).join("\n");

			let fpsBar = '';
			for (let i=0; i<fps/5; i++) {
				fpsBar += '#';
			}

			fpsBar = this.padEndNbsp(fpsBar, this.maxFPSSoFar/5);

			let fpsBarColor = "green";
			if (fps < 50 && fps > 30) {
				fpsBarColor = "yellow";
			}
			else if (fps <= 30) {
				fpsBarColor = "red";
			}

			let collidersTotal = GameManager.collidersTotal;
			let collidersChecked = GameManager.collidersChecked;

			let trackedHTML = '';

			if (this.trackedValues.length) {
				trackedHTML += separator;
				for (let tracked of this.trackedValues) {
					trackedHTML += `
					<tr>
						<td>${this.padEndNbsp(tracked.label, padSizeOuter)}</td>
						<td>${tracked.value.toString()}</td>
					</tr>
					`
				}
			}


			let html = `
				<tr>
					<td colspan="2" class="debug-sub-header">Game</td>
				</tr>
				<tr>
					<td>${this.padEndNbsp('FPS:', padSizeOuter)}</td>
					<td>${fpsToFixed} [<span style="color: ${fpsBarColor};">${fpsBar}</span>]</td>
				</tr>
				<tr>
					<td>${this.padEndNbsp('Cols MtoM:', padSizeOuter)}</td>
					<td>${collidersTotal}</td>
				</tr>
				<tr>
					<td>${this.padEndNbsp('Cols MtoM Checked:', padSizeOuter)}</td>
					<td>${collidersChecked}</td>
				</tr>
				<tr>
					<td>${this.padEndNbsp('Game Objects:', padSizeOuter)}</td>
					<td>${gameObjectsLength}</td>
				</tr>
				<tr>
					<td>${this.padEndNbsp('Updates Skipped:', padSizeOuter)}</td>
					<td>${updatesSkipped}</td>
				</tr>
				${separator}
				<tr>
					<td colspan="2" class="debug-sub-header">Camera</td>
				</tr>
				<tr>
					<td>${this.padEndNbsp('Position:', padSizeOuter)}</td>
					<td>${cameraPosition}</td>
				</tr>
				<tr>
					<td>${this.padEndNbsp('Following:', padSizeOuter)}</td>
					<td>${cameraFollowing}</td>
				</tr>
				${separator}
				<tr>
					<td colspan="2" class="debug-sub-header">Cached</td>
				</tr>
				<tr>
					<td>${this.padEndNbsp('Images:', padSizeOuter)}</td>
					<td style="white-space:pre-wrap;">${cachedImages}</td>
				</tr>
				${trackedHTML}
			`;

			if (this.trackedGameObjects.length) {
				html += `
					${separator}
					<tr>
						<td colspan="2" class="debug-sub-header">Tracked GameObjects</td>
					</tr>
				`;
				let padSizeInner = 17;
				for (let tracked of this.trackedGameObjects) {
					html += `
						<tr>
							<td>${tracked.constructor.name + (tracked.name ? ' ' + tracked.name : '')}:</td>
							<td style="white-space:pre-wrap;">`;
					html += this.padEndNbsp("layer",             padSizeInner) + `${tracked.layer}<br>`;
					html += this.padEndNbsp("position",          padSizeInner) + `${tracked.transform.position}<br>`;
					html += this.padEndNbsp("absolute position", padSizeInner) + `${tracked.absolutePosition}<br>`;
					html += this.padEndNbsp("size",              padSizeInner) + `${tracked.transform.size}<br>`;
					html += this.padEndNbsp("absolute size",     padSizeInner) + `${tracked.absoluteSize}<br>`;
					html += this.padEndNbsp("image",             padSizeInner) + `${((tracked.image || {}).src) || ''}`;

					let animationInfo = (<GameObject>tracked).getCurrentSpritesheetAnimationInfo();
					if (animationInfo) {
						html += "<br>" + this.padEndNbsp("anim name",  padSizeInner) + animationInfo.name;
						html += "<br>" + this.padEndNbsp("anim index", padSizeInner) + animationInfo.index;
					}

					if (tracked.collider) {
						html += "<br>" + this.padEndNbsp("col pos",      padSizeInner) + tracked.collider.position;
						html += "<br>" + this.padEndNbsp("col pos rel",  padSizeInner) + tracked.colliderPosition();
						if (tracked.collider instanceof RectCollider) {
							html += "<br>" + this.padEndNbsp("col size",     padSizeInner) + tracked.collider.size;
							html += "<br>" + this.padEndNbsp("col size rel", padSizeInner) + tracked.rectColliderSize();
						}
						if (tracked.currentCollidingObjects.length == 0) {
							html += "<br>" + this.padEndNbsp("collisions", padSizeInner) + '[]';
						}
						else {
							html += "<br>" + this.padEndNbsp("collisions", padSizeInner) + '[';
							for (let col of tracked.currentCollidingObjects) {
								html += "<br>" + this.padEndNbsp("", padSizeInner + 2) + col.constructor.name + (col.name ? ' ' + col.name : '');
							}
							html += "<br>" + this.padEndNbsp("", padSizeInner) + ']';
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
