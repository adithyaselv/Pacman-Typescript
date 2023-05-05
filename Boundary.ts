type Position = { x: number, y: number };

class Boundary {
    position: Position;
    image: HTMLImageElement;
    static width = 40;
    static height = 40;
    ctx: CanvasRenderingContext2D;

    constructor(position: Position, image: HTMLImageElement, ctx: CanvasRenderingContext2D) {
        this.position = position;
        this.image = image;
        this.ctx = ctx;
    }

    draw() {
        // ctx.fillStyle = "blue";
        // ctx.fillRect(this.position.x, this.position.y, Boundary.width, Boundary.height);
        this.ctx.drawImage(this.image, this.position.x, this.position.y, Boundary.width, Boundary.height);
    }
}

export { Boundary, Position}