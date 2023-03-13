
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
        this.ctx.lineWidth = 5;
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.placePices = [];

        for (let i = 0; i < this.rows; i++) {
            this.placePices[i] = [];
        }

        this.pice = null;

        this.#setNewPice();
        this.#eventListener();
    }

    #setNewPice() {
        this.pice = new Pice({
            ctx: this.ctx,
            x: Math.rnd(4, this.cols - 6, true),
            y: -Math.round(pattern[0][0].length / 2),
            scale: this.scale,
            game: this, vy: 1
        });
    }

    update() {
        if (this.pice.isCollusion()) {
            // console.log("collusion");
            this.pice.save(this.placePices);

            let clearIndex = [];
            // clear line when cols are full
            this.placePices.forEach((points, i) => {
                if (points.length >= this.cols) {
                    clearIndex.push(i);
                    this.placePices[i] = [];

                    for (let j = 0; j < i; j++) {
                        const points = this.placePices[j];
                        points.map(point => point.ty++);
                    }
                }
            });
            clearIndex.forEach(ci => {
                this.placePices.splice(ci, 1);
                this.placePices.unshift([]);
            })
            
            this.#setNewPice();
        }

        this.pice.update();
    }

    draw() {
        const { ctx } = this;

        ctx.fillStyle = `#000`
        // ctx.fillStyle = `#000${Math.round(2 / this.pice.vy * this.pice.vy * this.pice.vy)}`;
        ctx.fillRect(0, 0, this.width, this.height);
        this.pice.draw();
    }

    #rotatePices() {
        if (this.pice.rotateIsPossible()) {
            this.pice.rotate();
        }
    }

    #moveLeft() {
        if (this.pice.leftIsEmpty()) {
            this.pice.updateVX(-1);
        }
    }

    #moveRight() {
        if (this.pice.rightIsEmpty()) {
            this.pice.updateVX(1);
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