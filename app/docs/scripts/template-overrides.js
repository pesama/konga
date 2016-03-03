
(function() {

	angular.module('myAwesomeApp', ['konga'])
	  .run(['$rootScope', 'util', 'common', function($rootScope, util, common) {
	  	var metadata = {
	  		name: 'My Awesome app',
	  		entities: [
	  			{
	              name: 'fieldtype-demo',
	              fields: [
	              	// Plain
	              	{
		                name: 'plain-field',
		                label: 'Plain field',
		                type: {
		                  type: 'STRING'
		                },
		                fieldType: {
		                  update: 'PLAIN'
		                },
		                showInUpdate: {
		                  value: "" // Public for updates
		                },
		                validation: {
		                  required: true
		                },
		                editable: {
		                  value: "" // Editable for everybody
		                }
	              	},

	              	// Boolean
	              	{
		                name: 'boolean-field',
		                label: 'Boolean field',
		                type: {
		                  type: 'BOOLEAN'
		                },
		                fieldType: {
		                  update: 'BOOLEAN'
		                },
		                showInUpdate: {
		                  value: "" // Public for updates
		                },
		                validation: {
		                  required: true
		                },
		                editable: {
		                  value: "" // Editable for everybody
		                }
	              	},

	              	// Number
	              	{
		                name: 'number-field',
		                label: 'Number field',
		                type: {
		                  type: 'NUMBER' // Complex data type
		                },
		                fieldType: {
		                  update: 'NUMBER' // Calendar fieldType
		                },
		                showInUpdate: {
		                  value: "" // Public for updates
		                },
		                validation: {
		                  required: true
		                },
		                editable: {
		                  value: "" // Editable for everybody
		                }
	              	},

	              	// Calendar
	              	{
		                name: 'calendar-field',
		                label: 'Calendar field',
		                type: {
		                  type: 'COMPLEX',
		                  complexType: 'calendar-event'
		                },
		                fieldType: {
		                  update: 'CALENDAR'
		                },
		                showInUpdate: {
		                  value: "", // Public for updates
		                  fields: []
		                },
		                validation: {
		                  required: true
		                },
		                editable: {
		                  value: "" // Editable for everybody
		                },
		                multiplicity: 'MANY'
	              	},

	              	// Color
	              	{
		                name: 'color-field',
		                label: 'Color field',
		                type: {
		                  type: 'STRING'
		                },
		                fieldType: {
		                  update: 'COLOR'
		                },
		                showInUpdate: {
		                  value: "" // Public for updates
		                },
		                validation: {
		                  required: true
		                },
		                editable: {
		                  value: "" // Editable for everybody
		                }
	              	},

	              	// Combobox
	              	{
		                name: 'combobox-field',
		                label: 'Combobox field',
		                type: {
		                  type: 'STRING',
		                  list: [
			                  {
			                  	key: 'one',
			                  	value: 'Option one'
			                  },
			                  {
			                  	key: 'two',
			                  	value: 'Option two'
			                  }
		                  ]
		                },
		                fieldType: {
		                  update: 'COMBOBOX'
		                },
		                showInUpdate: {
		                  value: "" // Public for updates
		                },
		                validation: {
		                  required: true
		                },
		                editable: {
		                  value: "" // Editable for everybody
		                }
	              	},

	              	// Date
	              	{
		                name: 'date-field',
		                label: 'Date field',
		                type: {
		                  type: 'DATE'
		                },
		                fieldType: {
		                  update: 'DATE'
		                },
		                showInUpdate: {
		                  value: "" // Public for updates
		                },
		                validation: {
		                  required: true
		                },
		                editable: {
		                  value: "" // Editable for everybody
		                }
	              	},

	              	// Datetime
	              	{
		                name: 'datetime-field',
		                label: 'Datetime field',
		                type: {
		                  type: 'DATE'
		                },
		                fieldType: {
		                  update: 'DATETIME'
		                },
		                showInUpdate: {
		                  value: "" // Public for updates
		                },
		                validation: {
		                  required: true
		                },
		                editable: {
		                  value: "" // Editable for everybody
		                }
	              	},
	              ],
	              configuration: []
	            },
	            {
	            	name: 'calendar-event',
	            	fields: [
	            	 {
	            	 	name: 'date',
	            	 	type: { type: 'DATE' }
	            	 },
	            	 {
	            	 	name: 'name',
	            	 	type: { type: 'STRING' }
	            	 }
	            	]
	            }
	  		],
	  		configuration: []
	  	};

	  	util.init(metadata);
	  	common.store('metadata', metadata);
	  	$rootScope.metadata = metadata;
	  }])

	angular.module('docsApp')
		.filter('sectionSorter', function() {
			return function(input) {
				var order = ['home', 'quick-start', 'api', 'resources'];
				var icons = ['fa fa-home', 'fa fa-paper-plane-o', 'fa fa-book', 'fa fa-rocket'];
				var backgrounds = ['orange', 'green', 'red', 'blue'];
				var menus = [false, false, true, true];

				var ret = [];

				for(var item in input) {
					var sectionName = item.replace(/#|\//g, '');
					var index = order.indexOf(sectionName);

					ret.push({
						url: item,
						name: input[item],
						background: backgrounds[index],
						icon: icons[index],
						order: index,
						menu: menus[index]
					});
				}

				return ret;
			}	
		})
		.filter('moduleIcon', function() {
			return function(input) {
				var icons = {
					'Metadata': 'fa-code',
					'Standards': 'fa-diamond',
					'Customisation': 'fa-paint-brush',
					'konga': 'fa-folder-open-o',
					'Konga basics': 'fa-folder-open-o'
				}

				return icons[input.name] || 'fa-folder-open-o';
			}	
		})
		.filter('sortedModules', function() {
			return function(input) {
				var orders = {

					'Metadata': 0,
					'Standards': 1,
					'Customisation': 5,
					'konga': 6,
					
					'Video_tutorials': 100,
					'Konga_101': 101,
					'Guides': 200
				}

				var sorted = input.sort(function(a, b) {
					return orders[a.name] - orders[b.name];
				});

				// for(var i = 0; i < sorted.length; i++) {
				// 	if(!orders[sorted[i].name]) {
				// 		sorted.splice(i, 1);
				// 		i--;
				// 	}
				// }

				return sorted;
			}	
		})
		.filter('serviceIcon', function() {
			return function(input) {
				var icons = {
					'Generators': 'fa-terminal',
					'Permissions': 'fa-key',

					'Forms': 'fa-file-code-o',
					'Fields': 'fa-check-square-o',
					'Configuration': 'fa-cog',

					'Action-driven': 'fa-magic',
					'Custom views': 'fa-eye',

					'Application': 'fa-wrench',
					'Entity': 'fa-wrench',
					'Field': 'fa-wrench',
					'Action': 'fa-wrench',
					'Trigger': 'fa-wrench',
					'ConfigurationParam': 'fa-wrench',
					'ShowConfiguration': 'fa-wrench',
					'FieldType': 'fa-wrench',
					'DataType': 'fa-wrench',
					'FieldSet': 'fa-wrench',
					'SearchConf': 'fa-wrench',
					'Validation': 'fa-wrench',
					'Validator': 'fa-wrench',

					'AccessModes': 'fa-tag',
					'DataTypes': 'fa-tag',
					'FieldTypes': 'fa-tag',
					'FormScopes': 'fa-tag',
					'FormStyles': 'fa-tag',
					'FormTypes': 'fa-tag',
					'Multiplicities': 'fa-tag',
					'TriggerMatches': 'fa-tag',
					'TriggerMoments': 'fa-tag',
					'TriggerSources': 'fa-tag',
					'TriggerTypes': 'fa-tag',
					'ValidatorTypes': 'fa-tag',

					'Apps': 'fa-cube',
					'Operations': 'fa-wrench',
					'Tools': 'fa-gamepad',
					'User': 'fa-user',
					'Actions': 'fa-code'
				}

				return icons[input.name] || '';
			}	
		})
		.filter('sortedServices', function() {
			return function(input) {
				var orders = {
					// Metadata
					'Application': 0,
					'Entity': 1,
					'Field': 2,
					'Action': 3,
					'Trigger': 4,
					'ConfigurationParam': 5,
					'ShowConfiguration': 6,
					'FieldType': 7,
					'DataType': 8,
					'FieldSet': 9,
					'SearchConf': 10,
					'Validation': 11,
					'Validator': 12,

					'AccessModes': 50,
					'DataTypes': 51,
					'FieldTypes': 52,
					'FormScopes': 53,
					'FormStyles': 54,
					'FormTypes': 55,
					'Multiplicities': 56,
					'TriggerMatches': 57,
					'TriggerMoments': 58,
					'TriggerSources': 59,
					'TriggerTypes': 60,
					'ValidatorTypes': 61,

					'Generators': 100,
					'Permissions': 200,

					// Standards
					'Apps': 0,
					'Forms': 1,
					'Fields': 2,
					'Actions': 3,
					
					'User': 6,

					'Tools': 8,
					'Operations': 10,

					

					'Configuration': 200,

					// ADF
					'Custom views': 0,
					'Action-driven': 1,


					// konga controllers
					'KongaController': 0,
					'EntitySearchController': 1,
					'EntityUpdateController': 2,
					'EntityDetailsController': 3,
				}

				var sorted = input.sort(function(a, b) {
					return orders[a.name] - orders[b.name];
				});

				return sorted;
			}	
		})
		.filter('sortedKonga', function() {
			return function(input) {
				var orders = {

					// konga controllers
					'KongaController': 0,
					'EntitySearchController': 1,
					'EntityUpdateController': 2,
					'EntityDetailsController': 3,

					'searchPane': 0,
					'resultTable': 1,
					'updateForm': 2
				}

				var sorted = input.sort(function(a, b) {
					return orders[a.shortName] - orders[b.shortName];
				});

				for(var i = 0; i < sorted.length; i++) {
					input[i] = sorted[i];
				}

				return input;
			}	
		})
		.filter('underSpaces', function() {
			return function(input) {
				return input.replace(/\_/g, ' ');
			}
		});
})();