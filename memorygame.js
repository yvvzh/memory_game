document.addEventListener("DOMContentLoaded", function () {
    const lifePointsDisplay = document.getElementById("life-points");
    const difficultySelector = document.getElementById("difficulty");
    const startBtn = document.getElementById("start-btn");
    const gameContainer = document.getElementById("game-container");
    const replayBtn = document.getElementById("replay");
    const memoryGame = document.querySelector(".memory-game");
    const cardModels = ["bxs-invader", "bxs-cat", "bxs-dog", "bxs-cool", "bxs-virus", "bxs-bowl-rice", "bxs-party", "bxs-ghost"];
    const cards = cardModels.concat(cardModels);
    let lives;
    let openedCards = [];
    let matchedCards = [];

    startBtn.addEventListener("click", startGame);
    replayBtn.addEventListener("click", replay);

    function startGame() {
        const selectedDifficulty = difficultySelector.value;

        // Set lives based on difficulty
        switch (selectedDifficulty) {
            case "easy":
                lives = 15;
                break;
            case "medium":
                lives = 10;
                break;
            case "hard":
                lives = 5;
                break;
            default:
                lives = 10; // Default to medium difficulty
        }

        // Initial life points display
        lifePointsDisplay.innerText = lives;

        // Shuffle the cards
        cards.sort(() => Math.random() - 0.5);

        // Create card elements and add them to the memory game
        cards.forEach((card, index) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.dataset.index = index;
            const cardIcon = document.createElement("i");
            cardIcon.classList.add("bx", card);
            cardElement.addEventListener("click", flipCard);
            cardElement.appendChild(cardIcon);
            memoryGame.appendChild(cardElement);
        });

        gameContainer.classList.remove("hidden");
        document.querySelector(".difficulty-selector").classList.add("hidden");
    }

    function replay() {
        location.reload();
    }

    function lifePointsManager() {
        lives--;
        if (lives === 0) {
            document.getElementById("replay-text").innerText = "You lost :/";
            gameContainer.classList.add("hidden");
            document.querySelector(".replay").classList.remove("hidden");
        } else {
            lifePointsDisplay.innerText = lives;
        }
    }

    function flipCard() {
        const clickedIndex = this.dataset.index;

        // Prevent opening more than 2 cards or clicking on matched cards
        if (openedCards.length < 2 && !openedCards.includes(clickedIndex) && !matchedCards.includes(clickedIndex)) {
            this.classList.add("flipped");
            openedCards.push(clickedIndex);

            if (openedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    function checkMatch() {
        const [index1, index2] = openedCards;
        const card1 = document.querySelector(`.card[data-index="${index1}"]`);
        const card2 = document.querySelector(`.card[data-index="${index2}"]`);

        if (cards[index1] === cards[index2]) {
            // Matched
            card1.classList.add("matched");
            card2.classList.add("matched");
            matchedCards.push(index1, index2);
        } else {
            // Not matched
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            lifePointsManager();
        }

        openedCards = [];

        // Check if all cards are matched
        if (matchedCards.length === cards.length) {
            document.getElementById("replay-text").innerText = "You WON :)";
            gameContainer.classList.add("hidden");
            document.querySelector(".replay").classList.remove("hidden");
        }
    }
});
