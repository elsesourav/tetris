// class Game {
//     constructor(contaner, width, animation) {
//         this.rows = 30;
//         this.cols = 15;
//         this.scale = Math.floor(width / this.cols);

//         this.width = this.cols * this.scale;
//         this.height = this.rows * this.scale;
//         this.animation = animation;
//         this.dy = 1;
//         this.currentRotation;

//         this.canvas = document.createElement("canvas");
//         this.canvas.setAttribute("id", "game-canvas");
//         this.canvas.width = this.width;
//         this.canvas.height = this.height;
//         this.ctx = this.canvas.getContext("2d");
//         contaner.appendChild(this.canvas);


//         this.board = [];
//         this.pices = [];


//         // create borard
//         for (let i = 0; i < this.rows; i++) {
//             this.board[i] = [];
//             for (let j = 0; j < this.cols; j++) {
//                 this.board[i][j] = null;
//             }
//         }

//         // this.#newPices();
//         this.#eventListener();

//         const p = new Pice({ctx: this.ctx, x: 100, y: 0, scale: this.scale, ptn: pattern});
//         p.draw();  
//     }

//     draw() {
//         this.ctx.fillStyle = "#0007";
//         this.ctx.fillRect(0, 0, this.width, this.height);

//         this.#drawBoard();
//         this.#drawPices();
//     }

//     update() {
//         this.#updatePices();
//     }

//     #newPices() {
//         const selectPice = ptns[Math.rnd(0, ptns.length, true)];
//         const HFSPLen = Math.ceil(selectPice.length / 2); // half selection pices length
//         const Xloc = Math.rnd(HFSPLen, this.board[0].length - HFSPLen, true);
//         let pices = [];
//         // console.log(selectPice);
//         const ptn = this.#getRotateXY(selectPice, Xloc);
//         this.currentRotation = Math.rnd(0, 4, true);

//         ptn[0].forEach((_, i) => {
//             let loc = [];
//             for (let j = 0; j < 4; j++) loc.push(ptn[j][i]);

//             pices.push(new Pice({
//                 ctx: this.ctx,
//                 loc: loc,
//                 size: this.scale,
//                 dy: this.dy,
//                 index: this.currentRotation
//             }))
//         })


//         // for (let i = selectPice.length - 1; i >= 0; i--) {
//         //     for (let j = 0; j < selectPice[i].length; j++) {
//         //         if (selectPice[i][j]) {

//         //             pices.push(new Pice({
//         //                 ctx: this.ctx,
//         //                 x: (Xloc + j) * this.scale,
//         //                 y: -(i + 1) * this.scale,
//         //                 size: this.scale,
//         //                 dy: this.dy
//         //             }));
//         //         }
//         //     }
//         // } 
//         this.pices = pices;
//     }

//     #getRotateXY(ptn, x) {
//         let loc = [];

//         for (let _ = 0; _ < ptn.length; _++) {
//             loc[_] = [];

//             for (let i = ptn[_].length - 1; i >= 0; i--) {
//                 for (let j = 0; j < ptn[_][i].length; j++) {
//                     if (ptn[_][i][j]) {
//                         loc[_].push({
//                             [ptn[_][i][j] - 1]: {
//                                 x: (x + j) * this.scale,
//                                 y: -(i + 1) * this.scale
//                             }
//                         })
//                     }
//                 }
//                 loc[_].sort((a, b) =>
//                     Object.keys(a)[0] - Object.keys(b)[0]
//                 );
//             }
//         }
//         return loc.map(e => e.map(((f, i) => f[i])));
//     }

//     #updatePices() {
//         /* ---- check collusion detection ---- */
//         // ground
//         if (this.pices.some(pice => this.height <= pice.loc[pice.i].y + this.scale + this.dy)) {
//             this.#savePices();
//             this.#newPices();

//             // block
//         } else if (this.pices.some(
//             pice => this.board.some(
//                 cols => cols.some(
//                     e => (e && e.loc[e.i].y <= pice.loc[pice.i].y + this.scale + this.dy &&
//                         e.loc[e.i].x == pice.loc[pice.i].x))))) {
//             this.#savePices();
//             this.#newPices();

//         } else {
//             this.pices.forEach(pice => pice.update());
//         }
//     }

//     #savePices() {
//         for (let i = 0; i < this.pices.length; i++) {
//             const pice = this.pices[i];
//             const loc = {
//                 x: Math.round(pice.loc[pice.i].x / this.scale),
//                 y: Math.round(pice.loc[pice.i].y / this.scale)
//             }

//             if (loc.y < 0) {
//                 this.animation.stop(); // game over
//                 return;
//             }
//             this.board[loc.y][loc.x] = pice;
//             pice.loc[pice.i].y = loc.y * this.scale;
//         }
//     }

//     #drawBoard() {
//         const { ctx, scale, width, height, rows, cols, board } = this;

//         board.forEach(b => {
//             b.forEach(e => {
//                 if (e) {
//                     e.draw();
//                 }
//             })
//         })
//     }

//     #drawPices() {
//         this.pices.forEach(pice => {
//             pice.draw();
//         });
//     }

//     #rotatePices() {
//         this.pices.forEach(pice => {
//             pice.i = (pice.i + 1) % 4;
//         })
//     }

//     #moveLeft() {
//         if (this.pices.every(pice => (pice.loc[pice.i].x - pice.dx) > 0)) {
//             this.pices.forEach(pice => pice.dx += pice.size);
//         }
//         if (this.pices.every(pice =>
//             this.board.some(rows =>
//                 rows.some(e =>
//                     (e && e.loc[e.i].x + e.size < pice.loc[pice.i].x)
//                 )))) {
//             console.log("colide");
//         }
//     }

//     #moveRight() {
//         if (this.pices.every(pice => ((pice.loc[pice.i].x - pice.dx) + pice.size) < this.width)) {
//             this.pices.forEach(pice => pice.dx -= pice.size);
//         }
//     }

//     #eventListener() {
//         document.addEventListener("keydown", (e) => {
//             switch (e.keyCode) {
//                 case 32: // space
//                     this.#rotatePices();
//                     break;
//                 case 38: // down arrow
//                     this.#rotatePices();
//                     break;
//                 case 37: // left arrow
//                     this.#moveLeft();
//                     break;
//                 case 39: // right arrow
//                     this.#moveRight();
//                     break;
//             }

//         })
//     }
// }

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

        this.#setNewPice();





        this.#eventListener();

    }

    #setNewPice() {
        this.pice = new Pice({
            ctx: this.ctx,
            x: Math.rnd(2, this.cols - 6, true) * this.scale,
            y: this.scale * -5,
            scale: this.scale, vx: this.scale / 5,
            ptn: pattern, game: this
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


        this.placePices.forEach(pice => {
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.strokeStyle = "#0ff";
            ctx.lineWidth = 1;
            ctx.rect(pice.x, pice.y, scale, scale);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        })
    }

    #rotatePices() {
        this.pice.rotate();
    }

    #moveLeft() {
        if (this.pice.leftIsEmpty()) {
            this.pice.dx -= this.scale;
        }
    }

    #moveRight() {
        
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