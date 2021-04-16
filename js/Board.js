import Snake from "./Snake.js";
import Marker from "./Marker.js";

export default class Board {
	height = 40;						// number of 'sqaures' in height
	width = 40;							// number of 'squares' in width
	squareHeight = 16;			// height (in pixels) of each square
	squareWidth = 16;				// width (in pixels) of each square
	border = 16;						// size (in pixels) of border
	canvasWidth = 0;
	canvasHeight = 0;
	borderColor = "red";
	fieldColor = "green";
	marker = new Marker();
	snake = new Snake();
	canvas;
	ctx;

	constructor (id) {
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext('2d');
		this.canvasWidth = this.width * this.squareWidth + this.border * 2;
		this.canvasHeight = this.height * this.squareHeight + this.border * 2;
		this.canvas.setAttribute('width', `${this.canvasWidth}`);
		this.canvas.setAttribute('height', `${this.canvasHeight}`);
	}

	initialize(x, y, direction, length) {
		this.snake.setStartingPosition(x, y, direction, length);
		this.displayField();
		this.displaySnake();
		this.generateNewMarkerPosition();

	}

	displayField () {
		this.ctx.fillStyle = this.borderColor;
		this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
		this.ctx.fillStyle = this.fieldColor;
		this.ctx.fillRect(this.border, this.border, this.canvasWidth - this.border * 2, this.canvasHeight - this.border * 2);
	}

	displaySnake () {
		this.draw(this.snake.head, this.snake.headColor);
		this.snake.tail.forEach( tail => {
			this.draw(tail, this.snake.tailColor);
		}, this);
	}

	displayMarker () {
		this.draw(this.marker, this.marker.color);
	}

	draw(position, color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(
				position.x * this.squareWidth,
				position.y * this.squareHeight,
				this.squareWidth,
				this.squareHeight);
	}

	setDirection(direction) {
		if (direction) {
			this.snake.direction = direction;
		}
	}

	collision() {
		const snakePosition = this.snake.getNextHeadPosition();
		return snakePosition.x === 0 ||
				snakePosition.y === 0 ||
				snakePosition.x > this.width ||
				snakePosition.y > this.height ||
				this.snake.hitTail();
	}

	moveSnake() {
		let stopGame = true;
		let score = false;
		if (!this.collision()) {
			const hitMarker = this.markerCollision();
			if (hitMarker) {
				score = true;
				this.generateNewMarkerPosition();
			}
			const lastPosition = this.snake.move(hitMarker);
			this.displaySnake();
			this.draw(lastPosition, this.fieldColor);
			stopGame = false;
		}
		return { stopGame, score };
	}

	markerCollision () {
		return this.snake.head.x === this.marker.x && this.snake.head.y === this.marker.y;
	}

	generateNewMarkerPosition () {
		this.marker.generateNewPosition(this);
		this.displayMarker();
	}

}
