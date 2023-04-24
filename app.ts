// Created from : https://www.youtube.com/watch?v=5IMXpp3rohQ

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
    ['-', ' ','-',' ','-',' ','-'],
    ['-', ' ',' ',' ',' ',' ','-'],
    ['-', ' ','-',' ','-',' ','-'],
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

const pacman: Pacman = new Pacman({ x: Boundary.width + Boundary.width /2, y: Boundary.height + Boundary.height /2 });

const keys = {
    w: {
        isDown: false,
    },
    a: {
        isDown: false,
    },
    s: {
        isDown: false,
    },
    d: {
        isDown: false,
    }
}

let lastKey: string = "";

let animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    boundaries.forEach(boundary => {
        boundary.draw();

        if (pacman.position.x + pacman.radius + pacman.velocity.x >= boundary.position.x && 
            pacman.position.x - pacman.radius + pacman.velocity.x <= boundary.position.x + Boundary.width &&
            pacman.position.y + pacman.radius + pacman.velocity.y >= boundary.position.y &&
            pacman.position.y - pacman.radius + pacman.velocity.y <= boundary.position.y + Boundary.height) {
                pacman.velocity.x = 0;
                pacman.velocity.y = 0;
            }
    });
    pacman.update();

    pacman.velocity.x = 0;
    pacman.velocity.y = 0;

    if (keys.w.isDown && lastKey === "w") {
        pacman.velocity.y = -5;
    }
    else if (keys.a.isDown && lastKey === "a") {
        pacman.velocity.x = -5;
    }
    else if (keys.s.isDown && lastKey === "s") {
        pacman.velocity.y = 5;
    }
    else if (keys.d.isDown && lastKey === "d") {
        pacman.velocity.x = 5;
    }
}

window.addEventListener("keydown", (e: KeyboardEvent) => {
    switch (e.key) {
        case "a":
            keys.a.isDown = true;
            lastKey = "a";
            break;
        case "d":
            keys.d.isDown = true;
            lastKey = "d";
            break;
        case "w":
            keys.w.isDown = true;
            lastKey = "w";  
            break;
        case "s":
            keys.s.isDown = true;
            lastKey = "s"; 
            break;
    }
});

window.addEventListener("keyup", (e: KeyboardEvent) => {
    switch (e.key) {
        case "a":
            keys.a.isDown = false;
            break;
        case "d":
            keys.d.isDown = false;
            break;
        case "w":
            keys.w.isDown = false;  
            break;
        case "s":
            keys.s.isDown = false; 
            break;
    }
});

animate();


