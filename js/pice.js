class Pice {
    constructor({ ctx, game, x, y, scale, ptn = pattern, vx = 3, vy = 1 }) {
        this.ctx = ctx;
        this.game = game;
        this.x = x;
        this.y = y;
        this.tx = this.x;
        this.ty = this.y;
        this.cx = 0;
        this.cy = 0;

        this.count = 0;
        this.vx = vx;
        this.vy = vy;
        this.scale = scale;
        this.ptn = ptn[Math.floor(Math.random() * ptn.length)];
        this.ci = Math.floor(Math.random() * 4); // curren index
        this.points = [];
        this.#setPoint();

    }

    rotate() {
        let ti = (this.ci + 1) % 4;
        this.#setPoint(ti);

        let extra = 0;
        // calclute extra bundary outside or not
        this.points.forEach(point => {
            let left = this.x + point[0];
            let right = ((this.x + point[0]) - this.game.cols) + 1;

            if (left < 0 && Math.abs(extra) < Math.abs(left)) {
                extra = left;
            } else if (right > 0 && Math.abs(extra) < Math.abs(right)) {
                extra = right;
            }
        });

        const isColide = this.points.some(point =>
            this.game.placePices.some((pp, i) =>
                pp.some(p =>
                    this.x + point[0] == p && this.y + point[1] == i
                )
            )
        );

        if (extra && !isColide) {
            this.ci = ti;
            this.tx -= extra;
        } else if (!isColide) {
            this.ci = ti;
        } else {
            this.#setPoint();
        }
    }

    #setPoint(index = this.ci) {
        this.points = [];
        this.ptn[index].forEach((cols, i) => {
            cols.forEach((element, j) => {
                if (element) this.points.push([j, i]);
            }
            )
        })
    }

    draw() {
        const { ctx, x, y, scale, points } = this;
        points.forEach(point => {
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.strokeStyle = "#0ff";
            ctx.lineWidth = 1;
            ctx.rect((x + point[0]) * scale + 1 + this.cx,
                (y + point[1]) * scale + 1 + this.cy,
                scale - 2, scale - 2);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        })
    }

    update() {
        this.cy += this.vy;
        if (this.cy > this.scale) this.cy = 0;
        if (!this.cy) {
            this.y++;
            this.ty = this.y;
        }

        // this.y += (this.ty - this.y) * 0.1;
        if (this.tx != this.x) {
            const dir = this.tx - this.x > 0 ? 1 : -1;

            this.cx = (this.cx + this.vx * (dir)) % this.scale;
            if (!this.cx) {
                this.x = this.tx;
            }
        }

    }

    isColide() {
        /* ---- check collusion detection ---- */

        // collusion in ground
        return this.points.some(point =>
            (this.y + point[1] + 1) >= this.game.rows ||

            // collusion in place pices
            this.game.placePices.some((pp, i) =>
                pp.some(p => 
                    this.x + point[0] == p && this.y + point[1] + 1 == i
                )
            )

        );
    }

    leftIsEmpty() {
        // collusion in boundary
        return !this.points.some(point =>
            (this.tx + point[0]) <= 0 ||

            // collusion in place pices
            this.game.placePices.some((pp, i) =>
                pp.some(p =>
                    this.ty + point[1] == i && p + 1 == this.tx + point[0]
                )
            )
        )
    }

    rightIsEmpty() {
        // collusion in boundary
        return !this.points.some(point =>
            (this.tx + point[0] + 1) >= this.game.cols ||

            // collusion in place pices
            this.game.placePices.some((pp, i) =>
                pp.some(p =>
                    this.ty + point[1] == i && p - 1 == this.tx + point[0]
                )
            )
        )
    }

    save(array) {
        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            if (this.ty + point[1] < 0) {
                this.game.animation.stop();
                return;
            }

            array[this.ty + point[1]].push(this.tx + point[0]);
        }
    }
}






