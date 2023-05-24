import Block from "./Block";
import Config from "../config/Config";

const {
    move_speed: PLAYER_MOVESPEED,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    starting_points: PLAYER_STARTING_POINTS
} = Config.player;

const { width: BOARD_WIDTH } = Config.board;

class Player extends Block {

    public move_speed: number;

    constructor() {
        super (PLAYER_STARTING_POINTS['x'], PLAYER_STARTING_POINTS['y'])
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.move_speed = PLAYER_MOVESPEED;

        window.addEventListener("keypress", (e) => {

            //MOVE LEFT
            if (e.key === 'h' || e.key === 'H') this.moveLeft();

            //MOVE RIGHT 
            if (e.key === 'l' || e.key === 'L') this.moveRight();
        });
    }

    private move(direction: string) {
        if (direction === 'left') this.x = Math.max(this.x - this.move_speed, 0);
        if (direction === 'right') this.x = Math.min(this.x + this.move_speed, BOARD_WIDTH - this.width);
    }

    public moveLeft() {
        this.move('left');
    }

    public moveRight() {
        this.move('right');
    }
}

export default Player
