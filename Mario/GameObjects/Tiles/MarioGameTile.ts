interface MarioGameTileParams {
	hasCollider: boolean;
	breakFromBeneath: boolean;
	allowPassThrough: boolean;
	spritesheetAnimationSet: SpritesheetAnimationSet;
}

class MarioGameTile extends GameObject {

	protected static spriteSheet: string = 'Images/SpriteSheetTiles.png';
	protected static spriteSize: Vector2 = new Vector2(16, 16);

	public breakFromBeneath: boolean;

	constructor(params:MarioGameTileParams) {
		super({ layer: 1 });
		this.setDefaultCollider();
		if (params.hasCollider) {
			this.collider.allowPassThroughWhitelist = [BackBarrier];
			if (params.allowPassThrough) {
				this.collider.allowPassThroughWhitelist.push(MarioPlayer);
			}
			this.breakFromBeneath = params.breakFromBeneath;
		}
		this.spritesheetAnimationSet = params.spritesheetAnimationSet;
	}

	onNoPassthroughTouch(other:GameObject): void {
		if (other instanceof MarioPlayer) {
			other.velocity.x = 0;
		}
	}
}
