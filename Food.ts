import { Position } from "./Boundary";

class Food {
    position: Position;
    radius: number;
    ctx: CanvasRenderingContext2D;

    constructor(position: Position, ctx: CanvasRenderingContext2D) {
        this.position = position;
        this.radius = 5;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.fillStyle = "green";
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export default Food;