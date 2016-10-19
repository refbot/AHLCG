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
