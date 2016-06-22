var app = angular.module('customers');

app.controller('CustomerCreditCardController', ['$scope', '$resource',
  function ($scope, $resource) {
    var CreditCardInfo = $resource("/fake_billing.json");
    $scope.setCardholder = function (cardholderId) {
      $scope.creditCard = CreditCardInfo.get({ "cardholder_id": cardholderId });
    }
  }]);