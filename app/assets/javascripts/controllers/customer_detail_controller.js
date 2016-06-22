var app = angular.module('customers');

app.controller('CustomerDetailController',
  ['$scope',"$http", '$location', "$routeParams", "$resource",
    function ($scope, $http, $location, $routeParams, $resource) {
      var copiedShippingAddress = false;
      var backupShippingAddress = {};
      $scope.customerId = $routeParams.id;
      var Customer = $resource("/customers/:customerId.json",
        { "customerId": "@customer_id" },
        { "save": { "method" : 'PUT' } });
      $scope.customer = Customer.get({ "customerId": $scope.customerId });

      $scope.copyShippingAddress = function () {
        copiedShippingAddress = !copiedShippingAddress;

        if (copiedShippingAddress) {
          backupShippingAddress = {
            shipping_address_street: $scope.customer.billing_address_street,
            shipping_address_city: $scope.customer.billing_address_city,
            shipping_address_code: $scope.customer.billing_address_code,
            shipping_address_zipcode: $scope.customer.billing_address_zipcode
          };

          $scope.customer.billing_address_street = $scope.customer.shipping_address_street;
          $scope.customer.billing_address_city = $scope.customer.shipping_address_city;
          $scope.customer.billing_address_code = $scope.customer.shipping_address_code;
          $scope.customer.billing_address_zipcode = $scope.customer.shipping_address_zipcode;

          $scope.form.$pristine = false;
        } else {
          $scope.customer.billing_address_street = backupShippingAddress.shipping_address_street;
          $scope.customer.billing_address_city = backupShippingAddress.shipping_address_city;
          $scope.customer.billing_address_code = backupShippingAddress.shipping_address_code;
          $scope.customer.billing_address_zipcode = backupShippingAddress.shipping_address_zipcode;
        }
      };

      $scope.save = function () {
        if ($scope.form.$valid) {
          var l = Ladda.create( document.querySelector('.save-button-js'));
          l.start();

          $scope.customer.$save(function () {
              $scope.form.$setPristine();
              $scope.form.$setUntouched();
              l.stop();
            },
            function () {
              l.stop();
              alert("Save failed :(");
            }
          );
        }

      };

      //$http.get('/customers/' + customerId + '.json').then(function (response) {
      //$scope.customer = response.data;
      //}, function (response) {
      //  alert("There was a problem: " + response.status);
      //})
    }]);