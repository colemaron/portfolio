class Vector {
	constructor(x = 0, y = x) {
		this.x = x;
		this.y = y;
	}

	// functions

	add(v) {
		return new Vector(this.x + v.x, this.y + v.y);
	}

	sub(v) {
		return new Vector(this.x - v.x, this.y - v.y);
	}

	mult(scalar) {
		return new Vector(this.x * scalar, this.y * scalar);
	}

	div(scalar) {
		return new Vector(this.x / scalar, this.y / scalar);
	}

	dot(v) {
		return this.x * v.x + this.y * v.y;
	}

	clampLength(n) {
		return this.length > n ? this.unit.mult(n) : this;
	}

	// attributes

	get length() {
		return Math.hypot(this.x, this.y);
	}

	get lengthSquared() {
		return this.x * this.x + this.y * this.y;
	}

	get unit() {
		return this.div(this.length);
	}

	// methods

	replace(x, y) {
		this.x = x;
		this.y = y;

		return this;
	}

	dot(v) {
		return this.x * v.x + this.y * v.y;
	}
}

export { Vector };