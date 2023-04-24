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
    ['-', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', ' ', '-', ' ', ' ', '-'],
    ['-', ' ', ' ', ' ', '-', ' ', '-'],
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
boundaries.forEach(function (boundary) { return boundary.draw(); });
var pacman = new Pacman({ x: Boundary.width + Boundary.width / 2, y: Boundary.height + Boundary.height / 2 });
pacman.draw();
var animate = function () {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    boundaries.forEach(function (boundary) { return boundary.draw(); });
    pacman.update();
};
window.addEventListener("keydown", function (e) {
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
window.addEventListener("keyup", function (e) {
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
