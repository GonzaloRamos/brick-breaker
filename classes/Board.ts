import Block from "./Block";
import Player from "./Player";
import Ball from "./Ball";
import Config from "../config/Config";
import { documentGetElementByIdOrError, generate0Or1 } from "../utils/utils";

const { width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    cols: BOARD_COLS,
    rows: BOARD_ROWS
} = Config.board;


class Board {

    public width: number;
    public height: number;
    public rows: number;
    public cols: number;
    public middle: number;
    public bottom: number;
    public canvas: HTMLCanvasElement;
    /*
       Ejemplo visual de los bloques
        [
         [Block, Block, ...].length = BOARD_COLS    ,
         [Block, Block, ...]    ,
         [Block, Block, ...]    ,
         [Block, Block, ...]    ,
        ].length = BOARD_ROWS
         */
    public blocks: Array<Block[]>;
    public player: Player;
    public ball: Ball;

    constructor() {
        this.width = BOARD_WIDTH;
        this.height = BOARD_HEIGHT;
        this.rows = BOARD_ROWS;
        this.cols = BOARD_COLS;
        this.middle = BOARD_HEIGHT / 2;
        this.bottom = BOARD_HEIGHT - 30;

        this.canvas = documentGetElementByIdOrError<HTMLCanvasElement>("game");

        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.background = "white";
        this.canvas.style.border = '4px';
        this.canvas.style.borderColor = 'black';

        this.blocks = this.computeInitialBlocks();
        this.player = new Player();
        this.ball = new Ball();
    }
    public getCanvasCtx(): CanvasRenderingContext2D {
        const ctx = this.canvas.getContext("2d");
        if (!ctx) throw new Error("ERROR: No context found for canvas");
        return ctx;
    }

    public clearCanvas(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.closePath();
    }

    // Este metodo es experimental de momento.
    public computeInitialBlocks(): Array<Block[]> {

        let result = 0;
        const ret_object: { [key: string]: number[] } = {};

        //--------------Calculate Y ------------//
        const result_arr_y: number[] = []
        for (let i = 0; result < this.middle; ++i) {
            result = (this.middle / this.rows) * i
            result_arr_y.push(result);
        }
        ret_object['y'] = result_arr_y;
        //-------------Calculate X ------------//
        const result_arr_x: number[] = []
        result = 0;
        for (let i = 0; result < this.width; ++i) {
            result = (this.width / this.cols) * i;
            result_arr_x.push(result);
        }
        ret_object['x'] = result_arr_x;

        const board_rows = new Array(this.rows);

        for (let y = 0; y < this.rows; ++y) {
            const cols = new Array(this.cols);
            for (let x = 0; x < this.cols; ++x) {
                let y_pos = ret_object['y'][y];
                let x_pos = ret_object['x'][x];

                cols[x] = new Block(x_pos, y_pos, generate0Or1());
            }
            board_rows[y] = cols;
        }

        return board_rows;
    }

    private processBlocksAndRender(ctx: CanvasRenderingContext2D) {

        for (let y = 0; y < this.blocks.length; ++y) {
            for (let x = 0; x < this.blocks[y].length; ++x) {
                const block = this.blocks[y][x];
                this.checkIfBallHitBlocks(block);
                block.render(ctx);
            }
        }
    }

    public render() {
        const ctx = this.getCanvasCtx();
        this.clearCanvas(ctx);

        this.player.render(ctx);
        this.ball.render(ctx, this.player);
        this.processBlocksAndRender(ctx);
    }

    public gameLost() {
        return this.ball.checkEndLine();
    }

    private checkIfBallHitBlocks(block: Block) {
        if (block.isDestroyed()) return;
        this.ball.checkIfColliedWithBrick(block);
    }

    public gameEnded(): boolean {

        let end = true;
        for (let y = 0; y < BOARD_ROWS; ++y) {
            for (let x = 0; x < BOARD_COLS; ++x) {
                const blck = this.blocks[y][x];
                if (!blck.isDestroyed()) end = false;
            }
        }
        return end;
    }
}

export default Board;
