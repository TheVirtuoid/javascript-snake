export default class Snake {
	head = {
		x: -1,
		y: -1
	};
	tail = [];
	headColor = "black";
	tailColor = "red";
	direction = "";

	setStartingPosition(x, y, direction, length) {
		this.head.x = x;
		this.head.y = y;
		this.tail = [];
		this.direction = direction;
		const xTailDelta = direction === "E" ? -1 : direction === "W" ? 1 : 0;
		const yTailDelta = direction === "N" ? 1 : direction === "S" ? -1 : 0;
		let xTail = this.head.x;
		let yTail = this.head.y;
		while (length > 0) {
			xTail += xTailDelta;
			yTail += yTailDelta;
			this.tail.push({
				x: xTail,
				y: yTail
			});
			length--;
		}
	}

	getNextHeadPosition() {
		const x = this.head.x + (this.direction === "E" ? 1 : this.direction === "W" ? -1 : 0);
		const y = this.head.y + (this.direction === "S" ? 1 : this.direction === "N" ? -1 : 0);
		return { x, y };
	}

	hitTail () {
		const nextPos = this.getNextHeadPosition();
		return this.tail.some( segment => nextPos.x === segment.x && nextPos.y === segment.y);
	}

	move (grow = false) {
		const lastTailSegment = this.tail.slice(-1)[0];
		const finalElement = {
			x: lastTailSegment.x,
			y: lastTailSegment.y
		};
		for(let i = this.tail.length - 1; i > 0; i--) {
			this.tail[i].x = this.tail[i - 1].x;
			this.tail[i].y = this.tail[i - 1].y;
		}
		this.tail[0].x = this.head.x;
		this.tail[0].y = this.head.y;
		const nextPosition = this.getNextHeadPosition();
		this.head.x = nextPosition.x;
		this.head.y = nextPosition.y;
		if (grow) {
			this.tail.push(finalElement);
		}
		return finalElement;
	}

}
