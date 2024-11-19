import { Vector } from "./vector.js"
import { Clock } from "./clock.js"

// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let winSize = new Vector();

function resizeCanvas() {
	winSize.x = canvas.width = window.innerWidth;
	winSize.y = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

// update mouse

let mousePos = new Vector();

document.addEventListener("mousemove", event => {
	mousePos.replace(event.clientX, event.clientY);
})

// create particles

const particles = [];

class Particle {
	constructor(mass, color) {
		this.pos = new Vector(Math.random() * winSize.x, Math.random() * winSize.y);
		this.vel = new Vector();
		
		this.color = color;
		this.mass = mass;

		particles.push(this);
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, Math.sqrt(this.mass), 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}

const scale = 20;

const sun = new Particle(scale * 100, "rgb(255, 200, 0)");

const templates = [
    [0.38, "rgb(169, 169, 169)"],  // Mercury
    [0.95, "rgb(255, 204, 0)"],    // Venus
    [1, "rgb(0, 102, 204)"],       // Earth
    [0.53, "rgb(204, 51, 51)"],    // Mars
    [11.19, "rgb(204, 153, 102)"], // Jupiter
    [9.45, "rgb(204, 204, 153)"],  // Saturn
    [4.01, "rgb(102, 204, 255)"],  // Uranus
    [3.88, "rgb(51, 102, 204)"],   // Neptune
];

templates.forEach(template => {
	new Particle(scale * template[0], template[1]);
})

// clamp function

function clamp(n, min, max) {
    return Math.max(min, Math.min(n, max));
}

// main loop

const clock = new Clock();

function update() {
	// reset

	sun.pos = sun.pos.add(mousePos.sub(sun.pos).div(10));
	sun.vel.replace(0, 0);

	clock.tick();
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// draw particles

	particles.forEach(p1 => {
		particles.forEach(p2 => {
			if (p1 == p2) { return; }

			const direction = p1.pos.sub(p2.pos);
			const ds = direction.lengthSquared;
		
			if (ds > 500) {
				const magnitude = 10000 / Math.max(ds, 10000);
				const force = direction.unit.mult(magnitude * clock.dt);

				p1.vel = p1.vel.sub(force.mult(p2.mass));
				p2.vel = p2.vel.add(force.mult(p1.mass));
			}
		})

		p1.pos = p1.pos.add(p1.vel.mult(clock.dt));

		// clamp and contain

		if (p1.pos.x <= 0 || p1.pos.x >= winSize.x) {
			p1.vel.x = 0;
		}

		if (p1.pos.y <= 0 || p1.pos.y >= winSize.y) {
			p1.vel.y = 0;
		}

		p1.pos.replace(
			clamp(p1.pos.x, 0, winSize.x),
			clamp(p1.pos.y, 0, winSize.y)
		)

		// draw

		p1.draw();
	});

	// loop

	window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);