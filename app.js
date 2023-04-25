// Created from : https://www.youtube.com/watch?v=5IMXpp3rohQ
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    function Boundary(position, image) {
        this.position = position;
        this.image = image;
    }
    Boundary.prototype.draw = function () {
        // ctx.fillStyle = "blue";
        // ctx.fillRect(this.position.x, this.position.y, Boundary.width, Boundary.height);
        ctx.drawImage(this.image, this.position.x, this.position.y, Boundary.width, Boundary.height);
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
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
    };
    return Pacman;
}());
var Food = /** @class */ (function () {
    function Food(position) {
        this.position = position;
        this.radius = 5;
    }
    Food.prototype.draw = function () {
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    };
    return Food;
}());
var gameMap = [
    ['tl', '=', '=', '=', '=', '=', 'tr'],
    ['|', ' ', '*', '*', '*', '*', '|'],
    ['|', '*', '-', '*', '-', '*', '|'],
    ['|', '*', '*', '*', '*', '*', '|'],
    ['|', '*', '-', '*', '-', '*', '|'],
    ['|', '*', '*', '*', '*', '*', '|'],
    ['bl', '=', '=', '=', '=', '=', 'br'],
];
var manVelocity = 5;
var boundaries = [];
var foodPellets = [];
var block = new Image();
var top_bottom = new Image();
var left_right = new Image();
var top_left = new Image();
var top_right = new Image();
var bottom_left = new Image();
var bottom_right = new Image();
block.src = "./sprites/block.png";
top_bottom.src = "./sprites/top-bottom.png";
left_right.src = "./sprites/left-right.png";
top_left.src = "./sprites/top-left.png";
top_right.src = "./sprites/top-right.png";
bottom_left.src = "./sprites/bottom-left.png";
bottom_right.src = "./sprites/bottom-right.png";
gameMap.forEach(function (row, y) {
    row.forEach(function (cell, x) {
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
            foodPellets.push(new Food({ x: x * Boundary.width + Boundary.width / 2, y: y * Boundary.height + Boundary.height / 2 }));
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
var dectectCollision = function (circle, rectangle) {
    return circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + Boundary.width &&
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + Boundary.height;
};
// function written using math.hypotenuse
var detectCollisionWithFood = function (circle, food) {
    return Math.hypot(circle.position.x + circle.radius - food.position.x, circle.position.y + circle.radius - food.position.y) <= circle.radius + food.radius ||
        Math.hypot(circle.position.x - circle.radius - food.position.x, circle.position.y + circle.radius - food.position.y) <= circle.radius + food.radius ||
        Math.hypot(circle.position.x + circle.radius - food.position.x, circle.position.y - circle.radius - food.position.y) <= circle.radius + food.radius ||
        Math.hypot(circle.position.x - circle.radius - food.position.x, circle.position.y - circle.radius - food.position.y) <= circle.radius + food.radius;
};
var animate = function () {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (keys.w.isDown && lastKey === "w") {
        for (var i = 0; i < boundaries.length; i++) {
            if (dectectCollision(__assign(__assign({}, pacman), { velocity: { x: 0, y: -manVelocity } }), boundaries[i])) {
                pacman.velocity.y = 0;
                break;
            }
            else {
                pacman.velocity.y = -manVelocity;
            }
        }
    }
    else if (keys.a.isDown && lastKey === "a") {
        for (var i = 0; i < boundaries.length; i++) {
            if (dectectCollision(__assign(__assign({}, pacman), { velocity: { x: -manVelocity, y: 0 } }), boundaries[i])) {
                pacman.velocity.x = 0;
                break;
            }
            else {
                pacman.velocity.x = -manVelocity;
            }
        }
    }
    else if (keys.s.isDown && lastKey === "s") {
        for (var i = 0; i < boundaries.length; i++) {
            if (dectectCollision(__assign(__assign({}, pacman), { velocity: { x: 0, y: manVelocity } }), boundaries[i])) {
                pacman.velocity.y = 0;
                break;
            }
            else {
                pacman.velocity.y = manVelocity;
            }
        }
    }
    else if (keys.d.isDown && lastKey === "d") {
        for (var i = 0; i < boundaries.length; i++) {
            if (dectectCollision(__assign(__assign({}, pacman), { velocity: { x: manVelocity, y: 0 } }), boundaries[i])) {
                pacman.velocity.x = 0;
                break;
            }
            else {
                pacman.velocity.x = manVelocity;
            }
        }
    }
    boundaries.forEach(function (boundary) {
        boundary.draw();
        if (dectectCollision(pacman, boundary)) {
            pacman.velocity.x = 0;
            pacman.velocity.y = 0;
        }
    });
    foodPellets.forEach(function (pellet, i) {
        pellet.draw();
        if (detectCollisionWithFood(pacman, pellet)) {
            foodPellets.splice(i, 1);
        }
    });
    pacman.update();
    // pacman.velocity.x = 0;
    // pacman.velocity.y = 0;
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
