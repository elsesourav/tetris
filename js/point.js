class Point {
    constructor({ x, y, size, ctx, color }) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 1;
        this.dx = 0;
        this.dy = 0;
        this.tx = this.x;
        this.ty = this.y + 1;
        this.size = size;
        this.ctx = ctx;
        this.color = color;
    }

    update(is = false) {
        if (this.ty != this.y) {
            this.dy = (this.dy + this.vy) % this.size;
            if (!this.dy) {
                this.y = this.ty;
                is && this.ty++;
            }
        }

        if (this.tx != this.x) {
            this.vx = this.tx - this.x > 0 ? 1 : -1;

            for (let i = 0; i < 3; i++) {
                this.dx = (this.dx + this.vx) % this.size;
                if (!this.dx) { this.x = this.tx; }
            }
        }
    }

    draw() {
        const { x, y, dx, dy, size, color, ctx } = this;

        ctx.fillStyle = color;
        ctx.fillRect(x * size + dx, y * size + dy, size, size);

        // draw point border 
        ctx.beginPath();
        ctx.strokeStyle = "#0ff";
        ctx.lineWidth = 1;
        ctx.moveTo(x * size + dx, y * size + dy);
        ctx.lineTo(x * size + size + dx, y * size + dy);
        ctx.lineTo(x * size + size + dx, y * size + size + dy);
        ctx.lineTo(x * size + dx, y * size + size + dy);
        ctx.closePath();
        ctx.stroke();
    }

}