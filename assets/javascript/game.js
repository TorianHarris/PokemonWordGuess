

let word = "shadowverse";



//function someFunc() { return longFunc().then(...); };
// var pr = someFunc(); 
// pr.then(function(data) { console.log(data) });
//console.log (getPokemonNames());

let game = {
    words: [],
    getPokemonNames: function() {
        let P = new Pokedex.Pokedex({ protocol: 'https' });
        let w;
        //for (let i = 0; i < 151; i++) {
            P.getGenerationByName("generation-i").then(function (response) {
                    console.log(response.pokemon_species[0].name);
                    setName(response.pokemon_species[0].name);
                    setName(response.pokemon_species[1].name);
                })
        //}
    },
    
    setName: function (val)
    {
        document.getElementById("wordToGuess").innerHTML = val;
    }, 
    
    getRandomWord: function () {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }
};
getPokemonNames();
//console.log(game.getPokemonNames());
//console.log(game.words);
// document.getElementById("wordToGuess").innerHTML = response.pokemon_species[0].name;