class Point {
    constructor({ x, y, size, ctx, color, pice }) {
        this.size = size;
        this.ctx = ctx;
        this.color = color;
        this.x = pice.x;
        this.y = pice.y;
        this.ofx = x; // offset x
        this.ofy = y; // offset y
        this.a = 0; // angle

        this.tx = this.x; // target x
        this.ty = this.y; // target y
        this.ta = this.a; // target angle
        this.tofx = this.ofx; // target ofset x
        this.tofy = this.ofy; // target ofset y
        this.vx = 0.1;  // velocity x
        this.vy = 0.1; // velocity y
        this.va = 1; // velocity angle


        this.isFixed = false;
        this.ofa = Math.atan2(this.ofy, this.ofx); // ofset rotation angle
        this.d = Math.sqrt(this.ofy * this.ofy + this.ofx * this.ofx); // distance

        this.speed = 3;

        // rectangle center destence
        this.rcd = Math.round(Math.sqrt(
            (this.size / 2) ** 2 + (this.size / 2) ** 2));
    }

    update() {

        // for move y
        if (this.y != this.ty) {
            this.y = parseFloat((this.vy + this.y).toFixed(2));
        } else if (!this.isFixed) {
            this.ty++;
            this.y = parseFloat((this.vy + this.y).toFixed(2));
        }

        // for move x
        if (this.x != this.tx) {
            for (let i = 0; i < this.speed; i++) {
                this.x = parseFloat((this.vx + this.x).toFixed(2));
                if (this.tx == this.x) break;
            }
        }

        // for rotation
        if (this.a != this.ta) {
            for (let i = 0; i < this.speed * 8; i++) {
                this.a = (this.a + this.va) % 360;

                if (this.a == this.ta) break;
            }
        }

    }

    #getRectCos(angle) {
        return this.size * 0.5 + this.rcd * Math.cos(Math.toRad(this.a + angle));
    }

    #getRectSin(angle) {
        return this.size * 0.5 + this.rcd * Math.sin(Math.toRad(this.a + angle));
    }

    draw() {
        const { x, y, d, ofa, size, a, ctx } = this;
        const cos = size * x + Math.cos(Math.toRad(a) + ofa) * size * d;
        const sin = size * y + Math.sin(Math.toRad(a) + ofa) * size * d;


        ctx.fillStyle = this.color;
        ctx.strokeStyle = "#f0f"
        ctx.lineWidth = 1
        ctx.beginPath();

        ctx.moveTo(cos + this.#getRectCos(225),
            sin + this.#getRectSin(225));

        ctx.lineTo(cos + this.#getRectCos(315),
            sin + this.#getRectSin(315));

        ctx.lineTo(cos + this.#getRectCos(45),
            sin + this.#getRectSin(45));

        ctx.lineTo(cos + this.#getRectCos(135),
            sin + this.#getRectSin(135));

        ctx.closePath();
        ctx.fill();
        ctx.stroke()

    }

}