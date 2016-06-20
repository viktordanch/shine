describe("CustomerCreditCardController", function () {
  describe("Initialization", function () {
    var scope = null;
    var controller = null;
    var cardholderId = 42;
    var httpBackend = null;
    var cardInfo =      {
      lastFour: 1234,
      cardType: 'Visa',
      expirationMonth: 10,
      expirationYear: 18,
      detailsLink: 'google.com',
    };

    beforeEach(module('customers'));

    beforeEach(inject(function ($controller,
                                $httpBackend,
                                $rootScope) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;

      $httpBackend.when('GET', '/fake_billing.json?cardholder_id=' + cardholderId  ).respond(cardInfo);

      controller = $controller('CustomerCreditCardController', { $scope: scope })
    }));

    it("does not hit the backend initially", function () {
      expect(scope.creditCard).not.toBeDefined();
    });

    it("when setCardholderId is called, hits back-end", function () {
      scope.setCardholder(cardholderId);
      expect(scope.creditCard).toBeDefined();
      expect(scope.creditCard.lastFour).not.toBeDefined();
      httpBackend.flush();
      expect(scope.creditCard.lastFour).toBeDefined();
    })
  });
});