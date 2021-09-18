const privateVariables = new WeakMap();

const directionMap = new Map();
directionMap.set('ArrowUp', 'N');
directionMap.set('ArrowDown', 'S');
directionMap.set('ArrowRight', 'E');
directionMap.set('ArrowLeft', 'W');
directionMap.set('KeyW', 'N');
directionMap.set('KeyD', 'E');
directionMap.set('KeyS', 'S');
directionMap.set('KeyA', 'W');
directionMap.set('1000', 'N');
directionMap.set('0100', 'S');
directionMap.set('0010', 'W');
directionMap.set('0001', 'E');

function processKeyboard(event) {
	const direction = directionMap.get(event.code);
	publish.bind(this)('move', direction);
}

function processDPad() {
	if (this.gameRunning) {
		const gamepad = navigator.getGamepads()[this.gamepadIndex];
		const direction = `${gamepad.buttons[12].pressed * 1}${gamepad.buttons[13].pressed * 1}${gamepad.buttons[14].pressed * 1}${gamepad.buttons[15].pressed * 1}`;
		if (direction !== this.lastDirection) {
			this.lastDirection = direction;
			publish.bind(this)('move', directionMap.get(direction));
		}
		requestAnimationFrame(processDPad.bind(this));
	}
}

function publish(command, value) {
	const { subscribers } = privateVariables.get(this);
	if (subscribers.has(command) && value) {
		console.log(command, value);
		subscribers.get(command).forEach( (callback) => callback(value));
	}
}

function onGamepadConnected(event) {
	this.gamepadIndex = event.gamepad.index;
	this.lastDirection = '0000';
	this.start();
}

export default class Input {
	gamepadIndex = -1;
	lastDirection = "";
	gameRunning = false;
	constructor() {
		const variables = {
			subscribers: new Map([ ['move', []] ])
		}
		privateVariables.set(this, variables);
		document.addEventListener('keyup', processKeyboard.bind(this));
		window.addEventListener("gamepadconnected", onGamepadConnected.bind(this));
	}

	on(command, callback) {
		const { subscribers } = privateVariables.get(this);
		if (subscribers.has(command) && typeof callback === 'function') {
			const callbacks = subscribers.get(command);
			callbacks.push(callback);
			subscribers.set(command, callbacks);
			privateVariables.set(this, { subscribers });
		}
	}

	start() {
		this.gameRunning = true;
		requestAnimationFrame(processDPad.bind(this));
	}

	stop() {
		this.gameRunning = false;
	}
}