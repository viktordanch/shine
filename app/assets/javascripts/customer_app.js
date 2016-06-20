var app = angular.module('customers', ['ngRoute', 'ngResource', 'ngMessages', 'templates']);

app.config([
  '$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      controller: 'CustomerSearchController',
      templateUrl: 'customer_search.html'
    }).when('/:id', {
      controller: 'CustomerDetailController',
      templateUrl: 'customer_detail.html'
    });
  }
]);

app.controller('CustomerCreditCardController', ['$scope', '$resource',
  function ($scope, $resource) {
    var CreditCardInfo = $resource("/fake_billing.json");
    $scope.setCardholder = function (cardholderId) {
      $scope.creditCard = CreditCardInfo.get({ "cardholder_id": cardholderId });
    }
}]);

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

app.controller('CustomerSearchController',
  ['$scope', "$http", '$location',
    function ($scope, $http, $location) {
    $scope.customers = [];
    var page = 0;
    $scope.previousPage = function () {
      page = page - 1;
      $scope.search($scope.searchedFor);
    };

    $scope.viewDetail = function (customer) {
      $location.path('/' + customer.id);
    },

    $scope.nextPage = function () {
      page = page + 1;
      $scope.search($scope.searchedFor);
    };

    $scope.search = function (searchTerm) {
      if (searchTerm.length < 3) {
        return;
      }

      $scope.searchedFor = searchTerm;
      $http.get('/customers.json',
        { 'params' : { 'keywords' : searchTerm, page: page } }
      ).then(
        function (response) {
          $scope.customers = response.data;
        },function (response) {
          alert("There was a prodlem: " + response.status);
        }
      );
    }

  }
]);