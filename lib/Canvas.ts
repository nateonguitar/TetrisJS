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
		this.context.translate(GameManager.options.screenWidth/2, GameManager.options.screenHeight/2);
		this.context.imageSmoothingEnabled = GameManager.options.imageAntiAliasing;
		this.context.shadowBlur = 0;
	}

	public static wipe(): void {
		this.context.clearRect(-this.canvas.width/2, -this.canvas.height/2, this.canvas.width, this.canvas.height);
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
		if (this.insideCameraBounds(x, y, width, height)) {
			this.context.drawImage(
				image,
				x - camPos.x,
				y - camPos.y,
				width,
				height
			);
		}
	}

	/** Handles camera placement, won't draw if outside visible rect */
	public static drawGameObjectImage(image:any, gameObject:GameObject,): void {
		let t: Transform = gameObject.transform;
		// if the entire image not outside the viewport
		let camPos: Vector2 = GameManager.camera.position;
		if (this.insideCameraBounds(t.position.x - t.size.x/2, t.position.y - t.size.y/2, t.size.x, t.size.y)) {
			this.context.drawImage(
				image,
				t.position.x - t.size.x/2 - camPos.x,
				t.position.y - t.size.y/2 - camPos.y,
				t.size.x,
				t.size.y
			);
		}
	}

	/**
	 * Handles camera placement, won't draw if outside visible rect
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
		if (this.insideCameraBounds(x, y, width, height)) {
			this.context.drawImage(
				image,
				sx,
				sy,
				sWidth,
				sHeight,
				x - camPos.x,
				y - camPos.y,
				width,
				height
			);
		}
	}

	/**
	 * Handles camera placement, won't draw if outside visible rect
	 *
	 * `gameObject`
	 * The GameObject you'd like to draw
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
	public static drawGameObjectPartialImage(
		image:any,
		gameObject:GameObject,
		sx:number,
		sy:number,
		sWidth:number,
		sHeight:number
	): void {
		let t: Transform = gameObject.transform;
		let camPos: Vector2 = GameManager.camera.position;
		if (this.insideCameraBounds(t.position.x - t.size.x/2, t.position.y - t.size.y/2, t.size.x, t.size.y)) {
			this.context.drawImage(
				image,
				sx,
				sy,
				sWidth,
				sHeight,
				t.position.x - t.size.x/2 - camPos.x,
				t.position.y - t.size.y/2 - camPos.y,
				t.size.x,
				t.size.y
			);
		}
	}

	/** Handles camera placement, won't draw if outside visible rect */
	public static fillRect(x:number, y:number, width:number, height:number): void {
		let camPos: Vector2 = GameManager.camera.position;
		if (this.insideCameraBounds(x, y, width, height)) {
			Canvas.context.fillRect(
				x - camPos.x,
				y - camPos.y,
				width,
				height
			);
		}
	}
	/** Handles camera placement, won't draw if outside visible rect */
	public static fillGameObjectRect(gameObject:GameObject): void {
		let t: Transform = gameObject.transform;
		let camPos: Vector2 = GameManager.camera.position;
		if (this.insideCameraBounds(t.position.x, t.position.y, t.size.x, t.size.y)) {
			Canvas.context.fillRect(
				t.position.x - camPos.x,
				t.position.y - camPos.y,
				t.size.x,
				t.size.y
			);
		}
	}

	/** Handles camera placement, won't draw if outside visible rect */
	public static strokeRect(x:number, y:number, width:number, height:number ): void {
		let camPos: Vector2 = GameManager.camera.position;
		if (this.insideCameraBounds(x, y, width, height)) {
			Canvas.context.strokeRect(
				x - camPos.x,
				y - camPos.y,
				width,
				height
			);
		}
	}
	/** Handles camera placement, won't draw if outside visible rect */
	public static strokeGameObjectRect(gameObject:GameObject): void {
		let t: Transform = gameObject.transform;
		let camPos: Vector2 = GameManager.camera.position;
		if (this.insideCameraBounds(t.position.x, t.position.y, t.size.x, t.size.y)) {
			Canvas.context.strokeRect(
				t.position.x - camPos.x,
				t.position.y - camPos.y,
				t.size.x,
				t.size.y
			);
		}
	}

	private static insideCameraBounds(x:number, y:number, width:number, height:number): boolean {
		let screenWidth: number = GameManager.options.screenWidth;
		let screenHeight: number = GameManager.options.screenHeight;
		let camPos: Vector2 = GameManager.camera.position;
		return (
			x + width > camPos.x - screenWidth/2 &&
			y + height > camPos.y - screenHeight/2 &&
			x < camPos.x + screenWidth/2 &&
			y < camPos.y + screenHeight/2
		);
	}
}
