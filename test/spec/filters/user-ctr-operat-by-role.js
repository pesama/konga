'use strict';
/**
 * @author mdaouda2, edenis2
 */
describe('Filter: userCtrOperatByRole', function () {

  // load the filter's module
  beforeEach(module('sigmaNgApp'));

  // initialize a new instance of the filter before each test
  var userCtrOperatByRole;
  beforeEach(inject(function ($filter) {
    userCtrOperatByRole = $filter('userCtrOperatByRole');
  }));
  
  //check if a userCtrOperatByRole is defined :
  it('check if userCtrOperatByRole is defined ', function () {
   
    expect(userCtrOperatByRole).toBeDefined();
  });
  
  //test if you enter a roleCoUser empty 
  it('should return some empty array  ', function () {
    var user1 = {	
		"roleCoUser" : [],
		"ctrOperationnel" : ''
	};

    expect(userCtrOperatByRole(user1)).toEqual([]);
  });
  
 //test if you enter a roleCoUser  
  it('should return some array who contains the ctrOperationnel [555] ', function () {
	  var ctrOperat1 = { "id" : "555" };
	  var role1 =  { "ctrOperat" : ctrOperat1 };
	  var user2 = { 
		  "roleCoUser" : [ role1 ] ,	
		  "ctrOperationnel":'' 	
	};

    expect(userCtrOperatByRole(user2)).toEqual([ctrOperat1]);
  });
  
  //test if you enter a table of roleCoUser 
  it('should return some array who contains the ctrOperationnel [555,666,888] ', function () {
	  var ctrOperat1 = { "id" : "555" };
	  var role1 =  { "ctrOperat" : ctrOperat1 };
	  var ctrOperat2 = { "id" : "666" };
	  var role2 =  { "ctrOperat" : ctrOperat2 };
	  var ctrOperat3 = { "id" : "888" };
	  var role3 =  { "ctrOperat" : ctrOperat3 };
    var test3 = { 
		"roleCoUser" :  [ role1, role2, role3 ],
		"ctrOperationnel": '' 	
	};

    expect(userCtrOperatByRole(test3)).toEqual([ ctrOperat1, ctrOperat2, ctrOperat3 ]);
  });

   //test if you enter duplicate center 
  it('should return some array who contains the ctrOperationnel [555,888] ', function () {
	  var ctrOperat1 = { "id" : "555" };
	  var role1 =  { "ctrOperat" : ctrOperat1 };
	  var ctrOperat2 = { "id" : "555" };
	  var role2 =  { "ctrOperat" : ctrOperat2 };
	  var ctrOperat3 = { "id" : "888" };
	  var role3 =  { "ctrOperat" : ctrOperat3 };
    var test3 = { 
    		"roleCoUser" :  [ role1, role2, role3 ],
    		"ctrOperationnel": '' 	
    	};

    expect(userCtrOperatByRole(test3)).toEqual([ctrOperat1, ctrOperat3]);
  });
  
});

  
  

