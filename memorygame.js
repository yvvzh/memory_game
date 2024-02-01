document.addEventListener("DOMContentLoaded", function () {
    const memoryGame = document.querySelector(".memory-game");
    const cardModels = ["bxs-invader", "bxs-cat", "bxs-dog", "bxs-cool", "bxs-virus", "bxs-bowl-rice", "bxs-party", "bxs-ghost"];
    const cards = cardModels.concat(cardModels);
    let openedCards = [];
    let matchedCards = [];

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
        }

        openedCards = [];

        // Check if all cards are matched
        if (matchedCards.length === cards.length) {
            alert("Congratulations! You matched all the pairs.");
        }
    }
});
