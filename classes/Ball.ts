import Config from "../config/Config";
import Player from "./Player";
import { generate0Or1 } from "../utils/utils"
import Block from "./Block";

const {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT
} = Config.board;

const {
    x: BALL_X_POSITION,
    y: BALL_Y_POSITION,
    speed: BALL_SPEED,
    radio: BALL_RADIO
} = Config.ball;

class Ball {

    public x: number
    public y: number
    public radio: number;
    public x_speed: number;
    public y_speed: number;

    constructor() {

        this.x = BALL_X_POSITION;
        this.y = BALL_Y_POSITION;
        this.x_speed = 0;
        this.y_speed = -BALL_SPEED;
        this.radio = BALL_RADIO;
    }

    public render(ctx: CanvasRenderingContext2D, player: Player) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.closePath();
        this.x += this.x_speed;
        this.y += this.y_speed;
        this.calculateDirection(player);
    }

    private calculateDirection(player: Player) {
        // Direccion en realcion con el board 
        const { x: x_next_move, y: y_next_move } = this.getNextMoves();

        if (x_next_move > BOARD_WIDTH - this.radio ||
            x_next_move < this.radio
        ) {

            this.invertX();
        }


        if (y_next_move < this.radio) {
            this.invertY();
        }

        //------------DIRECCION RELACIONADO CON EL PLAYER---------------//
        if (x_next_move + this.radio > player.x &&
            y_next_move + this.radio > player.y &&
            x_next_move + this.radio < player.x + player.width &&
            y_next_move + this.radio < player.y + player.height) {
            // Cuando arranca el juego
            if (this.x_speed === 0) {

                if (Boolean(generate0Or1())) {
                    this.x_speed = BALL_SPEED;
                } else {
                    this.x_speed = -BALL_SPEED;
                }
                this.invertY();
            } else {
                this.invertY();
            }
        }
        if (x_next_move + this.radio > player.y + player.height) {
            this.invertX();
        }

    }

    public checkIfColliedWithBrick(block: Block) {
        
        if (this.x > block.x + this.radio &&
            this.x < block.x + block.width + this.radio &&
            this.y > block.y + this.radio &&
            this.y < block.y + block.height + this.radio) {
            block.destroy();
            this.invertY();

        }
    }

    public invertY() {
        this.y_speed = -this.y_speed;
    }

    public invertX() {
        this.x_speed = -this.x_speed;
    }

    public checkEndLine(): boolean {
        const y_next_move = this.getNextMoves()['y'];
        if (y_next_move > BOARD_HEIGHT - this.radio) return true;
        return false;
    }

    public getNextMoves(): { [key: string]: number } {
        return {
            'x': this.x + this.x_speed,
            'y': this.y + this.y_speed
        }
    }
}

export default Ball
