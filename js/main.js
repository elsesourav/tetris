window.onload = () => {
    
    const contaner = document.getElementById("contaner");
    
    const FPS = 60;
    const ani = new Animation(FPS);
    const game = new Game(contaner, WIDTH * 4 - MARGIN / 2, ani);
    
    ani.ready(loop); 
    ani.start();
    
    
    function loop() {
        game.update();
        game.draw();
    }
};



