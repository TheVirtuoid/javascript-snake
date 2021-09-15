const directionMap = new Map();
directionMap.set('ArrowUp', 'N');
directionMap.set('ArrowDown', 'S');
directionMap.set('ArrowRight', 'E');
directionMap.set('ArrowLeft', 'W');
directionMap.set('KeyW', 'N');
directionMap.set('KeyD', 'E');
directionMap.set('KeyS', 'S');
directionMap.set('KeyA', 'W');

function processKeyboard(event) {
	const direction = directionMap.get(event.code);
	publish.bind(this)('move', direction);
}

function publish(command, value) {
	const { subscribers } = privateVariables.get(this);
	if (subscribers.has(command) && value) {
		console.log(command, value);
		subscribers.get(command).forEach( (callback) => callback(value));
	}
}

export default class Keyboard {

	subscribers = [];

	constructor() {}

	start() {
		document.addEventListener('keyup', processKeyboard.bind(this));
	}

	stop() {

	}

	onChange() {
		
	}
}