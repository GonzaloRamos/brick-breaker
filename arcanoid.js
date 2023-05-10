"use strict";
const WIDTH = 800;
const HEIGHT = 800;
const MIDDLE_BOARD = HEIGHT / 2;
const BOTTOM_BOARD = HEIGHT - 30;
const BLOCKS_PER_X = 20;
const BLOCKS_PER_Y = 20;
const BLOCK_WIDTH = WIDTH / BLOCKS_PER_X;
const BLOCK_HEIGHT = MIDDLE_BOARD / BLOCKS_PER_Y;
const PLAYER_STARTING_POINT = WIDTH / 2;
const SPEED_MOVE = 20;
let current_player_position = PLAYER_STARTING_POINT;
let last_player_position = 0;
function documentGetElementByIdOrError(id) {
    const element = document.getElementById(id);
    if (!element)
        throw new Error(`ERROR: No se encontro el elemento de id ${id}`);
    return element;
}
const canva = documentGetElementByIdOrError("game");
canva.width = WIDTH;
canva.height = HEIGHT;
canva.style.background = 'white';
const ctx = getCanvasCTX("game");
function convertFPSToMiliseconds(fps) {
    return 1000 / fps;
}
function getCanvasCTX(id) {
    const canvas = documentGetElementByIdOrError(id);
    const ctx = canvas.getContext("2d");
    if (!ctx)
        throw new Error("");
    return ctx;
}
function calculateBlocksPosition(direccion, number_of_blocks) {
    const n = [];
    let result = 0;
    let position_to_start_calculating = 0;
    let blocks_per_to_calculate = 0;
    if (direccion === 'y') {
        position_to_start_calculating = MIDDLE_BOARD / 2;
        blocks_per_to_calculate = number_of_blocks;
    }
    if (direccion === 'x') {
        position_to_start_calculating = WIDTH;
        blocks_per_to_calculate = number_of_blocks;
    }
    for (let i = 0; result < position_to_start_calculating; ++i) {
        result = (position_to_start_calculating / blocks_per_to_calculate) * i;
        n.push(result);
    }
    return n;
}
function renderBlock(x_position, y_position, w, h) {
    ctx.beginPath();
    ctx.rect(x_position, y_position, w, h);
    ctx.stroke();
    ctx.closePath();
}
function renderUpperBlocks() {
    const blocks_p_y = calculateBlocksPosition('y', BLOCKS_PER_Y);
    const blocks_p_x = calculateBlocksPosition('x', BLOCKS_PER_X);
    blocks_p_y.forEach(y_position => {
        blocks_p_x.forEach(x_position => {
            renderBlock(x_position, y_position, BLOCK_WIDTH, BLOCK_HEIGHT);
        });
    });
}
function renderArcanoidBlock() {
    if (current_player_position === PLAYER_STARTING_POINT) {
        renderBlock(current_player_position, BOTTOM_BOARD, BLOCK_WIDTH, BLOCK_HEIGHT);
    }
    else {
        ctx.translate(current_player_position, BOTTOM_BOARD);
    }
}
let interval_id;
function renderGame() {
    interval_id = setInterval(() => {
        console.log("running");
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        renderUpperBlocks();
        renderArcanoidBlock();
    }, convertFPSToMiliseconds((15)));
}
window.addEventListener("keypress", (e) => {
    last_player_position = current_player_position;
    //MOVE LEFT
    if (e.key === 'h')
        current_player_position = current_player_position - SPEED_MOVE;
    //MOVE RIGHT 
    if (e.key === 'l')
        current_player_position = current_player_position + SPEED_MOVE;
    // RESET POSITION
    if (e.key === 'r')
        current_player_position = PLAYER_STARTING_POINT;
});
renderGame();
const stop_game = documentGetElementByIdOrError("stop");
stop_game.addEventListener("click", () => {
    clearInterval(interval_id);
});
