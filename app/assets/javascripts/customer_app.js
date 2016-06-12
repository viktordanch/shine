var app = angular.module('customers', ['ngRoute', 'templates']);

app.config([
  '$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      controller: 'CustomerSearchController',
      templateUrl: 'customer_search.html'
    });
  }
]);

app.controller('CustomerSearchController', ['$scope', "$http", function ($scope, $http) {
    $scope.customers = [];
    var page = 0;
    $scope.previousPage = function () {
      page = page - 1;
      $scope.search($scope.searchedFor);
    };

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