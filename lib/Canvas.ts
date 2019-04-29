class Canvas {

	public static canvas: HTMLCanvasElement = null;
	private static context: CanvasRenderingContext2D = null;

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

	public static setFillStyle(color:string): void {
		this.context.fillStyle = color;
	}

	public static setStrokeStyle(color:string): void {
		this.context.strokeStyle = color;
	}

	public static setLineWidth(width:number): void {
		this.context.lineWidth = width;
	}

	/** Handles camera placement, won't draw if outside visible rect */
	public static drawImage(image:any, x:number, y:number, width:number, height:number ): void {
		// if the entire image not outside the viewport
		let camPos: Vector2 = GameManager.camera.position;
		if (this.insideCameraBounds(camPos, x, y, width, height)) {
			this.context.drawImage(
				image,
				x - camPos.x,
				y - camPos.y,
				width,
				height
			);
		}
	}

	/**
	 * Handles camera placement.
	 *
	 * `x`
	 * The x-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
	 *
	 * `y`
	 * The y-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
	 *
	 * `width`
	 * The width to draw the image in the destination canvas.
	 *
	 * `height`
	 * The height to draw the image in the destination canvas.
	 *
	 * `sx`
	 * The x-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
	 *
	 * `sy`
	 * The y-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
	 *
	 * `sWidth`
	 * The width of the sub-rectangle of the source image to draw into the destination context.
	 *
	 * `sHeight`
	 * The height of the sub-rectangle of the source image to draw into the destination context.
	 **/
	public static drawPartialImage(
		image:any,
		x:number,
		y:number,
		width:number,
		height:number,
		sx:number,
		sy:number,
		sWidth:number,
		sHeight:number
	): void {
		let camPos: Vector2 = GameManager.camera.position;
		if (this.insideCameraBounds(camPos, x, y, width, height)) {
			this.context.drawImage(
				image,
				sx,
				sy,
				sWidth,
				sHeight,
				x - GameManager.camera.position.x,
				y - GameManager.camera.position.y,
				width,
				height
			);
		}
	}

	/** Handles camera placement */
	public static fillRect(x:number, y:number, width:number, height:number ): void {
		let camPos: Vector2 = GameManager.camera.position;
		if (this.insideCameraBounds(camPos, x, y, width, height)) {
			Canvas.context.fillRect(
				x - GameManager.camera.position.x,
				y - GameManager.camera.position.y,
				width,
				height
			);
		}
	}

	/** Handles camera placement */
	public static strokeRect(x:number, y:number, width:number, height:number ): void {
		let camPos: Vector2 = GameManager.camera.position;
		if (this.insideCameraBounds(camPos, x, y, width, height)) {
			Canvas.context.strokeRect(
				x - GameManager.camera.position.x,
				y - GameManager.camera.position.y,
				width,
				height
			);
		}
	}

	private static insideCameraBounds(camPos:Vector2, x:number, y:number, width:number, height:number): boolean {
		let screenWidth: number = GameManager.options.screenWidth;
		let screenHeight: number = GameManager.options.screenHeight;
		return (
			x + width > camPos.x - (GameManager.options.originCenter ? screenWidth/2 : screenWidth) &&
			y + height > camPos.y - (GameManager.options.originCenter ? screenHeight/2 : screenHeight) &&
			x < camPos.x + (GameManager.options.originCenter ? screenWidth/2 : screenWidth) &&
			y < camPos.y + (GameManager.options.originCenter ? screenHeight/2 : screenHeight)
		);
	}
}
