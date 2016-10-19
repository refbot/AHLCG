console.log('game.js');
var PLAYER = require('./player.js');

class Game {
  constructor(player) {
    this.player = player;
    this.encounter_deck = new PLAYER.Deck();
    this.encounter_deck.cards = ['test', 'encounter_card', 'fake', 'data'];
  }
}


var exports = module.exports = {'Game': Game};
