let game = {
    currentWord: "",
    hiddenWord: "",
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
        this.getRandomWord();
    },

    getRandomWord: function () {
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        for (let i = 0; i < this.currentWord.length; i++) {
            this.hiddenWord += "_";
        }
        this.updateWord();
        console.log(this.currentWord);
    },

    compareChar: function (char) {
        let indices = [];
        let idx = this.currentWord.indexOf(char);
        while (idx != -1) {
            indices.push(idx);
            idx = this.currentWord.indexOf(char, idx + 1);
        }
        //this.hiddenWord = this.hiddenWord.replace(this.hiddenWord[idx], char);
        for(let i = 0; i < indices.length; i++)
        {
            function replaceAt(string, index, replace) {
                return this.hiddenWord.substring(0, ) + replace + string.substring(index + 1);
              }
        }

        this.hiddenWord = this.hiddenWord.replace(this.hiddenWord[indices[i]], char);
        console.log(indices);
        console.log(this.hiddenWord);
        this.updateWord();
        //return indices;
        // [0, 2, 4]
    },

    updateWord: function () {
        document.getElementById("wordToGuess").innerHTML = this.hiddenWord;
    }
};

document.onkeydown = function () {
    let key = event.key;
    if (game.isPlaying) {
        // if (game.compareChar(key) > 0)
        //     alert("you got a letter");
        // else
        //     alert("you didnt get a letter");
        game.compareChar(key);

    }
    else {

    }
}


game.getPokemonNames();

