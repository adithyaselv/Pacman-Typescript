var welcome = "Welcome to TypeScript! Pacman";
var heading = document.createElement("h1");
heading.textContent = welcome;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.id = "cvs";
var app = document.getElementById("app");
app.appendChild(heading);
app.appendChild(canvas);
var Boundary = /** @class */ (function () {
    function Boundary(position) {
        this.position = position;
    }
    Boundary.prototype.draw = function () {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.position.x, this.position.y, Boundary.width, Boundary.height);
    };
    Boundary.width = 40;
    Boundary.height = 40;
    return Boundary;
}());
var Pacman = /** @class */ (function () {
    function Pacman(position) {
        this.position = position;
        this.velocity = { x: 0, y: 0 };
        this.radius = 15;
    }
    Pacman.prototype.draw = function () {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    };
    Pacman.prototype.update = function () {
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.draw();
    };
    return Pacman;
}());
var gameMap = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', ' ', '-', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', ' ', '-', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
];
var boundaries = [];
gameMap.forEach(function (row, y) {
    row.forEach(function (cell, x) {
        if (cell === '-') {
            boundaries.push(new Boundary({ x: x * 40, y: y * 40 }));
        }
    });
});
var pacman = new Pacman({ x: Boundary.width + Boundary.width / 2, y: Boundary.height + Boundary.height / 2 });
var keys = {
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
};
var lastKey = "";
var animate = function () {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    boundaries.forEach(function (boundary) {
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
};
window.addEventListener("keydown", function (e) {
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
window.addEventListener("keyup", function (e) {
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
