'use strict';

/**
 * @ngdoc directive
 * @name ui.konga.directive:Time Card system
 * @description
 * # tics
 */
angular.module('ui.konga')
  .directive('tics', function () {
    return {
      templateUrl: '/views/konga/tics.html',
      restrict: 'E',
      replace: true,
      scope: {
      	field: '=',
      	entity: '=',
            value: '='
      },
      controller: function($scope, $filter, scaffold, $popover) {
            var pointageMetadata = util.getMetadata('Pointage');
            $scope.showAll = false;

            // Allow user input
            $scope.inputEnabled = true;

      	$scope.structure = {};

            $scope.configuration = {
                  monthNumber: 6,
                  yearNumber: 2014,
                  categories: ['E/R', 'MAD'],
                  elements: ['Evenement 1', 'Evenement 2', 'Evenement 3', 'Evenement 4', 'Evenement 5', 'Evenement 6', 'Evenement 7', 'Evenement 8']
            };

            // TODO Do we need to configure this?
            $scope.dayLength = 2;

            /*
             * Configure watchers for entity's values that trigger dynamic changes on the field
             */
            function setupWatchers() {

                  // Show data from all chantiers
                  $scope.$watch('entity.afficheTousChantiers', function(oldValue, newValue) {
                        $scope.showAll = $scope.entity.afficheTousChantiers;

                        setupInputEnabled();

                        $scope.update(true);
                  });
            }

            function setupInputEnabled() {
                  // TODO Control other scenarios
                  var disabledShowAll = $scope.showAll;
                  var disabledPeriodClosed = $scope.entity.statutPointage == 'CL';

                  $scope.inputEnabled = !(disabledShowAll || disabledPeriodClosed);
            }

      	$scope.init = function() {

                  if($scope.entity.$resolved === false) {
                        var resolveWatcher = $scope.$watch('entity.$resolved', function() {
                              if($scope.entity.$resolved) {
                                    resolveWatcher();
                                    $scope.init();
                              }
                        });

                        return;
                  }

                  $scope.reset();

      		var monthNumber = $scope.configuration.monthNumber = parseInt($filter('date')($scope.entity.date, 'MM')) - 1;
      		var yearNumber = $scope.configuration.yearNumber = parseInt($filter('date')($scope.entity.date, 'yyyy'));
      		var daysInMonth = $scope.eventSize = new Date(yearNumber, monthNumber+1, 0).getDate();

      		var categories = $scope.categories = $scope.configuration.categories = $filter('ticsCategories')($scope.entity.periodeEvents);
      		var elements = $scope.elements = $scope.configuration.elements = $scope.entity.periodeEvents;

      		/*
      		 * Setup structure
      		 */

                  $scope.structure.monthName = constants.MONTHS[monthNumber];
                  $scope.structure.yearNo = yearNumber;

      		// First elements are the categories
      		for(var i = 0; i < categories.length; i++) {
      			var category = {
      				name: categories[i],
      				elements: [],
      				total: 0
      			};

      			// Now we append the elements
      			for(var f = 0; f < elements.length; f++) {
                              if(elements[f].attribMadEr !== category.name) {
                                    continue;
                              }

      				var element = {
      					name: elements[f].libEvenement,
      					events: [],
      					total: 0,
                                    real: elements[f]
      				};

      				// Let's initialize the events too
      				for(var g = 0; g < daysInMonth; g++) {
                                    var inputDate = new Date(yearNumber, monthNumber, g+1);
                                    var events = $filter('ticsEvents')($scope.value.entity, element.real, inputDate, $scope.entity.chantier.id);
                                    var popover = $filter('ticsPopover')(events, element, inputDate);

                                    var calendarDays = $filter('filter')($scope.entity.calendar, { date: inputDate.getTime() }, true);

                                    if(!calendarDays.length) {
                                          // TODO Show exception
                                    }

                                    var realDay = calendarDays[0];

                                    // See if there are not belonging events
                                    var eventDontBelongs = $filter('filter')(events, { $belongs: false }, true);
                                    var belongs = !eventDontBelongs.length;
                                    var multi = events.length > 1;

      					var evt = {
                                          date: inputDate,
      						input: '',
                                          real: events,
                                          valid: true,
                                          $belongs: belongs,
                                          multi: multi,
                                          popover: popover
      					};

                                    if(i === 0 && f === 0) {
                                          var dayNumber = inputDate.getDay();
                                          var dayName = constants.WEEKDAYS[dayNumber];
                                          var isFestive = realDay.jourChome;

                                          $scope.structure.columns.push({
                                                date: inputDate,
                                                dayName: dayName,
                                                isFestive: isFestive,
                                                dontbelong: !belongs,
                                                real: realDay
                                          });
                                    }

                                    element.events.push(evt);
      				}

                              category.elements.push(element);
      			}


      			$scope.structure.categories.push(category);
      		}

                  // Setup input enabled
                  setupInputEnabled();

                  // Setup watchers
                  setupWatchers();

                  $scope.update(true);
      	};

            $scope.update = function(fromCode) {
                  for(var i = 0; i < $scope.categories.length; i++) {
                        var category = $scope.structure.categories[i];
                        var categoryTotal = 0;

                        for(var f = 0; f < category.elements.length; f++) {
                              var element = category.elements[f];
                              var elementTotal = 0;

                              for(var g = 0; g < element.events.length; g++) {
                                    var evt = element.events[g];

                                    var eventTotal = 0;
                                    var real = evt.real;
                                    for(var h = 0; h < real.length; h++) {
                                          var currentEvent = real[h];

                                          if(!currentEvent.deleted && (currentEvent.$belongs || $scope.showAll)) {
                                                eventTotal += parseFloat(currentEvent.quantite+"");
                                          }
                                    }

                                    if(fromCode) {
                                          if(eventTotal !== 0) {
                                                evt.input = eventTotal;
                                          }
                                          else {
                                                evt.input = '';
                                          }
                                    }

                                    elementTotal += eventTotal;
                              }

                              element.total = elementTotal;
                              categoryTotal += elementTotal;
                        }

                        category.total = categoryTotal;
                  }
            };

            $scope.updateDay = function(event, element) {
                  var real = event.real;
                  var pointage = null;
                  var manualUpdate = false;
                  var deletion = false;

                  var value = event.input;
                  if(value === null) {
                        deletion = true;
                  }

                  // There's already a pointage there
                  if(real.length) {
                        if(real.length > 1) {
                              // TODO Show exception
                        }
                        
                        // See if there's any pointage belonging
                        for(var i = 0; i < real.length; i++) {
                              var currentPointage = real[i];
                              if(currentPointage.$belongs && !currentPointage.deleted) {
                                    pointage = currentPointage;
                                    pointage.modified = true;
                                    if(deletion) {
                                          pointage.deleted = true;

                                          // Has it been created now?
                                          if(!pointage.idPointage) {
                                                // Delete from array
                                                real.splice(i, 1);
                                                $scope.value.entity.splice($scope.value.entity.indexOf(pointage), 1);
                                          }
                                    }
                                    break;
                              }
                        }

                  }

                  // Or there's not
                  if(!pointage && value !== undefined) {
                        pointage = scaffold.newEntity(pointageMetadata);

                        pointage.societe = $scope.entity.societe;
                        pointage.chantier = $scope.entity.chantier;
                        pointage.materiel = $scope.entity.materiel;
                        pointage.modeLocation = $scope.entity.modeLocation;
                        pointage.periode = $scope.entity.periode;

                        pointage.unitePointage = element.real.attribMadEr === 'MAD' ? $scope.entity.uniteMad : $scope.entity.uniteEr;
                        pointage.evenementStandard = element.real;
                        pointage.date = event.date.getTime();

                        // TODO Map data

                        // Set the pointage as belonging to the chantier
                        pointage.$belongs = true;

                        // Insert into the arrays
                        real.push(pointage);
                        $scope.value.entity.push(pointage);

                        event.multi = real.length > 1;
                  }
                  else {
                        manualUpdate = true;
                  }

                  // Update qty
                  pointage.quantite = value;

                  // Setup modified flag
                  pointage.modified = true;

                  // If a manual update is needed, then do it
                  if(manualUpdate) {
                        $scope.$emit('manually_change_' + $scope.field.owner + '_' + $scope.field.name, { });
                  }

                  $scope.update();
            };

            $scope.reset = function() {
                  $scope.structure.categories = [];
                  $scope.structure.columns = [];
                  $scope.structure.monthName = '';
                  $scope.structure.yearNo = 0;
            };
      },
      link: function postLink(scope, element, attrs) {
          // element.find('.popover-source').popover();
      }
    };
  });
