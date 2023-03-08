cssRoot.style.setProperty("--ww", `${window.innerWidth}px`);
cssRoot.style.setProperty("--wh", `${window.innerHeight}px`);

const contaner = document.getElementById("contaner");

// addjust size for every device
const min = window.innerWidth < window.innerHeight * 0.5 ? window.innerWidth : window.innerHeight;
const isWidth = min == window.innerWidth;

const WIDTH = isWidth ? min : window.innerHeight * 0.5;
const HEIFHT = isWidth ? window.innerHeight * 0.5 : min;
const MARGIN = min * 0.04;




const FPS = 60;
const ani = new Animation(FPS);
const game = new Game(contaner, WIDTH - MARGIN, ani);
ani.start(loop);


function loop() {
    game.update();
    game.draw();
}



