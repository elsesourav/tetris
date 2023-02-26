
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

        this.placePices = [];
        this.pice = null;

        for (let i = 0; i < this.rows; i++) {
            this.placePices[i] = [];
        }

        this.#setNewPice();
        this.#eventListener();
    }

    #setNewPice() {
        this.pice = new Pice({
            ctx: this.ctx,
            x: Math.rnd(2, this.cols - 6, true),
            y: -pattern[0][0].length,
            scale: this.scale, vx: this.scale / 5,
            game: this, vy: 0.5
        });
    }

    update() {
        if (this.pice.isColide()) {
            this.pice.save(this.placePices);
            this.#setNewPice();

            // check any one cols is full 
            // clear that particular cols
        } else {
            this.pice.update();
        }
    }

    draw() {
        const { ctx, scale } = this;

        ctx.fillStyle = "#0003";
        ctx.fillRect(0, 0, this.width, this.height);
        this.pice.draw();

        this.placePices.forEach((pice, i) => {
            pice.forEach(p => {
                ctx.beginPath();
                ctx.fillStyle = "red";
                ctx.strokeStyle = "#0ff";
                ctx.lineWidth = 1;
                ctx.rect(p * scale + 1, i * scale + 1, scale - 2, scale - 2);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            })
        })
    }

    #rotatePices() {
        this.pice.rotate();
    }

    #moveLeft() {
        if (this.pice.leftIsEmpty()) {
            this.pice.tx--;
        }
    }

    #moveRight() {
        if (this.pice.rightIsEmpty()) {
            this.pice.tx++; 
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