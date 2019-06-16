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
	public static drawGameObjectImage(gameObject:GameObject): void {
		let image = gameObject.image;
		let camera: Camera = GameManager.camera;
		let t: Transform = gameObject.transform;
		let p: Vector2 = gameObject.absolutePosition;
		let s: Vector2 = gameObject.absoluteSize;
		let r: number = t.rotation;

		if (camera.inViewOfGameObject(gameObject)) {
			let relativePos = camera.relativeWorldspacePosition(p);
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

	public static drawGameObjectPartialImage(gameObject:GameObject, sheetPosition:Vector2, sheetSize:Vector2): void {
		let image = gameObject.image;
		let camera = GameManager.camera;
		let t: Transform = gameObject.transform;
		let p: Vector2 = gameObject.absolutePosition;
		let s: Vector2 = t.size.scale(GameManager.unitSize);
		let r: number = t.rotation;

		if (camera.inViewOfGameObject(gameObject)) {
			let relativePos = camera.relativeWorldspacePosition(p);
			let screenSize = GameManager.screenSize;
			this.context.setTransform(1, 0, 0, 1, relativePos.x + screenSize.x/2, relativePos.y + screenSize.y/2);

			this.rotate(-r);
			this.flipCanvas(t.size);
			this.context.drawImage(
				image,
				sheetPosition.x,
				sheetPosition.y,
				sheetSize.x,
				sheetSize.y,
				-s.x/2,
				-s.y/2,
				s.x,
				s.y
			);
			this.flipCanvas(t.size);
		}
	}

	public static rotate(r: number): void {
		this.context.rotate(r);
	}

	public static drawGameObject(gameObject): void {
		if (gameObject.spritesheetAnimationSet) {
			gameObject.image = GameManager.currentLevel.cachedImages[gameObject.spritesheetAnimationSet.imageSrc];
			let animationTransform = gameObject.spritesheetAnimationSet.currentAnimationTransform;
			Canvas.drawGameObjectPartialImage(
				gameObject,
				animationTransform.position,
				animationTransform.size,
			);
		}
		else if (gameObject.imageSrc) {
			gameObject.image = GameManager.currentLevel.cachedImages[gameObject.imageSrc];
			if (gameObject.spritesheetBounds) {
				let boundsPos = new Vector2(
					gameObject.spritesheetBounds.x,
					gameObject.spritesheetBounds.y
				);
				let boundsSize = new Vector2(
					gameObject.spritesheetBounds.width,
					gameObject.spritesheetBounds.height
				);
				Canvas.drawGameObjectPartialImage(
					gameObject,
					boundsPos,
					boundsSize
				);
			}
			else {
				Canvas.drawGameObjectImage(gameObject);
			}
		}
		else {
			if (gameObject.fillStyle) {
				if (gameObject.shape == "square") {
					Canvas.fillGameObjectRect(gameObject);
				}
			}
			if (gameObject.strokeStyle) {
				if (gameObject.shape == "square") {
					Canvas.strokeGameObjectRect(gameObject);
				}
			}
		}

		let t = gameObject.transform;
		if (GameManager.showingDebug || gameObject.drawTransform) {
			Canvas.strokeGameObjectRect(gameObject);
		}

		if (gameObject.collider && (GameManager.showingDebug)) {
			this.strokeGameObjectCollider(gameObject);
		}
	}


	/** Handles camera placement, scaling, and won't draw if outside visible rect */
	public static strokeRect(position: Vector2, size: Vector2, color:string, r:number=0): void {
		let camera: Camera = GameManager.camera;
		let absolutePosition = position.scale(GameManager.unitSize);
		let absoluteSize = size.scale(GameManager.unitSize);
		if (camera.inViewOf(absolutePosition, absoluteSize)) {
			Canvas.setStrokeStyle(color);
			let relativePos: Vector2 = camera.relativeWorldspacePosition(absolutePosition);
			this.setTransform(relativePos);
			Canvas.rotate(-r);
			Canvas.context.strokeRect(
				-absoluteSize.x/2,
				-absoluteSize.y/2,
				absoluteSize.x,
				absoluteSize.y
			);
		}
	}
	/** Handles camera placement, won't draw if outside visible rect */
	public static strokeGameObjectRect(gameObject:GameObject): void {
		let t = gameObject.transform;
		let p = t.position;
		let s = t.size;
		let color = gameObject.strokeStyle;
		if (!color) color = gameObject.drawTransformColor || "#FF0000";
		if (color) this.strokeRect(p, s, color, t.rotation);
	}


	/** Handles camera placement, scaling, and won't draw if outside visible rect */
	public static fillRect(position: Vector2, size: Vector2, color:string, r: number=0): void {
		let camera: Camera = GameManager.camera;
		let absolutePosition = position.scale(GameManager.unitSize);
		let absoluteSize = size.scale(GameManager.unitSize);
		if (camera.inViewOf(absolutePosition, absoluteSize)) {
			Canvas.setFillStyle(color);
			let relativePos: Vector2 = camera.relativeWorldspacePosition(absolutePosition);
			this.setTransform(relativePos);
			Canvas.rotate(-r);
			Canvas.context.fillRect(
				-absoluteSize.x/2,
				-absoluteSize.y/2,
				absoluteSize.x,
				absoluteSize.y
			);
		}
		else {
			console.log("fillRect rejected outside camera")
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

	public static strokeGameObjectCollider(gameObject: GameObject): void {
		let color = gameObject.drawColliderColor || "#00FF00"
		this.strokeRect(gameObject.colliderPosition(), gameObject.rectColliderSize(), color)
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

	public static drawUnitSizeGrid(color:string="#FFFFFF44"): void {
		this.setTransform(new Vector2(0, 0));
		let halfScreenSize = GameManager.screenSize.scale(0.5);
		this.context.strokeStyle = color;
		let unitSize = GameManager.currentLevel.unitSize;
		this.setLineWidth(1);

		for (let i=0; i<halfScreenSize.x; i+=unitSize) {
			this.context.beginPath();
			this.context.moveTo(i, -halfScreenSize.y);
			this.context.lineTo(i, halfScreenSize.y);
			this.context.stroke();

			this.context.beginPath();
			this.context.moveTo(-i, -halfScreenSize.y);
			this.context.lineTo(-i, halfScreenSize.y);
			this.context.stroke();
		}

		for (let i=0; i<halfScreenSize.y; i+=unitSize) {
			this.context.beginPath();
			this.context.moveTo(-halfScreenSize.x, i);
			this.context.lineTo(halfScreenSize.x, i);
			this.context.stroke();

			this.context.beginPath();
			this.context.moveTo(-halfScreenSize.x, -i);
			this.context.lineTo(halfScreenSize.x, -i);
			this.context.stroke();
		}
	}

	public static setBackgroundColor(color:string): void {
		this.canvas.style.backgroundColor = color;
	}
}
