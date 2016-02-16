
(function() {

	// Assign $rootScope values
	angular.module('docsApp')
		.filter('sectionSorter', function() {
			return function(input) {
				var order = ['home', 'quick-start', 'api'];
				var icons = ['fa fa-home', 'fa fa-rocket', 'fa fa-book'];
				var backgrounds = ['orange', 'green', 'red', 'blue'];
				var menus = [false, true, true];

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
					'Action-driven framework': 'fa-diamond',
					'Configuration': 'fa-gears',
					'Tools': 'fa-magic',
					'Konga Reference': 'fa-book'
				}

				return icons[input.name] || 'fa-folder-open-o';
			}	
		})
		.filter('sortedModules', function() {
			return function(input) {
				var orders = {
					'Basics': 0,
					'Standards': 1,
					// 'Tools': 3,
					'Configuration': 4,
					'Action-driven framework': 5,
					'Konga Reference': 6
					// 'lib.konga': 6
				}

				var sorted = input.sort(function(a, b) {
					return orders[a.name] - orders[b.name];
				});

				for(var i = 0; i < sorted.length; i++) {
					if(!orders[sorted[i].name]) {
						sorted.splice(i, 1);
						i--;
					}
				}

				return sorted;
			}	
		})
		.filter('serviceIcon', function() {
			return function(input) {
				var icons = {
					'Metadata': 'fa-code',
					'Operations': 'fa-magic',
					'Permissions': 'fa-lock',
					'UI Components': 'fa-paint-brush'
				}

				return icons[input.name] || '';
			}	
		})
		.filter('sortedServices', function() {
			return function(input) {
				var orders = {
					// Standards
					'Metadata': 0,
					'Operations': 1,
					'Permissions': 2,
					'UI Components': 3,

					// Configuration
					'Scope': 0,
					'Konga-config file': 1,
					'Defaults': 2,
					'Configuration manager': 3,

					// ADF
					'Purpose': 0,
					'Action types': 1,
					'Entity & field actions': 2,
					'Overriding defaults': 3,
					'Action Manager': 4,
					'Modal': 5,
					'Tab': 6
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