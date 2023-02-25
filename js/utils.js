"use strict"

//use cssRoot.style.setProperty("key", "value");
const cssRoot = document.querySelector(':root');

// when run this app in mobile is return true
const isMobile = localStorage.mobile || window.navigator.maxTouchPoints > 1;

Math.rnd = (start = 0, end = 1, int_floor = false) => {
    const result = start + (Math.random() * (end - start));
    return int_floor ? Math.floor(result) : result;
}

/* e.x 
(0 start) -------.------ (10 end) input . = 5
(10 min) ----------------.---------------- (30 max) output . = 20
*/
Math.map = (point, start, end, min, max) => {
    return ((max - min) * (point - start) / (end - start)) + min;
}

class Animation {
    constructor(fps) {
        this.fps = fps;
        this.run = false;
    }

    animate(fun) {
        setTimeout(() => {
            if (this.run) {
                fun();
                this.animate(fun);
            }
        }, 1000 / this.fps);
    }

    start(fun) {
        this.run = true;
        this.animate(fun);
    }

    stop() {
        this.run = false;
    }
}

