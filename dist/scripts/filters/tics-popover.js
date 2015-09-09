'use strict';

/**
 * @ngdoc filter
 * @name ui.konga.filter:ticsPopover
 * @function
 * @description
 * # ticsPopover
 * Filter in the ui.konga.
 */
angular.module('ui.konga')
  .filter('ticsPopover', ['$filter', function ($filter) {
    return function (events, element, date) {
    	var title = element.name + ' - ' + $filter('date')(date, 'dd-MM-yyyy');
    	var content = "";

        if(!events.length) {
            content = '<div class="text-center"><b>Pas de données pour la date</b></div>';
        }
        else {
        	var contentSplit = [];
        	// TODO Translate
        	for(var i = 0; i < events.length; i++) {
        		var current = events[i];
        		var newContent = "";

        		// Chantier
        		newContent += '<b>Chantier:</b>&nbsp;';
        		newContent += current.chantier.codeEds;
        		newContent += '<br />';

        		// Libelle
        		newContent += '<b>Libellé:</b>&nbsp;';
        		newContent += current.chantier.libEds;
        		newContent += '<br />';

        		// Quantite
        		newContent += '<b>Quantité:</b>&nbsp;';
        		newContent += current.quantite;
                newContent += '&nbsp;';
                newContent += current.unitePointage.libcMesure.toLowerCase();

        		contentSplit.push(newContent);
        	}

        	content = contentSplit.join('<br/><br/>')
        }

		return {
			title: title,
			content: content,
		};
    };
  }]);
