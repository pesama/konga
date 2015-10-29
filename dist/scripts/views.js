angular.module('ui.konga').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/konga/views/about.html',
    "<p>This is the about view.</p>\n"
  );


  $templateCache.put('/konga/views/cascade-result-table.html',
    "<table class=\"table table-result\">\n" +
    "\t<thead>\n" +
    "\t\t<tr class=\"table-header\">\n" +
    "\t\t\t<th ng-repeat=\"field in fields | allowed:'results'\" style=\"cursor: pointer;\">\n" +
    "\t\t\t\t<table-header field=\"field\" sorting=\"sorting\" showSorting=\"showSorting\" mode=\"results\"></table-header>\n" +
    "\t\t\t</th>\n" +
    "\t\t</tr>\n" +
    "\t</thead>\n" +
    "\t<tbody>\n" +
    "\t\t<tr\tng-class=\"{disabled : !showInRed(entity.statut), enabled : showInRed(entity.statut), editable: isEditable, resultClick: entityMetadata.resultClick.length}\" \n" +
    "\t\t\tng-hide=\"chantierCtrl.emptyResult\" \n" +
    "\t\t\tng-repeat=\"entity in entities\"\n" +
    "\t\t\tng-click=\"resultClick(entityMetadata, entity, $index)\" ng-show=\"entities.length > 0\">\n" +
    "\t\t\t<!-- <td>\n" +
    "\t\t\t\t<a ng-click=\"updateChantier(result)\">\n" +
    "\t\t\t\t\t<span>{{entity.codeEds}}</span>\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t</td> -->\n" +
    "\t\t\t<td ng-repeat=\"field in fields | allowed:'results'\">\n" +
    "\t\t\t\t<table-cell entity=\"entity\" field=\"field\"></table-cell>\n" +
    "\t\t\t</td>\n" +
    "\t\t</tr>\n" +
    "\t\t<tr ng-hide=\"entities.length > 0\">\n" +
    "\t\t\t<td colspan=\"{{ fields.length }}\" class=\"align-center\">{{'field.searchResults.noresults' | translate }}</td>\n" +
    "\t\t</tr>\n" +
    "\t</tbody>\n" +
    "</table>"
  );


  $templateCache.put('/konga/views/cascade-search-pane.html',
    "<raw-input \n" +
    "\tproperty=\"field\"\n" +
    "\tvertical=\"true\" \n" +
    "\tsource-list=\"productCodes[field.name]\"\n" +
    "\tng-repeat=\"field in fields | searchParams | orderBy:'priority.search' | allowed:'search'\"\n" +
    "\tentity=\"query\" \n" +
    "\tmetadata=\"entityMetadata\" \n" +
    "\ton-update=\"operations.updateField\"\n" +
    "\tmode=\"search\"\n" +
    "\tindex=\"$index\">\n" +
    "</raw-input>"
  );


  $templateCache.put('/konga/views/cascade-update.html',
    "<div class=\"form-cascade\">\n" +
    "\t<raw-input \n" +
    "\t\tproperty=\"field\"\n" +
    "\t\tvertical=\"true\"\n" +
    "\t\tng-repeat=\"field in fields | updateParams:metadata | orderBy:'+priority.update' | allowed:'update'\" \n" +
    "\t\tentity=\"entity\" \n" +
    "\t\ton-update=\"onUpdate\"\n" +
    "\t\ton-change=\"onChange\"\n" +
    "\t\tmetadata=\"metadata\"\n" +
    "\t\tmode=\"update\"\n" +
    "\t\tcreating=\"creating\"\n" +
    "\t\tindex=\"$index\">\n" +
    "\t</raw-input>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/categorized_cascade-result-table.html',
    "<table class=\"table table-result\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
    "\t<thead>\n" +
    "\t\t<tr class=\"table-header categories\">\n" +
    "\t\t\t<th ng-repeat=\"category in categories\" style=\"cursor: pointer;\" colspan=\"{{ categoryFields[category.name].length }}\" ng-class=\"{ noHeader: !category.showHeader }\">\n" +
    "\t\t\t\t<span ng-if=\"category.showHeader\">{{ category.name | translate }}</span>\n" +
    "\t\t\t</th>\n" +
    "\t\t</tr>\n" +
    "\t\t<tr class=\"table-header\">\n" +
    "\t\t\t<th ng-repeat=\"field in sortedFieldsByCategory\" style=\"cursor: pointer;\">\n" +
    "\t\t\t\t<table-header field=\"field\" sorting=\"sorting\" showSorting=\"showSorting\" mode=\"results\"></table-header>\n" +
    "\t\t\t</th>\n" +
    "\t\t</tr>\n" +
    "\t</thead>\n" +
    "\t<tbody>\n" +
    "\t\t<tr\tng-class=\"{disabled : !showInRed(entity.statut), enabled : showInRed(entity.statut), editable: entityMetadata.editable !== null, resultClick: entityMetadata.resultClick.length}\" \n" +
    "\t\t\tng-hide=\"chantierCtrl.emptyResult\" \n" +
    "\t\t\tng-repeat=\"entity in entities\"\n" +
    "\t\t\tng-click=\"resultClick(entityMetadata, entity)\" ng-show=\"entities.length > 0\">\n" +
    "\t\t\t<!-- <td>\n" +
    "\t\t\t\t<a ng-click=\"updateChantier(result)\">\n" +
    "\t\t\t\t\t<span>{{entity.codeEds}}</span>\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t</td> -->\n" +
    "\t\t\t<td ng-repeat=\"field in sortedFieldsByCategory\">\n" +
    "\t\t\t\t<table-cell entity=\"entity\" field=\"field\"></table-cell>\n" +
    "\t\t\t</td>\n" +
    "\t\t</tr>\n" +
    "\t\t<tr ng-hide=\"entities.length > 0\">\n" +
    "\t\t\t<td colspan=\"{{ fields.length }}\" class=\"align-center\">{{'field.searchResults.noresults' | translate }}</td>\n" +
    "\t\t</tr>\n" +
    "\t</tbody>\n" +
    "</table>"
  );


  $templateCache.put('/konga/views/categorized_cascade-search-pane.html',
    "<div ng-repeat=\"category in categories\" ng-if=\"(fields | searchParams | filter:{ categories: category }).length > 0\">\n" +
    "\t<h4>{{ category | translate }}</h1>\n" +
    "\t<raw-input \n" +
    "\t\tproperty=\"field\"\n" +
    "\t\tvertical=\"true\" \n" +
    "\t\tsource-list=\"productCodes[field.name]\"\n" +
    "\t\tng-repeat=\"field in fields | searchParams | filter:{ categories: category } | orderBy:'priority.search'\"\n" +
    "\t\tentity=\"query\" \n" +
    "\t\tmetadata=\"entityMetadata\" \n" +
    "\t\ton-update=\"operations.updateField\"\n" +
    "\t\tmode=\"search\"\n" +
    "\t\tindex=\"$index\">\n" +
    "\t</raw-input>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/custom_tabbed-update.html',
    "<vertical-tabs>\n" +
    "\t<tab-content ng-repeat=\"fs in fieldsets\" title=\"{{fs.name | translate}}\" tab-id=\"fs.name\" is-show=\"true\">\n" +
    "\t\t<div ng-include=\"getView(fs.configuration.view)\"></div>\n" +
    "\t</tab-content>\n" +
    "</vertical-tabs>"
  );


  $templateCache.put('/konga/views/eds-update-form.html',
    "<form class=\"form-horizontal\" role=\"form\">\n" +
    "\t<raw-input \n" +
    "\t\tproperty=\"field\"\n" +
    "\t\tvertical=\"true\"\n" +
    "\t\tng-repeat=\"field in entityMetadata.searchParams\"\n" +
    "\t\tentity=\"$parent.entity\">\n" +
    "\t</raw-input>\n" +
    "\t<div class=\"pull-right update-btn-group\">\n" +
    "\t\t<button id=\"eds-update-validate-button.id\" class=\"btn btn-default\" ng-click=\"updateSubmit()\">{{ 'message.action.validate' | translate }}</button>\n" +
    "\t\t<button id=\"eds-update-cancel-button.id\" class=\"btn btn-default\" ng-click=\"closeTab(currentTab, false)\">{{ 'message.action.cancel' | translate }}</button>\n" +
    "\t</div>\n" +
    "</form>"
  );


  $templateCache.put('/konga/views/entity-search.html',
    "<div class=\"wall\" ng-init=\"init()\">\n" +
    "\t<div class=\"entity-search\">\n" +
    "\t\t<div class=\"col-md-3 search-panel\" ng-class=\"filterClass\">\n" +
    "\t\t\t<search-pane \n" +
    "\t\t\t\t\tentity-metadata=\"entityMetadata\"\n" +
    "\t\t\t\t\tquery=\"query\" \n" +
    "\t\t\t\t\tproduct-codes=\"productCodes\" \n" +
    "\t\t\t\t\ton-submit=\"submit\">\n" +
    "\t\t\t</search-pane>\n" +
    "\t\t</div>\n" +
    "\t\t<div ng-class=\"{ 'col-md-9': !!filterOpened, 'col-md-12': !filterOpened }\">\n" +
    "\t\t\t<!-- ng-show=\"hideSearchSpiner\"> -->\n" +
    "\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t<div class=\"col-md-3 quickSearchBox\" ng-show=\"paginationData[entityType].count > 0 || quickSearchEnabled\">\n" +
    "\t\t\t\t\t\t<div class=\"form-inline\">\n" +
    "\t\t\t\t\t\t\t<div class=\"form-group\" ng-repeat=\"quickSearchField in quickSearch\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"input-group margin-bottom\">\n" +
    "\t\t\t\t\t\t\t\t\t<div class=\"input-group-addon\" ng-click=\"toggleFilter()\" ng-class=\"{'text-warning': !filterOpened}\">\n" +
    "\t\t\t\t\t\t\t\t\t\t&nbsp;\n" +
    "\t\t\t\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-filter\"></i>\n" +
    "\t\t\t\t\t\t\t\t\t\t&nbsp;\n" +
    "\t\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" placeholder=\"{{quickSearchField.metadata.label | translate:quickSearchField.extra }}\" ng-model=\"quickSearchField.value\" ng-change=\"executeQuickSearch()\" id=\"quick-search-{{ quickSearchField.metadata.name }}\">\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"col-md-3 form-inline numItemsBox\" ng-show=\"paginationData[entityType].count > 0\">\n" +
    "\t\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t\t<label class=\"control-label font-normal\">\n" +
    "\t\t\t\t\t\t\t\t{{ 'message.pagination.results-per-page' | translate }}\n" +
    "\t\t\t\t\t\t\t</label>\n" +
    "\t\t\t\t\t\t\t<select class=\"form-control\" ng-model=\"paginationCount\" ng-change=\"paginationSubmit()\">\n" +
    "\t\t\t\t\t\t\t\t<!-- <option>10</option> -->\n" +
    "\t\t\t\t\t\t\t\t<option value=\"20\">20</option>\n" +
    "\t\t\t\t\t\t\t\t<option value=\"50\">50</option>\n" +
    "\t\t\t\t\t\t\t\t<option value=\"100\">100</option>\n" +
    "\t\t\t\t\t\t\t</select>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"col-md-6 text-right\" ng-show=\"paginationData[entityType].count > 0\">\n" +
    "\t\t\t\t\t\t<div class=\"form-inline\">\n" +
    "\t\t\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t\t\t{{ 'message.pagination.results' | translate:paginationData[entityType] }}\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t\t\t<pagination boundary-links=\"true\" total-items=\"paginationData[entityType].count\" items-per-page=\"paginationData[entityType].limit\" max-size=\"4\" rotate=\"false\" ng-model=\"paginationData[entityType].offset\" ng-change=\"paginationSubmit()\" class=\"pagination-sm\" previous-text=\"&lsaquo;\" next-text=\"&rsaquo;\" first-text=\"&laquo;\" last-text=\"&raquo;\">\n" +
    "\t\t\t\t\t\t\t\t</pagination>\t\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t<result-table entities=\"searchResults\" \n" +
    "\t\t\t\t\t\t\t\tentity-metadata=\"entityMetadata\" \n" +
    "\t\t\t\t\t\t\t\ton-update=\"operations.openEntityUpdate\" \n" +
    "\t\t\t\t\t\t\t\tpagination-data=\"paginationData[entityType]\"\n" +
    "\t\t\t\t\t\t\t\tpagination-update=\"paginationUpdate\"\n" +
    "\t\t\t\t\t\t\t\tfilter-code=\"quickSearchParams.value[codeField]\"\n" +
    "\t\t\t\t\t\t\t\ton-sorting=\"submitSorting\">\n" +
    "\t\t\t\t</result-table>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t<div class=\"col-md-6 text-right col-md-offset-6\" ng-show=\"paginationData[entityType].count > 0\">\n" +
    "\t\t\t\t\t\t<div class=\"form-inline\">\n" +
    "\t\t\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t\t\t{{ 'message.pagination.results' | translate:paginationData[entityType] }}\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t\t\t<pagination boundary-links=\"true\" total-items=\"paginationData[entityType].count\" items-per-page=\"paginationData[entityType].limit\" max-size=\"4\" rotate=\"false\" ng-model=\"paginationData[entityType].offset\" ng-change=\"paginationSubmit()\" class=\"pagination-sm\" previous-text=\"&lsaquo;\" next-text=\"&rsaquo;\" first-text=\"&laquo;\" last-text=\"&raquo;\">\n" +
    "\t\t\t\t\t\t\t\t</pagination>\t\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"row chantier-btn-list\">\n" +
    "\t\t\t\t<div class=\"actions pull-right\">\n" +
    "\t\t\t\t\t<button class=\"btn btn-primary\" ng-click=\"operations.openEntityCreate(entityMetadata)\" ng-show=\"isCreateable\" id=\"create-entity\">\n" +
    "\t\t\t\t\t\t<i class=\"icon ion-plus\"></i>\n" +
    "\t\t\t\t\t\t{{ 'message.action.add' | translate }}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t<button class=\"btn btn-default\" ng-repeat=\"action in entityMetadata.actions\" ng-model=\"action\" ng-click=\"dispatchSearchAction(action)\" ng-show=\"action.scope==='SEARCH' || action.scope==='RESULTS'\" id=\"search-action-dispatcher-{{ action.name }}\">\n" +
    "\t\t\t\t\t\t<i ng-class=\"action.icon\" ng-show=\"action.icon.length\"></i>\n" +
    "\t\t\t\t\t\t{{ action.label | translate }}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\n" +
    "\t\t<!-- TODO Uncomment -->\n" +
    "\t\t<!-- <div class=\"col-md-9 searchLoader\" ng-hide=\"hideSearchSpiner\">\n" +
    "\t\t\t<div class=\"png-spiner-container\"></div>\n" +
    "\t\t</div> -->\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"open-filters\" ng-if=\"entityMetadata.searchable !== null\" ng-show=\"!filterOpened\">\n" +
    "\t\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/entity-update.html',
    "<div class=\"wall\">\n" +
    "\t<div class=\"panel-body\">\n" +
    "\t\t<form ng-class=\"formStyle\" role=\"form\" name=\"entityUpdate\" novalidate>\n" +
    "\t\t\t<update-form entity=\"entity\" changes=\"changes\" metadata=\"entityMetadata\" params=\"params\" on-change=\"operations.changeEntityField\" on-update=\"operations.updateEntityField\" creating=\"creating\"></update-form>\n" +
    "\t\t\t<div class=\"pull-right update-btn-group\" ng-if=\"showActions\">\n" +
    "\t\t\t\t<button class=\"btn btn-default\" ng-repeat=\"action in entityMetadata.actions\" ng-model=\"action\" ng-click=\"operations.dispatchAction(action)\" ng-show=\"action.scope==='UPDATE'\" ng-disabled=\"action.scope!=='UPDATE'\" id=\"update-action-dispatcher-{{ action.name }}\">\n" +
    "\t\t\t\t\t\t\t{{ action.label | translate }}\n" +
    "\t\t\t\t</button>\n" +
    "\t\t\t\t<button type=\"submit\" class=\"btn btn-success\" ng-click=\"operations.dispatchEntityAction('save', params)\" ng-disabled=\"entityUpdate.$invalid || !changes.length || invalid || (entityMetadata.name==='Materiel' && !entity.validCtrOperat && entity.id != null) || customDisableValider || alreadyValidated\" id=\"save-entity\">\t\n" +
    "\t\t\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t\t\t{{ 'message.action.validate' | translate }}\n" +
    "\t\t\t\t</button>\n" +
    "\t\t\t\t<button class=\"btn btn-default\" ng-click=\"operations.cancelUpdate()\" id=\"cancel-update\">\n" +
    "\t\t\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t\t\t{{ 'message.action.cancel' | translate }}\n" +
    "\t\t\t\t</button>\n" +
    "\t\t\t\t<button class=\"btn btn-danger\" ng-click=\"operations.deleteEntity()\" ng-hide=\"deletable == false\" id=\"delete-entity\" ng-disabled=\"disabledDelete\">\n" +
    "\t\t\t\t\t<i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "\t\t\t\t\t{{ 'message.action.delete' | translate }}\n" +
    "\t\t\t\t</button>\n" +
    "\t\t\t</div>\n" +
    "\t\t</form>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/file-input.html',
    "<div class=\"col-md-12 file-input\">\n" +
    "\t<button multiple=\"{{ property.multiplicity === 'MANY' }}\" ng-file-select ng-model=\"value.files\">\n" +
    "\t<i class=\"glyphicon glyphicon-open\"></i>\n" +
    "\t{{ 'field.file-input.upload' | translate }}\n" +
    "</button>\n" +
    "\n" +
    "<!-- TODO Include more stuff -->\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/footer.html',
    "<div class=\"container\">\n" +
    "\t<p>{{ 'message.common.footer' | translate }}</p>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/header-nav1.html',
    "<div class=\"container-fluid\">\n" +
    "\t<!-- Brand and toggle get grouped for better mobile display -->\n" +
    "\t<div class=\"navbar-header\">\n" +
    "\t\t<a class=\"navbar-brand\" href=\"#\">\n" +
    "\t\t\t<img src=\"/images/logo.png\" height=\"30\">\n" +
    "\t\t</a>\n" +
    "\t</div>\n" +
    "\t<!-- Collect the nav links, forms, and other content for toggling -->\n" +
    "\t<div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n" +
    "\t\t<ul class=\"nav navbar-nav\">\n" +
    "\t\t\t<li>\n" +
    "\t\t\t\t<a href=\"#\" ng-click=\"operations.goHome()\">\n" +
    "\t\t\t\t\t<i class=\"glyphicon glyphicon-home\"></i>\n" +
    "\t\t\t\t\tHome\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t</li>\n" +
    "\t\t\t<!-- <li class=\"dropdown\">\n" +
    "\t\t\t\t<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">\n" +
    "\t\t\t\t\t<i class=\"glyphicon glyphicon-cloud\"></i>\n" +
    "\t\t\t\t\tAplicaciones <span class=\"caret\"></span>\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t\t<ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "\t\t\t\t\t<li><a href=\"#\">Catálogo</a></li>\n" +
    "\t\t\t\t</ul>\n" +
    "\t\t\t</li> -->\n" +
    "\t\t\t<li class=\"dropdown\" ng-if=\"user.admin || user.superadmin\">\n" +
    "\t\t\t\t<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">\n" +
    "\t\t\t\t\t<i class=\"glyphicon glyphicon-lock\"></i>\n" +
    "\t\t\t\t\tAdministración <span class=\"caret\"></span>\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t\t<ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "\t\t\t\t\t<!-- <li><a href=\"#\" ng-click=\"operations.goAdmin()\">Panel</a></li>\n" +
    "\t\t\t\t\t<li class=\"divider\"></li>\n" +
    "\t\t\t\t\t<li class=\"dropdown-submenu\"> -->\n" +
    "\t\t\t\t\t\t<!-- <a href=\"#\">Elementos</a> -->\n" +
    "\t\t\t\t\t\t<!-- <ul class=\"dropdown-menu\" role=\"menu\"> -->\n" +
    "\t\t\t\t\t\t\t<li ng-repeat=\"entity in metadata.entities | filter:{access: 'PUBLIC'} | orderBy: '+label'\">\n" +
    "\t\t\t\t\t\t\t\t<a href=\"#\" ng-click=\"operations.openEntitySearch(entity)\">{{ entity.label }}</a>\n" +
    "\t\t\t\t\t\t\t</li>\n" +
    "\t\t\t\t\t\t<!-- </ul> -->\n" +
    "\t\t\t\t\t<!-- </li> -->\n" +
    "\t\t\t\t</ul>\n" +
    "\t\t\t</li>\n" +
    "\t\t\t<li class=\"dropdown\" ng-if=\"user.id === 1\">\n" +
    "\t\t\t\t<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">\n" +
    "\t\t\t\t\t<i class=\"glyphicon glyphicon-cog\"></i>\n" +
    "\t\t\t\t\tWebmaster <span class=\"caret\"></span>\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t\t<ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "\t\t\t\t\t<li ng-repeat=\"entity in metadata.entities | filter:{access:'!HIDDEN'} | orderBy: '+label'\">\n" +
    "\t\t\t\t\t\t<a href=\"#\" ng-click=\"operations.openEntitySearch(entity)\">{{ entity.label }}</a>\n" +
    "\t\t\t\t\t</li>\n" +
    "\t\t\t\t</ul>\n" +
    "\t\t\t</li>\n" +
    "\t\t</ul>\n" +
    "\n" +
    "\t\t<ul class=\"nav navbar-nav navbar-right\">\n" +
    "\t\t\t<li>\n" +
    "\t\t\t\t<span kon-timer>00:00</span> para finalizar el pedido\n" +
    "\t\t\t</li>\n" +
    "\t\t\t<li>\n" +
    "\t\t\t\t<a href=\"#\" ng-click=\"operations.openEntityUpdate('user', user, { title: 'Mis datos', type: 'glyphicon glyphicon-user' })\">\n" +
    "\t\t\t\t\t<i class=\"glyphicon glyphicon-user\"></i>\n" +
    "\t\t\t\t\t{{ user.name }}\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t</li>\n" +
    "\t\t\t<!-- <li class=\"dropdown\">\n" +
    "\t\t\t\t<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">\n" +
    "\t\t\t\t\t<i class=\"glyphicon glyphicon-cog\"></i>\n" +
    "\t\t\t\t\tAjustes <span class=\"caret\"></span>\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t\t<ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "\t\t\t\t\t<li><a href=\"#\">Action</a></li>\n" +
    "\t\t\t\t\t<li><a href=\"#\">Another action</a></li>\n" +
    "\t\t\t\t\t<li><a href=\"#\">Something else here</a></li>\n" +
    "\t\t\t\t\t<li class=\"divider\"></li>\n" +
    "\t\t\t\t\t<li><a href=\"#\">Separated link</a></li>\n" +
    "\t\t\t\t</ul>\n" +
    "\t\t\t</li> -->\n" +
    "\t\t\t<li>\n" +
    "\t\t\t\t<a href=\"#\" ng-click=\"operations.dispatchAction({ name: 'logout' })\">\n" +
    "\t\t\t\t\t<i class=\"glyphicon glyphicon-off\"></i>\n" +
    "\t\t\t\t\tSalir\n" +
    "\t\t\t\t</a>\n" +
    "\t\t\t</li>\n" +
    "\t\t</ul>\n" +
    "\t</div><!-- /.navbar-collapse -->\n" +
    "</div><!-- /.container-fluid -->"
  );


  $templateCache.put('/konga/views/konga-content-plain.html',
    "<div class=\"konga-container plain-app\">\n" +
    "\t<div class=\"pwd text-center\">\n" +
    "        <h1>\n" +
    "            <i class=\"{{ (tabs | filter:{ id: tabId })[0].type }}\"></i>\n" +
    "            {{ (tabs | filter:{ id: tabId })[0].title | translate:tabExtra[tabId] }}\n" +
    "        </h1>\n" +
    "    </div>\n" +
    "\t<div ng-view></div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/konga-content-tabs.html',
    "<div class=\"container\">\t\t\t\n" +
    "\t<div id=\"kongaNavTabs\" class=\"container-fluid\">\n" +
    "\t\t<!--<div bs-tabs=\"tabs\" ng-model=\"tabs.activeTab\"></div>-->\n" +
    "\n" +
    "\t<tabset>\t\t\t    \n" +
    "\t    <tab ng-repeat=\"tab in tabs\" active=\"tab.active\" select=\"operations.redirectTo(tab)\">\n" +
    "\t    \t<tab-heading>\n" +
    "\t    \t\t<i ng-class=\"tab.type\"></i></span>\n" +
    "\t\t        <span class=\"tab-heading-title\">{{ tab.title | translate:tabExtra[tab.id] }}{{ tab.hasChanges ? '*' : '' }}\n" +
    "\t\t        <i class=\"glyphicon glyphicon-remove tab-close-btn\" ng-click=\"operations.closeTab(tab, false)\" ng-show=\"tab.closable\"></i></span>\n" +
    "\t\t    </tab-heading>\n" +
    "\t\t    \n" +
    "\t\t</tab>\n" +
    "\t</tabset>\n" +
    "\t<!-- Tab panes Container-->\n" +
    "\t<div class=\"view-container\">\n" +
    "\t\t<div ng-view></div>\n" +
    "\t</div>\n" +
    "\t</div><!-- End of navTab -->\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/konga-content.html',
    "<div ng-include=\"contentView\"></div>"
  );


  $templateCache.put('/konga/views/list-input.html',
    "<div class=\"list-input col-md-12 padding-cero\">\n" +
    "\t<div class=\"col-md-12 padding-cero\" ng-if=\"paginate\">\n" +
    "\t\t<!-- ng-show=\"hideSearchSpiner\"> -->\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"col-md-4 form-inline position-pagination\" style=\"margin-top:10px\" ng-show=\"paginationData.count\">\n" +
    "\t\t\t\t<label class=\"control-label font-normal\">\n" +
    "\t\t\t\t\t{{ 'message.pagination.results-per-page' | translate }}\n" +
    "\t\t\t\t</label>\n" +
    "\t\t\t\t<select class=\"form-control\" ng-model=\"paginationData.limit\" ng-change=\"pageChanged()\">\n" +
    "\t\t\t\t\t<option>10</option>\n" +
    "\t\t\t\t\t<option>20</option>\n" +
    "\t\t\t\t\t<option>50</option>\n" +
    "\t\t\t\t</select>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col-md-6 text-right\" ng-show=\"paginationData.count\">\n" +
    "\t\t\t\t<div class=\"form-inline\">\n" +
    "\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t<span class=\"total-items\">{{'message.pagination.results' | translate:paginationData }}</span>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t<pagination boundary-links=\"true\" total-items=\"paginationData.count\" items-per-page=\"paginationData.limit\" max-size=\"2\" rotate=\"false\" ng-model=\"paginationData.offset\" ng-change=\"paginationSubmit()\" class=\"pagination-sm\" previous-text=\"&lsaquo;\" next-text=\"&rsaquo;\" first-text=\"&laquo;\" last-text=\"&raquo;\"> </pagination>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"col-md-12 padding-cero\">\n" +
    "\t\t<div class=\"table-search-result\">\n" +
    "\t\t\t<table class=\"table table-striped\">\n" +
    "\t\t\t\t<tr class=\"table-header\">\n" +
    "\t\t\t\t\t<!-- <th></th> -->\n" +
    "\t\t\t\t\t<th ng-repeat=\"field in fields\">\n" +
    "\t\t\t\t\t\t<table-header field=\"field\" showSorting=\"showSorting\" mode=\"update\"></table-header>\n" +
    "\t\t\t\t\t</th>\n" +
    "\t\t\t\t\t<th ng-show=\"actions && actions.length\">\n" +
    "\t\t\t\t\t\t<span>{{ 'field.list-input.actions' | translate }}</span>\n" +
    "\t\t\t\t\t\t<!-- <input id=\"test\" type=\"text\" class=\"form-control\"\n" +
    "\t\t\t\t\t\t\t\tplaceholder=\"{{ field.fieldLabel | translate }}\" ng-model=\"quickSearchParams.param[field.fieldKey]\"> -->\n" +
    "\t\t\t\t\t</th>\n" +
    "\t\t\t\t\t\n" +
    "\t\t\t\t</tr>\n" +
    "\t\t\t\t<tr ng-hide=\"filteredList.length > 0\">\n" +
    "\t\t\t\t\t<td colspan=\"{{ fields.length + 1 }}\" class=\"align-center\">{{'field.searchResults.noresults' | translate }}</td>\n" +
    "\t\t\t\t</tr>\n" +
    "\t\t\t\t<tr ng-show=\"filteredList.length>0\" ng-repeat=\"entity in filteredList | filter:quickSearchParams.value\">\n" +
    "\t\t\t\t\t<!-- <td>\n" +
    "\t\t\t\t\t\t<div class=\"checkbox\">\n" +
    "\t\t\t\t\t\t  <label>\n" +
    "\t\t\t\t\t\t    <input id=\"checkbox.id-list-input\" type=\"checkbox\" ng-model=\"entity.selected\" ng-change=\"pageChanged()\" ng-disabled=\"disabledIds[entity.id]\">\n" +
    "\t\t\t\t\t\t  </label>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</td> -->\n" +
    "\t\t\t\t\t<td ng-repeat=\"field in fields\">\n" +
    "\t\t\t\t\t\t<table-cell entity=\"entity\" field=\"field\"></table-cell>\n" +
    "\t\t\t\t\t</td>\n" +
    "\t<!-- \t\t\t\t\t<table-cell entity=\"entity\" field=\"field\"></table-cell> -->\n" +
    "\t\t\t\t\t<td ng-show=\"actions && actions.length\">\n" +
    "\t\t\t\t\t\t<button class=\"btn btn-link no-button-styles\" ng-repeat=\"action in actions\" ng-click=\"dispatchFieldAction(action.name, {entity: entity})\" id=\"{{ fieldId + '-' + action.name }}\">\n" +
    "\t\t\t\t\t\t\t<i ng-class=\"action.icon\" ng-show=\"action.icon.length\"></i>\n" +
    "\t\t\t\t\t\t\t{{ action.label | translate }}\n" +
    "\t\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t\t&nbsp;\n" +
    "\t\t\t\t\t</td>\n" +
    "\t\t\t\t</tr>\n" +
    "\t\t\t\t<tr ng-hide=\"fields.length > 0\">\n" +
    "\t\t\t\t\t<td colspan=\"{{ fields.length }}\" class=\"align-center\">{{'field.searchResults.noresults' | translate }}</td>\n" +
    "\t\t\t\t</tr>\n" +
    "\t\t\t</table>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/loader.html',
    "<div class=\"loader\" ng-show=\"loading.length > 0\">\n" +
    "\t<div class=\"blocker\"></div>\n" +
    "\t<div class=\"loading\"></div>\n" +
    "\t<div class=\"message\">{{ loadingMessage }}</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/login.html',
    "<div class=\"container-fluid\">\n" +
    "\t<div class=\"jumbotron col-md-6 col-md-offset-3 login-pane\">\n" +
    "\t\t<img src=\"/images/logo.png\" />\n" +
    "\t\t<h2>{{ 'message.login.title' | translate }}</h2>\n" +
    "\t\t<p>{{ 'message.login.description' | translate }}</p>\n" +
    "\t\t<p ng-show=\"error!=null\" class=\"text-danger\">{{error}}</p>\n" +
    "\t\t<p>\n" +
    "\t\t<form role=\"form\" class=\"form-horizontal\">\n" +
    "\t\t\t<div class=\"form-group col-md-10\">\n" +
    "\t\t\t\t<label for=\"username\" class=\"col-md-4 control-label\">{{ 'message.login.username' | translate }}:</label>\n" +
    "\t\t\t\t<div class=\"col-md-8\">\n" +
    "\t\t\t\t\t<input id=\"username\" name=\"username\" ng-model=\"username\" type=\"text\" class=\"form-control\" tabindex=\"1\" />\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"form-group col-md-10\">\n" +
    "\t\t\t\t<label for=\"password\" class=\"col-md-4 control-label\">{{ 'message.login.password' | translate }}:</label>\n" +
    "\t\t\t\t<div class=\"col-md-8\">\n" +
    "\t\t\t\t\t<input id=\"password\" name=\"password\" ng-model=\"password\" type=\"password\" class=\"form-control\" tabindex=\"2\" />\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<!-- <div class=\"form-group col-md-10\">\n" +
    "\t\t\t\t<div class=\"col-md-8 col-md-offset-4\">\n" +
    "\t\t\t\t\t<div class=\"checkbox\">\n" +
    "\t\t\t\t\t\t<label>\n" +
    "\t\t\t\t\t\t\t<input id=\"rememberMe\" type=\"checkbox\" ng-model=\"rememberMe\" tabindex=\"3\">{{ 'message.login.rememberme' | translate }}\n" +
    "\t\t\t\t\t\t</label>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div> -->\n" +
    "\t\t\t<div class=\"form-group col-md-12 text-right\">\n" +
    "\t\t\t\t<button id=\"loginSubmit\" type=\"submit\" class=\"btn btn-primary\" ng-click=\"login()\" tabindex=\"4\">{{ 'message.login.proceed' | translate }}</button>\n" +
    "\t\t\t</div>\n" +
    "\t\t</form>\n" +
    "\t\t</p>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/main.html',
    "\n" +
    "<!-- Alerts -->\n" +
    "<div class=\"alert-container\">\n" +
    "\t<alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"operations.removeAlert($index)\" \n" +
    "\t\tng-show=\"!alert.expired\" class=\"alert-show-hide\">{{alert.msg | translate:alert.parameters}}</alert>\n" +
    "</div>\n" +
    "\n" +
    "<!-- TODO Include header -->\n" +
    "\n" +
    "<!-- Content -->\n" +
    "<div id=\"wrapper\">\n" +
    "\t<div id=\"content\" >\n" +
    "\t\t<konga-content></konga-content>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/modal.tpl.html',
    "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\">\n" +
    "\n" +
    "  <!-- Dialog for the modal -->\n" +
    "  <div class=\"modal-dialog\">\n" +
    "\n" +
    "    <!-- Content for the modal -->\n" +
    "    <div class=\"modal-content\">\n" +
    "\n" +
    "      <!-- Header of the modal -->\n" +
    "      <div class=\"modal-header\" ng-show=\"modal.title\">\n" +
    "\n" +
    "        <!-- Close button -->\n" +
    "        <button id=\"modal-tpl-closeX\" type=\"button\" class=\"close\" ng-click=\"\">&times;</button>\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h4 class=\"modal-title\" ng-bind=\"modal.title\"></h4>\n" +
    "      </div>\n" +
    "\n" +
    "      <!-- Body -->\n" +
    "      <div class=\"modal-body\">\n" +
    "\n" +
    "        <!-- Include content -->\n" +
    "        <div ng-include=\"modal.contentUrl\"></div>\n" +
    "      </div>\n" +
    "\n" +
    "      <!-- Footer of the modal -->\n" +
    "      <div class=\"modal-footer\">\n" +
    "\n" +
    "        <!-- Close button -->\n" +
    "        <button type=\"button\" class=\"btn btn-default\" id=\"modal-save\" ng-click=\"modal.save();$hide()\">{{ 'message.action.validate' | translate }}</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" id=\"modal-cancel\" ng-click=\"$hide()\">{{ 'message.action.cancel' | translate }}</button>\n" +
    "        \n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/multi-select-modal.html',
    "<!-- Multi select for modal views -->\n" +
    "<multi-select source-list=\"sourceList\" model=\"modal.temp\"></multi-select>"
  );


  $templateCache.put('/konga/views/multi-select.html',
    "<div class=\"multi-select\" ng-init=\"operations.init()\">\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t    <!-- Close button -->\n" +
    "\t    <button id=\"multiselectModal.cancelX.id\" type=\"button\" class=\"close\" ng-click=\"multiselectModal.cancel()\">&times;</button>\n" +
    "\n" +
    "\t\t<div class=\"filter\">\n" +
    "\t\t\t<div class=\"form-inline\" ng-repeat=\"quickSearchItem in quickSearch\">\n" +
    "\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t<!-- <label for=\"filter\" class=\"control-label col-md-4\">5 r�sultats</label> -->\n" +
    "\t\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t\t<div class=\"input-group\">\n" +
    "\t\t\t\t\t\t  <span class=\"input-group-addon\">\n" +
    "\t\t\t\t\t\t  \t&nbsp;\n" +
    "\t\t\t\t\t\t  \t<i class=\"glyphicon glyphicon-filter\"></i>\n" +
    "\t\t\t\t\t\t  \t&nbsp;\n" +
    "\t\t\t\t\t\t  </span>\n" +
    "\t\t\t\t\t\t  <input type=\"text\" id=\"multi-select-filter\" class=\"form-control\" name=\"filter\" ng-model=\"quickSearchItem.value\" placeholder=\"{{quickSearchItem.metadata.label | translate:quickSearchItem.extra }}\" ng-change=\"executeQuickSearch()\" />\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\n" +
    "\t    <!-- Title -->\n" +
    "\t    <h4 class=\"modal-title\" ng-bind=\"multiselectModal.title\"></h4>\n" +
    "  \t</div>\n" +
    "\t<div class=\"col-md-5 multi-select-modal-body-item\">\n" +
    "\t\t<div class=\"multiselect-list list-group\" scroll-watcher>\n" +
    "\t\t\t<a class=\"list-group-item\"\n" +
    "\t\t\t\tng-repeat=\"item in sourceList | filter:filter.value | filter: {added: false} | orderBy: '+key'\"\n" +
    "\t\t\t\tng-click=\"operations.toggle(item, !item.selected)\"\n" +
    "\t\t\t\tng-dblclick=\"operations.toggle(item, true);operations.add()\"\n" +
    "\t\t\t\tng-class=\"{selected: item.selected}\">\n" +
    "\t\t\t\t<h5>\n" +
    "\t\t\t\t\t{{ item.key }} <small>{{ item.value | translate }}</small>\n" +
    "\t\t\t\t</h5>\n" +
    "\t\t\t</a>\n" +
    "\t\t\t<div class=\"loading-data\" ng-if=\"loading\">&nbsp;</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"col-md-2 multi-select-modal-body-item center\">\n" +
    "\t\t<div class=\"add-remove-btn\">\n" +
    "\t\t\t<button id=\"add-multi-select.id\" type=\"button\" class=\"btn btn-default\" ng-click=\"operations.add()\">\n" +
    "\t\t\t\t<i class=\"icon ion-chevron-right\"></i>\n" +
    "\t\t\t</button>\n" +
    "\t\t\t<button id=\"remove-multi-select.id\" type=\"button\" class=\"btn btn-default\" ng-click=\"operations.remove()\">\n" +
    "\t\t\t\t<i class=\"icon ion-chevron-left\"></i>\n" +
    "\t\t\t</button>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"add-remove-btn\">\n" +
    "\t\t\t<button id=\"addAll-button.id\" type=\"button\" class=\"btn btn-default bulk-option\" ng-click=\"operations.addAll()\">\n" +
    "\t\t\t\t<i class=\"icon icon-add-remove-all ion-chevron-right\"></i><i\n" +
    "\t\t\t\t\tclass=\"icon icon-add-remove-all ion-chevron-right\"></i>\n" +
    "\t\t\t</button>\n" +
    "\t\t\t<button id=\"removeAll-button.id\" type=\"button\" class=\"btn btn-default bulk-option\" ng-click=\"operations.removeAll()\">\n" +
    "\t\t\t\t<i class=\"icon icon-add-remove-all ion-chevron-left\"></i><i\n" +
    "\t\t\t\t\tclass=\"icon icon-add-remove-all ion-chevron-left\"></i>\n" +
    "\t\t\t</button>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"col-md-5 multi-select-modal-body-item\">\n" +
    "\t\t<div class=\"multiselect-list list-group\">\n" +
    "\t\t\t<a a class=\"list-group-item\"\n" +
    "\t\t\t\tng-repeat=\"item in sourceList | filter: {added: true} | orderBy: '+key'\"\n" +
    "\t\t\t\tng-click=\"operations.toggle(item)\" \n" +
    "\t\t\t\tng-dblclick=\"operations.toggle(item, true);operations.remove()\"\n" +
    "\t\t\t\tng-class=\"{selected: item.selected}\">\n" +
    "\t\t\t\t<h5>   \n" +
    "\t\t\t\t\t{{ item.key }} <small>{{ item.value | translate }}</small>\n" +
    "\t\t\t\t</h5>\n" +
    "\t\t\t</a>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"clear\">&nbsp;</div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<!-- Close button -->\n" +
    "\t\t<button  type=\"button\" class=\"btn btn-success\" ng-click=\"multiselectModal.save()\" id=\"multi-select-save\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t{{ 'message.action.validate' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t<button  type=\"button\" class=\"btn btn-default\" ng-click=\"multiselectModal.cancel()\" id=\"multi-select-cancel\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{ 'message.action.cancel' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/ng-view.html',
    "<div class=\"view-container\">\n" +
    "\t<div ng-view></div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/option-input.html',
    "<p>This is the option-input view.</p>\n"
  );


  $templateCache.put('/konga/views/price-input.html',
    "<div class=\"input-group\">\n" +
    "  <input name=\"{{ property.name }}\" type=\"text\" class=\"form-control text-right\"\n" +
    "\tid=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"inner.text\" ng-change=\"formatInput()\"\n" +
    " \tng-disabled=\"disableField(mode, property)\"\n" +
    "\tng-pattern=\"validation.pattern()\" ng-required=\"validation.required()\" aria-describedby=\"{{fieldId}}_addon\">\n" +
    "  <span class=\"input-group-addon\" id=\"{{fieldId}}_addon\">&nbsp;<b>{{ currency }}&nbsp;</b></span>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-boolean-input.html',
    "<div class=\"radio-inline\">\n" +
    "\t<label for=\"{{ fieldId }}-true\">\n" +
    "\t\t<input name=\"{{ property.name }}\"type=\"radio\" name=\"{{property.name}}\" ng-value=\"true\" ng-model=\"value.text\" id=\"{{ fieldId }}-true\" ng-disabled=\"disableField(mode, property)\">\n" +
    "\t\t{{ true | activeInactive:property:mode | translate }}\n" +
    "\t</label>\n" +
    "</div>\n" +
    "<div class=\"radio-inline\">\n" +
    "\t<label for=\"{{ fieldId }}-false\">\n" +
    "\t\t<input type=\"radio\" name=\"{{property.name}}\" ng-value=\"false\" ng-model=\"value.text\" id=\"{{ fieldId }}-false\" ng-disabled=\"disableField(mode, property)\">\n" +
    "\t\t{{ false | activeInactive:property:mode | translate }}\n" +
    "\t</label>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-checkbox-input.html',
    "<div class=\"checkbox-inline\">\n" +
    "\t<label for=\"{{ fieldId }}-true\"> <input name=\"{{ property.name }}\"type=\"checkbox\" ng-value=\"true\" ng-model=\"value.active\" id=\"{{ fieldId }}-true\"> \n" +
    "\t\t{{ true | activeInactive:property | translate}}\n" +
    "\t</label>\n" +
    "</div>\n" +
    "<div class=\"checkbox-inline\">\n" +
    "\t<label for=\"{{ fieldId }}-false\"> <input name=\"{{ property.name }}\"type=\"checkbox\" ng-value=\"false\" ng-model=\"value.inactive\" id=\"{{ fieldId }}-false\">\n" +
    "\t\t{{ false | activeInactive:property | translate}}\n" +
    "\t</label>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-color-input.html',
    "<input name=\"{{ property.name }}\" type=\"color\" class=\"form-control konga-form-search-input\" id=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" ng-pattern=\"validation.pattern()\" ng-required=\"validation.required()\" maxlength=\"{{ validation.maxlength() }}\">\n" +
    "<!-- TODO This is not working (yet) -->\n" +
    "<!-- ng-minlength=\"property.minLength\"\n" +
    "ng-maxlength=\"property.maxLength\" -->\n" +
    "<!-- <div class=\"input-group-addon bg-invalid\">\n" +
    "\t<button type=\"button\" class=\"btn btn-link\">\n" +
    "\t\t<i class=\"glyphicon glyphicon-remove text-bg-invalid\"></i>\n" +
    "\t</button>\n" +
    "</div> -->"
  );


  $templateCache.put('/konga/views/raw-combobox-input.html',
    "<button type=\"button\" class=\"btn btn-default combobox-button\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" ng-required=\"validation.required()\" data-html=\"0\" ng-options=\"item.key as item.value | translate for item in value.list\" data-animation=\"am-flip-x\" data-placeholder=\"{{ 'combobox.placeholder' | translate }}\" bs-select ng-if=\"!multiple\">\n" +
    "\tAction <span class=\"caret\"></span>\n" +
    "</button>\n" +
    "<button type=\"button\" class=\"btn btn-default combobox-button\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" ng-required=\"validation.required()\" data-html=\"0\" ng-options=\"item.key as item.value | translate for item in value.list\" data-multiple=\"{{ multiple }}\" data-animation=\"am-flip-x\" data-placeholder=\"{{ 'combobox.placeholder' | translate }}\" bs-select ng-if=\"multiple\">\n" +
    "\tAction <span class=\"caret\"></span>\n" +
    "</button>"
  );


  $templateCache.put('/konga/views/raw-complex-input.html',
    "<div class=\"complex-container\">\n" +
    "\t<raw-input \n" +
    "\t\tproperty=\"field\"\n" +
    "\t\tvertical=\"true\" \n" +
    "\t\tng-repeat=\"field in value.fields\"\n" +
    "\t\tentity=\"entity[$parent.property.name]\"\n" +
    "\t\troot-entity=\"entity\" \n" +
    "\t\tmetadata=\"value.metadata\"\n" +
    "\t\troot-metadata=\"metadata\"\n" +
    "\t\ton-update=\"updateEntity\"\n" +
    "\t\ton-change=\"changeEntity\"\n" +
    "\t\tmode=\"{{mode}}\"\n" +
    "\t\tparent-field=\"$parent.property\"\n" +
    "\t\tcreating=\"creating\"\n" +
    "\t\tindex=\"index + $index\">\n" +
    "\t</raw-input>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-css-input.html',
    "<div ng-class=\"value.text\"></div>"
  );


  $templateCache.put('/konga/views/raw-date-input.html',
    "<input name=\"{{ property.name }}\" id=\"{{ fieldId }}\" type=\"date\" placeholder=\"yyyy-MM-dd\" ng-model=\"value.text\" name=\"{{property.fieldName}}\"\n" +
    "\t\tclass=\"form-control\" ng-required=\"validation.required()\" ng-disabled=\"disableField(mode, property)\" value=\"{{ value.text }}\">\n" +
    "\n" +
    "<div class=\"validation\">\n" +
    "\t<div class=\"validation-invalid-date btn-danger\">\n" +
    "\t\t{{\t'message.field-validation.invalid-date' | translate }}\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-date-search-input.html',
    "<div class=\"padding-cero\">\n" +
    "\t<label>{{ 'field.date-search.comparator' | translate }}</label>\n" +
    "\t<select name=\"comparator\" ng-model=\"value.date.comparator\"\n" +
    "\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-comparator\">\n" +
    "\t\t<option value=\"LOWER_THAN\">{{ 'field.date-search.LOWER_THAN' | translate }}</option>\n" +
    "\t\t<option value=\"LOWER_EQUALS\">{{ 'field.date-search.LOWER_EQUALS' | translate }}</option>\n" +
    "\t\t<option value=\"EQUALS\">{{ 'field.date-search.EQUALS' | translate }}</option>\n" +
    "\t\t<option value=\"GREATER_EQUALS\">{{ 'field.date-search.GREATER_EQUALS' | translate }}</option>\n" +
    "\t\t<option value=\"GREATER_THAN\">{{ 'field.date-search.GREATER_THAN' | translate }}</option>\n" +
    "\t\t<option value=\"BETWEEN\">{{ 'field.date-search.BETWEEN' | translate }}</option>\n" +
    "\t</select>\n" +
    "</div>\n" +
    "<div class=\"padding-cero\">\n" +
    "\t<label for=\"{{ fieldId }}-dateSince\">{{ 'field.date-search.date' | translate }}</label>\n" +
    "\t<input name=\"{{ property.name }}\"type=\"date\" name=\"date-since\" ng-model=\"value.date.startDate\"\n" +
    "\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-dateSince\"\n" +
    "</div>\n" +
    "<div class=\"padding-cero\" ng-show=\"value.date.comparator == 'BETWEEN'\">\n" +
    "\t<label for=\"{{ fieldId }}-dateTo\">{{ 'field.date-search.otherdate' | translate }}</label>\n" +
    "\t<input name=\"{{ property.name }}\"type=\"date\" name=\"to\" ng-model=\"value.date.endDate\"\n" +
    "\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-dateTo\">\n" +
    "</div>\n" +
    "<!-- <div class=\"col-md-2 padding-cero\">\n" +
    "\t<button id=\"toggleDatePicker.id\" type=\"button\" class=\"btn btn-default\"\n" +
    "\t\tng-click=\"toggleDatePicker()\">\n" +
    "\t\t<i class=\"icon ion-ios7-calendar-outline\"></i>\n" +
    "\t</button>\n" +
    "</div> -->\n" +
    "<!-- <datepicker ng-model=\"value.text\" show-weeks=\"true\"\n" +
    "\tclass=\"well well-sm\" ng-show=\"datePicker.opened\"></datepicker> -->"
  );


  $templateCache.put('/konga/views/raw-datetime-input.html',
    "<div class=\"dropdown\">\n" +
    "  <a class=\"dropdown-toggle\" id=\"dropdown2\" role=\"button\" data-toggle=\"dropdown\" ng-disabled=\"disableField(mode, property)\" data-target=\"#\" href=\"#\">\n" +
    "    <div class=\"input-group\">\n" +
    "    \t<div class=\"input-datetimepicker\" ng-model=\"value.text\">\n" +
    "\t    \t<input name=\"{{ property.name }}\"id=\"{{ fieldId }}\" type=\"text\" class=\"form-control\" name=\"{{property.fieldName}}\"\n" +
    "\t\t\t\t\tplaceholder=\"dd/MM/yyyy HH:mm\" value=\"{{ value.text | date:'dd/MM/yyyy HH:mm' }}\" ng-required=\"validation.required()\" ng-disabled=\"disableField(mode, property)\">\n" +
    "\t\t\t<div></div>\n" +
    "    \t</div>\n" +
    "\t\t<div class=\"input-group-addon\">\n" +
    "\t\t\t<button type=\"button\" class=\"btn btn-link\" ng-disabled=\"disableField(mode, property)\"id=\"raw-input-dateHeure-releve-select\">\n" +
    "\t\t\t\t<i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "\t\t</div>\n" +
    "    </div>\n" +
    "  </a>\n" +
    "  <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\n" +
    "    <datetimepicker data-ng-model=\"value.text\" data-datetimepicker-config=\"{ dropdownSelector: '#dropdown2' }\" />\n" +
    "  </ul>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"validation\">\n" +
    "\t<div class=\"validation-invalid-date btn-danger\">\n" +
    "\t\t{{\t'message.field-validation.invalid-date' | translate }}\n" +
    "\t</div>\n" +
    "\t<div class=\"validation-required btn-danger\">{{\n" +
    "\t\t'message.field-validation.required' | translate }}\n" +
    "\t</div>\n" +
    "</div>\n"
  );


  $templateCache.put('/konga/views/raw-file-input.html',
    "<file-input></file-input>"
  );


  $templateCache.put('/konga/views/raw-image-input.html',
    "<!-- <input name=\"{{ property.name }}\"type=\"text\" class=\"form-control konga-form-search-input\" id=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" ng-pattern=\"validation.pattern()\" ng-required=\"validation.required()\" maxlength=\"{{ validation.maxlength() }}\"> -->\n" +
    "\n" +
    "<img ng-src=\"{{ value.text }}\" width=\"200\" />"
  );


  $templateCache.put('/konga/views/raw-input.html',
    "<div class=\"raw-input\">\n" +
    "\t<div class=\"form-group mode-{{ mode }} {{ parentField ? 'derived' : '' }} {{(isExtended) ? 'extended' : '' }} {{displayMode}}\">\n" +
    "\t\t<label ng-hide=\"property.fieldType[mode] === 'COMPLEX'\" class=\"col-xs-12 col-sm-12 col-md-6 col-lg-4\">{{property.label | translate:extra }}</label>\n" +
    "\t\t<div ng-class=\"{ 'derived': !!parentField, 'full-width-component': (['COMPLEX', 'TABLE', 'PICK_LIST'].indexOf(property.fieldType[mode]) !== -1) }\" class=\"col-xs-12 col-sm-12 col-md-6 col-lg-8\">\n" +
    "\t\t\t<div ng-include=\"contentUrl\" ng-class=\"classFormInput\"></div>\n" +
    "\t\t</div>\n" +
    "\t\t<div ng-if=\"['COMPLEX', 'TABLE', 'PICK_LIST'].indexOf(property.fieldType[mode]) === -1\" class=\"col-xs-12 col-sm-12 col-md-8 col-md-offset-6 col-lg-10 col-lg-offset-4\">\n" +
    "\t\t\t<div class=\"validation-pattern text-danger\" ng-show=\"!validation.valid_pattern()\">\n" +
    "\t\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t\t{{ 'message.field-validation.pattern' | translate }}\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"validation-forbidden-characters text-danger\" ng-show=\"!validation.valid_forbiddenCharacters()\">\n" +
    "\t\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t\t{{ 'message.field-validation.forbidden-characters' | translate }}\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"validation-required text-danger\" ng-show=\"!validation.valid_required()\" >\n" +
    "\t\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t\t{{ 'message.field-validation.required' | translate }}\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-list-input.html',
    "<div class=\"padding-cero\" ng-class=\"inLineClass.col1\">\n" +
    "\t<label for=\"{{ fieldId }}\">{{property.fieldLabel | translate:extra }}</label>\n" +
    "</div>\n" +
    "<div class=\"input-group\" ng-class=\"inLineClass.col3\">\n" +
    "\t<list-input fields=\"entityFields\" list=\"value.list\" eds-type=\"societe\" disabled-ids=\"[]\"></list-input>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "\t<div class=\"col-md-12\">\n" +
    "\t\t<button class=\"btn btn-default\" ng-click=\"openMultiSelect()\" id=\"{{ fieldId }}-add\">{{'message.action.add' | translate}}</button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-number-input.html',
    "<input name=\"{{ property.name }}\"type=\"number\"\n" +
    "\tclass=\"form-control konga-form-search-input konga-form-simple-search-input\"\n" +
    "\tid=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"value.text\"\n" +
    " \tng-disabled=\"disableField(mode, property)\"\n" +
    "\tng-pattern=\"validation.pattern()\" ng-required=\"validation.required()\" min=\"{{ validation.minvalue() }}\" max=\"{{ validation.maxvalue() }}\" tabindex=\"{{ (index + 1) * 12 }}\">\n" +
    "\n" +
    "<div class=\"validation\">\n" +
    "\t<div class=\"validation-pattern btn-danger\">\n" +
    "\t\t{{ 'message.field-validation.pattern' | translate }}\n" +
    "\t</div>\n" +
    "\t<div class=\"validation-required btn-danger\">\n" +
    "\t\t{{ 'message.field-validation.required' | translate }}\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-number-range-input.html',
    "<div class=\"padding-cero\">\n" +
    "\t<label>{{ 'field.number-range.comparator' | translate }}</label>\n" +
    "\t<select name=\"comparator\" ng-model=\"value.range.comparator\"\n" +
    "\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-comparator\">\n" +
    "\t\t<option value=\"LOWER_THAN\">{{ 'field.number-range.LOWER_THAN' | translate }}</option>\n" +
    "\t\t<option value=\"LOWER_EQUALS\">{{ 'field.number-range.LOWER_EQUALS' | translate }}</option>\n" +
    "\t\t<option value=\"EQUALS\">{{ 'field.number-range.EQUALS' | translate }}</option>\n" +
    "\t\t<option value=\"GREATER_EQUALS\">{{ 'field.number-range.GREATER_EQUALS' | translate }}</option>\n" +
    "\t\t<option value=\"GREATER_THAN\">{{ 'field.number-range.GREATER_THAN' | translate }}</option>\n" +
    "\t\t<option value=\"BETWEEN\">{{ 'field.number-range.BETWEEN' | translate }}</option>\n" +
    "\t</select>\n" +
    "</div>\n" +
    "<div class=\"padding-cero\">\n" +
    "\t<label for=\"{{ fieldId }}-dateSince\">{{ 'field.number-range.number' | translate }}</label>\n" +
    "\t<input name=\"{{ property.name }}\" type=\"number\" name=\"from\" ng-model=\"value.range.from\"\n" +
    "\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-dateSince\"\n" +
    "</div>\n" +
    "<div class=\"padding-cero\" ng-show=\"value.range.comparator == 'BETWEEN'\">\n" +
    "\t<label for=\"{{ fieldId }}-dateTo\">{{ 'field.number-range.othernumber' | translate }}</label>\n" +
    "\t<input name=\"{{ property.name }}\" type=\"number\" name=\"to\" ng-model=\"value.range.to\"\n" +
    "\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-dateTo\">\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-option-input.html',
    "<option-input></option-input>"
  );


  $templateCache.put('/konga/views/raw-password-input.html',
    "<input name=\"{{ property.name }}\"type=\"password\" class=\"form-control konga-form-search-input\" id=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" ng-pattern=\"validation.pattern()\" ng-required=\"validation.required()\" maxlength=\"{{ validation.maxlength() }}\" autocomplete=\"off\">"
  );


  $templateCache.put('/konga/views/raw-pick_list-input.html',
    "<div class=\"col-md-12 padding-cero\" ng-class=\"inLineClass.col3\">\n" +
    "\t<list-input fields=\"value.fields\" actions=\"property.actions\"\n" +
    "\t\tlist=\"value.entity\" property=\"property\" metadata=\"metadata\"\n" +
    "\t\tdisabled-ids=\"[]\" dispatch-field-action='dispatchFieldAction'></list-input>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "\t<div class=\"col-md-1\" ng-if=\"!readonly\">\n" +
    "\t\t<button class=\"btn btn-default\"\n" +
    "\t\t\tng-click=\"dispatchFieldAction('add')\" id=\"{{ fieldId }}-add\"\n" +
    "\t\t\tng-hide=\"disableField(mode, property)\">\n" +
    "\t\t\t\t<i class=\"glyphicon glyphicon-plus\"></i>\n" +
    "\t\t\t\t{{ 'message.action.add' | translate }}\n" +
    "\t\t\t</button>\n" +
    "\t</div>\n" +
    "\t<div class=\"col-md-11\">\n" +
    "\t\t<div ng-show=\"!validation.valid_minlength()\">\n" +
    "\t\t\t<div class=\"validation-pick-pattern text-danger ng-binding\">\n" +
    "\t\t\t\t<i class=\"glyphicon glyphicon-remove\"></i> {{\n" +
    "\t\t\t\t'message.field-validation.array-min-length' | translate:{ elem: 'situation'} }}\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-plain-input.html',
    "<input name=\"{{ property.name }}\"type=\"text\" class=\"form-control konga-form-search-input\" id=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" ng-pattern=\"validation.pattern()\" ng-required=\"validation.required()\" maxlength=\"{{ validation.maxlength() }}\" tabindex=\"{{ (index + 1) * 12 }}\">"
  );


  $templateCache.put('/konga/views/raw-price-input.html',
    "<price-input></price-input>\n" +
    "<div class=\"validation\">\n" +
    "\t<div class=\"validation-pattern btn-danger\">\n" +
    "\t\t{{ 'message.field-validation.pattern' | translate }}\n" +
    "\t</div>\n" +
    "\t<div class=\"validation-required btn-danger\">\n" +
    "\t\t{{ 'message.field-validation.required' | translate }}\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-select-input.html',
    "<select-input></select-input>\n" +
    "<div class=\"col-md-12\" ng-if=\"mode === 'search'\">\n" +
    "\t<div class=\"row\">\n" +
    "\t\t<button class=\"btn btn-default btn-xs\" ng-repeat=\"item in value.entity\" ng-click=\"removeItem($index)\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{ item | mapEdsField:labelField | shortify:15 }}\n" +
    "\t\t\t{{ (item | mapEdsField:labelField).length > 15 ? '...' : '' }}\n" +
    "\t\t</button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-table-input.html',
    "<div class=\"col-md-12 padding-cero\" ng-class=\"inLineClass.col1\">\n" +
    "\t<label for=\"{{ fieldId }}\">{{property.fieldLabel |\n" +
    "\t\ttranslate:extra }}</label>\n" +
    "</div>\n" +
    "<div class=\"col-md-12 padding-cero\" ng-class=\"inLineClass.col3\">\n" +
    "\t<table-input></table-input>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-textarea-input.html',
    "<textarea \n" +
    "\ttype=\"text\"\n" +
    "\tclass=\"form-control konga-form-search-input konga-form-simple-search-input\"\n" +
    "\tid=\"{{fieldId}}\"\n" +
    "\tplaceholder=\"\"\n" +
    "\tng-model=\"value.text\"\n" +
    "\tng-disabled=\"disableField(mode, property)\"\n" +
    "\tng-pattern=\"validation.pattern()\"\n" +
    "\tng-required=\"validation.required()\"\n" +
    "\trows=\"{{ property.validation.maxLength / 100 }}\">\n" +
    "</textarea>\n" +
    "\t<!-- TODO This is not working (yet) -->\n" +
    "\t<!-- ng-minlength=\"property.minLength\"\n" +
    "\tng-maxlength=\"property.maxLength\" -->\n" +
    "\n" +
    "<div class=\"validation\">\n" +
    "\t<div class=\"validation-pattern btn-danger\">\n" +
    "\t\t{{ 'message.field-validation.pattern' | translate }}\n" +
    "\t</div>\n" +
    "\t<div class=\"validation-required btn-danger\">\n" +
    "\t\t{{ 'message.field-validation.required' | translate }}\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-tics-input.html',
    "<tics field=\"property\" entity=\"entity\" value=\"value\"></tics>"
  );


  $templateCache.put('/konga/views/recursive-list-item.html',
    "<li>\n" +
    "\t<div>\n" +
    "\t\t<a href=\"\" ng-click=\"click(item)\">{{ item.label | translate }}</a>\n" +
    "\t\t<i class=\"text-success\" ng-class=\"{ 'glyphicon glyphicon-ok': item.selected && !item.children.length }\"></i>\n" +
    "\t\t<recursive-list list=\"item.children\" on-click-item=\"click\"></recursive-list>\n" +
    "\t</div>\n" +
    "</li>"
  );


  $templateCache.put('/konga/views/recursive-list.html',
    "<ul>\n" +
    "\t<recursive-list-item ng-repeat=\"item in list\" item=\"item\" on-click=\"clickItem\"></recursive-list-item>\n" +
    "</ul>"
  );


  $templateCache.put('/konga/views/result-table.html',
    "<div ng-include=\"contentUrl\"></div>"
  );


  $templateCache.put('/konga/views/search-pane.html',
    "<div class=\"search-pane\" ng-init=\"init()\">\n" +
    "\t<div class=\"search-form\">\n" +
    "\t\t<h3>{{ 'message.search-filters.title' | translate }}</h3>\n" +
    "\t\t<form role=\"form\">\n" +
    "\t\t\t<div ng-include=\"contentUrl\"></div>\n" +
    "\t\t\t<div class=\"col-md-12 form-group mode-search\">\n" +
    "\t\t\t\t<div class=\"text-right\">\n" +
    "\t\t\t\t\t<button id=\"clear-search-pane.id\" type=\"button\" class=\"btn btn-default\" ng-click=\"operations.clear()\">\n" +
    "\t\t\t\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t\t\t\t{{'message.action.clean' | translate}}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t<button id=\"submit-search-pane.id\" type=\"submit\" class=\"btn btn-success\" ng-click=\"operations.submit()\">\n" +
    "\t\t\t\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t\t\t\t{{'message.action.search' | translate}}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col-md-12 form-group mode-search\" ng-if=\"entityMetadata.favoriteable\">\n" +
    "\t\t\t\t<label class=\"font-bold\">\n" +
    "\t\t\t\t\t<i class=\"glyphicon glyphicon-star\"></i>\n" +
    "\t\t\t\t\t{{ 'message.favorite-filter.title' | translate }}\n" +
    "\t\t\t\t</label>\n" +
    "\t\t\t\t<div class=\"col-md-12 nowrap\">\n" +
    "\t\t\t\t\t<button id=\"openFilterModelPost.id\" class=\"btn btn-link\" ng-click=\"openFilterModel({ dataType: 'filtermgt', operation: 'post'})\">\n" +
    "\t\t\t\t\t\t<i class=\"glyphicon glyphicon-floppy-save\"></i>\n" +
    "\t\t\t\t\t\t{{'message.favorite-filter.save-filter' | translate}}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t<button id=\"openFilterModelGet.id\" class=\"btn btn-link\" ng-click=\"openFilterModel({ dataType: 'filtermgt', operation: 'get'})\">\n" +
    "\t\t\t\t\t\t<i class=\"glyphicon glyphicon-floppy-open\"></i>\n" +
    "\t\t\t\t\t\t{{'message.favorite-filter.load-filter' | translate}}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t</div>\n" +
    "\t\t</form>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/select-input.html',
    "<div class=\"select-input {{(isExtended) ? 'extend' : 'non-extended'}}\" ng-class=\"{ disabled: disableSelect(property) }\" konga-select>\n" +
    "\t<div class=\"input-group {{ validation.required() ? 'required' : 'optional' }} {{ value.text.length ? 'valid' : 'invalid' }}\">\n" +
    "\t\t<input name=\"{{ property.name }}\"type=\"text\" class=\"konga-form-search-input form-control\" id=\"{{ fieldId }}-input\" ng-model=\"textinput\" ng-disabled=\"disableField(mode, property)\" ng-pattern=\"validation.pattern()\" ng-required=\"validation.required()\" ng-change=\"writeValue()\" typeahead=\"item.label for item in getElements($viewValue)\" typeahead-on-select=\"formatInput($item, $model, $label)\" tabindex=\"{{ (index + 1) * 12 }}\">\n" +
    "\t\t<div class=\"input-group-addon\">\n" +
    "\t\t\t<button type=\"button\" class=\"btn btn-link\" ng-disabled=\"disableField(mode, property)\"\n" +
    "\t\t\t\tng-click=\"dispatchFieldAction('open-select')\" id=\"{{ fieldId }}-select\">\n" +
    "\t\t\t\t<i class=\"glyphicon glyphicon-search\"></i>\n" +
    "\t\t\t</button>\n" +
    "\t\t\t<!-- <button type=\"button\" class=\"btn btn-link btn-bordered-left\" ng-show=\"showRemove(property)\" ng-click=\"removeField(property)\" id=\"{{ fieldId }}-remove\">\n" +
    "\t\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t</button> -->\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"col-md-6 complex-label\" ng-show=\"mode === 'update'\">\n" +
    "\t\t<span ng-show=\"label.length\">{{ label }}&nbsp;</span>\n" +
    "\t</div>\n" +
    "\t<div class=\"validation\">\n" +
    "\t\t<div class=\"validation-pattern btn-danger\">{{\n" +
    "\t\t\t'message.field-validation.pattern' | translate }}</div>\n" +
    "\t\t<div class=\"validation-required btn-danger\">{{\n" +
    "\t\t\t'message.field-validation.required' | translate }}</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/single-select-custom.html',
    "<div class=\"single-select\" ng-init=\"operations.init()\">\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t\t<!-- Close button -->\n" +
    "\t\t<button id=\"singleselectModal.cancelX.id\" type=\"button\" class=\"close\" ng-click=\"singleselectModal.cancel()\">&times;</button>\n" +
    "\n" +
    "\t\t<!-- Filter -->\n" +
    "\t\t<!-- TODO Externalize -->\n" +
    "\t\t<div class=\"filter\">\n" +
    "\t\t\t<div class=\"form-inline\" ng-repeat=\"quickSearchItem in quickSearch\">\n" +
    "\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t<!-- <label for=\"filter\" class=\"control-label col-md-4\">5 résultats</label> -->\n" +
    "\t\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t\t<div class=\"input-group\">\n" +
    "\t\t\t\t\t\t  <span class=\"input-group-addon\">\n" +
    "\t\t\t\t\t\t  \t&nbsp;\n" +
    "\t\t\t\t\t\t  \t<i class=\"glyphicon glyphicon-filter\"></i>\n" +
    "\t\t\t\t\t\t  \t&nbsp;\n" +
    "\t\t\t\t\t\t  </span>\n" +
    "\t\t\t\t\t\t  <input  id=\"filter.id\" type=\"text\" class=\"form-control\" name=\"filter\" ng-model=\"quickSearchItem.value\" placeholder=\"{{quickSearchItem.metadata.label | translate:quickSearchItem.extra }}\" ng-change=\"executeQuickSearch()\" />\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\n" +
    "\t\t<!-- Title -->\n" +
    "\t\t<h4 class=\"modal-title\" >{{singleselectModal.title | translate}}</h4>\n" +
    "\t</div>\n" +
    "\t<div class=\"col-md-12 search-table-container\">\n" +
    "\t<div class=\"multiselect-list list-group\" scroll-watcher>\n" +
    "\t\t<table class=\"table table-result\">\n" +
    "\t\t\t<tr class=\"table-header\">\n" +
    "\t\t\t\t<th ng-repeat=\"field in fields\" ng-click=\"sorting(field)\" style=\"cursor: pointer;\">\n" +
    "\t\t\t\t\t<span ng-hide=\"field.complex\">{{ field.label | translate:{label: field.owner} }}</span>\n" +
    "\t\t\t\t</th>\n" +
    "\t\t\t</tr>\n" +
    "\t\t\t<tr\tclass=\"\"\n" +
    "\t\t\t\tng-repeat=\"entity in realList\"\n" +
    "\t\t\t\tng-click=\"operations.toggle(entity)\"\n" +
    "\t\t\t\tng-class=\"{selected: (entity === selected)}\"\n" +
    "\t\t\t\tng-show=\"realList.length > 0\">\n" +
    "\t\t\t\t<td ng-repeat=\"field in fields\">\n" +
    "\t\t\t\t\t<!-- \n" +
    "\t\t\t\t\t<span ng-hide=\"field.complex || field.type.type === 'COMPLEX' || field.type.type === 'DATE' || ((field.type.type === 'BOOLEAN' && (field.name === 'statut' || field.name === 'atMadEr' || field.name === 'indSocGestion')))\">{{ entity | mapEdsField:field }}</span>\n" +
    "\t\t\t\t\t<span ng-show=\"!field.complex && (field.type.type === 'BOOLEAN' && (field.name === 'statut' || field.name === 'atMadEr' || field.name === 'indSocGestion'))\">{{ entity | mapEdsField:field |activeInactive | translate}}</span>\n" +
    "\t\t\t\t\t<span ng-show=\"!field.complex && field.type.type === 'DATE'\">{{ entity | mapEdsField:field | date:'dd/MM/yyyy'}}</span>\n" +
    "\t\t\t\t\t<span ng-show=\"field.type.type === 'COMPLEX'\">{{ (entity | mapEdsField:field) | tableRendererComplex:field }}</span> \n" +
    "\t\t\t\t\t -->\n" +
    "\t\t\t\t\t<span ng-hide=\"field.type === 'DATE' || field.type === 'COMPLEX'\">{{ entity[field.name] | listRenderer:field}}</span>\n" +
    "\t\t\t\t\t<span ng-show=\"field.type === 'DATE'\">{{ entity[field.name] | date:'dd/MM/yyyy' }}</span>\n" +
    "\t\t\t\t\t<span ng-show=\"field.type === 'COMPLEX'\">{{ entity[field.name][field.field] }}</span>\n" +
    "\t\t\t\t</td>\n" +
    "\t\t\t</tr>\n" +
    "\t\t\t<tr ng-hide=\"realList.length > 0\">\n" +
    "\t\t\t\t<td colspan=\"{{ fields.length }}\" class=\"align-center\">{{'field.searchResults.noresults' | translate }}</td>\n" +
    "\t\t\t</tr>\n" +
    "\t\t</table>\n" +
    "\t\t<div class=\"loading-data\" ng-show=\"loading\">&nbsp;</div>\n" +
    "\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"clear\"></div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<!-- Close button -->\n" +
    "\t\t<button  id=\"singleselectModal.save.id\" type=\"button\" class=\"btn btn-default\" ng-click=\"singleselectModal.save()\">{{ 'message.action.validate' | translate }}</button>\n" +
    "\t\t<button id=\"singleselectModal.cancel.id\" type=\"button\" class=\"btn btn-default\" ng-click=\"singleselectModal.cancel()\">{{ 'message.action.cancel' | translate }}</button>\n" +
    "\t\t\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/single-select-modal.html',
    "<single-select source-list=\"sourceList\" model=\"modal.temp\"></single-select>"
  );


  $templateCache.put('/konga/views/single-select.html',
    "<div class=\"single-select\" ng-init=\"operations.init()\">\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t\t<!-- Close button -->\n" +
    "\t\t<button id=\"singleselectModal.cancelX.id\" type=\"button\" class=\"close\" ng-click=\"singleselectModal.cancel()\">&times;</button>\n" +
    "\n" +
    "\t\t<!-- Filter -->\n" +
    "\t\t<!-- TODO Externalize -->\n" +
    "\t<div class=\"filter\">\n" +
    "\t\t\t<div class=\"form-inline\" ng-repeat=\"quickSearchItem in quickSearch\">\n" +
    "\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t<!-- <label for=\"filter\" class=\"control-label col-md-4\">5 r�sultats</label> -->\n" +
    "\t\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t\t<div class=\"input-group\">\n" +
    "\t\t\t\t\t\t  <span class=\"input-group-addon\">\n" +
    "\t\t\t\t\t\t  \t&nbsp;\n" +
    "\t\t\t\t\t\t  \t<i class=\"glyphicon glyphicon-filter\"></i>\n" +
    "\t\t\t\t\t\t  \t&nbsp;\n" +
    "\t\t\t\t\t\t  </span>\n" +
    "\t\t\t\t\t\t  <input  id=\"single-select-filter.id\" type=\"text\" class=\"form-control\" name=\"filter\" ng-model=\"quickSearchItem.value\" placeholder=\"{{quickSearchItem.metadata.label | translate:quickSearchItem.extra }}\" ng-change=\"executeQuickSearch()\" />\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\n" +
    "\t\t<!-- Title -->\n" +
    "\t\t<h4 class=\"modal-title\">{{ 'message.single-select.title' | translate }}</h4>\n" +
    "\t</div>\n" +
    "\t<div class=\"multiselect-list list-group\" scroll-watcher>\n" +
    "\t\t<a class=\"list-group-item\"\n" +
    "\t\t\tng-repeat=\"item in sourceList | filter:filter.value | orderBy: key\"\n" +
    "\t\t\tng-click=\"operations.toggle(item)\"\n" +
    "\t\t\tng-class=\"{selected: (item === selected)}\">\n" +
    "\t\t\t<h5>\n" +
    "\t\t\t\t{{ item.key }} <small>{{ item.value }}</small>\n" +
    "\t\t\t</h5>\n" +
    "\t\t</a>\n" +
    "\t\t<div class=\"loading-data\" ng-if=\"loading\">&nbsp;</div>\n" +
    "\t\t<div class=\"no-results\" ng-show=\"!loading && !sourceList.length\">{{ 'field.searchResults.noresults' | translate }}</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<!-- Close button -->\n" +
    "\t\t<button  type=\"button\" class=\"btn btn-success\" ng-click=\"singleselectModal.save()\" id=\"single-select-save\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t{{ 'message.action.validate' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t<button  type=\"button\" class=\"btn btn-default\" ng-click=\"singleselectModal.cancel()\" id=\"single-select-cancel\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{ 'message.action.cancel' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/tabbed-update-user.html',
    "<vertical-tabs>\n" +
    "\t<tab-content title=\"{{'category.informations.principales'| translate}}\">\n" +
    "\t\t<raw-input \n" +
    "\t\t\tproperty=\"field\"\n" +
    "\t\t\tvertical=\"true\"\n" +
    "\t\t\tsource-list=\"productCodes[field.name]\"\n" +
    "\t\t\tng-repeat=\"field in fields | updateParams:metadata:'category.informations.principales' | orderBy:'+priority.update'\" \n" +
    "\t\t\tentity=\"entity\" \n" +
    "\t\t\ton-update=\"onUpdate\"\n" +
    "\t\t\ton-change=\"onChange\"\n" +
    "\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\tmode=\"update\"\n" +
    "\t\t\tcreating=\"creating\">\n" +
    "\t\t</raw-input>\n" +
    "\t</tab-content>\n" +
    "\t<tab-content title=\"{{'category.habilitations'| translate}}\">\n" +
    "\t\t<div>\n" +
    "\t\t\t<habilitations-user/>\n" +
    "\t\t</div>\n" +
    "\t</tab-content>\n" +
    "</vertical-tabs>"
  );


  $templateCache.put('/konga/views/tabbed-update.html',
    "<vertical-tabs>\n" +
    "\t<tab-content ng-repeat=\"cat in categories\" title=\"{{cat | translate}}\" is-show=\"(fields | updateParams:metadata | filter: {category: cat}).length\">\n" +
    "\t\t<raw-input \n" +
    "\t\t\tproperty=\"field\"\n" +
    "\t\t\tvertical=\"true\"\n" +
    "\t\t\tsource-list=\"productCodes[field.name]\"\n" +
    "\t\t\tng-repeat=\"field in fields | updateParams:metadata:cat | orderBy:'+priority.update' | allowed:'update'\" \n" +
    "\t\t\tentity=\"entity\" \n" +
    "\t\t\ton-update=\"onUpdate\"\n" +
    "\t\t\ton-change=\"onChange\"\n" +
    "\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\tmode=\"update\"\n" +
    "\t\t\tcreating=\"creating\"\n" +
    "\t\t\tindex=\"$index\">\n" +
    "\t\t</raw-input>\n" +
    "\t</tab-content>\n" +
    "</vertical-tabs>"
  );


  $templateCache.put('/konga/views/table-cell.html',
    "<div class=\"table-cell\" ng-class=\"styles\">\n" +
    "\t<span class=\"table-cell-content\" ng-show=\"type === 'text'\"></span>\n" +
    "\t<img ng-src=\"{{ content }}\" ng-if=\"type === 'image'\" width=\"{{ image.width }}\" height=\"{{ image.height }}\">\n" +
    "\t<div class=\"{{ content }}\" ng-if=\"type === 'styling'\"></div>\n" +
    "\t<div class=\"{{}}\" ng-if=\"type === 'plain-filtered'\">\n" +
    "\t\t{{ content | customFilter:filter }}\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/table-header.html',
    "<div class=\"table-header {{ field.sortable ? 'sortable' : '' }}\" ng-class=\"styles\">\n" +
    "\t<span class=\"header-label\">{{ label | translate:{label: owner} }}</span>\n" +
    "\t<!-- <b ng-class=\"showSorting(field.sorting, true)\"><b ng-class=\"showSorting(field.sorting, false)\"></b></b> -->\n" +
    "\t<span class=\"sorting\" ng-if=\"field.sortable\" ng-hide=\"field.derived\">\n" +
    "\t\t<i class=\"select-sorting sorting-asc glyphicon glyphicon-chevron-up\" ng-click=\"sorting('asc')\" ng-class=\"{ active: sort === 'asc' }\"></i>\n" +
    "\t\t<i class=\"select-sorting sorting-desc glyphicon glyphicon-chevron-down\" ng-click=\"sorting('desc')\" ng-class=\"{ active: sort === 'desc' }\"></i>\n" +
    "\t</span>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/table-input.html',
    "<div class=\"table-input col-md-12 padding-cero\">\n" +
    "\t<div ng-if=\"!rows || !columns || rows.length === 0 || columns.length === 0\" class=\"col-md-12 text-center text-danger\">{{ 'message.table-input.not-yet-configured' | translate }}</div>\n" +
    "\t<table ng-if=\"rows.length > 0 && columns.length > 0\">\n" +
    "\t\t<!-- Horizontal category -->\n" +
    "\t\t<tr>\n" +
    "\t\t\t<!-- Separator -->\n" +
    "\t\t\t<th class=\"table-input-category-separator\">&nbsp;</th>\n" +
    "\n" +
    "\t\t\t<!-- Horizontal category -->\n" +
    "\t\t\t<th class=\"table-input-category horizontal\" colspan=\"{{ columns.length }}\">{{ configuration.xAxisProperty.label | translate }}</th>\n" +
    "\t\t</tr>\n" +
    "\n" +
    "\t\t<!-- Horizontal headers -->\n" +
    "\t\t<tr>\n" +
    "\t\t\t<!-- Vertical category -->\n" +
    "\t\t\t<th class=\"table-input-category vertical\">{{ configuration.yAxisProperty.label | translate }}</th>\n" +
    "\n" +
    "\t\t\t<th ng-repeat=\"column in columns\" class=\"table-input-header horizontal\">{{ column.value }}</th>\n" +
    "\t\t</tr>\n" +
    "\n" +
    "\t\t<!-- Data rows -->\n" +
    "\t\t<tr ng-repeat=\"row in rows\">\t\t\t\n" +
    "\t\t\t<!-- Vertical header -->\n" +
    "\t\t\t<th class=\"table-input-header vertical\">{{ row.value }}</th>\n" +
    "\n" +
    "\t\t\t<!-- Data -->\n" +
    "\t\t\t<td class=\"table-input-content\" ng-repeat=\"column in columns\">\n" +
    "\t\t\t\t<input type=\"number\" size=\"2\" step=\"any\" class=\"text-center hideArrows\" ng-repeat=\"step in steps | filter:getQueryObj(row, column):true\" ng-model=\"step[valueField]\" ng-class=\"{ invalid: step.$invalid }\" ng-change=\"updateValue(step)\" />\n" +
    "\t\t\t</td>\n" +
    "\t\t</tr>\n" +
    "\n" +
    "\t</table>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/tics.html',
    "<div class=\"tics\" ng-init=\"init()\">\n" +
    "\t<table width=\"100%\" cellspacing=\"0\" cellpadding=\"1\" border=\"1\">\n" +
    "\t\t<thead>\n" +
    "\t\t\t<tr class=\"categories\">\n" +
    "\t\t\t\t<th rowspan=\"3\" class=\"text-center\">Composants</th>\n" +
    "\t\t\t\t<th rowspan=\"3\"class=\"text-center\">Evenements</th>\n" +
    "\t\t\t\t<th colspan=\"32\"class=\"text-center\">{{ structure.monthName | translate }} {{ structure.yearNo }}</th>\n" +
    "\t\t\t</tr>\n" +
    "\t\t\t<tr>\n" +
    "\t\t\t\t<th class=\"text-center\" ng-repeat=\"day in structure.columns\">{{ day.dayName | translate | shortify:dayLength }}</th> <!-- TODO Set week day -->\n" +
    "\t\t\t\t<th class=\"text-center\" rowspan=\"2\">Total</th>\n" +
    "\t\t\t</tr>\n" +
    "\t\t\t<tr>\n" +
    "\t\t\t\t<th class=\"text-center\" ng-repeat=\"day in structure.columns\">{{ $index + 1 }}</th>\n" +
    "\t\t\t</tr>\n" +
    "\t\t</thead>\n" +
    "\t\t<tbody>\n" +
    "\t\t\t<tr ng-repeat-start=\"cat in structure.categories\">\n" +
    "\t\t\t\t<td class=\"text-center\" rowspan=\"{{ cat.elements.length + 1 }}\">\n" +
    "\t\t\t\t\t{{ cat.name }} <!-- TODO Translate -->\n" +
    "\t\t\t\t</td>\n" +
    "\t\t\t\t<td class=\"text-center\">\n" +
    "\t\t\t\t\t{{ cat.elements[0].name }}<!-- TODO Translate -->\n" +
    "\t\t\t\t</td>\n" +
    "\t\t\t\t<td class=\"text-center\" ng-class=\"{ invalid: !evt.valid, weekend: structure.columns[$index].isFestive, dontbelong: showAll && !evt.$belongs, multi: showAll && evt.multi }\" ng-repeat=\"evt in cat.elements[0].events\">\n" +
    "\t\t\t\t\t<input class=\"hideArrows\" type=\"number\" size=\"2\" ng-model=\"evt.input\" ng-change=\"updateDay(evt, cat.elements[0])\" ng-disabled=\"!inputEnabled\" step=\"any\" ng-hide=\"showAll\" />\n" +
    "\t\t\t\t\t<input type=\"number\" class=\"hideArrows\" ng-show=\"showAll\" size=\"2\" ng-model=\"evt.input\" bs-popover=\"evt.popover\" readonly>\n" +
    "\t\t\t\t</td>\n" +
    "\t\t\t\t<td class=\"text-center total\">\n" +
    "\t\t\t\t\t<input type=\"text\" size=\"4\" ng-model=\"cat.elements[0].total\" readonly />\n" +
    "\t\t\t\t</td>\n" +
    "\t\t\t</tr>\n" +
    "\t\t\t<tr ng-repeat=\"elt in cat.elements\" ng-if=\"$index > 0\">\n" +
    "\t\t\t\t<td class=\"text-center\">\n" +
    "\t\t\t\t\t{{ elt.name }}<!-- TODO Translate -->\n" +
    "\t\t\t\t</td>\n" +
    "\t\t\t\t<td class=\"text-center\" ng-class=\"{ invalid: !evt.valid, weekend: structure.columns[$index].isFestive, dontbelong: showAll && !evt.$belongs, multi: showAll && evt.multi }\" ng-repeat=\"evt in elt.events\">\n" +
    "\t\t\t\t\t<input class=\"hideArrows\" type=\"number\" size=\"2\" ng-model=\"evt.input\" ng-change=\"updateDay(evt, elt)\" ng-disabled=\"!inputEnabled\" step=\"any\" ng-hide=\"showAll\" />\n" +
    "\t\t\t\t\t<input type=\"number\" class=\"hideArrows\" ng-show=\"showAll\" size=\"2\" ng-model=\"evt.input\" bs-popover=\"evt.popover\" readonly>\n" +
    "\t\t\t\t</td>\n" +
    "\t\t\t\t<td class=\"text-center total\">\n" +
    "\t\t\t\t\t<input type=\"text\" size=\"4\" ng-model=\"elt.total\" readonly />\n" +
    "\t\t\t\t</td>\n" +
    "\t\t\t</tr>\n" +
    "\t\t\t<tr ng-repeat-end>\n" +
    "\t\t\t\t<td class=\"text-right summary title\" colspan=\"{{ eventSize + 1 }}\">Total {{ cat.name }}</td>\n" +
    "\t\t\t\t<td class=\"text-center summary\" style=\"background: black\">\n" +
    "\t\t\t\t\t<input type=\"text\" size=\"4\" ng-model=\"cat.total\" readonly />\n" +
    "\t\t\t\t</td>\n" +
    "\t\t\t</tr>\n" +
    "\t\t</tbody>\n" +
    "\n" +
    "\t</table>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/vertical-tabs-element.tp.html',
    "<div class=\"tab-pane\" ng-show=\"selected\" ng-class=\"active\" ng-transclude></div>"
  );


  $templateCache.put('/konga/views/verticaltab.tp.html',
    "<div class=\"row tabbable\">\n" +
    "\t<ul class=\"nav nav-pills nav-stacked konga-nav-vertical col-xs-12 col-sm-12 col-md-4 col-lg-3\">\n" +
    "\t\t<li ng-repeat=\"tabContent in tabContentList\" ng-class=\"{active:tabContent.selected}\">\n" +
    "\t\t\t<a href=\"\" ng-click=\"select(tabContent)\">{{tabContent.title}}</a>\n" +
    "\t\t</li>\n" +
    "\t</ul>\n" +
    "\t<div class=\"tab-content col-xs-12 col-sm-12 col-md-8 col-lg-9\" ng-transclude></div>\n" +
    "</div>\n"
  );

}]);
