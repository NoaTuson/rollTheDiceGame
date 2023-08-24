//defining the instructions menu
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnShowModal = document.querySelectorAll(".show-modal");

const openModal = function () {
	console.log("clicked");
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
};

const closeModal = function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

for (let i = 0; i < btnShowModal.length; i++) {
	btnShowModal[i].addEventListener("click", openModal);
	btnCloseModal.addEventListener("click", closeModal);
	overlay.addEventListener("click", closeModal);
}

document.addEventListener("keydown", function (event) {
	console.log(event.key);

	if (event.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
});

//selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdScoreBtn = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, stillplaying;

//starting conditions

const newGame = function () {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	stillplaying = true;

	score0El.textContent = 0;
	score1El.textContent = 0;
	currentScore0El.textContent = 0;
	currentScore1El.textContent = 0;

	player0El.classList.remove("player--winner");
	player1El.classList.remove("player--winner");
	player0El.classList.add("player--active");
	player1El.classList.remove("player--active");
	diceEl.classList.add("hidden");
};
newGame();

const switchPlayer = function () {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0El.classList.toggle("player--active");
	player1El.classList.toggle("player--active");
};

//rolling dice functionality
rollDiceBtn.addEventListener("click", function () {
	if (stillplaying) {
		// 1. generate a random dice value
		const randDice = Math.floor(Math.random() * 6) + 1;
		//check console.log(randDice);

		// 2. display the dice
		diceEl.classList.remove("hidden");
		diceEl.src = `dice-${randDice}.png`;

		// 3. chack for rolled 1- if so, switch to the next player
		if (randDice !== 1) {
			// add the dice to the current score
			currentScore += randDice;
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;
		} else {
			//switch to the next player
			switchPlayer();
		}
	}
});

holdScoreBtn.addEventListener("click", function () {
	if (stillplaying) {
		// 1. add current score to active player's score
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer];

		// 2. check if player's score is higher than or equal to 100 (>= 100)
		if (scores[activePlayer] >= 20) {
			// and finish the game
			stillplaying = false;
			diceEl.classList.add("hidden");
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add("player--winner");
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove("player--active");
		} else {
			// 3. (if the score is not yet 100) swich to the next player
			switchPlayer();
		}
	}
});

newGameBtn.addEventListener("click", newGame);
