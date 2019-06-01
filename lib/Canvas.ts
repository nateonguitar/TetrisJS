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
	public static drawGameObjectImage(gameObject:GameObject,): void {
		let image = gameObject.image;
		let t: Transform = gameObject.transform;
		// if the entire image not outside the viewport
		let camPos: Vector2 = GameManager.camera.position;
		if (GameManager.camera.inViewOf(gameObject)) {
			this.flipCanvas(t.size);
			this.context.drawImage(
				image,
				t.position.x - t.size.x/2 - camPos.x,
				t.position.y - t.size.y/2 - camPos.y,
				t.size.x,
				t.size.y
			);
			this.context.restore();
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
		gameObject:GameObject,
		sx:number,
		sy:number,
		sWidth:number,
		sHeight:number
	): void {
		if (GameManager.camera.inViewOf(gameObject)) {
			let image = gameObject.image;
			if (gameObject.constructor.name == 'FroggerPlayer') debugger;
			let t: Transform = gameObject.transform;
			let s: Vector2 = t.size;
			let pos: Vector2 = t.position;
			let camPos: Vector2 = GameManager.camera.position;
			this.flipCanvas(t.size);
			this.context.drawImage(
				image,
				sx,
				sy,
				sWidth,
				sHeight,
				pos.x - s.x/2 - camPos.x,
				pos.y - s.y/2 - camPos.y,
				s.x,
				s.y
			);
			this.context.restore();
		}
	}


	public static drawGameObject(gameObject): void {
		if (gameObject.spritesheetAnimationSet) {
			gameObject.image = GameManager.currentLevel.cachedImages[gameObject.spritesheetAnimationSet.imageSrc];
			let animationTransform = gameObject.spritesheetAnimationSet.currentAnimationTransform;
			Canvas.drawGameObjectPartialImage(
				gameObject,
				animationTransform.position.x,
				animationTransform.position.y,
				animationTransform.size.x,
				animationTransform.size.y
			);
		}
		else if (gameObject.imageSrc) {
			gameObject.image = GameManager.currentLevel.cachedImages[gameObject.imageSrc];
			if (gameObject.spritesheetBounds) {
				Canvas.drawGameObjectPartialImage(
					gameObject,
					gameObject.spritesheetBounds.x,
					gameObject.spritesheetBounds.y,
					gameObject.spritesheetBounds.width,
					gameObject.spritesheetBounds.height
				);
			}
			else {
				Canvas.drawGameObjectImage(gameObject);
			}
		}
		else {
			if (gameObject.fillStyle) {
				Canvas.setFillStyle(gameObject.fillStyle);
				if (gameObject.shape == "square") {
					Canvas.fillGameObjectRect(gameObject);
				}
			}
			if (gameObject.strokeStyle) {
				Canvas.setStrokeStyle(gameObject.strokeStyle);
				if (gameObject.shape == "square") {
					Canvas.strokeGameObjectRect(gameObject);
				}
			}
		}

		if (GameManager.options.drawTransforms || gameObject.drawTransform) {
			Canvas.setStrokeStyle(gameObject.drawTransformColor || "#FF0000");
			let pos = gameObject.transform.position;
			let size = gameObject.transform.size;
			Canvas.strokeRect(pos.x - size.x/2, pos.y - size.y/2, size.x, size.y);
		}

		if (gameObject.collider && (GameManager.options.drawColliders || gameObject.drawCollider)) {
			Canvas.setStrokeStyle(gameObject.drawColliderColor || "#00FF00");
			let size = gameObject.colliderSize();
			let pos = gameObject.colliderPosition();
			Canvas.strokeRect(pos.x, pos.y, size.x, size.y);
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
		if (GameManager.camera.inViewOf(gameObject)) {
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
		if (GameManager.camera.inViewOf(gameObject)) {
			Canvas.context.strokeRect(
				t.position.x - camPos.x,
				t.position.y - camPos.y,
				t.size.x,
				t.size.y
			);
		}
	}

	/** There is no way to draw an image backwards or upside-down in JavaScript / Html5 canvas.  Instead you flip the canvas, draw, then flip the canvas back the way it was. */
	private static flipCanvas(size: Vector2) {
		let x = size.x < 0;
		let y = size.y < 0;
		if (!x && !y) return;
		this.context.scale(
			x ? -1 : 1,
			y ? -1 : 1
		);
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
