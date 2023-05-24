import Config from "../config/Config";
const { width: BLOCK_WIDTH,
    height: BLOCK_HEIGHT
} = Config.block;
class Block {

    public width: number;
    public height: number;
    public x: number;
    public y: number;
    public state: number; // cuando es 1, esta activo y cuando es 0 es que lo rompieron

    constructor(x: number, y: number, state: number = 1) {
        this.width = BLOCK_WIDTH;
        this.height = BLOCK_HEIGHT;
        this.x = x;
        this.y = y;
        this.state = state;
    }

    public render(ctx: CanvasRenderingContext2D) {
        if(this.state === 0) return;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.closePath();
    }

    public destroy() {
        this.state = 0;
    }

    public isDestroyed(): boolean {
        return this.state === 0;
    }
}

export default Block
