//Zbiór kart
const cards = {
    items: [{
            id: "",
            name: "dog",
            url: "img/dog.jpg",
            flipped: false
        },
        {
            id: "",
            name: "cat",
            url: "img/cat.jpg",
            flipped: false
        },
        {
            id: "",
            name: "xbox",
            url: "img/xbox.jpg",
            flipped: false
        },
        {
            id: "",
            name: "iphone",
            url: "img/iphone.jpg",
            flipped: false
        },
        {
            id: "",
            name: "apple",
            url: "img/apple.jpg",
            flipped: false
        },
        {
            id: "",
            name: "car",
            url: "img/car.jpg",
            flipped: false
        },
        {
            id: "",
            name: "atena",
            url: "img/atena.jpg",
            flipped: false
        },
        {
            id: "",
            name: "pizza",
            url: "img/pizza.jpg",
            flipped: false
        }
    ]
}

//Duplikacja kart
var cardsDuplicate = JSON.parse(JSON.stringify(cards));

var time = 0
    //Array with 2 cards of all types
var cardsAll = {
    items: cards.items.concat(cardsDuplicate.items),
    count: 0,
    tryCard1: "",
    tryCard2: "",
    score: 0,
    tries: 0,
    active: false,
    start: false,
    game: "",
}


var app = new Vue({
    el: "#game",
    data: cardsAll,
    methods: {
        flipCard: function(item) {
            if (!game.active) {
                console.log("You cant flip card right now")
            } else {
                item.flipped = true
                game.count += 1
                    //DEKLARACJA PIERWSZEJ ODKRYTEJ KARTY
                if (game.count === 1) {
                    tryCard1 = item
                }

                //DEKLARACJA DRUGIEJ ODKRYTEJ KARTY I SPRAWDZENIE ZGODNOŚCI
                else if (game.count === 2) {
                    tryCard2 = item
                    game.tries += 1
                    game.active = false

                    //KARTY SĄ ZGODNE
                    if (tryCard1.name === tryCard2.name) {
                        console.log("HURRA")
                        game.score += 1
                        game.active = true;
                    }
                    //KARTY NIE SĄ ZGODNE
                    else {
                        console.log("WRONG")
                        setTimeout(function() {
                            game.active = true;
                            tryCard1.flipped = false;
                            tryCard2.flipped = false;
                        }, 700)
                    }
                    game.count = 0
                }
                //KONIEC GRY
                if (game.score === 0.5 * game.items.length) {
                    setTimeout(function() {
                        alert("BRAWO");
                    }, 500)

                }
            }


        },
        newGame: function() {
            game = this
            game.start = true
            game.score = game.count = game.tries = 0

            setTimeout(function() {
                game.active = true;
            }, 3200)

            for (i = 0; i < this.items.length; i++) {
                this.items[i].flipped = false;
            }

            for (i = 0; i < this.items.length; i++) {
                //losuje index karty
                var randomNumber = Math.round(Math.random() * (this.items.length - 1));
                //przechwycamy wybraną kartę w temp
                var temp = this.items[i];
                //podmianka wybranej karty na wylosowaną kartę
                this.items[i] = this.items[randomNumber];
                //podmianka wylosowanej karty na wybraną
                this.items[randomNumber] = temp
            }
            //odświeżenie widoku
            app.$forceUpdate();
        }
    }
})