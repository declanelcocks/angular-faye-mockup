var app = angular.module('simpleChat', ['faye','luegg.directives']);

app.factory('Faye', ['$faye', function($faye) {
  return $faye("http://pacific-depths-6114.herokuapp.com:8181/faye");
}]);

app.controller('ChatCtrl', function($rootScope, $scope, Faye) {
  var userTimeStamp = Date.now();
  $scope.chatMessages = []; //Init chat message array

  Faye.subscribe("/channel", function(msg) {
    $scope.chatMessages.push(msg);
  });

  $scope.sendMessage = function($event) {
    if($event.which != 13) return;
    if($scope.message.length === 0) return;

    Faye.publish("/channel", {
      message: $scope.message,
      user: userTimeStamp
    });
    $scope.message = '';
  };

});
