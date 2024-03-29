import Board from "./Board.js";
import Scoreboard from "./Scoreboard.js";

const directionMap = new Map();
directionMap.set('ArrowUp', 'N');
directionMap.set('ArrowDown', 'S');
directionMap.set('ArrowRight', 'E');
directionMap.set('ArrowLeft', 'W');
directionMap.set('KeyW', 'N');
directionMap.set('KeyD', 'E');
directionMap.set('KeyS', 'S');
directionMap.set('KeyA', 'W');

export default class Game {
	board;
	scoreboard;
	startingPosition;
	timer;
	firstKey;

	constructor () {
		this.board = new Board('board');
		this.scoreboard = new Scoreboard('scoreboard');
		this.firstKey = false;
		document.addEventListener('keyup', this.processKeyStroke.bind(this));
	}

	initialize(x, y, direction, length) {
		this.startingPosition = { x, y, direction, length };
		this.board.initialize(x, y, direction, length);
		this.scoreboard.reset();
	}

	processKeyStroke(event) {
		const direction = directionMap.get(event.code);
		this.firstKey = direction || this.firstKey;
		this.board.setDirection(directionMap.get(event.code));
	}

	moveSnake () {
		if (this.firstKey) {
			const {stopGame, score} = this.board.moveSnake();
			if (stopGame) {
				this.stop();
			} else if (score) {
				this.scoreboard.increment();
			}
		}
	}

	stop () {
		clearInterval(this.timer);
		this.scoreboard.endGame();
		this.scoreboard.restart.addEventListener('click', this.restart.bind(this), { once: true });
	}

	restart () {
		const { x, y, direction, length } = this.startingPosition;
		this.firstKey = false;
		this.initialize(x, y, direction, length);
		this.go();
	}

	go () {
		this.timer = setInterval(this.moveSnake.bind(this), 100);
	}


}
