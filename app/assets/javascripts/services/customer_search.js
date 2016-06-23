var app = angular.module('customers');

app.factory('CustomerSearch', ['$http', function ($http) {
  var page = 0;
  var mostRecentSearchTerm = undefined;
  var success = function () {};
  var successCallback = function (newCallback) {
    success = newCallback;
  };

  previousPage = function () {
    if ((page > 0) && mostRecentSearchTerm) {
      page = page - 1;
      search(mostRecentSearchTerm);
    }
  };

  nextPage = function () {
    if (mostRecentSearchTerm) {
      page = page + 1;
      search(mostRecentSearchTerm);
    }
  };

  search = function (searchTerm) {
    if (searchTerm.length < 3) {
      return
    }
    mostRecentSearchTerm = searchTerm;

    $http.get('/customers.json', { "params": { "keywords": searchTerm, "page" : page } })
         .then(
          function (response) {
            console.log(response.data)
            success(response.data);
          },function (response) {
            alert("There was a prodlem: " + response.status);
          }
    )
  }

  return {
    successCallback: successCallback,
    previousPage: previousPage,
    nextPage: nextPage,
    search: search,
  }

}]);