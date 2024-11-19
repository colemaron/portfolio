class Clock {
	#last_updated;

	constructor() {
		this.#last_updated = 0;
		this.dt = 0;
	}

	get now() { return window.performance.now() / 1000; }

	tick() {
		this.dt = this.#last_updated - this.now;
		this.#last_updated = this.now;
	}
}

export { Clock };