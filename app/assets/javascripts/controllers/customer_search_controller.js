var app = angular.module('customers');

app.controller('CustomerSearchController',
  ['$scope', '$location', 'CustomerSearch',
    function ($scope, $location, CustomerSearch) {
      $scope.customers = [];

      $scope.viewDetails = function (customer) {
        $location.path('/' + customer.id);
      },

      CustomerSearch.successCallback(function (customers) {
        $scope.customers = customers;
      })

      $scope.previousPage = CustomerSearch.previousPage;

      $scope.nextPage = CustomerSearch.nextPage;

      $scope.search = CustomerSearch.search;
    }
  ]);