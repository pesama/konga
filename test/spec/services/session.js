'use strict';

describe('Service: Session', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var Session;
  beforeEach(inject(function (_Session_) {
    Session = _Session_;
  }));

  it('should verify the instance of Session', function () {
    expect(Session).toEqual({data : {}});
  });
  

});
