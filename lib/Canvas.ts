class Canvas {

	public static canvas: HTMLCanvasElement = null;
	public static context: CanvasRenderingContext2D = null;

	public static create(): void {
		this.canvas = document.createElement("canvas");
		this.canvas.style.border = GameManager.options.border;
		this.canvas.style.backgroundColor = GameManager.options.backgroundColor;
		this.canvas.id = "game-canvas"
		this.canvas.classList.add("canvas");
		this.canvas.width = GameManager.options.screenWidth;
		this.canvas.height = GameManager.options.screenHeight;
		this.canvas.style.width = GameManager.options.screenWidth + "px";
		this.canvas.style.height = GameManager.options.screenHeight + "px";
		let parentElement = document.getElementById(GameManager.options.parentElementID);
		let el = parentElement ? parentElement : document.body;
		el.appendChild(this.canvas);

		this.context = this.canvas.getContext("2d");
		if (GameManager.options.originCenter) {
			this.context.translate(GameManager.options.screenWidth/2, GameManager.options.screenHeight/2);
		}
		this.context.imageSmoothingEnabled = GameManager.options.imageAntiAliasing;
		this.context.shadowBlur = 0;
	}

	public static wipe(): void {
		if (GameManager.options.originCenter) {
			this.context.clearRect(-this.canvas.width/2, -this.canvas.height/2, this.canvas.width, this.canvas.height);
		}
		else {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}
}
