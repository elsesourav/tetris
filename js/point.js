class Point {
    constructor({ x, y, size, ctx, color }) {
        this.x = x;
        this.y = y;
        this.a = Math.atan2(y, x);
        this.d = Math.sqrt(x*x + y*y)
        this.piceX = 0;
        this.piceY = 0;
        this.angle = 0;
        this.vx = 0;
        this.vy = 1;
        this.dy = 0;
        this.ty = this.y + 1;
        this.size = size;
        this.ctx = ctx;
        this.color = color;
    }

    update() {
        if (this.ty != this.y) {
            this.dy = (this.dy + this.vy) % this.size;
            if (!this.dy) {
                this.y = this.ty;
            }
        }
    }

    draw() {
        const { piceX, piceY, x, y, d, a, dy, size, ctx } = this;
        // console.log(x, y);
        const s = Math.sin(Math.toRad(this.angle) + a);
        const c = Math.cos(Math.toRad(this.angle) + a);

        ctx.fillStyle = this.color;
        ctx.fillRect(
            piceX + d * size * c,
            piceY + d * size * s + dy,
            size,
            size
        );

        // draw point border 
        ctx.beginPath();
        ctx.strokeStyle = "#0ff";
        ctx.lineWidth = 1;
        ctx.moveTo(piceX + d * size * c, piceY + d * size * s + dy);
        ctx.lineTo(piceX + d * size * c + size, piceY + d * size * s + dy);
        ctx.lineTo(piceX + d * size * c + size, piceY + d * size * s + size + dy);
        ctx.lineTo(piceX + d * size * c, piceY + d * size * s + size + dy);
        ctx.closePath();
        ctx.stroke();
    }

}