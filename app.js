const particle = document.getElementById("particle");

let px = 0;
let py = 0;

let pvx = 0;
let pvy = 0;

let mx = 0;
let my = 0;

window.addEventListener("mousemove", (event) => {
    mx = event.clientX;
    my = event.clientY;
})

let last_update = window.performance.now();

function update() {
    const now = window.performance.now();
    const dt = now - last_update;
    last_update = now;

    // gravity code here
    
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);