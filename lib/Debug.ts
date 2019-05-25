class Debug {
	// will dynamically add to this
	private static debugDom: {[k:string]: HTMLElement} = {};

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
		let parentElement = document.getElementById(options.parentElementID);

		let el = parentElement ? parentElement : document.body;
		el.appendChild(this.debugDom["divOuter"]);

		this.debugDom["paraFPS"] = document.createElement("p");
		this.debugDom.divOuter.appendChild(this.debugDom["paraFPS"]);

		this.debugDom["paraGameObjects"] = document.createElement("p");
		this.debugDom.divOuter.appendChild(this.debugDom["paraGameObjects"]);

		this.debugDom["paraFPS"] = document.createElement("p");
		this.debugDom.divOuter.appendChild(this.debugDom["paraFPS"]);
	}

	public static update(params): void {
		this.debugDom["paraGameObjects"].innerText = 'GameObjects: ' + params.gameObjectsLength;
		this.debugDom["paraFPS"].innerText = 'FPS: ' + Utils.fps().toFixed(1);
	}
}
