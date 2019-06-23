type TextAlignType = 'center' | 'left' | 'right';

class Canvas {

	public static gameCanvas: HTMLCanvasElement = null;
	public static context: CanvasRenderingContext2D = null;

	public static create(): void {
		this.gameCanvas = document.createElement("canvas");
		this.gameCanvas.id = "game-canvas";
		this.gameCanvas.classList.add("canvas");
		this.gameCanvas.style.border = GameManager.options.border;
		this.gameCanvas.style.backgroundColor = GameManager.options.backgroundColor;
		this.gameCanvas.width = GameManager.options.screenWidth;
		this.gameCanvas.height = GameManager.options.screenHeight;
		this.gameCanvas.style.width = GameManager.options.screenWidth + "px";
		this.gameCanvas.style.height = GameManager.options.screenHeight + "px";


		let parentElement = document.getElementById(GameManager.options.parentElementID);
		let el = parentElement ? parentElement : document.body;

		el.appendChild(this.gameCanvas);

		// 2d context alpha: Boolean that indicates if the canvas contains an alpha channel.
		// If set to false, the browser now knows that the backdrop is always opaque,
		// which can speed up drawing of transparent content and images.
		this.context = this.gameCanvas.getContext("2d", {alpha: false});
		// turn off a few other features for performance
		this.context.imageSmoothingEnabled = GameManager.options.imageAntiAliasing;
		this.context.shadowBlur = 0;
	}

	public static wipe(): void {
		this.context.setTransform(1, 0, 0, 1, 0, 0);
		this.context.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
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

	/**
	 * If the GameObject is not a HudGameObject this handles camera placement, won't draw if outside visible rect.
	 * ```
	 * Canvas.drawGameObjectImage(player)
	 * ```
	 **/
	public static drawGameObjectImage(gameObject:GameObject): void {
		let image: any = gameObject.image;
		let camera: Camera = GameManager.camera;
		let t: Transform = gameObject.transform;
		let p: Vector2 = gameObject.absolutePosition;
		let s: Vector2 = gameObject.absoluteSize;
		let r: number = t.rotation;

		if (camera.inViewOfGameObject(gameObject)) {
			let relativePos: Vector2 = gameObject instanceof HudGameObject
				? gameObject.getHudDrawPosition()
				: camera.relativeWorldspacePosition(p);

			let screenSize = GameManager.screenSize;
			this.context.setTransform(1, 0, 0, 1, relativePos.x + screenSize.x/2, relativePos.y + screenSize.y/2);
			this.context.rotate(-r);
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
		let unitSize = gameObject.unitSize;
		let t: Transform = gameObject.transform;
		let p: Vector2 = gameObject.absolutePosition;
		let s: Vector2 = t.size.scale(unitSize);
		let r: number = t.rotation;

		if (camera.inViewOfGameObject(gameObject)) {

			let relativePos: Vector2 = gameObject instanceof HudGameObject
				? gameObject.getHudDrawPosition()
				: camera.relativeWorldspacePosition(p);

			let screenSize = GameManager.screenSize;

			this.context.setTransform(1, 0, 0, 1, relativePos.x + screenSize.x/2, relativePos.y + screenSize.y/2);

			this.context.rotate(-r);
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

	public static drawGameObject(gameObject: GameObject): void {
		if (gameObject.spritesheetAnimationSet) {
			gameObject.image = GameManager.currentLevel.cachedImages[gameObject.spritesheetAnimationSet.imageSrc];
			let animationTransform = gameObject.spritesheetAnimationSet.currentAnimationTransform;
			Canvas.drawGameObjectPartialImage(
				gameObject,
				animationTransform.position,
				animationTransform.size
			);
		}
		else if (gameObject.imageSrc) {
			gameObject.image = GameManager.currentLevel.cachedImages[gameObject.imageSrc];
			if (gameObject.imageBounds) {
				let boundsPos = gameObject.imageBounds.position.clone();
				let boundsSize = gameObject.imageBounds.size.clone();
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
			if (gameObject.shapeFillStyle) {
				if (gameObject.shape == "square") {
					Canvas.fillGameObjectRect(gameObject);
				}
			}
			if (gameObject.shapeStrokeStyle) {
				if (gameObject.shape == "square") {
					Canvas.strokeGameObjectRect(gameObject);
				}
			}
		}

		let t = gameObject.transform;

		if (GameManager.showingDebug || gameObject.showTransform) {
			Canvas.strokeGameObjectRect(gameObject);
		}

		if (gameObject.collider && (GameManager.showingDebug)) {
			this.strokeGameObjectCollider(gameObject);
		}

		this.drawGameObjectText(gameObject);
	}

	public static drawGameObjectText(gameObject: GameObject): void {
		if (gameObject.text || '' != '' && gameObject.inViewOfCamera) {
			let color = gameObject.textColor || "#000000";
			let camera = GameManager.camera;
			let unitSize = gameObject.unitSize;
			let t: Transform = gameObject.transform;
			let p: Vector2 = gameObject.absolutePosition;
			let s: Vector2 = t.size.scale(unitSize);
			let r: number = t.rotation;

			let relativePos: Vector2 = gameObject instanceof HudGameObject
				? gameObject.getHudDrawPosition()
				: camera.relativeWorldspacePosition(p);

			// relativePos = relativePos.add(s.scale(0.5));
			this.setTransform(relativePos);
			this.context.rotate(-r);
			this.flipCanvas(t.size);

			let font = '';
			font += gameObject.textBold ? 'bold ' : '';
			font += gameObject.textItalic ? 'italic ' : '';
			font += unitSize + "px "
			font += (gameObject.textFont || GameManager.options.font);
			this.context.font = font;
			this.context.textAlign = gameObject.textAlign || "center";
			this.setFillStyle(color);
			this.context.fillText(
				gameObject.text,
				0, //-Math.abs(s.x),
				0, //-Math.abs(s.y/2),
				Math.abs(s.x)
			);
		}
	}


	/** Does not handle scaling.  Make sure you multiply any gameObject's position and size by its unitSize */
	public static strokeRect(position: Vector2, size: Vector2, color:string, cameraRelative: boolean, r:number=0): void {
		let camera: Camera = GameManager.camera;
		Canvas.setStrokeStyle(color);
		let relativePos: Vector2 = cameraRelative
			? camera.relativeWorldspacePosition(position)
			: position;
		this.setTransform(relativePos);
		this.context.rotate(-r);
		Canvas.context.strokeRect(
			-size.x/2,
			-size.y/2,
			size.x,
			size.y
		);
	}

	public static strokeGameObjectRect(gameObject:GameObject): void {
		let t = gameObject.transform;
		let p = t.position.scale(gameObject.unitSize);
		let s = t.size.scale(gameObject.unitSize);
		let color = gameObject.shapeStrokeStyle;
		let cameraRelative = !(gameObject instanceof HudGameObject);
		if (!color) color = gameObject.transformColor || "#FF0000";
		if (color) this.strokeRect(p, s, color, cameraRelative, t.rotation);
	}


	/** Does not handle scaling.  Make sure you multiply any gameObject's position and size by its unitSize */
	public static fillRect(position: Vector2, size: Vector2, color:string, cameraRelative: boolean, r: number=0): void {
		let camera: Camera = GameManager.camera;
		Canvas.setFillStyle(color);
		let relativePos: Vector2 = cameraRelative
			? camera.relativeWorldspacePosition(position)
			: position;
		this.setTransform(relativePos);
		this.context.rotate(-r);
		Canvas.context.fillRect(
			-size.x/2,
			-size.y/2,
			size.x,
			size.y
		);

	}
	/** Handles camera placement, won't draw if outside visible rect */
	public static fillGameObjectRect(gameObject:GameObject): void {
		let t = gameObject.transform;
		let p = t.position.scale(gameObject.unitSize);
		let s = t.size.scale(gameObject.unitSize);
		let color = gameObject.shapeFillStyle;
		let cameraRelative = !(gameObject instanceof HudGameObject);
		if (!color) color = gameObject.transformColor || "#FF0000";
		if (color) this.fillRect(p, s, color, cameraRelative, t.rotation);
	}


	/**
	 * Moves the origin to the given position.
	 * Scale the position by the appropriate `unitSize` before handing it in.
	 */
	private static setTransform(position:Vector2): void {
		let screenSize: Vector2 = GameManager.screenSize;
		this.context.setTransform(1, 0, 0, 1, position.x + screenSize.x/2, position.y + screenSize.y/2);
	}

	public static strokeGameObjectCollider(gameObject: GameObject): void {
		let color = gameObject.colliderColor || "#00FF00";
		let absolutePosition = gameObject.colliderPosition().scale(gameObject.unitSize);
		let absoluteSize = gameObject.rectColliderSize().scale(gameObject.unitSize);
		let cameraRelative = !(gameObject instanceof HudGameObject);
		if (gameObject.inViewOfCamera) {
			this.strokeRect(absolutePosition, absoluteSize, color, cameraRelative)
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
		this.gameCanvas.style.backgroundColor = color;
	}
}
