describe("CustomerDetailController", function () {
  describe("Initialization", function () {
    var scope = null;
    var controller = null;
    var id = 42;
    var httpBackend = null;
    var customer =      {
      id: id,
      first_name: 'Bob',
      last_name: 'Jones',
      username: 'jonesy',
      email: 'bjones@foo.net',
      created_at: '2014-02-03T11:12:34'
    };
    beforeEach(module('customers'));

    beforeEach(inject(function ($controller,
                                $routeParams,
                                $httpBackend,
                                $rootScope) {
      scope = $rootScope.$new();
      $routeParams.id = id;
      httpBackend = $httpBackend;

      $httpBackend.when('GET', '/customers/' + id + '.json').respond(customer);

      controller = $controller('CustomerDetailController', { $scope: scope })
    }));

    it("fetches the customer from the backend", function () {
      httpBackend.flush();
      expect(scope.customer).toEqualData(customer);
    })
  });
});