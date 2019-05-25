class Utils {
	public static isFunction(functionToCheck: Function): boolean {
		return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
	}

	public static fps(): number { return 1000 / Time.deltaTime; }
}
