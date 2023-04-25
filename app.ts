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
    image: HTMLImageElement;
    static width = 40;
    static height = 40;
    constructor(position: Position, image: HTMLImageElement) {
        this.position = position;
        this.image = image;
    }

    draw() {
        // ctx.fillStyle = "blue";
        // ctx.fillRect(this.position.x, this.position.y, Boundary.width, Boundary.height);
        ctx.drawImage(this.image, this.position.x, this.position.y, Boundary.width, Boundary.height);
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
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
    }
}

class Food {
    position: Position;
    radius: number;
    constructor(position: Position) {
        this.position = position;
        this.radius = 5;
    }

    draw() {
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

const gameMap: string[][] = [
    ['tl', '=','=','=','=','=','tr'],
    ['|', ' ','*','*','*','*','|'],
    ['|', '*','-','*','-','*','|'],
    ['|', '*','*','*','*','*','|'],
    ['|', '*','-','*','-','*','|'],
    ['|', '*','*','*','*','*','|'],
    ['bl', '=','=','=','=','=','br'],
]

let manVelocity = 5;

const boundaries: Boundary[] = [];
const foodPellets: Food[] = [];

let block = new Image();
let top_bottom = new Image();
let left_right = new Image();
let top_left = new Image();
let top_right = new Image();
let bottom_left = new Image();
let bottom_right = new Image();

block.src = "./sprites/block.png";
top_bottom.src = "./sprites/top-bottom.png";
left_right.src = "./sprites/left-right.png";
top_left.src = "./sprites/top-left.png";
top_right.src = "./sprites/top-right.png";
bottom_left.src = "./sprites/bottom-left.png";
bottom_right.src = "./sprites/bottom-right.png";


gameMap.forEach((row, y) => {
    row.forEach((cell, x) => {
        if (cell === '-') {
            boundaries.push(new Boundary({ x: x * Boundary.width, y: y * Boundary.height }, block));
        }
        else if (cell === '=') {
            boundaries.push(new Boundary({ x: x * Boundary.width, y: y * Boundary.height }, top_bottom));
        }
        else if (cell === '|') {
            boundaries.push(new Boundary({ x: x * Boundary.width, y: y * Boundary.height }, left_right));
        }
        else if (cell === 'tl') {
            boundaries.push(new Boundary({ x: x * Boundary.width, y: y * Boundary.height }, top_left));
        }
        else if (cell === 'tr') {
            boundaries.push(new Boundary({ x: x * Boundary.width, y: y * Boundary.height }, top_right));
        }
        else if (cell === 'bl') {
            boundaries.push(new Boundary({ x: x * Boundary.width, y: y * Boundary.height }, bottom_left));
        }
        else if (cell === 'br') {
            boundaries.push(new Boundary({ x: x * Boundary.width, y: y * Boundary.height }, bottom_right));
        }
        else if (cell === '*') {
            foodPellets.push(new Food({ x: x * Boundary.width + Boundary.width/2, y: y * Boundary.height + Boundary.height/2 }));
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


const dectectCollision = (circle, rectangle) => {
    return circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x && 
    circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + Boundary.width &&
    circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
    circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + Boundary.height
}

// function written using math.hypotenuse
const detectCollisionWithFood = (circle: Pacman, food: Food) => {
    return Math.hypot(circle.position.x + circle.radius - food.position.x, circle.position.y + circle.radius - food.position.y) <= circle.radius + food.radius ||
    Math.hypot(circle.position.x - circle.radius - food.position.x, circle.position.y + circle.radius - food.position.y) <= circle.radius + food.radius ||
    Math.hypot(circle.position.x + circle.radius - food.position.x, circle.position.y - circle.radius - food.position.y) <= circle.radius + food.radius ||
    Math.hypot(circle.position.x - circle.radius - food.position.x, circle.position.y - circle.radius - food.position.y) <= circle.radius + food.radius;

}

let animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (keys.w.isDown && lastKey === "w") {
        for(let i = 0; i < boundaries.length; i++) {
            if (dectectCollision({...pacman, velocity: {x:0, y:-manVelocity}}, boundaries[i])) {
                pacman.velocity.y = 0;
                break;
            }
            else {
                pacman.velocity.y = -manVelocity;
            }
        }
    }
    else if (keys.a.isDown && lastKey === "a") {
        for(let i = 0; i < boundaries.length; i++) {
            if (dectectCollision({...pacman, velocity: {x:-manVelocity, y:0}}, boundaries[i])){
                pacman.velocity.x = 0;
                break;
            }
            else {
                pacman.velocity.x = -manVelocity;
            }
        }
    }
    else if (keys.s.isDown && lastKey === "s") {
        for(let i = 0; i < boundaries.length; i++) {
            if (dectectCollision({...pacman, velocity: {x:0, y:manVelocity}}, boundaries[i])){
                pacman.velocity.y = 0;
                break;
            }
            else {
                pacman.velocity.y = manVelocity;
            }
        }
    }
    else if (keys.d.isDown && lastKey === "d") {
        for(let i = 0; i < boundaries.length; i++) {
            if (dectectCollision({...pacman, velocity: {x:manVelocity, y:0}}, boundaries[i])){
                pacman.velocity.x = 0;
                break;
            }
            else {
                pacman.velocity.x = manVelocity;
            }
        }
    }

    boundaries.forEach(boundary => {
        boundary.draw();
        
        if (dectectCollision(pacman, boundary)) {
                pacman.velocity.x = 0;
                pacman.velocity.y = 0;
            }
    });

    foodPellets.forEach((pellet, i) => {
        pellet.draw();
        if (detectCollisionWithFood(pacman, pellet)) {
            foodPellets.splice(i, 1);
        }
    });

    pacman.update();

    // pacman.velocity.x = 0;
    // pacman.velocity.y = 0;

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


