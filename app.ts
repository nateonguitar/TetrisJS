import Camera from './Camera';
import Canvas from './Canvas';
import Collider from './Collider';
import RectCollider from './RectCollider';
import Debug from './Debug';
import GameLauncher from './GameLauncher';
import GameManager from './GameManager';
import GameObject from './GameObject';
import HudGameObject from './HudGameObject';
import Level from './Level';
import SpritesheetAnimation from './SpritesheetAnimation';
import SpritesheetAnimationSet from './SpritesheetAnimationSet';
import StressTestSquare from './StressTestSquare';
import Time from './Time';
import Transform from './Transform';
import Utils from './Utils';
import Vector2 from './Vector2';
import VectorN from './VectorN';
import Input from './Input';
import Keys from './Keys';

export default class App {
	// makes webpack bundle all of the classes.  Any new class added to the project needs to be registered here.
	public registeredClasses: any[] = [
		Camera,
		Canvas,
		Collider,
		RectCollider,
		Debug,
		GameLauncher,
		GameManager,
		GameObject,
		HudGameObject,
		Level,
		SpritesheetAnimation,
		SpritesheetAnimationSet,
		StressTestSquare,
		Time,
		Transform,
		Utils,
		Vector2,
		VectorN,
		Input,
		Keys,
	];
}
