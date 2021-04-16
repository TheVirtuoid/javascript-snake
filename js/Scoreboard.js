export default class Scoreboard {
	score = 0;
	scoreboard;
	gameOver;
	scoreDom;
	restart;

	constructor(id) {
		this.scoreboard = document.getElementById(id);
		this.gameOver = this.scoreboard.querySelector('#game-over');
		this.scoreDom = this.scoreboard.querySelector('#score');
		this.restart = this.scoreboard.querySelector('#restart');
		this.reset();
	}

	reset() {
		this.score = 0;
		this.gameOver.classList.remove('show');
		this.restart.classList.remove('show');
		this.display();
	}

	display() {
		this.scoreDom.textContent = `${this.score}`;
	}

	increment() {
		this.score++;
		this.display();
	}

	endGame () {
		this.gameOver.classList.add('show');
		this.restart.classList.add('show');
	}


}
