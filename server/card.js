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
