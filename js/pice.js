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
        this.color = `hsl(${Math.round(Math.random() * 360)}, 100%, 50%)`
        this.#setPoint();
        console.log(this.points);

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
            this.#rotateAnimation();
        } else if (!isColide) {
            this.ci = ti;
            this.#rotateAnimation();
        } else {
            this.#setPoint();
        }
    }

    #rotateAnimation() {

    }

    #setPoint(index = this.ci) {
        this.points = [];
        this.ptn[index].forEach((cols, i) => {
            cols.forEach((element, j) => {
                if (element) this.points.push(new Point({
                    x: j + this.x,
                    y: i + this.y,
                    ctx: this.ctx,
                    pice: this,
                    size: this.scale,
                    color: this.color
                }));
            }
            )
        })
    }

    draw() {
        this.points.forEach(point => {
            point.draw(this.x * this.scale + this.cx, this.y * this.scale + this.cy);
        })
    }

    update() {

        this.points.forEach(e => e.update(true))
        // this.cy += this.vy;
        // if (this.cy > this.scale) this.cy = 0;
        // if (!this.cy) {
        //     this.y++;
        //     this.ty = this.y;
        // }


        // // this.y += (this.ty - this.y) * 0.1;
        // if (this.tx != this.x) {
        //     const dir = this.tx - this.x > 0 ? 1 : -1;

        //     this.cx = (this.cx + this.vx * (dir)) % this.scale;
        //     if (!this.cx) {
        //         this.x = this.tx;
        //     }
        // }
    }

    /* ---- check collusion detection ---- */
    isCollusion() {

        // collusion in ground
        return this.points.some(point =>
            (point.ty + 1) >= this.game.rows ||

            // collusion in place pices
            this.game.placePices.points.some(p =>
                point.tx == p.tx && point.ty + 1 == p.ty
            )
        );
    }

    leftIsEmpty() {
        // collusion in boundary
        return !this.points.some(point =>
            point.tx - 1 < 0 ||

            // collusion in place pices
            this.game.placePices.points.some(p =>
                point.tx - 1 == p.tx && point.ty == p.ty
            )
        )
    }

    rightIsEmpty() {
        // collusion in boundary
        return !this.points.some(point =>
            point.tx + 1 >= this.game.cols ||

            // collusion in place pices
            this.game.placePices.points.some(p =>
                point.tx + 1 == p.tx && point.ty == p.ty
            )
        )
    }

    // save point in place points array
    save(array) {

        this.points.forEach((point) => {
            array.points.push(point);
            if (point.y >= 0) {
                array.counts[point.y]++;
                if (array.counts[point.y] >= this.game.cols) {
                    console.log("clear pice");
                    array.counts[point.y] = 0;
                }
            } else {
                console.log("Game Over");
                this.game.animation.stop();
            }
        });




        // for (let i = 0; i < this.points.length; i++) {
        //     const point = this.points[i];
        //     console.log(this.points)
        //     if (this.ty + point[1] < 0) {
        //         this.game.animation.stop();
        //         return;
        //     }

        //     array[this.ty + point[1]].push(this.tx + point[0]);
        // }





        // let index = -1;
        // if (this.game.placePices.some((pice, i) => { 
        //     if (pice.length >= this.game.cols) {
        //         index = i;
        //         return true;
        //     }})) {

        //     array.splice(index, 1);

        //     // update complete upper element
        //     for (let i = 0; i < index; i++) {
        //         array[i].map(e => {  })
        //     }
        //     array[index - 1].map(e => e++);
        //     array.unshift([]);

        //     // score incrize
        // }
    }
}






