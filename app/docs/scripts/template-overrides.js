
(function() {

	// Assign $rootScope values
	angular.module('docsApp')
		.filter('sectionSorter', function() {
			return function(input) {
				var order = ['home', 'quick-start', 'api'];
				var icons = ['fa fa-home', 'fa fa-rocket', 'fa fa-book'];
				var backgrounds = ['orange', 'green', 'red', 'blue'];
				var menus = [false, false, true];

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
					'konga': 'fa-folder-open-o'
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
					'konga': 6
					// 'lib.konga': 6
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
					'Forms': 0,
					'Fields': 1,
					'Configuration': 2,

					// ADF
					'Custom views': 0,
					'Action-driven': 1,
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
})();