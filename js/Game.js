import Board from "./Board.js";
import Scoreboard from "./Scoreboard.js";
import Input from "./Input.js";

export default class Game {
	board;
	scoreboard;
	startingPosition;
	timer;
	firstKey;
	input;

	constructor () {
		this.board = new Board('board');
		this.scoreboard = new Scoreboard('scoreboard');
		this.input = new Input();
		this.firstKey = false;
		// document.addEventListener('keyup', this.processKeyStroke.bind(this));
		this.input.on('move', this.processMove.bind(this));
	}

	initialize(x, y, direction, length) {
		this.startingPosition = { x, y, direction, length };
		this.board.initialize(x, y, direction, length);
		this.scoreboard.reset();
	}

	processMove(event) {
		const direction = event;
		this.firstKey = direction || this.firstKey;
		this.board.setDirection(direction);
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
		this.input.stop();
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
		this.input.start();
		this.timer = setInterval(this.moveSnake.bind(this), 100);
	}


}
