describe("CustomerSearchController", function () {
  describe("Initialization", function () {
    var scope = null;
    var controller = null;

    beforeEach(module("customers"));

    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller("CustomerSearchController", {
        $scope: scope
      });
    }));

    it("defaults to an empty customer list", function () {
      expect(scope.customers).toEqualData([]);
    })
  });

  describe("Fetching search results", function () {

    beforeEach(module("customers"));

    var scope = null;
    var controller = null;
    var httpBackend = null;
    var serverResults = [
      {
        id: 123,
        first_name: 'Bob',
        last_name: 'Jones',
        username: 'jonesy',
        emal: 'bjones@foo.net'
      },
      {
        id: 124,
        first_name: 'Bob',
        last_name: 'Jones',
        username: 'jonesy',
        emal: 'bjones@foo.net'
      },
      {
        id: 125,
        first_name: 'Bob',
        last_name: 'Jones',
        username: 'jonesy',
        emal: 'bjones@foo.net'
      },
      {
        id: 126,
        first_name: 'Bob',
        last_name: 'Jones',
        username: 'jonesy',
        emal: 'bjones@foo.net'
      }
    ];

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      controller = $controller("CustomerSearchController", {
        $scope: scope
      });
    }));

    beforeEach(function () {
      httpBackend.when('GET', '/customers.json?keywords=bob&page=0').
        respond(serverResults);
    });

    it('populate the customer list with the result', function () {
      scope.search('bob');
      httpBackend.flush();
      expect(scope.customers).toEqualData(serverResults);
    });
  });

  describe("Error Handing", function () {
    var scope = null;
    var controller = null;
    var httpBackend = null;

    beforeEach(module("customers"));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      controller = $controller("CustomerSearchController", {
        $scope: scope
      });
    }));

    beforeEach(function () {
      httpBackend.when('GET', '/customers.json?keywords=bob&page=0').
        respond(500, 'Internal Server Error');
        spyOn(window, 'alert')
    });

    it('alert the users on an error', function () {
      scope.search('bob');
      httpBackend.flush();
      expect(scope.customers).toEqualData([]);
      expect(window.alert).toHaveBeenCalledWith('There was a prodlem: 500')
    })
  });
});