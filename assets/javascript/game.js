let game = {
    currentWord: "",
    hiddenWord: "",
    missedLetters: "",
    stateMessage: "",
    wins: 0,
    loses: 0,
    startGuesses: 10,
    guessesLeft: 0,
    words: [],
    isPlaying: true,

    getPokemonNames: function () {
        //create new instance of pokeapi's js wrapper, retreive the pokemon_species
        // value from it, then send that value to fillWords()
        let P = new Pokedex.Pokedex({ protocol: 'https' });
        P.getGenerationByName("generation-i").then(function (response) {
            game.fillWords(response.pokemon_species);
        })
    },

    fillWords: function (val) {
        //loop through value and add the pokemon names to words[];
        for (let i = 0; i < val.length; i++) {
            this.words.push(val[i].name);
        }
        this.startGame();
    },

    getRandomWord: function () {
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        for (let i = 0; i < this.currentWord.length; i++) {
            this.hiddenWord += "_";
        }
        if(this.currentWord.indexOf('-') > 0)
            this.compareChar('-');
        this.updateDoc();
        console.log(this.currentWord);
    },

    compareChar: function (char) {
        let indices = [];
        let idx = this.currentWord.indexOf(char);
        while (idx != -1) {
            indices.push(idx);
            idx = this.currentWord.indexOf(char, idx + 1);
        }

        for (let i = 0; i < indices.length; i++) {
            this.hiddenWord = this.hiddenWord.substring(0, indices[i]) +
                char + this.hiddenWord.substring(indices[i] + 1);
        }
        return indices.length;
    },

    updateDoc: function () {
        this.checkGameState();
        document.getElementById("winScore").innerHTML = "Wins: " + this.wins;
        document.getElementById("loseScore").innerHTML = "Loses: " + this.loses;
        document.getElementById("guessesRemaining").innerHTML = "Guesses Left: " + this.guessesLeft;
        document.getElementById("wordToGuess").innerHTML = this.hiddenWord;
        document.getElementById("guessedLetters").innerHTML = this.missedLetters;
        document.getElementById("endGameMessage").innerHTML = this.stateMessage;

    },

    checkGameState: function () {
        if (this.hiddenWord === this.currentWord)
        {
            game.stateMessage = "You Win! Press any key to play again.";
            game.wins++;
            this.isPlaying = false;
        }

        if (this.guessesLeft === 0)
        {
            game.stateMessage = "Better luck next time... Press any key to try again."
            game.loses++;
            this.hiddenWord = this.currentWord;
            this.isPlaying = false;
        }
    },

    startGame: function () {
        this.guessesLeft = this.startGuesses;
        this.hiddenWord = "";
        this.missedLetters = "";
        this.stateMessage = "";
        this.isPlaying = true;
        this.getRandomWord();
    }
};

document.onkeydown = function () {
    let key = event.key;
    if (game.isPlaying) {
        // if the key isn't found in currentWord and the key isn't in missingLetters...
        if (game.compareChar(key) === 0 && game.missedLetters.indexOf(key) === -1) {
            if (game.missedLetters.length === 0)
                game.missedLetters += key;
            else
                game.missedLetters += ", " + key;
            game.guessesLeft --;
        }
        game.updateDoc();
    }
    else {
        game.startGame();
    }
}


game.getPokemonNames();

