class Pice {
    constructor({ ctx, game, x, y, scale, ptn = pattern }) {
        this.ctx = ctx;
        this.game = game;
        this.size = scale;
        this.x = x;
        this.y = y;

        this.ptn = ptn[Math.floor(Math.random() * ptn.length)];
        this.ci = Math.floor(Math.random() * 4); // curren index
        this.points = [];
        this.color = `hsl(${Math.round(Math.random() * 360)}, 100%, 50%)`
        this.#setPoint();
    }

    #setPoint(index = this.ci) {
        this.points = [];
        this.ptn[index].forEach((cols, i) => {
            cols.forEach((element, j) => {
                if (element) this.points.push(new Point({
                    x: j - 2,
                    y: i - 2,
                    ctx: this.ctx,
                    pice: this,
                    size: this.size,
                    color: this.color
                }));
            }
            )
        })
    }

    draw() {
        this.points.forEach(point => {
            point.draw();
        })

        this.game.placePices.forEach(points =>
            points.forEach(point => {
                point.draw();
            })
        );
    }

    update() {
        this.points.forEach(point => {
            point.update();
        })

        this.game.placePices.forEach(points =>
            points.forEach(point => {
                point.update();
            })
        );

    }

    /* ---- check collusion detection ---- */
    isCollusion() {
        // collusion in ground
        return this.points.some(point =>
            point.tofy + point.ty + 1 >= this.game.rows ||

            //collusion in place pices
            this.game.placePices.some(points =>
                points.some(p =>
                    point.tx + point.tofx == p.tx + p.tofx &&
                    point.ty + point.tofy + 1 == p.ty + p.tofy
                )
            )
        );
    }

/*____ rotation formula _____
    [ x, y ] deg [ update x = y * -1 and y = x ]
    [ 1, -2] 0
    [ 2,  1] 90
    [-1,  2] 180
    [-2, -1] 270              */
    rotateIsPossible() {
        let collusionBund = false;

        const is = !this.points.some(point => {

            if (point.tx + point.tofy * -1 < 0 ||
                point.tx + point.tofy * -1 >= this.game.cols) {
                collusionBund = true;
                return true;
            } else if (point.ty + point.tofx >= this.game.rows) {
                return true;
            }


            return this.game.placePices.some(points => points.some(p =>
                point.tx + point.tofy * -1 == p.tx + p.tofx &&
                point.ty + point.tofx == p.ty + p.tofy
            ));

        })

        // fix after rotation when points overflow the boundary
        if (collusionBund) {
            let oneArray = [...this.points.map(p => p.tx + p.tofy * -1)];
            let max = Math.max(...oneArray) - this.game.cols + 1;
            let min = Math.min(...oneArray);

            if (max > 0) {
                this.points.forEach(p => {
                    p.tx -= max;
                    p.vx = Math.abs(p.vx) * -1;
                });
            } else {
                this.points.forEach(p => {
                    p.tx -= min;
                    p.vx = Math.abs(p.vx);
                });
            }
            
            return true;
        }

        return is;
    }

    leftIsEmpty() {
        // collusion in boundary
        return !this.points.some(point =>
            point.tx + point.tofx - 1 < 0 ||

            // collusion in place pices
            this.game.placePices.some(points =>
                points.some(p =>
                    point.tx + point.tofx - 1 == p.tx + p.tofx &&
                    point.ty + point.tofy == p.ty + p.tofy
                )
            )
        )
    }

    rightIsEmpty() {
        // collusion in boundary
        return !this.points.some(point =>
            point.tx + point.tofx + 1 >= this.game.cols ||

            // collusion in place pices
            this.game.placePices.some(points =>
                points.some(p =>
                    point.tx + point.tofx + 1 == p.tx + p.tofx &&
                    point.ty + point.tofy == p.ty + p.tofy
                )
            )
        )
    }

    rotate() {
        this.points.forEach(p => {
            p.ta = (p.a + 90) % 360;
            // swap values for variables "p.x" and "p.y"
            p.tofy = [p.tofx, p.tofx = p.tofy * -1][0];
        });
    }

    // save point in place points array
    save(array) {
        this.points.forEach((point) => {
            const pushPoint = point.tofy + point.ty;
            if (pushPoint < 0 || pushPoint > this.game.rows) {
                console.log("Game Over");
                this.game.animation.stop();
            } else {
                array[pushPoint].push(point);
                point.isFixed = true;
            }
        });
    }
}


