import Board from "./classes/Board";

//---------------------------Main entry point-----------------------------//
    const board = new Board();
    // Main loop of the game
    function mainLoop() {

       if(board.gameLost()) {
           alert("termino el juego"); 
           return;
       }
        if(board.gameEnded()) {
            alert("Ganase el juego");
            return;
        }
        board.render();
        window.requestAnimationFrame(mainLoop);
    }
(() => {

    
    mainLoop();
})();
