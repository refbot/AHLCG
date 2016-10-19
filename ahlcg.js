console.log('ahlcg.js');
var app = angular.module("ahlcg", []);

app.controller("ArkhamController", function($scope, $http) {
  // console.log('in controller');
  // $scope.player1 = new Player('Chris');
  // $scope.player2 = new Player('Henry');
  //
  // $scope.player1.investigator = new AgnesBaker($scope.player1);
  // $scope.player2.investigator = new WendyAdams($scope.player2);
  // 
  // ['Forbidden Knowledge', 'Holy Rosary', "Shriveling", "Scrying", "Arcane Studies", "Arcane Initiate",
  //               "Drawn to the Flame", "Ward of Protection", "Blinding Light", "Fearless"].forEach(function(card_title){
  //   $scope.player1.deck.add(new PlayerCard(card_title, $scope.player1));
  // });
  // ["Leather Coat", "Scavenging", "Rabbit's Foot", "Baseball Bat", "Stray Cat", "Dig Deep", "Cunning Distraction",
  //               "\"Look What I Found\"", "Lucky!", "Survival Instinct"].forEach(function(card_title){
  //   $scope.player2.deck.add(new PlayerCard(card_title, $scope.player2));
  // });
  //
  // $scope.player1.deck.shuffle();
  // $scope.player1.draw(1);
});
