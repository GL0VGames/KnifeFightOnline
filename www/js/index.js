//var ds = deepstream("localhost:6020").login();
//var stack = ds.record.getRecord("stack");
var localStack = new Stack();

function stackMakeDeck(n) {
	var ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
	var suits = ["C", "D", "H", "S"];
	var m = ranks.length * suits.length;
	// Set array of cards.
	this.cards = new Array(n * m);
	// Fill the array with 'n' packs of cards.
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < suits.length; j++) {
			for (var k = 0; k < ranks.length; k++) {
				this.cards[i * m + j * ranks.length + k] = new Card(ranks[k], suits[j]);
			}
		}
	}
}

function stackShuffle(n) {
	var k, temp;
	// Shuffle the stack 'n' times.
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < this.cards.length; j++) {
			k = Math.floor(Math.random() * this.cards.length);
			temp = this.cards[j];
			this.cards[j] = this.cards[k];
			this.cards[k] = temp;
		}
	}
}

function stackDeal() {
	if (this.cards.length > 0) {
		return this.cards.shift()
	} else {
		return null
	}
}

function stackDraw(n) {
	var card;
	if (n >= 0 && n < this.cards.length) {
		card = this.cards[n];
		this.cards.splice(n, 1);
	} else {
		card = null;
	}
	return card;
}

function stackCardCount() {
	return this.cards.length;
}

function stackAddCard(card) {
	this.cards.push(card);
}

function stackCombine(stack) {
	this.cards = this.cards.concat(stack.cards);
	stack.cards = [];
}

function cardToString() {
	var rank, suit;
	switch (this.rank) {
		case "A" :
			rank = "Ace";
			break;
		case "2" :
			rank = "Two";
			break;
		case "3" :
			rank = "Three";
			break;
		case "4" :
			rank = "Four";
			break;
		case "5" :
			rank = "Five";
			break;
		case "6" :
			rank = "Six";
			break;
		case "7" :
			rank = "Seven";
			break;
		case "8" :
			rank = "Eight";
			break;
		case "9" :
			rank = "Nine";
			break;
		case "10" :
			rank = "Ten";
			break;
		case "J" :
			rank = "Jack"
			break;
		case "Q" :
			rank = "Queen"
			break;
		case "K" :
			rank = "King"
			break;
		default :
			rank = null;
			break;
	}
	switch (this.suit) {
		case "C" :
			suit = "Clubs";
			break;
		case "D" :
			suit = "Diamonds"
			break;
		case "H" :
			suit = "Hearts"
			break;
		case "S" :
			suit = "Spades"
			break;
		default :
			suit = null;
			break;
	}
	if (rank === null || suit === null) {
		return ""
	}
	return rank + " of " + suit;
}


function Stack() {

	// Create an empty array of cards.
	this.cards = [];

	this.makeDeck  = stackMakeDeck;
	this.shuffle   = stackShuffle;
	this.deal      = stackDeal;
	this.draw      = stackDraw;
	this.addCard   = stackAddCard;
	this.combine   = stackCombine;
	this.cardCount = stackCardCount;
}

function Card(rank, suit) {

	this.rank = rank;
	this.suit = suit;

	this.toString   = cardToString;
}

$(document).ready( function() {
	$("h1").text("Hit a button!");

	$("#newDeck").click( function() {
		localStack.makeDeck(1);
		$("h2").remove();
		$("h1").text("New deck created!");
	})

	$("#shuffleDeck").click( function() {
		localStack.shuffle(1);
		$("h1").text("Deck shuffled!");
	})

	$("#drawCard").click( function() {
		$("h1").append("<h2>" + localStack.deal().toString() + "</h2>");
	})

	$("#countCard").click( function() {
		$("#count").text(localStack.cardCount());
	})
})
