const directionMap = new Map();
directionMap.set('ArrowUp', 'N');
directionMap.set('ArrowDown', 'S');
directionMap.set('ArrowRight', 'E');
directionMap.set('ArrowLeft', 'W');
directionMap.set('KeyW', 'N');
directionMap.set('KeyD', 'E');
directionMap.set('KeyS', 'S');
directionMap.set('KeyA', 'W');

export default class Mapping {
	static getDirection(incomingDirection) {
		return directionMap.get(incomingDirection);
	}
}