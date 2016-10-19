console.log('player.js');

class Player {
  constructor(name) {
    this.name = name;
    this.hand = new Hand(this);
    this.deck = new Deck();
    this.deck.assign_owner(this); // some decks dont need this. should have player decks vs encounter decks vs agenda decks, etc.
    this.discard = new Discard();
    this.investigator = null;
    this.base_slots = {
      'accessory':  1,
      'body':       1,
      'ally':       1,
      'hand':       2,
      'arcane':     2,
    }
  }

  get_deckstring() {
    var deckstring_arr = this.deck.cards.map(function(item){
      return item.name;
    });

    return "[" + deckstring_arr.join(", ") + "]"
  }

  get_handstring() {
    var handstring_arr = this.hand.cards.map(function(item){
      return item.name;
    });

    return "[" + handstring_arr.join(", ") + "]"
  }

  draw(total = 1) {
    if (total > this.deck.length) {
      this.draw(this.deck.length);
      // shuffle deck, draw difference of whats left and the deck
    }

    while (total != 0) {
      total -= 1;
      this.hand.add_card_to_hand(this.deck.topdeck());
    }

  }
}

class Hand {
  constructor (owner) {
    this.cards = [];
    this.owner = owner;
  }

  add_card_to_hand(card) {
    if (card.owner == this.owner) {
        this.cards.push(card);
    }
  }
}


class Deck {
  constructor() {
    this.cards = [];
    this.owner = null;
  }

  assign_owner(owner) {
    this.owner = owner;
  }

  shuffle() {
    var current_index = this.cards.length;
    var temp_card, random_index;

    while (0 !== current_index) {
      random_index = Math.floor(Math.random() * current_index);

      current_index -= 1;

      temp_card = this.cards[current_index];
      this.cards[current_index] = this.cards[random_index];
      this.cards[random_index] = temp_card;
    }
  }

  add(card) {
    if (card.owner == this.owner) {
      this.cards.push(card);
    } else {
      console.log('card does not belong to owner of deck: ' + this.owner.name);
    }

  }

  topdeck() {
    return this.cards.shift();
  }
}

class Discard {
  constructor () {
    this.cards = [];
  }
}

var exports = module.exports = {'Player': Player, 'Hand': Hand, 'Deck': Deck, 'Discard': Discard};
