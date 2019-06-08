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
		this.context.imageSmoothingEnabled = GameManager.options.imageAntiAliasing;
		this.context.shadowBlur = 0;
	}

	public static wipe(): void {
		this.context.setTransform(1, 0, 0, 1, 0, 0);
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
		let camera: Camera = GameManager.camera;
		let t: Transform = gameObject.transform;
		let s: Vector2 = t.size;
		let r: number = t.rotation;

		if (camera.inViewOfGameObject(gameObject)) {
			let relativePos = camera.relativePosition(t.position);
			let screenSize = GameManager.screenSize;
			this.context.setTransform(1, 0, 0, 1, relativePos.x + screenSize.x/2, relativePos.y + screenSize.y/2);
			this.rotate(-r);
			this.flipCanvas(t.size);
			this.context.drawImage(
				image,
				-s.x/2,
				-s.y/2,
				s.x,
				s.y
			);
			this.flipCanvas(t.size);
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
		if (GameManager.camera.inViewOfGameObject(gameObject)) {
			let image = gameObject.image;
			let camera = GameManager.camera;
			let t: Transform = gameObject.transform;
			let s: Vector2 = t.size;
			let r: number = t.rotation;

			if (camera.inViewOfGameObject(gameObject)) {
				let relativePos = camera.relativePosition(t.position);
				let screenSize = GameManager.screenSize;
				this.context.setTransform(1, 0, 0, 1, relativePos.x + screenSize.x/2, relativePos.y + screenSize.y/2);
				this.rotate(-r);
				this.flipCanvas(t.size);
				this.context.drawImage(
					image,
					sx,
					sy,
					sWidth,
					sHeight,
					-s.x/2,
					-s.y/2,
					s.x,
					s.y
				);
				this.flipCanvas(t.size);
			}
		}
	}

	public static rotate(r: number): void {
		this.context.rotate(r);
	}

	public static drawGameObject(gameObject): void {
		let r: number = gameObject.transform.rotation;
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

		let t = gameObject.transform;
		if (GameManager.options.drawTransforms || gameObject.drawTransform) {
			Canvas.strokeGameObjectRect(gameObject);
		}

		if (gameObject.collider && (GameManager.options.drawColliders || gameObject.drawCollider)) {
			this.strokeGameObjectCollider(gameObject);
		}
	}


	/** Handles camera placement, won't draw if outside visible rect */
	public static strokeRect(position: Vector2, size: Vector2, color:string, r:number=0): void {
		let camera: Camera = GameManager.camera;
		if (camera.inViewOf(position, size)) {
			Canvas.setStrokeStyle(color);
			let relativePos: Vector2 = camera.relativePosition(position);
			this.setTransform(relativePos);
			Canvas.rotate(-r);
			Canvas.context.strokeRect(
				-size.x/2,
				-size.y/2,
				size.x,
				size.y
			);
		}
	}
	/** Handles camera placement, won't draw if outside visible rect */
	public static strokeGameObjectRect(gameObject:GameObject): void {
		let t = gameObject.transform;
		let color = gameObject.drawTransformColor || "#FF0000";
		this.strokeRect(t.position, t.size, color, t.rotation);
	}


	/** Handles camera placement, won't draw if outside visible rect */
	public static fillRect(position: Vector2, size: Vector2, color:string, r: number=0): void {
		let camera: Camera = GameManager.camera;
		if (camera.inViewOf(position, size)) {
			Canvas.setFillStyle(color);
			let relativePos: Vector2 = camera.relativePosition(position);
			this.setTransform(relativePos);
			Canvas.rotate(-r);
			Canvas.context.fillRect(
				-size.x/2,
				-size.y/2,
				size.x,
				size.y
			);
		}
	}
	/** Handles camera placement, won't draw if outside visible rect */
	public static fillGameObjectRect(gameObject:GameObject): void {
		let t: Transform = gameObject.transform;
		this.fillRect(t.position, t.size, gameObject.fillStyle);
	}


	private static setTransform(position:Vector2): void {
		let screenSize: Vector2 = GameManager.screenSize;
		this.context.setTransform(1, 0, 0, 1, position.x + screenSize.x/2, position.y + screenSize.y/2);
	}

	public static strokeGameObjectCollider(gameObject): void {
		let color = gameObject.drawColliderColor || "#00FF00"
		this.strokeRect(gameObject.colliderPosition(), gameObject.colliderSize(), color)
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

	public static drawCenteredCross(color:string="#FFFFFF33"): void {
		this.setFillStyle(color);
		let lineWidth = 2;
		let screenSize = GameManager.screenSize;
		this.context.resetTransform();
		this.context.fillRect(screenSize.x/2 - lineWidth/2, 0, lineWidth, screenSize.y);
		this.context.fillRect(0, screenSize.y/2 - lineWidth/2, screenSize.x, lineWidth);
	}
}
