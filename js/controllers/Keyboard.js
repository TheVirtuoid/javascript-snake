import Mapping from "./Mapping.js";

function processKeyboard(event) {
	publish.bind(this)('move', Mapping.getDirection(event.code));
}

function publish(command, value) {
	if (this.#subscribers.has(command) && value) {
		console.log(command, value);
		this.#subscribers.get(command).forEach( (callback) => callback(value));
	}
}

export default class Keyboard {

	#subscribers = new Map();
	#processKeyboardBinding;

	constructor() {
		this.#processKeyboardBinding = processKeyboard.bind(this);
	}

	start() {
		document.addEventListener('keyup', this.#processKeyboardBinding);
	}

	stop() {
		document.removeEventListener('keyup', this.#processKeyboardBinding);
	}

	on(action, callback) {
		if (this.#subscribers.length === 0) {
			this.start();
		}
		if (!this.#subscribers.has(action)) {
			this.#subscribers.set(action, []);
		}
		const subscriptions = this.#subscribers.get(action);
		subscriptions.push(callback);
		this.#subscribers.set(action, subscriptions);
	}

	off(action, callback) {
		if (this.#subscribers.has(action)) {
			const subscriptions = this.#subscribers.get(action).filter( subscription => subscription !== callback );
			if (subscriptions.length === 0) {
				this.#subscribers.delete(action);
				if (this.#subscribers.length === 0) {
					this.stop();
				}
			} else {
				this.#subscribers.set(action, subscriptions);
			}
		}
	}

	onChange() {
		
	}
}