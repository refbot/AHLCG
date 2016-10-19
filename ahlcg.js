console.log('ahlcg.js');
var app = angular.module("ahlcg", []);

app.controller("ArkhamController", function($scope, $http) {
  console.log('in controller');
  $scope.player1 = new Player('Chris');
  $scope.player2 = new Player('Henry');

  $scope.player1.investigator = new AgnesBaker($scope.player1);
  $scope.player2.investigator = new WendyAdams($scope.player2);

  ['Forbidden Knowledge', 'Holy Rosary', "Shriveling", "Scrying", "Arcane Studies", "Arcane Initiate",
                "Drawn to the Flame", "Ward of Protection", "Blinding Light", "Fearless"].forEach(function(card_title){
    $scope.player1.deck.add(new PlayerCard(card_title, $scope.player1));
  });
  ["Leather Coat", "Scavenging", "Rabbit's Foot", "Baseball Bat", "Stray Cat", "Dig Deep", "Cunning Distraction",
                "\"Look What I Found\"", "Lucky!", "Survival Instinct"].forEach(function(card_title){
    $scope.player2.deck.add(new PlayerCard(card_title, $scope.player2));
  });

  $scope.player1.deck.shuffle();
  $scope.player1.draw(1);
});
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

class Card {
  constructor(name) {
    this.name = name;
  }
}

class InvestigatorCard extends Card {
  constructor(stats, owner) {
    super(stats['name']);
    this.owner = owner;
    this.cardtype = 'Investigator';
    this.subtitle = stats['subtitle'];
    this.card_class = stats['class'];
    this.total_health = stats['total_health'];
    this.total_horror = stats['total_horror'];
    this.skills = stats['skills'];
    this.traits = stats['traits'];
    this.deck_size_min = stats['deck_size_min'];
    this.ability_text = stats['ability_text'];
    this.elder_sign_ability_text = stats['elder_sign_ability_text'];
    this.deck_requirements = stats['deck_requirements'];
    this.deckbuilding_options = stats['deckbuilding_options'];
    this.flavor_text = stats['flavor_text'];
    this.artist = stats['artist'];
    this.set = stats['core'];
  }
}

class AgnesBaker extends InvestigatorCard {
  constructor(owner) {
    var stats = {
      'name': 'Agnes Baker',
      'subtitle': 'The Waitress',
      'class': 'Mystic',
      'traits': ['Sorcerer'],
      'total_health': 6,
      'total_horror': 8,
      'skills': {
        'willpower':  5,
        'intellect':  2,
        'combat':     2,
        'agility':    3
      },
      'deck_size_min': 30,
      'ability_text': `Reaction: After 1 or more horror is placed on Agnes Baker:
                       Deal 1 damage to an enemy at your location (Limit once per phase)`,
      'elder_sign_ability_text': 'effect: +1 for each horror on Agnes Baker',
      'deck_requirements': ['Heirloom of Hyperborea', 'Dark Memory', 'Random Basic Weakness'],
      'deckbuilding_options': {
        'Mystic': {'min_level': 0, 'max_level': 5},
        'Survivor': {'min_level': 0, 'max_level': 2},
        'Neutral': {'min_level': 0, 'max_level': 5}
      },
      'flavor_text': 'I remember another life, one of sorcery and conquest.',
      'artist': 'Magali Villaneuve',
      'set': 'core',
    };
    super(stats, owner)
  }
}

class WendyAdams extends InvestigatorCard {
  constructor(owner) {
    var stats = {
      'name': 'Wendy Adams',
      'subtitle': 'The Urchin',
      'class': 'Survivor',
      'traits': ['Drifter'],
      'total_health': 7,
      'total_horror': 7,
      'skills': {
        'willpower':  4,
        'intellect':  3,
        'combat':     1,
        'agility':    4
      },
      'deck_size_min': 30,
      'ability_text': `Reaction: When you reveal a chaos token, choose and
                        discard 1 card form your hand: Cancel that chaos token
                        and return it to the bag.
                        Reveal a new chaos token. (Limit once per phase)`,
      'elder_sign_ability_text': 'effect: +0. If Wendy\'s Amulet is in play, you automatically succeed instead',
      'deck_requirements': ["Wendy's Amulet", 'Abandoned and Alone', 'Random Basic Weakness'],
      'deckbuilding_options': {
        'Survivor': {'min_level': 0, 'max_level': 5},
        'Rogue': {'min_level': 0, 'max_level': 2},
        'Neutral': {'min_level': 0, 'max_level': 5}
      },
      'flavor_text': null,
      'artist': 'Jacob Murray',
      'set': 'core',
    };
    super(stats, owner)
  }
}



class PlayerCard extends Card {
  constructor(name, owner, test_icons = {}, traits = [], victory_points = 0) {
    super(name);
    this.owner = owner;
    this.test_icons = test_icons;
    this.traits = traits;
    this.victory_points = 0;
  }
}

class AssetCard extends PlayerCard {
  constructor(name, owner, test_icons, traits, slot) {
    super(name, owner, test_icons, traits);
    this.type = 'Asset';
    this.slot = slot;
  }
}

class SkillCard extends PlayerCard {
  constructor(name, owner) {
    super(name, owner);
    this.type = 'Skill';
  }

  on_succeed(){

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
