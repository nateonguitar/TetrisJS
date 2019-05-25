class Debug {
	// will dynamically add to this
	private static debugDom: {[k:string]: HTMLElement} = {};
	private static separator: string = ' - ';

	public static create(options:any): void {
		let style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = `
			#game-debug {
				padding: 3px;
				font-size: 10pt;
				width: ` +
					// -6 for the padding
					((options.screenWidth > 250 ? options.screenWidth : 250) - 6) +
				`px;
			}
			#game-debug p {
				margin-top: 0;
				margin-bottom: 0;
			}
		`;
		document.getElementsByTagName('head')[0].appendChild(style);

		this.debugDom["divOuter"] = document.createElement("div");
		this.debugDom["divOuter"].id = "game-debug";
		this.debugDom["divOuter"].style.whiteSpace = "nowrap";
		let parentElement = document.getElementById(options.parentElementID);

		let el = parentElement ? parentElement : document.body;
		el.appendChild(this.debugDom["divOuter"]);

		this.debugDom["paraFPS"] = document.createElement("p");
		this.debugDom.divOuter.appendChild(this.debugDom["paraFPS"]);

		this.debugDom["paraGameObjects"] = document.createElement("p");
		this.debugDom.divOuter.appendChild(this.debugDom["paraGameObjects"]);

		this.debugDom["paraCameraFollowing"] = document.createElement("p");
		this.debugDom.divOuter.appendChild(this.debugDom["paraCameraFollowing"]);

		this.debugDom["paraCachedImages"] = document.createElement("p");
		this.debugDom.divOuter.appendChild(this.debugDom["paraCachedImages"]);
	}

	public static update(params): void {
		this.debugDom["paraFPS"].innerText = 'FPS: ' + Utils.fps().toFixed(1);
		this.debugDom["paraGameObjects"].innerText = 'GameObjects: ' + params.gameObjectsLength;
		this.debugDom["paraCameraFollowing"].innerText = 'Camera Following: ' + GameManager.camera.following().constructor.name;
		this.debugDom["paraCachedImages"].innerText = 'Cached Images: \n' + this.separator + Object.keys(GameManager.currentLevel.cachedImages).join("\n" + this.separator);
	}
}
