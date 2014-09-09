'use strict';
/** 
 * @author mdaouda2
 *
 */
describe('Service: fieldMapper', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var FieldMapper,fieldMetadata, edsType, entity, value,field;

  beforeEach(inject(function (_fieldMapper_) {
    FieldMapper = _fieldMapper_;
    field = {"departement":'testdpt'};
    edsType='edstype';
    entity=  {"param1":field};;
    value= '10';
    
  }));


  it('should do something', function () {
    expect(!!FieldMapper).toBe(true);
  });

//check if the test is defined
  it('Check is the test is defined', function () {
    expect(FieldMapper).toBeDefined();
  });
 
//check if the test is defined
  it('Should return null ', function () { 
	    
	    expect(FieldMapper.unmapField(null, null, null, null)).toBeNull();

	    var  fieldMetadata4= {fieldName : 'name', 
	    		fieldType: constants.FIELD_LIST, 
	    		fieldPath : 'param1.departement',
	    		related : null, 
	    		isKey : 'key' 
	    			};
	   expect(FieldMapper.unmapField(fieldMetadata4, edsType, entity, value)).toBeNull();
  });

//the test with empty value
  it('Should the objet value', function () {
 
	
	  var  fieldMetadata1= {fieldName : 'name', 
	    		fieldType : constants.FIELD_TEXT, 
	    		fieldPath : 'param1.departement',
	    		related : null, 
	    		isKey : 'key' 
	    			};
	        
	    expect(FieldMapper.unmapField(fieldMetadata1, edsType, entity, value)).toEqual(value);
	    
	    
	    var fieldMetadata2= {fieldName : 'name', 
	    		fieldType: constants.FIELD_BOOLEAN, 
	    		fieldPath : 'param1.departement',
	    		related : null, 
	    		isKey : 'key' 
	    			};
	   expect(FieldMapper.unmapField(fieldMetadata2, edsType, entity, value)).toEqual(value);
	    
	    
	    var fieldMetadata3= {fieldName : 'name', 
	    		fieldType: constants.FIELD_COMPLEX, 
	    		fieldPath : 'param1.departement',
	    		related : null, 
	    		isKey : 'key' 
	    			};
	   expect(FieldMapper.unmapField(fieldMetadata3, edsType, entity, value)).toEqual(value);
	  
	   
	    var fieldMetadata3= {fieldName : 'name', 
	    		fieldType: 'test', 
	    		fieldPath : 'param1.departement',
	    		related : null, 
	    		isKey : 'key' 
	    			};
	   expect(FieldMapper.unmapField(fieldMetadata3, edsType, entity, value)).toEqual(value);
	  
	  
	  
  });
  
  
  
});
