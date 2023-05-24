class Config {

    public static loop = true;

    public static board = {
        width: 800,
        height: 800,
        rows: 20,
        cols: 20
    }

    public static block = {
        width: Config.board.width / Config.board.rows,
        height: (Config.board.height / 2) / Config.board.cols
    }
    
    public static player = {
        width: Config.board.width * 0.10,
        height: Config.board.height * 0.02,
        starting_points: {
            'x': Config.board.width * 0.46,
            'y': Config.board.height * 0.96
        },
        move_speed: Config.board.width * 0.03,

    }

    public static ball = {
        x: Config.board.width * 0.5,
        y: Config.board.height * 0.80,
        speed :3, 
        radio: 7
    }
}
export default Config;
