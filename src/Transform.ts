import Vector2 from "./Vector2";

interface TransformParams {
	position?: Vector2;
	size?: Vector2;
	rotation?: number;
}

export default class Transform {
	public position: Vector2;
	public size: Vector2;
	public rotation: number;

	constructor(params: TransformParams = <TransformParams>{}) {
		this.position = params.position || new Vector2(0, 0);
		this.size     = params.size || new Vector2(1, 1);
		this.rotation = params.rotation || 0;
	}
}
