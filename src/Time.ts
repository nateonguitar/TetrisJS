export default class Time {
	public static time: number = 0;
	public static deltaTime: number = 0;

	public static update(): void {
		let currentTime: number = (new Date()).getTime();
		Time.deltaTime = currentTime - Time.time;
		Time.time = currentTime;
	}
}
