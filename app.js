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

var cardsDuplicate = JSON.parse(JSON.stringify(cards));


//Array with 2 cards of every type 
var cardsAll = {
    items: cards.items.concat(cardsDuplicate.items),
    active: false,
    start: false,
    won: false,
    session: 0,
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
                    //Choosing 1st card
                if (game.count === 1) {
                    tryCard1 = item
                }
                //Choosing 2nd card and comparing
                else if (game.count === 2) {
                    tryCard2 = item
                    game.tries += 1
                    game.active = false

                    //Matching cards
                    if (tryCard1.name === tryCard2.name) {
                        game.score += 1
                        game.active = true;
                    }
                    //Different cards
                    else {
                        setTimeout(function() {
                            game.active = true;
                            tryCard1.flipped = false;
                            tryCard2.flipped = false;
                        }, 700)
                    }
                    game.count = 0
                }
                //End of the game
                if (game.score === 0.5 * game.items.length) {
                    game.endTime = new Date()
                    game.time = Math.round(0.001 * (game.endTime - game.startTime));
                    setTimeout(function() {
                        game.won = true;
                        app.$forceUpdate();
                    }, 500)
                }
            }


        },
        newGame: function() {
            game = this
            game.startTime = new Date()
            game.start = true
            game.score = game.count = game.tries = game.won = 0

            if (game.session === 0) {
                setTimeout(function() {
                    game.active = true;
                    game.startTime = new Date();
                    game.session = 1
                }, 3200)
            }

            for (i = 0; i < this.items.length; i++) {
                this.items[i].flipped = false;
            }

            //Shuffling cards
            for (i = 0; i < this.items.length; i++) {
                var randomNumber = Math.round(Math.random() * (this.items.length - 1));
                var temp = this.items[i];
                this.items[i] = this.items[randomNumber];
                this.items[randomNumber] = temp
            }

            app.$forceUpdate();
        }
    }
})

var pressToStart = document.getElementsByClassName("game-background")[0];

pressToStart.addEventListener("click", disappear, false)

function disappear() {
    pressToStart.className = "game-background leave";
    setTimeout(function() {
        pressToStart.style.display = "none";
    }, 4000)
}

const page = document.getElementById("pageContent");
const scoreButton = document.getElementsByClassName("scoreButton")[0];


scoreButton.addEventListener("click", function(e) {
    if (page.style = "") {
        console.log("Wait for animation ends")
    } else {
        switch (page.className) {
            case "headerEnter":
                e.preventDefault;
                // -> removing the class
                page.classList.remove("headerEnter");
                // -> triggering reflow The actual magic 
                // without this it wouldn't work.
                void page.offsetWidth;
                page.className = "headerLeave";
                scoreButton.innerHTML = "Show scoretable"
                break;
            default:
                e.preventDefault;
                page.classList.remove("headerLeave");
                void page.offsetWidth;
                page.className = "headerEnter";
                scoreButton.innerHTML = "Hide scoretable"
                break;
        }
    }
})