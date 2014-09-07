var app = angular.module('simpleChat', ['faye']);

app.factory('Faye', ['$faye', function($faye) {
  return $faye("http://localhost:8181/faye");
}]);

app.controller('ChatCtrl', function($rootScope, $scope, Faye) {
$scope.chatMessages = []; //Init chat message array
  Faye.subscribe("/channel", function(msg) {
    $scope.chatMessages.push(msg);
  });

  var x =
  $scope.sendMessage = function($event) {
    if($event.which != 13) return;
    if($scope.message.length === 0) return;

    Faye.publish("/channel", {
      message: $scope.message
    });
    $scope.message = '';
  };

  $scope.chatMessages2 = Faye.get("/channel");
});
// $(function() {
//   //Faye Test
//   var client = new Faye.Client('/faye', {
//     timeout: 20
//   });
//   client.subscribe('/channel', function(message) {
//     $('#messages').append('<p>' + message.text + '</p>');
//   });
//   var $chat = $('#chat');
//   var timeStampUser = Date.now();
//   $('#fire').on('click', null, function() {
//     var url = 'http://localhost:8181/message';
//     var message = {
//       message: ['Client', timeStampUser, ':', $chat.val()].join(' ')
//     };
//     var dataType = 'json';
//     $.ajax({
//       type: 'POST',
//       url: url,
//       data: message,
//       dataType: dataType
//     });
//     $chat.val('');
//   });
// });
