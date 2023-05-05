import { Position } from "./Boundary";

class Pacman {
    position: Position;
    velocity: {x: number, y: number};
    radius: number;
    ctx: CanvasRenderingContext2D;

    constructor(position: Position, ctx: CanvasRenderingContext2D) {
        this.position = position;
        this.velocity = { x: 0, y: 0 };
        this.radius = 15;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.fillStyle = "yellow";
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
    }
}

export default Pacman;