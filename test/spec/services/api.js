'use strict';

/** 
 * @author mdaouda2
 *
 */
describe('Service: api', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var Api;
  beforeEach(inject(function (_api_) {
    Api = _api_;
  }));

  it('should do something', function () {
    expect(!!Api).toBe(true);
  });
  
//check if the test is defined
  it('Check is the test is defined', function () {
    expect(Api).toBeDefined();
  });
  
  //TEST ALL CASE
  it('Should return ', function () {
	  var source=constants.SOURCE_ENTITY_CTR_OPERAT;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_ENTITY_METIER;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_ENTITY_SOCIETES;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_ENTITY_METIER;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_ENTITY_AGENCES;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_ENTITY_SECTEURES;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_ENTITY_CHANTIERS;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_ENTITY_CTR_MECANIQUE;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_ENTITY_UTILISATEURS;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_ENTITY_POSTETECHNIQUE;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_ENTITY_POSTEDEPENSE;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_ENTITY_CODETVA;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_DEVISE;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_METADATA;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_CODE_REF;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_REF_SIMPLIFIE;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_UNITE_MESURE;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_ROLE;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_ACTION;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_RUBDEPENSE;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_DOSSIER;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
    source=constants.SOURCE_COMPTE_COMPTABLE;
    expect(Api.getLocalEndpoint(source)).toBeDefined(source);
    
  });
  
 
  
});
