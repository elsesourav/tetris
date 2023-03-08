
class Game {
    constructor(contaner, width, animation) {
        this.rows = 30;
        this.cols = 15;
        this.scale = Math.floor(width / this.cols);

        this.width = this.cols * this.scale;
        this.height = this.rows * this.scale;
        this.animation = animation;
        this.dy = 1;

        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("id", "game-canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
        contaner.appendChild(this.canvas);

        this.ctx.fillStyle = `#000`;
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.placePices = {
            counts: [],
            points: []
        };

        for (let i = 0; i < this.rows; i++) {
            this.placePices.counts[i] = 0;
        }
        
        this.pice = null;

        this.#setNewPice();
        this.#eventListener();
    }

    #setNewPice() {
        this.pice = new Pice({
            ctx: this.ctx,
            x: Math.rnd(2, this.cols - 6, true),
            y: -pattern[0][0].length,
            scale: this.scale, vx: this.scale / 5,
            game: this, vy: 1
        });
    }

    update() {
        if (this.pice.isCollusion()) {
            this.pice.save(this.placePices);
            this.#setNewPice();
            this.ctx.fillStyle = `#0007`;
            this.ctx.fillRect(0, 0, this.width, this.height);
        } else {
            this.pice.update();
        }
    }

    draw() {
        const { ctx, scale } = this;

        ctx.fillStyle = `#000`
        // ctx.fillStyle = `#000${Math.round(2 / this.pice.vy * this.pice.vy * this.pice.vy)}`;
        ctx.fillRect(0, 0, this.width, this.height);
        this.pice.draw();
        this.placePices.points.forEach(point => {
            point.update();
            point.draw();
        });
    }

    #rotatePices() {
        this.pice.rotate();
    }

    #moveLeft() {
        if (this.pice.leftIsEmpty()) {
            this.pice.points.map(point => point.tx--);
        }
    }

    #moveRight() {
        if (this.pice.rightIsEmpty()) {
            this.pice.points.map(point => point.tx++);
        }
    }

    #eventListener() {
        document.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                case 32: // space
                    this.#rotatePices();
                    break;
                case 38: // down arrow
                    this.#rotatePices();
                    break;
                case 37: // left arrow
                    this.#moveLeft();
                    break;
                case 39: // right arrow
                    this.#moveRight();
                    break;
            }

        })
    }
}