export default class Marker {
	x = 0;
	y = 0;
	color = "aqua";

	generateNewPosition (field) {
		let hitSnake = true;
		while (hitSnake) {
			this.x = Math.floor(Math.random() * field.width) + 1;
			this.y = Math.floor(Math.random() * field.height) + 1;
			hitSnake = this.x === (field.snake.head.x && this.y === field.snake.head.y) ||
					field.snake.tail.some( segment => this.x === segment.x && this.y === segment.y);
		}
		return this;
	}
}
