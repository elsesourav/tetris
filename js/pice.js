class Pice {
    constructor({ ctx, game, x, y, scale, ptn, vx = 3, vy = 1 }) {
        this.ctx = ctx;
        this.game = game;
        this.x = x;
        this.y = y;
        this.mnx = this.x;
        this.mny = this.y;
        this.count = 0;
        this.dx = 0;
        this.dy = 0;
        this.vx = vx;
        this.vy = vy;
        this.scale = scale;
        this.ptn = ptn[Math.floor(Math.random() * ptn.length)];
        this.ci = Math.floor(Math.random() * 4); // curren index
        this.points = [];
        this.#setPoint();

    }

    rotate() {
        this.ci = (this.ci + 1) % 4;
        this.#setPoint();
    }

    #setPoint() {
        this.points = [];
        this.ptn[this.ci].forEach((cols, i) => {
            cols.forEach((element, j) => {
                if (element) {
                    this.points.push([j * this.scale, i * this.scale]);
                }
            }
            )
        })
    }

    draw() {
        const { ctx, x, y, scale, points } = this;
        this.points.forEach(point => {
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.strokeStyle = "#0ff";
            ctx.lineWidth = 1;
            ctx.rect(x + point[0], y + point[1], scale, scale);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        })
    }

    update() {
        this.count = (this.count + 1) % this.scale;
        if (!this.count) {
            this.mny += this.scale;
        }
        // this.y += (this.mny - this.y) * 0.1;


        this.y += this.vy;
        if (this.dx != 0) {

            this.x += this.vx;
        }
    }

    isColide() {
        /* ---- check collusion detection ---- */

        // collusion in ground
        return this.points.some(point =>
            (this.y + point[1] + this.scale) >= this.game.height ||

            // collusion in place pices
            this.game.placePices.some(p =>
                (this.x + point[0]) == p.x &&
                (this.y + point[1] + this.scale) >= p.y)
        );



    }

    leftIsEmpty() {
        return !this.points.some(point => 
            (this.x + point[0] - this.scale) <= 0 ||

            // collusion in place pices
            this.game.placePices.some(p => 

                (this.y + point[1]) == p.y &&
                    (p.x + this.scale) <= (this.x + point[0] - this.scale)
            )
        );
    }

    save(array) {
        let id;
        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            id = Math.floor((this.y + point[1]) / this.scale);

            if (id < 0) this.game.animation.stop();

            array.push({
                id: id,
                x: this.x + point[0],
                y: this.y + point[1]
            });
        }
    }
}






