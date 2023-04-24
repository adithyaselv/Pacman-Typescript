let welcome: string = "Welcome to TypeScript! Pacman";

let heading: HTMLElement = document.createElement("h1");
heading.textContent = welcome;

const canvas: HTMLCanvasElement = document.createElement("canvas");
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.id = "cvs";

let app: HTMLElement = document.getElementById("app");
app.appendChild(heading);
app.appendChild(canvas);

type Position = { x: number, y: number };

class Boundary {
    position: Position;
    static width = 40;
    static height = 40;
    constructor(position: Position) {
        this.position = position;
    }

    draw() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.position.x, this.position.y, Boundary.width, Boundary.height);
    }
}

class Pacman {
    position: Position;
    velocity: {x: number, y: number};
    radius: number;
    constructor(position: Position) {
        this.position = position;
        this.velocity = { x: 0, y: 0 };
        this.radius = 15;
    }

    draw() {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.draw();
    }
}

const gameMap: string[][] = [
    ['-', '-','-','-','-','-','-'],
    ['-', ' ',' ',' ',' ',' ','-'],
    ['-', ' ',' ',' ',' ',' ','-'],
    ['-', ' ',' ','-',' ',' ','-'],
    ['-', ' ',' ',' ','-',' ','-'],
    ['-', ' ',' ',' ',' ',' ','-'],
    ['-', '-','-','-','-','-','-'],
]

const boundaries: Boundary[] = [];

gameMap.forEach((row, y) => {
    row.forEach((cell, x) => {
        if (cell === '-') {
            boundaries.push(new Boundary({ x: x * 40, y: y * 40 }));
        }
    });
});

boundaries.forEach(boundary => boundary.draw());

const pacman: Pacman = new Pacman({ x: Boundary.width + Boundary.width /2, y: Boundary.height + Boundary.height /2 });

pacman.draw();

let animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    boundaries.forEach(boundary => boundary.draw());
    pacman.update();
}

window.addEventListener("keydown", (e: KeyboardEvent) => {
    switch (e.key) {
        case "a":
            pacman.velocity.x = -5;
            break;
        case "d":
            pacman.velocity.x = 5;
            break;
        case "w":
            pacman.velocity.y = -5;
            break;
        case "s":
            pacman.velocity.y = 5;
    }
});

window.addEventListener("keyup", (e: KeyboardEvent) => {
    switch (e.key) {
        case "a":
            pacman.velocity.x = 0;
            break;
        case "d":
            pacman.velocity.x = 0;
            break;
        case "w":
            pacman.velocity.y = 0;
            break;
        case "s":
            pacman.velocity.y = 0;
    }
});

animate();


