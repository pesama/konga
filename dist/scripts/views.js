angular.module('ui.konga').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/views/about.html',
    "<p>This is the about view.</p>\n"
  );


  $templateCache.put('/views/admin.html',
    "<div class=\"wall transparent\">\n" +
    "\t<div class=\"panel-body sogma-panel-body\">\n" +
    "\t\t<div class=\"col-md-3 padding-cero\">\n" +
    "\t\t\t<div class=\"panel panel-default panel-favoris\">\n" +
    "\t\t\t\t<div class=\"panel-heading\">\n" +
    "\t\t\t\t\t<h3 class=\"panel-title\">\n" +
    "\t\t\t\t\t\t<i class=\"glyphicon glyphicon-star\"></i>\n" +
    "\t\t\t\t\t\t<span>{{'message.menu.entity-management' | translate}}</span>\n" +
    "\t\t\t\t\t</h3>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"panel-body\">\n" +
    "\t\t\t\t\t<div class=\"menu-favorite\" ng-repeat=\"entity in metadata.entities | filter:{ access: 'PUBLIC' } | orderBy:'label'\" ng-click=\"operations.openEntitySearch(entity)\">\n" +
    "\t\t\t\t\t\t{{ entity.label | translate }}\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"col-md-8 col-md-offset-1 padding-cero\">\n" +
    "\t\t\t<div class=\"col-md-12 padding-cero\">\n" +
    "\t\t\t\t<div class=\"panel panel-default panel-rss\">\n" +
    "\t\t\t\t\t<div class=\"panel-heading\">\n" +
    "\t\t\t\t\t\t<h3 class=\"panel-title\">\n" +
    "\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-envelope\"></i>\n" +
    "\t\t\t\t\t\t\t{{'message.menu-internal-news' | translate}}\n" +
    "\t\t\t\t\t\t</h3>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"panel-body\">\n" +
    "\n" +
    "\t\t\t\t\t\tEn construcción\n" +
    "\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/cascade-result-table.html',
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


  $templateCache.put('/views/cascade-search-pane.html',
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


  $templateCache.put('/views/cascade-update.html',
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


  $templateCache.put('/views/categorized_cascade-result-table.html',
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


  $templateCache.put('/views/categorized_cascade-search-pane.html',
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


  $templateCache.put('/views/custom/add-order-product.html',
    "<div class=\"panel-body\">\n" +
    "\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t\t<button type=\"button\" id=\"cancelRejectVentilerX\" class=\"close\" ng-click=\"cancel()\">&times;</button>\n" +
    "\t\t<h4 class=\"modal-title\">Añadir acceso de usuario a tienda</h4> \n" +
    "\t</div>  \n" +
    "\t<div class=\"modal-body\">\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"form-cascade\">\n" +
    "\t\t\t\t<raw-input \n" +
    "\t\t\t\t\tproperty=\"field\"\n" +
    "\t\t\t\t\tvertical=\"true\"\n" +
    "\t\t\t\t\tng-repeat=\"field in fields | orderBy:'+priority.update'\" \n" +
    "\t\t\t\t\tentity=\"entity\" \n" +
    "\t\t\t\t\ton-update=\"operations.updateEntityField\"\n" +
    "\t\t\t\t\ton-change=\"operations.changeEntityField\"\n" +
    "\t\t\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\t\t\tmode=\"update\"\n" +
    "\t\t\t\t\tcreating=\"creating\">\n" +
    "\t\t\t\t</raw-input>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"clear\">&nbsp;</div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<button type=\"submit\" id=\"saveRejectVentiler\" class=\"btn btn-success\" ng-click=\"save()\" ng-disabled=\"!entity.product || !entity.quantity\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t{{'message.action.validate' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t<button type=\"button\" id=\"cancelRejetVentiler\" class=\"btn btn-default\" ng-click=\"cancel()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{'message.action.cancel' | translate }}\n" +
    "\t\t</button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/add-product-characteristic.html',
    "<div class=\"panel-body\">\n" +
    "\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t\t<button type=\"button\" id=\"cancelX\" class=\"close\" ng-click=\"cancel()\">&times;</button>\n" +
    "\t\t<h4 class=\"modal-title\">Añadir acceso de usuario a tienda</h4> \n" +
    "\t</div>  \n" +
    "\t<div class=\"modal-body\">\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"form-cascade\">\n" +
    "\t\t\t\t<raw-input \n" +
    "\t\t\t\t\tproperty=\"field\"\n" +
    "\t\t\t\t\tvertical=\"true\"\n" +
    "\t\t\t\t\tng-repeat=\"field in fields | orderBy:'+priority.update'\" \n" +
    "\t\t\t\t\tentity=\"entity\" \n" +
    "\t\t\t\t\ton-update=\"operations.updateEntityField\"\n" +
    "\t\t\t\t\ton-change=\"operations.changeEntityField\"\n" +
    "\t\t\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\t\t\tmode=\"update\"\n" +
    "\t\t\t\t\tcreating=\"creating\">\n" +
    "\t\t\t\t</raw-input>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"clear\">&nbsp;</div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<button type=\"submit\" id=\"save\" class=\"btn btn-success\" ng-click=\"save()\" ng-disabled=\"!entity.characteristic || !entity.value\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t{{'message.action.validate' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t<button type=\"button\" id=\"cancel\" class=\"btn btn-default\" ng-click=\"cancel()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{'message.action.cancel' | translate }}\n" +
    "\t\t</button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/add-product-storetype.html',
    "<div class=\"panel-body\">\n" +
    "\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t\t<button type=\"button\" id=\"cancelX\" class=\"close\" ng-click=\"cancel()\">&times;</button>\n" +
    "\t\t<h4 class=\"modal-title\">Añadir acceso de usuario a tienda</h4> \n" +
    "\t</div>  \n" +
    "\t<div class=\"modal-body\">\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"form-cascade\">\n" +
    "\t\t\t\t<raw-input \n" +
    "\t\t\t\t\tproperty=\"field\"\n" +
    "\t\t\t\t\tvertical=\"true\"\n" +
    "\t\t\t\t\tng-repeat=\"field in fields | updateParams:metadata |  orderBy:'+priority.update'\" \n" +
    "\t\t\t\t\tentity=\"entity\" \n" +
    "\t\t\t\t\ton-update=\"operations.updateEntityField\"\n" +
    "\t\t\t\t\ton-change=\"operations.changeEntityField\"\n" +
    "\t\t\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\t\t\tmode=\"update\"\n" +
    "\t\t\t\t\tcreating=\"creating\">\n" +
    "\t\t\t\t</raw-input>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"clear\">&nbsp;</div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<button type=\"submit\" id=\"save\" class=\"btn btn-success\" ng-click=\"save()\" ng-disabled=\"!entity.storeType || !entity.buyPrice || !entity.sellPrice\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t{{'message.action.validate' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t<button type=\"button\" id=\"cancel\" class=\"btn btn-default\" ng-click=\"cancel()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{'message.action.cancel' | translate }}\n" +
    "\t\t</button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/add-role-store-user.html',
    "<div class=\"panel-body\">\n" +
    "\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t\t<button type=\"button\" id=\"cancelRejectVentilerX\" class=\"close\" ng-click=\"cancel()\">&times;</button>\n" +
    "\t\t<h4 class=\"modal-title\">Añadir acceso de usuario a tienda</h4> \n" +
    "\t</div>  \n" +
    "\t<div class=\"modal-body\">\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"form-cascade\">\n" +
    "\t\t\t\t<raw-input \n" +
    "\t\t\t\t\tproperty=\"field\"\n" +
    "\t\t\t\t\tvertical=\"true\"\n" +
    "\t\t\t\t\tng-repeat=\"field in fields | orderBy:'+priority.update'\" \n" +
    "\t\t\t\t\tentity=\"entity\" \n" +
    "\t\t\t\t\ton-update=\"operations.updateEntityField\"\n" +
    "\t\t\t\t\ton-change=\"operations.changeEntityField\"\n" +
    "\t\t\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\t\t\tmode=\"update\"\n" +
    "\t\t\t\t\tcreating=\"creating\">\n" +
    "\t\t\t\t</raw-input>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"clear\">&nbsp;</div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<button type=\"submit\" id=\"saveRejectVentiler\" class=\"btn btn-success\" ng-click=\"save()\" ng-disabled=\"!entity.store || !entity.role || !entity.user\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t{{'message.action.validate' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t<button type=\"button\" id=\"cancelRejetVentiler\" class=\"btn btn-default\" ng-click=\"cancel()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{'message.action.cancel' | translate }}\n" +
    "\t\t</button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/catalog-cart-edit-item.html',
    "<div class=\"panel-body\">\n" +
    "\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t\t<button type=\"button\" id=\"cancelRejectVentilerX\" class=\"close\" ng-click=\"close()\">&times;</button>\n" +
    "\t\t<h4 class=\"modal-title\">Editar carrito - {{ entity.description }}</h4> \n" +
    "\t</div>  \n" +
    "\t<div class=\"modal-body\">\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"col-md-4\">\n" +
    "\n" +
    "\t\t\t\t<!-- Image -->\n" +
    "\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t<raw-input \n" +
    "\t\t\t\t\t\tproperty=\"field\"\n" +
    "\t\t\t\t\t\tvertical=\"true\"\n" +
    "\t\t\t\t\t\tng-repeat=\"field in productFields | filter:{ name: 'imageUrl' }\" \n" +
    "\t\t\t\t\t\tentity=\"productEntity\" \n" +
    "\t\t\t\t\t\ton-update=\"operations.updateEntityField\"\n" +
    "\t\t\t\t\t\ton-change=\"operations.changeEntityField\"\n" +
    "\t\t\t\t\t\tmetadata=\"productMetadata\"\n" +
    "\t\t\t\t\t\tmode=\"update\"\n" +
    "\t\t\t\t\t\tcreating=\"creating\">\n" +
    "\t\t\t\t\t</raw-input>\n" +
    "\t\t\t\t</div>\n" +
    "\n" +
    "\t\t\t\t<!-- Prices -->\n" +
    "\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t<div class=\"col-md-6 text-warning\">\n" +
    "\t\t\t\t\t\t<span class=\"buy_price\" ng-repeat=\"field in fields | filter:{ name: 'buy_price' }\">\n" +
    "\t\t\t\t\t\t\t9{{ entity | mapEdsField:field }}\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"col-md-6 text-success text-right\">\n" +
    "\t\t\t\t\t\t<span class=\"sell_price\" ng-repeat=\"field in fields | filter:{ name: 'sell_price' }\">\n" +
    "\t\t\t\t\t\t\t{{ entity | mapEdsField:field }}&euro;\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col-md-8\">\n" +
    "\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t\t<div class=\"well\">\n" +
    "\t\t\t\t\t\t\t<h3>Editar datos</h3>\n" +
    "\t\t\t\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t\t\t\t\t<raw-input \n" +
    "\t\t\t\t\t\t\t\t\t\tproperty=\"field\"\n" +
    "\t\t\t\t\t\t\t\t\t\tvertical=\"true\"\n" +
    "\t\t\t\t\t\t\t\t\t\tng-repeat=\"field in fields | updateParams:metadata | filter:{ name: '!product'} | orderBy:'+priority.update'\" \n" +
    "\t\t\t\t\t\t\t\t\t\tentity=\"entity\" \n" +
    "\t\t\t\t\t\t\t\t\t\ton-update=\"operations.updateEntityField\"\n" +
    "\t\t\t\t\t\t\t\t\t\ton-change=\"operations.changeEntityField\"\n" +
    "\t\t\t\t\t\t\t\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\t\t\t\t\t\t\t\tmode=\"update\"\n" +
    "\t\t\t\t\t\t\t\t\t\tcreating=\"creating\">\n" +
    "\t\t\t\t\t\t\t\t\t</raw-input>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"clear\">&nbsp;</div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<button type=\"button\" id=\"save\" class=\"btn btn-success\" ng-click=\"save()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t{{'message.action.validate' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t<button type=\"button\" id=\"close-modal\" class=\"btn btn-default\" ng-click=\"close()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{'message.action.close' | translate }}\n" +
    "\t\t</button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/catalog-cart.html',
    "<div class=\"panel-body\">\n" +
    "\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t\t<button type=\"button\" id=\"cancelRejectVentilerX\" class=\"close\" ng-click=\"close()\">&times;</button>\n" +
    "\t\t<h4 class=\"modal-title\">Carrito de la compra</h4> \n" +
    "\t</div>  \n" +
    "\t<div class=\"modal-body\">\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"form-cascade\">\n" +
    "\t\t\t\t<raw-input \n" +
    "\t\t\t\t\tproperty=\"field\"\n" +
    "\t\t\t\t\tvertical=\"true\"\n" +
    "\t\t\t\t\tng-repeat=\"field in fields | orderBy:'+priority.update'\" \n" +
    "\t\t\t\t\tentity=\"entity\" \n" +
    "\t\t\t\t\ton-update=\"operations.updateEntityField\"\n" +
    "\t\t\t\t\ton-change=\"operations.changeEntityField\"\n" +
    "\t\t\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\t\t\tmode=\"update\"\n" +
    "\t\t\t\t\tcreating=\"creating\">\n" +
    "\t\t\t\t</raw-input>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t<div class=\"well\">\n" +
    "\t\t\t\t\t<h3>Datos:</h3>\n" +
    "\t\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t\t<div class=\"col-md-4\"><b>Total referencias</b></div>\n" +
    "\t\t\t\t\t\t<div class=\"col-md-8\">{{ details.references }}</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t\t<div class=\"col-md-4\"><b>Total elementos</b></div>\n" +
    "\t\t\t\t\t\t<div class=\"col-md-8\">{{ details.count }}</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t\t<div class=\"col-md-4\"><b>Ref2</b></div>\n" +
    "\t\t\t\t\t\t<div class=\"col-md-8\">9{{ details.buyPrice | number:2 }}</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t\t<div class=\"col-md-4\"><b>Precio</b></div>\n" +
    "\t\t\t\t\t\t<div class=\"col-md-8\">{{ details.sellPrice | number:2 }}&euro;</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"clear\">&nbsp;</div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<button type=\"button\" id=\"cancel\" class=\"btn btn-default\" ng-click=\"close()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{'message.action.close' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t<button type=\"submit\" id=\"order\" class=\"btn btn-success\" ng-click=\"order()\" ng-disabled=\"!entity.items.length\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t{{'message.action.proceed-order' | translate }}\n" +
    "\t\t</button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/catalog-order.html',
    "<div class=\"wall\">\n" +
    "\t<div class=\"panel-body sogma-panel-body\">\n" +
    "\t\t<div class=\"search-form col-md-12\">\n" +
    "\t\t\t<form ng-class=\"formStyle\" role=\"form\" name=\"entityUpdate\" novalidate>\n" +
    "\t\t\t\t<update-form entity=\"entity\" changes=\"changes\" metadata=\"metadata\" fields=\"fields\" params=\"params\" on-change=\"operations.changeEntityField\" on-update=\"operations.updateEntityField\" creating=\"creating\"></update-form>\n" +
    "\t\t\t\t<div class=\"pull-right update-btn-group\">\n" +
    "\t\t\t\t\t<button class=\"btn btn-default\" ng-repeat=\"action in metadata.actions\" ng-model=\"action\" ng-click=\"operations.dispatchAction(action)\" ng-show=\"action.scope==='UPDATE'\" ng-disabled=\"action.scope!=='UPDATE'\" id=\"update-action-dispatcher-{{ action.name }}\">\n" +
    "\t\t\t\t\t\t\t\t{{ action.label | translate }}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t<button type=\"submit\" class=\"btn btn-success\" ng-click=\"proceed()\" ng-disabled=\"entityUpdate.$invalid\" id=\"proceed-order\">\t\n" +
    "\t\t\t\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t\t\t\t{{ 'message.action.validate' | translate }}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t<button class=\"btn btn-default\" ng-click=\"cancel()\" id=\"cancel-update\">\n" +
    "\t\t\t\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t\t\t\t{{ 'message.action.cancel' | translate }}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</form>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/catalog-product-details.html',
    "<div class=\"panel-body\">\n" +
    "\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t\t<button type=\"button\" id=\"cancelRejectVentilerX\" class=\"close\" ng-click=\"close()\">&times;</button>\n" +
    "\t\t<h4 class=\"modal-title\">Detalle del producto {{ entity.description }}</h4> \n" +
    "\t</div>  \n" +
    "\t<div class=\"modal-body\">\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"col-md-4\">\n" +
    "\n" +
    "\t\t\t\t<!-- Image -->\n" +
    "\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t<raw-input \n" +
    "\t\t\t\t\t\tproperty=\"field\"\n" +
    "\t\t\t\t\t\tvertical=\"true\"\n" +
    "\t\t\t\t\t\tng-repeat=\"field in fields | filter:{ name: 'imageUrl' } | allowed:'update'\" \n" +
    "\t\t\t\t\t\tentity=\"entity\" \n" +
    "\t\t\t\t\t\ton-update=\"operations.updateEntityField\"\n" +
    "\t\t\t\t\t\ton-change=\"operations.changeEntityField\"\n" +
    "\t\t\t\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\t\t\t\tmode=\"update\"\n" +
    "\t\t\t\t\t\tcreating=\"creating\">\n" +
    "\t\t\t\t\t</raw-input>\n" +
    "\t\t\t\t</div>\n" +
    "\n" +
    "\t\t\t\t<!-- Prices -->\n" +
    "\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t<div class=\"col-md-6 text-warning\">\n" +
    "\t\t\t\t\t\t<span style=\"font-size:1.2em\" class=\"buy_price\" ng-repeat=\"field in fields | filter:{ name: 'buy_price' }\">\n" +
    "\t\t\t\t\t\t\t9{{ entity | mapEdsField:field }}\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"col-md-6 text-success text-right\">\n" +
    "\t\t\t\t\t\t<span style=\"font-size:1.5em\" class=\"sell_price\" ng-repeat=\"field in fields | filter:{ name: 'sell_price' }\">\n" +
    "\t\t\t\t\t\t\t{{ (entity | mapEdsField:field) | number:2 }}&euro;\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"row\" ng-if=\"entity.discount > 0\">\n" +
    "\t\t\t\t\t<div class=\"col-md-6 text-warning\">\n" +
    "\t\t\t\t\t\t<span style=\"font-size:1.2em\" ng-repeat=\"field in fields | filter:{ name: 'buy_price' }\">\n" +
    "\t\t\t\t\t\t\t<b>Descuento:</b>&nbsp;{{ entity.discount }}%\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"col-md-6 text-success text-right\">\n" +
    "\t\t\t\t\t\t<span style=\"font-size:1.5em\" class=\"text-right\" ng-repeat=\"field in fields | filter:{ name: 'sell_price' }\">\n" +
    "\t\t\t\t\t\t\t{{ ((entity | mapEdsField:field) * (1 - (entity.discount / 100))) | number:2 }}&euro;\n" +
    "\t\t\t\t\t\t</span>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col-md-8\">\n" +
    "\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t\t<raw-input \n" +
    "\t\t\t\t\t\t\tproperty=\"field\"\n" +
    "\t\t\t\t\t\t\tvertical=\"true\"\n" +
    "\t\t\t\t\t\t\tng-repeat=\"field in fields | updateParams:metadata | filter:{ name: '!imageUrl', categories: 'General' } | orderBy:'+priority.update' | allowed:'update'\" \n" +
    "\t\t\t\t\t\t\tentity=\"entity\" \n" +
    "\t\t\t\t\t\t\ton-update=\"operations.updateEntityField\"\n" +
    "\t\t\t\t\t\t\ton-change=\"operations.changeEntityField\"\n" +
    "\t\t\t\t\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\t\t\t\t\tmode=\"update\"\n" +
    "\t\t\t\t\t\t\tcreating=\"creating\">\n" +
    "\t\t\t\t\t\t</raw-input>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"row\" ng-if=\"entity.stock > 0 || entity.totalStock > 0\">\n" +
    "\t\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t\t<div class=\"well\">\n" +
    "\t\t\t\t\t\t\t<h3>Añadir al carrito</h3>\n" +
    "\t\t\t\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t\t\t\t\t<raw-input \n" +
    "\t\t\t\t\t\t\t\t\t\tproperty=\"field\"\n" +
    "\t\t\t\t\t\t\t\t\t\tvertical=\"true\"\n" +
    "\t\t\t\t\t\t\t\t\t\tng-repeat=\"field in cartFields | updateParams:metadata | filter:{ name: '!product'} | orderBy:'+priority.update' | allowed:'update'\" \n" +
    "\t\t\t\t\t\t\t\t\t\tentity=\"cartEntity\" \n" +
    "\t\t\t\t\t\t\t\t\t\ton-update=\"operations.updateEntityField\"\n" +
    "\t\t\t\t\t\t\t\t\t\ton-change=\"operations.changeEntityField\"\n" +
    "\t\t\t\t\t\t\t\t\t\tmetadata=\"cartMetadata\"\n" +
    "\t\t\t\t\t\t\t\t\t\tmode=\"update\"\n" +
    "\t\t\t\t\t\t\t\t\t\tcreating=\"creating\">\n" +
    "\t\t\t\t\t\t\t\t\t</raw-input>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"col-md-12 text-right\">\n" +
    "\t\t\t\t\t\t\t\t\t<button type=\"submit\" id=\"add-to-cart\" class=\"btn btn-primary\" ng-click=\"addToCart()\" ng-disabled=\"!cartEntity.product || !cartEntity.quantity\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-plus\"></i>\n" +
    "\t\t\t\t\t\t\t\t\t\t{{'message.action.add' | translate }}\n" +
    "\t\t\t\t\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"clear\">&nbsp;</div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<button type=\"button\" id=\"previous\" class=\"btn btn-default\" ng-click=\"previous()\" ng-disabled=\"index <= 0\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-chevron-left\"></i>\n" +
    "\t\t\tAnterior\n" +
    "\t\t</button>\n" +
    "\t\t<button type=\"button\" id=\"next\" class=\"btn btn-default\" ng-click=\"next()\" ng-disabled=\"(index+1) >= count\">\n" +
    "\t\t\tSiguiente\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-chevron-right\"></i>\n" +
    "\t\t</button>\n" +
    "\t\t<button type=\"button\" id=\"close-modal\" class=\"btn btn-default\" ng-click=\"close()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{'message.action.close' | translate }}\n" +
    "\t\t</button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/catalog-search.html',
    "<raw-input \n" +
    "\tproperty=\"field\"\n" +
    "\tvertical=\"true\" \n" +
    "\tsource-list=\"productCodes[field.name]\"\n" +
    "\tng-repeat=\"field in fields | searchParams | orderBy:'priority.search' | allowed:'search' | filter: {categories: 'search_first'}\"\n" +
    "\tentity=\"query\" \n" +
    "\tmetadata=\"entityMetadata\" \n" +
    "\ton-update=\"operations.updateField\"\n" +
    "\tmode=\"search\"\n" +
    "\tindex=\"$index\">\n" +
    "</raw-input>\n" +
    "\n" +
    "<div class=\"col-md-12 form-group mode-search\">\n" +
    "\t<div class=\"col-md-12 text-right\">\n" +
    "\t\t<button id=\"clear-search-pane.id\" type=\"button\" class=\"btn btn-default\" ng-click=\"operations.clear()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{'message.action.clean' | translate}}\n" +
    "\t\t</button>\n" +
    "\t\t<button id=\"submit-search-pane.id\" type=\"submit\" class=\"btn btn-success\" ng-click=\"operations.submit()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t{{'message.action.search' | translate}}\n" +
    "\t\t</button>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "<raw-input \n" +
    "\tproperty=\"field\"\n" +
    "\tvertical=\"true\" \n" +
    "\tsource-list=\"productCodes[field.name]\"\n" +
    "\tng-repeat=\"field in fields | searchParams | orderBy:'priority.search' | allowed:'search' | filter: {categories: '!search_first'}\"\n" +
    "\tentity=\"query\" \n" +
    "\tmetadata=\"entityMetadata\" \n" +
    "\ton-update=\"operations.updateField\"\n" +
    "\tmode=\"search\"\n" +
    "\tindex=\"$index\">\n" +
    "</raw-input>"
  );


  $templateCache.put('/views/custom/catalog-settings.html',
    "<div class=\"panel-body\">\n" +
    "\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t\t<button type=\"button\" id=\"cancelX\" class=\"close\" ng-click=\"close()\">&times;</button>\n" +
    "\t\t<h4 class=\"modal-title\">Ajustes del catálogo</h4> \n" +
    "\t</div>  \n" +
    "\t<div class=\"modal-body\">\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"form-cascade\">\n" +
    "\t\t\t\t<raw-input \n" +
    "\t\t\t\t\tproperty=\"field\"\n" +
    "\t\t\t\t\tvertical=\"true\"\n" +
    "\t\t\t\t\tng-repeat=\"field in fields | orderBy:'+priority.update' | allowed:'update'\" \n" +
    "\t\t\t\t\tentity=\"entity\" \n" +
    "\t\t\t\t\ton-update=\"operations.updateEntityField\"\n" +
    "\t\t\t\t\ton-change=\"operations.changeEntityField\"\n" +
    "\t\t\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\t\t\tmode=\"update\"\n" +
    "\t\t\t\t\tcreating=\"creating\">\n" +
    "\t\t\t\t</raw-input>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"well bg-warning\">\n" +
    "\t\t\t\tEl modo compra rápida te permite añadir productos al carrito con un solo click. Simplemente pulsa sobre el resultado, y el producto se añadirá al carrito de forma automática. Para añadir más unidades, haz click más veces.\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"clear\">&nbsp;</div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<!-- <button type=\"submit\" id=\"save\" class=\"btn btn-success\" ng-click=\"save()\" ng-disabled=\"!entity.characteristic || !entity.value\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t{{'message.action.validate' | translate }}\n" +
    "\t\t</button> -->\n" +
    "\t\t<button type=\"button\" id=\"cancel\" class=\"btn btn-default\" ng-click=\"close()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{'message.action.close' | translate }}\n" +
    "\t\t</button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/category-selector.html',
    "<div class=\"category-selector col-md-8\">\n" +
    "    <div class=\"step\" ng-repeat=\"level in levels\" ng-class=\"operations.when(level)\">\n" +
    "        <button class=\"action back\" ng-click=\"operations.back(1)\">&nbsp;</button>\n" +
    "        <h1 ng-click=\"back(1)\">\n" +
    "            {{ metadata.levels[current].title }}\n" +
    "            <!-- <span class=\"info\">\n" +
    "                <span ng-repeat=\"family in families | filter:{selected:true}\">\n" +
    "                    {{ family | onlyName }}\n" +
    "                </span>\n" +
    "            </span> -->\n" +
    "        </h1>\n" +
    "\n" +
    "        <button class=\"action forward\" ng-click=\"operations.forward()\">&nbsp;</button>\n" +
    "\n" +
    "        <div class=\"families\">\n" +
    "            <div class=\"family {{ family.selected ? 'selected' : '' }}\" ng-repeat=\"family in level.families\" ng-click=\"operations.toggleFamily(family)\">\n" +
    "                <img ng-src=\"{{ family.imageUrl }}\" alt=\"{{ family.name }}\" />\n" +
    "                <span>{{family.name | shortify:10 }}</span>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/customizer-home.html',
    "<div class=\"wall\">\n" +
    "\t<div class=\"panel-body sogma-panel-body\">\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"col-md-6\">\n" +
    "\t\t\t\t\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col-md-6\">\n" +
    "\t\t\t\t\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/customizer-new-tailoring.html',
    "<div class=\"panel-body\">\n" +
    "\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t\t<button type=\"button\" id=\"cancelX\" class=\"close\" ng-click=\"cancel()\">&times;</button>\n" +
    "\t\t<h4 class=\"modal-title\">Nueva confección</h4> \n" +
    "\t</div>  \n" +
    "\t<div class=\"modal-body\">\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"form-cascade\">\n" +
    "\t\t\t\t<raw-input \n" +
    "\t\t\t\t\tproperty=\"field\"\n" +
    "\t\t\t\t\tvertical=\"true\"\n" +
    "\t\t\t\t\tng-repeat=\"field in fields | updateParams:metadata |  orderBy:'+priority.update'\" \n" +
    "\t\t\t\t\tentity=\"entity\" \n" +
    "\t\t\t\t\ton-update=\"operations.updateEntityField\"\n" +
    "\t\t\t\t\ton-change=\"operations.changeEntityField\"\n" +
    "\t\t\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\t\t\tmode=\"update\"\n" +
    "\t\t\t\t\tcreating=\"creating\">\n" +
    "\t\t\t\t</raw-input>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"clear\">&nbsp;</div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<button type=\"submit\" id=\"save\" class=\"btn btn-success\" ng-click=\"save()\" ng-disabled=\"!entity.storeType || !entity.buyPrice || !entity.sellPrice\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t{{'message.action.validate' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t<button type=\"button\" id=\"cancel\" class=\"btn btn-default\" ng-click=\"cancel()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{'message.action.cancel' | translate }}\n" +
    "\t\t</button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/image-option-template.html',
    "<div class=\"image-option\">\n" +
    "\t<div class=\"option-image\" ng-class=\"options.style\"></div>\n" +
    "\t<span class=\"option-text\">{{ options.text }}</span>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/presupuestor-tailoring-boolean-static.html',
    "<div class=\"row\" ng-init=\"entity[field] = null\">\n" +
    "\t<div class=\"col-md-12\">\n" +
    "\t\t<select ng-model=\"entity[field]\" class=\"form-control\">\n" +
    "\t\t\t<option ng-value=\"null\" selected>Selecciona opción</option>\n" +
    "\t\t\t<option value=\"S\">Sí</option>\n" +
    "\t\t\t<option value=\"N\">No</option>\n" +
    "\t\t</select>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/presupuestor-tailoring-field.html',
    "<div class=\"presupuestor-tailoring-field\">\n" +
    "\t<div class=\"row\" ng-include=\"contentUrl\"></div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/presupuestor-tailoring-info-static.html',
    "<p>This is the custom/presupuestor-tailoring-info-static view.</p>\n"
  );


  $templateCache.put('/views/custom/presupuestor-tailoring-measurements-field.html',
    "<div class=\"col-md-12 tailoring-input\">\n" +
    "\t<div class=\"row\">\n" +
    "\t\t<div class=\"col-md-5 col-md-offset-1\">\n" +
    "\t\t\t<div class=\"input-group\">\n" +
    "\t\t\t\t<input class=\"form-control input-lg\" type=\"text\" ng-model=\"model.measurements.width\" placeholder=\"Ancho\" ng-required=\"step.field.required\" />\n" +
    "\t\t\t\t<span class=\"input-group-addon\">&nbsp;cm.&nbsp;</span>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"col-md-1 text-center\"><strong>x</strong></div>\n" +
    "\t\t<div class=\"col-md-5\">\n" +
    "\t\t\t<div class=\"input-group\">\n" +
    "\t\t\t\t<input class=\"form-control input-lg\" type=\"text\" ng-model=\"model.measurements.height\" placeholder=\"Alto\" ng-required=\"step.field.required\" />\n" +
    "\t\t\t\t<span class=\"input-group-addon\">&nbsp;cm.&nbsp;</span>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/presupuestor-tailoring-measurements-static.html',
    "<div class=\"row\" ng-init=\"entity[field] = { width: null, height: null }\">\n" +
    "\t<div class=\"col-md-6\">\n" +
    "\t\t<input type=\"number\" class=\"form-control\" ng-model=\"entity[field].width\" placeholder=\"Ancho\" />\n" +
    "\t</div>\n" +
    "\t<div class=\"col-md-6\">\n" +
    "\t\t<input type=\"number\" class=\"form-control\" ng-model=\"entity[field].height\" placeholder=\"Alto\" />\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/presupuestor-tailoring-null-static.html',
    "<b>Selecciona primero un tipo de campo</b>"
  );


  $templateCache.put('/views/custom/presupuestor-tailoring-number-static.html',
    "<div class=\"row\" ng-init=\"entity[field] = null\">\n" +
    "\t<div class=\"col-md-12\">\n" +
    "\t\t<input type=\"number\" class=\"form-control\" ng-model=\"entity[field]\" />\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/presupuestor-tailoring-option-info-field.html',
    "<div class=\"tailoring-input option-info-field row\">\n" +
    "\t<div class=\"col-md-6 text-center\" ng-repeat=\"option in step.options\">\n" +
    "\t\t<div class=\"tailoring-input-option\" id=\"{{ option.name }}\" ng-click=\"model.option = option\" ng-class=\"{ checked: model.option === option }\">\n" +
    "\t\t\t<div class=\"image\">\n" +
    "\t\t\t\t&nbsp;\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"name\">\n" +
    "\t\t\t\t{{ option.name }}\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/presupuestor-tailoring-option-price-field.html',
    "<div class=\"tailoring-input option-price-field row\">\n" +
    "\t<div class=\"col-md-6 text-center\" ng-repeat=\"option in step.options\">\n" +
    "\t\t<div class=\"tailoring-input-option\" id=\"{{ option.name }}\" ng-click=\"model.option = option\" ng-class=\"{ checked: model.option === option }\">\n" +
    "\t\t\t<div class=\"image\">\n" +
    "\t\t\t\t&nbsp;\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"name\">\n" +
    "\t\t\t\t{{ option.name }}\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/presupuestor-tailoring-option-static.html',
    "<div class=\"row\">\n" +
    "\t<div class=\"col-md-12\">\n" +
    "\t\tNo se puede asignar un valor por defecto a una opción\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/presupuestor-tailoring-price-static.html',
    "<div class=\"row\">\n" +
    "\t<div class=\"col-md-12\">\n" +
    "\t\tEl precio no se puede predefinir, y va calculándose a medida que se configura la confección.\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/presupuestor-tailoring-price-table-field.html',
    "<div class=\"tailoring-input table-selector-field row\">\n" +
    "\t<div class=\"col-md-4 text-center\" ng-repeat=\"option in step.options\">\n" +
    "\t\t<div class=\"tailoring-input-option\" id=\"{{ option.name }}\" ng-click=\"model.table = option\" ng-class=\"{ checked: model.table === option }\">\n" +
    "\t\t\t<div class=\"image\">\n" +
    "\t\t\t\t&nbsp;\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"name\">\n" +
    "\t\t\t\t{{ option.name }}\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/presupuestor-tailoring-price-table-static.html',
    "<div class=\"row\" ng-controller=\"PresupuestorTailoringPriceTableSelectorCtrl\">\n" +
    "\t<div class=\"col-md-12\">\n" +
    "\t\t<raw-input \n" +
    "\t\t\tproperty=\"field\"\n" +
    "\t\t\tvertical=\"true\"\n" +
    "\t\t\tng-repeat=\"field in fields | updateParams:metadata | orderBy:'+priority.update' | allowed:'update'\" \n" +
    "\t\t\tentity=\"entity\" \n" +
    "\t\t\ton-update=\"onUpdate\"\n" +
    "\t\t\ton-change=\"onChange\"\n" +
    "\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\tmode=\"update\"\n" +
    "\t\t\tcreating=\"creating\"\n" +
    "\t\t\tindex=\"$index\">\n" +
    "\t\t</raw-input>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/presupuestor-tailoring-quantity-field.html',
    "<div class=\"presupuestor-quantity-field\">\n" +
    "\t<br />\n" +
    "\t<br />\n" +
    "\t<div class=\"row\">\n" +
    "\t\t<div class=\"col-md-6 col-md-offset-1\">\n" +
    "\t\t\t<slider ng-model=\"model.quantity\" min=\"1\" step=\"1\" max=\"20\" value=\"1\" tooltip=\"always\" tooltip-position=\"bottom\"></slider>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"col-md-5\" ng-if=\"model.quantity\">\n" +
    "\t\t\t{{ model.quantity }} unidades\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/presupuestor-tailoring-string-field.html',
    "<div class=\"col-md-12 tailoring-input\">\n" +
    "\t<textarea class=\"form-control input-lg\" type=\"text\" ng-model=\"model.text\" placeholder=\"Introduzca el texto aquí\"></textarea>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/presupuestor-tailoring-string-static.html',
    "<div class=\"row\" ng-init=\"entity[field] = null\">\n" +
    "\t<div class=\"col-md-12\">\n" +
    "\t\t<input type=\"text\" class=\"form-control\" ng-model=\"entity[field]\" />\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/price-table-update.html',
    "<div class=\"form-cascade price-table-update\">\n" +
    "\n" +
    "\t<!-- Ident fields -->\n" +
    "\t<h2>Identificación de la tabla</h2>\n" +
    "\t<raw-input \n" +
    "\t\tproperty=\"field\"\n" +
    "\t\tvertical=\"true\"\n" +
    "\t\tng-repeat=\"field in fields | updateParams:metadata | orderBy:'+priority.update' | allowed:'update' | filter:{ categories: 'ident' }:true\" \n" +
    "\t\tentity=\"entity\" \n" +
    "\t\ton-update=\"onUpdate\"\n" +
    "\t\ton-change=\"onChange\"\n" +
    "\t\tmetadata=\"metadata\"\n" +
    "\t\tmode=\"update\"\n" +
    "\t\tcreating=\"creating\"\n" +
    "\t\tindex=\"1\">\n" +
    "\t</raw-input>\n" +
    "\n" +
    "\t<h2>Configuración de la tabla</h2>\n" +
    "\t<div class=\"col-md-12\">\n" +
    "\t\t<h3>Límites</h3>\n" +
    "\t</div>\n" +
    "\t<div class=\"col-md-6\" ng-repeat=\"field in fields | updateParams:metadata | orderBy:'+priority.update' | allowed:'update' | filter:{ categories: 'limits' }:true\">\n" +
    "\t\t<raw-input \n" +
    "\t\t\tproperty=\"field\"\n" +
    "\t\t\tvertical=\"true\"\n" +
    "\t\t\tentity=\"entity\" \n" +
    "\t\t\ton-update=\"onUpdate\"\n" +
    "\t\t\ton-change=\"onChange\"\n" +
    "\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\tmode=\"update\"\n" +
    "\t\t\tcreating=\"creating\"\n" +
    "\t\t\tindex=\"2\">\n" +
    "\t\t</raw-input>\n" +
    "\t</div>\n" +
    "\n" +
    "\t<div class=\"col-md-12\">\n" +
    "\t\t<h3>Paso</h3>\n" +
    "\t</div>\n" +
    "\t<div class=\"col-md-6\" ng-repeat=\"field in fields | updateParams:metadata | orderBy:'+priority.update' | allowed:'update' | filter:{ categories: 'stepping' }:true\">\n" +
    "\t\t<raw-input \n" +
    "\t\t\tproperty=\"field\"\n" +
    "\t\t\tvertical=\"true\"\n" +
    "\t\t\tentity=\"entity\" \n" +
    "\t\t\ton-update=\"onUpdate\"\n" +
    "\t\t\ton-change=\"onChange\"\n" +
    "\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\tmode=\"update\"\n" +
    "\t\t\tcreating=\"creating\"\n" +
    "\t\t\tindex=\"3\">\n" +
    "\t\t</raw-input>\n" +
    "\t</div>\n" +
    "\n" +
    "\t<raw-input \n" +
    "\t\tproperty=\"field\"\n" +
    "\t\tvertical=\"true\"\n" +
    "\t\tng-repeat=\"field in fields | updateParams:metadata | orderBy:'+priority.update' | allowed:'update' | filter:{ categories: 'table' }:true\" \n" +
    "\t\tentity=\"entity\" \n" +
    "\t\ton-update=\"onUpdate\"\n" +
    "\t\ton-change=\"onChange\"\n" +
    "\t\tmetadata=\"metadata\"\n" +
    "\t\tmode=\"update\"\n" +
    "\t\tcreating=\"creating\"\n" +
    "\t\tindex=\"4\">\n" +
    "\t</raw-input>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/product-batch-upload.html',
    "<div class=\"panel-body\">\n" +
    "\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t\t<button type=\"button\" id=\"cancelRejectVentilerX\" class=\"close\" ng-click=\"cancel()\">&times;</button>\n" +
    "\t\t<h4 class=\"modal-title\">Carga masiva de productos</h4> \n" +
    "\t</div>  \n" +
    "\t<div class=\"modal-body\">\n" +
    "\t\t<div class=\"well\">\n" +
    "\t\t\t<h3 class=\"text-warning\">Atención!</h3>\n" +
    "\t\t\t<p>\n" +
    "\t\t\t\tEste procedimiento <b>elimina los productos existentes</b>, así como sus relaciones. Esto afecta a <b>toda</b> la aplicación. Use esta herramienta con cuidado.\n" +
    "\t\t\t</p>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"form-cascade\">\n" +
    "\t\t\t\t<form name=\"info\">\n" +
    "\t\t\t\t\t<raw-input \n" +
    "\t\t\t\t\t\tproperty=\"field\"\n" +
    "\t\t\t\t\t\tvertical=\"true\"\n" +
    "\t\t\t\t\t\tng-repeat=\"field in fields | orderBy:'+priority.update'\" \n" +
    "\t\t\t\t\t\tentity=\"entity\" \n" +
    "\t\t\t\t\t\ton-update=\"operations.updateEntityField\"\n" +
    "\t\t\t\t\t\ton-change=\"operations.changeEntityField\"\n" +
    "\t\t\t\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\t\t\t\tmode=\"update\"\n" +
    "\t\t\t\t\t\tcreating=\"creating\">\n" +
    "\t\t\t\t\t</raw-input>\n" +
    "\t\t\t\t</form>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"clear\" ng-init=\"form = info\">&nbsp;</div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<button type=\"submit\" id=\"saveRejectVentiler\" class=\"btn btn-success\" ng-click=\"save()\" ng-disabled=\"form.$invalid\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t{{'message.action.validate' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t<button type=\"button\" id=\"cancelRejetVentiler\" class=\"btn btn-default\" ng-click=\"cancel()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{'message.action.cancel' | translate }}\n" +
    "\t\t</button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/select-store.html',
    "<div class=\"panel-body\">\n" +
    "\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t\t<button type=\"button\" id=\"cancelRejectVentilerX\" class=\"close\" ng-click=\"cancel()\">&times;</button>\n" +
    "\t\t<h4 class=\"modal-title\">Bienvenido a Presupuestor</h4> \n" +
    "\t</div>  \n" +
    "\t<div class=\"modal-body\">\n" +
    "\t\t<div class=\"panel-body\">\n" +
    "\t\t\t<div class=\"col-md-12 padding-cero headContent\">\n" +
    "\t\t\t\t<div class=\"well\">\n" +
    "\t\t\t\t\tBienvenido al sistema <b>Presupuestor</b>. Como sabes, el acceso a esta herramienta está limitado a las tiendas. Por ello, necesitas seleccionar una tienda para tu conexión. Una vez la hayas seleccionado, podrás usar todo el potencial de <b>Presupuestor</b>.\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"panel panel-default col-md-12 padding-cero\">\n" +
    "\t\t\t\t\t<div class=\"panel-heading \">\n" +
    "\t\t\t\t\t\t<h3 class=\"panel-title\">\n" +
    "\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-th-list\"></i>\n" +
    "\t\t\t\t\t\t\t{{'panel.select-store.title' | translate}}:\n" +
    "\t\t\t\t\t\t</h3>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"panel-body panel-body-custom-border\">\n" +
    "\t\t\t\t\t\t<!-- Stores -->\n" +
    "\t\t\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t\t\t<table class=\"table table-striped\">\n" +
    "\t\t\t\t\t\t\t\t<thead>\n" +
    "\t\t\t\t\t\t\t\t\t<tr>\n" +
    "\t\t\t\t\t\t\t\t\t\t<th>&nbsp;</th>\n" +
    "\t\t\t\t\t\t\t\t\t\t<th>Nombre de la tienda</th>\n" +
    "\t\t\t\t\t\t\t\t\t\t<th>Tipo de tienda</th>\n" +
    "\t\t\t\t\t\t\t\t\t\t<th>Tipo de acceso</th>\n" +
    "\t\t\t\t\t\t\t\t\t</tr>\n" +
    "\t\t\t\t\t\t\t\t</thead>\n" +
    "\t\t\t\t\t\t\t\t<tbody>\n" +
    "\t\t\t\t\t\t\t\t\t<tr ng-class=\"{ selected: roleStoreUser === selectedStore }\" ng-repeat=\"roleStoreUser in user.rolesAndStores | orderBy:'store'\" ng-click=\"selectStore(roleStoreUser)\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<td>\n" +
    "\t\t\t\t\t\t\t\t\t\t\tLogo\n" +
    "\t\t\t\t\t\t\t\t\t\t</td>\n" +
    "\t\t\t\t\t\t\t\t\t\t<td>\n" +
    "\t\t\t\t\t\t\t\t\t\t\t{{ roleStoreUser.store.name }}\n" +
    "\t\t\t\t\t\t\t\t\t\t</td>\n" +
    "\t\t\t\t\t\t\t\t\t\t<td>\n" +
    "\t\t\t\t\t\t\t\t\t\t\t{{ roleStoreUser.store.type.name }}\n" +
    "\t\t\t\t\t\t\t\t\t\t</td>\n" +
    "\t\t\t\t\t\t\t\t\t\t<td>\n" +
    "\t\t\t\t\t\t\t\t\t\t\t{{ roleStoreUser.role.name }}\n" +
    "\t\t\t\t\t\t\t\t\t\t</td>\n" +
    "\t\t\t\t\t\t\t\t\t</tr>\n" +
    "\t\t\t\t\t\t\t\t</tbody>\n" +
    "\t\t\t\t\t\t\t</table>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\n" +
    "\t\t\t\t\t\t<div class=\"pull-right margined-buttons-right margined-buttons-bottom\">\n" +
    "\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-success\" ng-click=\"validate()\" id=\"storeselector-validate\" ng-disabled=\"!selectedStore\">\n" +
    "\t\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t\t\t\t\t \t{{'message.action.validate' | translate}}\n" +
    "\t\t\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t\t\t<!-- <button ng-if=\"user.admin || user.superadmin\" type=\"button\" class=\"btn btn-warning\" ng-click=\"admin()\" id=\"storeselector-admin\">\n" +
    "\t\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-user\"></i>\n" +
    "\t\t\t\t\t\t\t \tAdministrar sitio\n" +
    "\t\t\t\t\t\t\t</button> -->\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\t\t"
  );


  $templateCache.put('/views/custom/tailoring-add-tailoring-type-tailoring-type-field.html',
    "<div class=\"panel-body\">\n" +
    "\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t\t<button type=\"button\" id=\"cancelX\" class=\"close\" ng-click=\"cancel()\">&times;</button>\n" +
    "\t\t<h4 class=\"modal-title\">Añadir campo</h4> \n" +
    "\t</div>  \n" +
    "\t<form name=\"addTailoringTypeTailoringTypeField\">\n" +
    "\t\t<div class=\"modal-body\">\n" +
    "\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t<div class=\"form-cascade\">\n" +
    "\t\t\t\t\t<raw-input \n" +
    "\t\t\t\t\t\tproperty=\"field\"\n" +
    "\t\t\t\t\t\tvertical=\"true\"\n" +
    "\t\t\t\t\t\tng-repeat=\"field in fields | updateParams:metadata\" \n" +
    "\t\t\t\t\t\tentity=\"entity\" \n" +
    "\t\t\t\t\t\ton-update=\"updateEntity\"\n" +
    "\t\t\t\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\t\t\t\tmode=\"update\"\n" +
    "\t\t\t\t\t\tcreating=\"creating\">\n" +
    "\t\t\t\t\t</raw-input>\n" +
    "\n" +
    "\t\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t\t<div class=\"well\">\n" +
    "\t\t\t\t\t\t\tSelecciona un valor estático solo si el campo no va a ser parte de las preguntas que se le hagan al usuario, y su valor va a ser el mismo independientemente de cada confección de este tipo.\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\n" +
    "\t\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t\t<div class=\"col-md-4\">\n" +
    "\t\t\t\t\t\t\tValor estático:\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<div class=\"col-md-8\">\n" +
    "\t\t\t\t\t\t\t<presupuestor-tailoring-static entity=\"entity\" field=\"'defaults'\" type=\"entity.type\"\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</form>\n" +
    "\t<div class=\"clear\">&nbsp;</div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<button type=\"submit\" id=\"save\" class=\"btn btn-success\" ng-click=\"save()\" ng-disabled=\"addTailoringTypeTailoringTypeField.$invalid\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t{{'message.action.validate' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t<button type=\"button\" id=\"cancel\" class=\"btn btn-default\" ng-click=\"cancel()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{'message.action.cancel' | translate }}\n" +
    "\t\t</button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/tailoring-add-tailoring-type-tailoring-type-step.html',
    "<div class=\"panel-body\">\n" +
    "\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t\t<button type=\"button\" id=\"cancelX\" class=\"close\" ng-click=\"cancel()\">&times;</button>\n" +
    "\t\t<h4 class=\"modal-title\">Añadir campo</h4> \n" +
    "\t</div>  \n" +
    "\t<form name=\"tailoringAddTailoringTypeTailoringTypeStep\">\n" +
    "\t\t<div class=\"modal-body\">\n" +
    "\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t<div class=\"form-cascade\">\n" +
    "\t\t\t\t\t<raw-input \n" +
    "\t\t\t\t\t\tproperty=\"field\"\n" +
    "\t\t\t\t\t\tvertical=\"true\"\n" +
    "\t\t\t\t\t\tng-repeat=\"field in fields | updateParams:metadata\" \n" +
    "\t\t\t\t\t\tentity=\"entity\" \n" +
    "\t\t\t\t\t\ton-update=\"updateEntity\"\n" +
    "\t\t\t\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\t\t\t\tmode=\"update\"\n" +
    "\t\t\t\t\t\tcreating=\"creating\">\n" +
    "\t\t\t\t\t</raw-input>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</form>\n" +
    "\t<div class=\"clear\">&nbsp;</div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<button type=\"submit\" id=\"save\" class=\"btn btn-success\" ng-click=\"save()\" ng-disabled=\"tailoringAddTailoringTypeTailoringTypeStep.$invalid\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t{{'message.action.validate' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t<button type=\"button\" id=\"cancel\" class=\"btn btn-default\" ng-click=\"cancel()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{'message.action.cancel' | translate }}\n" +
    "\t\t</button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/tailoring-type-tailoring-type-step-manage-options.html',
    "<div class=\"panel-body\">\n" +
    "\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t\t<button type=\"button\" id=\"cancelX\" class=\"close\" ng-click=\"cancel()\">&times;</button>\n" +
    "\t\t<h4 class=\"modal-title\">Gestión de opciones</h4> \n" +
    "\t</div>  \n" +
    "\t<div class=\"modal-body\" ng-if=\"!optionable\">\n" +
    "\t\t<div class=\"well bg-warning\">\n" +
    "\t\t\tEste tipo de campo no permite la asignación de opciones.\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"modal-body\" ng-if=\"optionable\">\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"col-md-6\">\n" +
    "\t\t\t\t<div class=\"form-cascade\">\n" +
    "\t\t\t\t\t<raw-input \n" +
    "\t\t\t\t\t\tproperty=\"field\"\n" +
    "\t\t\t\t\t\tvertical=\"true\"\n" +
    "\t\t\t\t\t\tng-repeat=\"field in stepFields | updateParams:metadata | filter:{ name: 'options' }\" \n" +
    "\t\t\t\t\t\tentity=\"step\" \n" +
    "\t\t\t\t\t\ton-update=\"updateEntity\"\n" +
    "\t\t\t\t\t\tmetadata=\"stepMetadata\"\n" +
    "\t\t\t\t\t\tmode=\"update\"\n" +
    "\t\t\t\t\t\tcreating=\"creating\">\n" +
    "\t\t\t\t\t</raw-input>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col-md-5 col-md-offset-1\">\n" +
    "\t\t\t\t<form name=\"addTailoringTypeStepTailoringTypeStepOption\">\n" +
    "\t\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t\t<h4>Añadir nuevo campo</h4>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t\t<div class=\"col-md-4\">\n" +
    "\t\t\t\t\t\t\tNombre:\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<div class=\"col-md-8\">\n" +
    "\t\t\t\t\t\t\t<presupuestor-tailoring-static entity=\"entity\" field=\"'name'\" type=\"'string'\"></presupuestor-tailoring-static>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"row separated\">\n" +
    "\t\t\t\t\t\t<div class=\"col-md-4\">\n" +
    "\t\t\t\t\t\t\tValor:\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<div class=\"col-md-8\">\n" +
    "\t\t\t\t\t\t\t<presupuestor-tailoring-static entity=\"entity\" field=\"'value'\" type=\"step.field.type\"></presupuestor-tailoring-static>\n" +
    "\t\t\t\t\t\t</div>\t\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"row separated\">\n" +
    "\t\t\t\t\t\t<div class=\"col-md-4\">\n" +
    "\t\t\t\t\t\t\tImagen:\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<div class=\"col-md-8\">\n" +
    "\t\t\t\t\t\t\t<input type=\"file\" ng-model=\"entity.imageUrl\" />\n" +
    "\t\t\t\t\t\t</div>\t\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"row separated\">\n" +
    "\t\t\t\t\t\t<div class=\"col-md-12 text-right\">\n" +
    "\t\t\t\t\t\t\t<button type=\"submit\" id=\"save\" class=\"btn btn-success\" ng-click=\"save()\" ng-disabled=\"addTailoringTypeStepTailoringTypeStepOption.$invalid\">\n" +
    "\t\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-floppy-disk\"></i>\n" +
    "\t\t\t\t\t\t\t\t\t{{'message.action.save' | translate }}\n" +
    "\t\t\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t\t\t<button type=\"button\" id=\"cancel\" class=\"btn btn-default\" ng-click=\"clear()\">\n" +
    "\t\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t\t\t\t\t\t\t{{'message.action.clean' | translate }}\n" +
    "\t\t\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</form>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"clear\">&nbsp;</div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<button type=\"button\" id=\"cancel\" class=\"btn btn-default\" ng-click=\"close()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{'message.action.close' | translate }}\n" +
    "\t\t</button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/tailoring-type-update.html',
    "<div class=\"tailoring-type-update wall-transparent\" ng-controller=\"TailoringTypeUpdateCtrl\">\n" +
    "\t<div class=\"form-cascade\">\n" +
    "\t\t<raw-input \n" +
    "\t\t\tproperty=\"field\"\n" +
    "\t\t\tvertical=\"true\"\n" +
    "\t\t\tng-repeat=\"field in fields | updateParams:metadata | filter:{ categories: 'General' } | orderBy:'+priority.update' | allowed:'update'\" \n" +
    "\t\t\tentity=\"entity\" \n" +
    "\t\t\ton-update=\"onUpdate\"\n" +
    "\t\t\ton-change=\"onChange\"\n" +
    "\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\tmode=\"update\"\n" +
    "\t\t\tcreating=\"creating\"\n" +
    "\t\t\tindex=\"$index\">\n" +
    "\t\t</raw-input>\n" +
    "\n" +
    "\t\t<!-- Only if not creating -->\n" +
    "\t\t<div class=\"col-md-12\" ng-if=\"!creating\">\n" +
    "\t\t\t<div class=\"well\">\n" +
    "\t\t\t\t<p>\n" +
    "\t\t\t\t\tLos campos definen la confección, y son la fuente con la que se configura cada albarán.\n" +
    "\t\t\t\t</p>\n" +
    "\t\t\t\t<p>\n" +
    "\t\t\t\t\tSi un campo define una opción configurable por el usuario, debe añadirse una <i>pregunta</i> en el panel de abajo. En caso contrario los campos deben definir también su valor. (e.g. si se quiere dar al usuario a elegir las medidas, se creará una pregunta 'Selecciona tus medidas' asociada al campo de tipo medidas; sin embargo el precio solo será un campo - no tendrá pregunta asociada, ya que el usuario no debería poder modificarlo directamente).\n" +
    "\t\t\t\t</p>\n" +
    "\t\t\t\t<p>\n" +
    "\t\t\t\t\t<b>Todos los tipos de confección deben tener</b>, al menos:\n" +
    "\t\t\t\t\t<ul>\n" +
    "\t\t\t\t\t\t<li>Un campo de tipo <b>medidas</b></li>\n" +
    "\t\t\t\t\t\t<li>Un campo de tipo <b>tabla de precios</b></li>\n" +
    "\t\t\t\t\t\t<li>Un campo de tipo <b>precio</b></li>\n" +
    "\t\t\t\t\t</ul>\n" +
    "\t\t\t\t</p>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\n" +
    "\t\t<raw-input \tng-if=\"!creating\"\t\t\t\n" +
    "\t\t\tproperty=\"field\"\n" +
    "\t\t\tvertical=\"true\"\n" +
    "\t\t\tng-repeat=\"field in fields | updateParams:metadata | filter:{ categories: '!General', name: 'fields' }:true | orderBy:'+priority.update' | allowed:'update'\" \n" +
    "\t\t\tentity=\"entity\" \n" +
    "\t\t\ton-update=\"onUpdate\"\n" +
    "\t\t\ton-change=\"onChange\"\n" +
    "\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\tmode=\"update\"\n" +
    "\t\t\tcreating=\"creating\"\n" +
    "\t\t\tindex=\"$index\">\n" +
    "\t\t</raw-input>\n" +
    "\n" +
    "\t\t<div class=\"col-md-12\" ng-if=\"!creating\">\n" +
    "\t\t\t<div class=\"well\">\n" +
    "\t\t\t\t<p>\n" +
    "\t\t\t\t\tLas preguntas son la manera en la que el usuario puede configurar la confección. Cada campo configurable debe tener asociada al menos una pregunta.\n" +
    "\t\t\t\t</p>\n" +
    "\t\t\t\t<p>\n" +
    "\t\t\t\t\tSegún el tipo de dato, podrás elegir cómo se mostrarán las respuestas al usuario (e.g. opciones, <i>slider</i>, campo de texto, selección de elementos del catálogo...).\n" +
    "\t\t\t\t</p>\n" +
    "\t\t\t\t<p>\n" +
    "\t\t\t\t\tEn cada pregunta encontrarás un campo 'Número de paso' y otro 'Orden'. El primero se usa para decidir en qué paso (pantalla) va a ir la pregunta, y el orden se utiliza para ordenar los campos dentro del mismo paso (si hay más de un campo en la misma pantalla).\n" +
    "\t\t\t\t</p>\n" +
    "\t\t\t\t<p>\n" +
    "\t\t\t\t\tEl campo 'Dependencias' sirve para realizar pasos condicionales. (e.g. si hacemos un enrollable y damos a elegir el accionamiento, querremos condicionar la selección del tipo de mando a distancia a aquellas confecciones accionadas a motor. Para ello, pondremos en las dependencias 'Accionamiento=Motor').\n" +
    "\t\t\t\t</p>\n" +
    "\t\t\t\t<p>\n" +
    "\t\t\t\t\tUna vez creada la pregunta, se pueden asignar las posibles resupuestas, utilizando el botón 'Respuestas' disponible a la derecha de cada pregunta.\n" +
    "\t\t\t\t</p>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\n" +
    "\t\t<raw-input \tng-if=\"!creating\"\t\t\t\n" +
    "\t\t\tproperty=\"field\"\n" +
    "\t\t\tvertical=\"true\"\n" +
    "\t\t\tng-repeat=\"field in fields | updateParams:metadata | filter:{ categories: '!General', name: 'steps' }:true | orderBy:'+priority.update' | allowed:'update'\" \n" +
    "\t\t\tentity=\"entity\" \n" +
    "\t\t\ton-update=\"onUpdate\"\n" +
    "\t\t\ton-change=\"onChange\"\n" +
    "\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\tmode=\"update\"\n" +
    "\t\t\tcreating=\"creating\"\n" +
    "\t\t\tindex=\"$index\">\n" +
    "\t\t</raw-input>\n" +
    "\n" +
    "\t\t<!-- Otherwise show a message -->\n" +
    "\t\t<div ng-if=\"creating\" class=\"col-md-6 col-md-offset-3\">\n" +
    "\t\t\t<div class=\"well text-center\">\n" +
    "\t\t\t\tPara configurar un tipo de paso, introduce primero su nombre y una descripción corta (opcional)\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom/tailoring-update.html',
    "<div class=\"tailoring-update\" ng-controller=\"TailoringUpdateCtrl\">\n" +
    "\n" +
    "\t<!-- Pre data -->\n" +
    "\t<div class=\"row pre-data\" ng-if=\"!steps.length\">\n" +
    "\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t<div class=\"question\">Lo primero...</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t<raw-input \n" +
    "\t\t\t\tproperty=\"field\"\n" +
    "\t\t\t\tvertical=\"true\"\n" +
    "\t\t\t\tng-repeat=\"field in fields | filter:{ name: 'tailoringType' }:true\" \n" +
    "\t\t\t\tentity=\"entity\" \n" +
    "\t\t\t\ton-update=\"updateEntity\"\n" +
    "\t\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\t\tmode=\"update\"\n" +
    "\t\t\t\tcreating=\"creating\">\n" +
    "\t\t\t</raw-input>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\n" +
    "\t<div class=\"row\" ng-if=\"steps.length\">\n" +
    "\t\t<div class=\"col-md-9\">\n" +
    "\t\t\t<div class=\"step-info\">\n" +
    "\t\t\t\t<div class=\"stepper-background\">\n" +
    "\t\t\t\t\t<div class=\"stepper-backgrund-active\" ng-style=\"styles.stepperActive()\"></div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"step text-center\" ng-style=\"styles.step(_step.index)\" ng-repeat=\"_step in steps | orderBy:'+index'\">\n" +
    "\t\t\t\t\t<span class=\"step-number\" ng-class=\"{ active: _step.index === index, past: _step.index < index || index === 0 }\">\n" +
    "\t\t\t\t\t\t{{ _step.index }}\n" +
    "\t\t\t\t\t</span>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"separator\"></div>\n" +
    "\n" +
    "\t\t\t<!-- Stepper -->\n" +
    "\t\t\t<div class=\"row tailoring-stepper\" ng-if=\"steps.length\">\n" +
    "\t\t\t\t<div class=\"col-md-12 step\" ng-repeat=\"_step in steps | orderBy:'+index'\" ng-class=\"{ 'past': step.index > _step.index || index === 0, 'future': step.index < _step.index, 'current': step.index === _step.index }\" ng-if=\"!data.done\">\n" +
    "\t\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t\t<div class=\"col-md-12\" ng-repeat=\"item in _step.items | stepDependencies:data.tailoring:entity.tailoringType.fields | orderBy:'+order'\">\n" +
    "\t\t\t\t\t\t\t<div class=\"question\">{{ item.question }}</div>\n" +
    "\t\t\t\t\t\t\t<div class=\"helpText\" ng-if=\"item.helpText\">{{ item.helpText }}</div>\n" +
    "\n" +
    "\t\t\t\t\t\t\t<presupuestor-tailoring-field entity=\"data.tailoring\" step=\"item\" on-update=\"map\"></presupuestor-tailoring-field>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\n" +
    "\t\t\t\t<!-- Done -->\n" +
    "\t\t\t\t<div class=\"col-md-12 step\" ng-if=\"data.done\">\n" +
    "\t\t\t\t\t<div class=\"question\">Hemos terminado</div>\n" +
    "\t\t\t\t\t<div class=\"helpText\">Aquí tienes los datos de tu confección</div>\n" +
    "\t\t\t\t\t<hr />\n" +
    "\t\t\t\t\t<div class=\"row\" ng-repeat=\"field in entity.tailoringType.fields\" ng-if=\"!!data.tailoring[field.name]\">\n" +
    "\t\t\t\t\t\t<div class=\"col-md-6\">\n" +
    "\t\t\t\t\t\t\t{{ field.name }}\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<div class=\"col-md-6\" ng-if=\"!!data.tailoring[field.name]\">\n" +
    "\t\t\t\t\t\t\t<strong>{{ data.tailoring[field.name] | presupuestorFieldMapper:field.type }}</strong>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<div class=\"col-md-6\" ng-if=\"!data.tailoring[field.name]\">\n" +
    "\t\t\t\t\t\t\t<span>Sin determinar</span>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t\t<div class=\"col-md-6\">\n" +
    "\t\t\t\t\t\t\tPrecio/unidad\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<div class=\"col-md-6\">\n" +
    "\t\t\t\t\t\t\t<strong>{{ data.price | number:2 }}€</strong>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t\t<div class=\"col-md-6\">\n" +
    "\t\t\t\t\t\t\tTOTAL:\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<div class=\"col-md-6\">\n" +
    "\t\t\t\t\t\t\t<strong>{{ data.price * data.tailoring.Cantidad | number:2 }}€</strong>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\n" +
    "\t<div class=\"col-md-3 tailoring-summary\" ng-if=\"steps.length\" ng-class=\"{ finished: data.done }\">\n" +
    "\t\t<div class=\"summary-stepper-background\"></div>\n" +
    "\t\t<div class=\"col-md-12 text-left\">\n" +
    "\t\t\t<span class=\"step-number\">\n" +
    "\t\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t</span>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t<div class=\"tailoring-summary-title\">Aquí tienes tu confección de {{ entity.tailoringType.name }}</div>\n" +
    "\t\t\t\t<div class=\"row\" ng-repeat=\"field in entity.tailoringType.fields\" ng-if=\"!!data.tailoring[field.name]\">\n" +
    "\t\t\t\t\t<div class=\"col-md-6\">\n" +
    "\t\t\t\t\t\t{{ field.name }}\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"col-md-6\" ng-if=\"!!data.tailoring[field.name]\">\n" +
    "\t\t\t\t\t\t<strong>{{ data.tailoring[field.name] | presupuestorFieldMapper:field.type }}</strong>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"col-md-6\" ng-if=\"!data.tailoring[field.name]\">\n" +
    "\t\t\t\t\t\t<span>Sin determinar</span>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"actions\">\n" +
    "\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t<div class=\"col-md-3\">\n" +
    "\t\t\t\t\t<div class=\"price-label\">\n" +
    "\t\t\t\t\t\t{{ data.price | number:2 }}€/u\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"col-md-9 text-right\">\n" +
    "\n" +
    "\t\t\t\t\t<!-- Configuration of current step -->\n" +
    "\t\t\t\t\t<ng-form name=\"tailoringUpdateStep\" role=\"form\">\n" +
    "\t\t\t\t\t\t<input type=\"hidden\" ng-repeat=\"item in step.items | stepDependencies:data.tailoring:entity.tailoringType.fields | orderBy:'+order'\" name=\"item.field.name\" ng-model=\"data.tailoring[item.field.name]\" ng-required=\"item.field.required\" />\n" +
    "\t\t\t\t\t</ng-form>\n" +
    "\n" +
    "\t\t\t\t\t<button ng-disabled=\"step.index === 1\" class=\"btn btn-default\" ng-click=\"back()\">Anterior</button>\n" +
    "\t\t\t\t\t<button ng-if=\"step.index < steps.length\" class=\"btn btn-primary\" ng-disabled=\"tailoringUpdateStep.$invalid\" ng-click=\"forward()\">Siguiente</button>\n" +
    "\t\t\t\t\t<button ng-if=\"step.index >= steps.length\" class=\"btn btn-success\" ng-disabled=\"tailoringUpdateStep.$invalid\" ng-click=\"submit()\">Validar</button>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/custom_tabbed-update.html',
    "<vertical-tabs>\n" +
    "\t<tab-content ng-repeat=\"fs in fieldsets\" title=\"{{fs.name | translate}}\" tab-id=\"fs.name\" is-show=\"true\">\n" +
    "\t\t<div ng-include=\"getView(fs.configuration.view)\"></div>\n" +
    "\t</tab-content>\n" +
    "</vertical-tabs>"
  );


  $templateCache.put('/views/eds-update-form.html',
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


  $templateCache.put('/views/entity-search.html',
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


  $templateCache.put('/views/entity-update.html',
    "<div class=\"wall\">\n" +
    "\t<div class=\"panel-body sogma-panel-body\">\n" +
    "\t\t<div class=\"search-form col-md-12\">\n" +
    "\t\t\t<form ng-class=\"formStyle\" role=\"form\" name=\"entityUpdate\" novalidate>\n" +
    "\t\t\t\t<update-form entity=\"entity\" changes=\"changes\" metadata=\"entityMetadata\" params=\"params\" on-change=\"operations.changeEntityField\" on-update=\"operations.updateEntityField\" creating=\"creating\"></update-form>\n" +
    "\t\t\t\t<div class=\"pull-right update-btn-group\" ng-if=\"showActions\">\n" +
    "\t\t\t\t\t<button class=\"btn btn-default\" ng-repeat=\"action in entityMetadata.actions\" ng-model=\"action\" ng-click=\"operations.dispatchAction(action)\" ng-show=\"action.scope==='UPDATE'\" ng-disabled=\"action.scope!=='UPDATE'\" id=\"update-action-dispatcher-{{ action.name }}\">\n" +
    "\t\t\t\t\t\t\t\t{{ action.label | translate }}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t<button type=\"submit\" class=\"btn btn-success\" ng-click=\"operations.dispatchEntityAction('save', params)\" ng-disabled=\"entityUpdate.$invalid || !changes.length || invalid || (entityMetadata.name==='Materiel' && !entity.validCtrOperat && entity.id != null) || customDisableValider || alreadyValidated\" id=\"save-entity\">\t\n" +
    "\t\t\t\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t\t\t\t{{ 'message.action.validate' | translate }}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t<button class=\"btn btn-default\" ng-click=\"operations.cancelUpdate()\" id=\"cancel-update\">\n" +
    "\t\t\t\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t\t\t\t{{ 'message.action.cancel' | translate }}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t<button class=\"btn btn-danger\" ng-click=\"operations.deleteEntity()\" ng-hide=\"deletable == false\" id=\"delete-entity\" ng-disabled=\"disabledDelete\">\n" +
    "\t\t\t\t\t\t<i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "\t\t\t\t\t\t{{ 'message.action.delete' | translate }}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</form>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/file-input.html',
    "<div class=\"col-md-12 file-input\">\n" +
    "\t<button multiple=\"{{ property.multiplicity === 'MANY' }}\" ng-file-select ng-model=\"value.files\">\n" +
    "\t<i class=\"glyphicon glyphicon-open\"></i>\n" +
    "\t{{ 'field.file-input.upload' | translate }}\n" +
    "</button>\n" +
    "\n" +
    "<!-- TODO Include more stuff -->\n" +
    "</div>"
  );


  $templateCache.put('/views/footer.html',
    "<div class=\"container\">\n" +
    "\t<p>{{ 'message.common.footer' | translate }}</p>\n" +
    "</div>"
  );


  $templateCache.put('/views/header-nav1.html',
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


  $templateCache.put('/views/home.html',
    "<div class=\"wall\">\n" +
    "\t<div class=\"panel-body sogma-panel-body\">\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t<div class=\"col-md-3\">\n" +
    "\t\t\t\t\t\t<h5>Aplicaciones:</h5>\n" +
    "\t\t\t\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t\t\t\t<ul class=\"nav nav-pills nav-stacked\">\n" +
    "\t\t\t\t\t\t\t\t\t<li role=\"presentation\" ng-class=\"{ active: !!($root.tabs | filter:{ id: 'entity_tailoring_search' }).length }\" ng-click=\"tailorings()\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-cog\"></i>\n" +
    "\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n" +
    "\t\t\t\t\t\t\t\t\t\t\tPresupuesto a medida\n" +
    "\t\t\t\t\t\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t\t\t\t\t</li>\n" +
    "\t\t\t\t\t\t\t\t\t<li role=\"presentation\" ng-class=\"{ active: !!($root.tabs | filter:{ id: 'entity_catalog-product_search' }).length }\" ng-click=\"catalog()\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-th\"></i>\n" +
    "\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n" +
    "\t\t\t\t\t\t\t\t\t\t\tCatálogo virtual y metrajes\n" +
    "\t\t\t\t\t\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t\t\t\t\t</li>\n" +
    "\t\t\t\t\t\t\t\t\t<li role=\"presentation\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-tasks\"></i>\n" +
    "\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n" +
    "\t\t\t\t\t\t\t\t\t\t\tControl y seguimiento de presupuestos\n" +
    "\t\t\t\t\t\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t\t\t\t\t</li>\n" +
    "\t\t\t\t\t\t\t\t\t<li role=\"presentation\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-calendar\"></i>\n" +
    "\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n" +
    "\t\t\t\t\t\t\t\t\t\t\tInstalaciones\n" +
    "\t\t\t\t\t\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t\t\t\t\t</li>\n" +
    "\t\t\t\t\t\t\t\t\t<li role=\"presentation\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-stats\"></i>\n" +
    "\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n" +
    "\t\t\t\t\t\t\t\t\t\t\tEstadíticas\n" +
    "\t\t\t\t\t\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t\t\t\t\t</li>\n" +
    "\t\t\t\t\t\t\t\t\t<li role=\"presentation\">\n" +
    "\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\n" +
    "\t\t\t\t\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-dashboard\"></i>\n" +
    "\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n" +
    "\t\t\t\t\t\t\t\t\t\t\tUso\n" +
    "\t\t\t\t\t\t\t\t\t\t</a>\n" +
    "\t\t\t\t\t\t\t\t\t</li>\n" +
    "\t\t\t\t\t\t\t\t</ul>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\t\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"col-md-9\">\n" +
    "\t\t\t\t\t\t<img src=\"/images/web_offer.png\" class=\"presupuestor-offer\" />\n" +
    "\t\t\t\t\t\t<button class=\"btn btn-success offer-button\">\n" +
    "\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-info-sign\"></i>\n" +
    "\t\t\t\t\t\t\t&nbsp;\n" +
    "\t\t\t\t\t\t\tMás información\n" +
    "\t\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/list-input.html',
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


  $templateCache.put('/views/loader.html',
    "<div class=\"loader\" ng-show=\"loading.length > 0\">\n" +
    "\t<div class=\"blocker\"></div>\n" +
    "\t<div class=\"loading\"></div>\n" +
    "\t<div class=\"message\">{{ loadingMessage }}</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/login.html',
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


  $templateCache.put('/views/main.html',
    "\n" +
    "<div class=\"alert-container\">\n" +
    "\t<alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"operations.removeAlert($index)\" \n" +
    "\t\tng-show=\"!alert.expired\" class=\"alert-show-hide\">{{alert.msg | translate:alert.parameters}}</alert>\n" +
    "</div>\n" +
    "<nav class=\"navbar navbar-inverse\" role=\"navigation\" ng-include=\"'/views/header-nav1.html'\" ng-if=\"showHeader()\"></nav><!-- header-1 -->\n" +
    "<div id=\"wrapper\">\n" +
    "\t<div id=\"content\" >\n" +
    "\t\t<div class=\"container\">\t\t\t\n" +
    "\t\t\t<div id=\"sigmaNavTabs\" class=\"container-fluid\">\n" +
    "\t\t\t\t<!--<div bs-tabs=\"tabs\" ng-model=\"tabs.activeTab\"></div>-->\n" +
    "\n" +
    "\t\t\t<tabset>\t\t\t    \n" +
    "\t\t\t    <tab ng-repeat=\"tab in tabs\" active=\"tab.active\" select=\"operations.redirectTo(tab)\">\n" +
    "\t\t\t    \t<tab-heading>\n" +
    "\t\t\t    \t\t<i ng-class=\"tab.type\"></i></span>\n" +
    "\t\t\t\t        <span class=\"tab-heading-title\">{{ tab.title | translate:tabExtra[tab.id] }}{{ tab.hasChanges ? '*' : '' }}\n" +
    "\t\t\t\t        <i class=\"glyphicon glyphicon-remove tab-close-btn\" ng-click=\"operations.closeTab(tab, false)\" ng-show=\"tab.closable\"></i></span>\n" +
    "\t\t\t\t    </tab-heading>\n" +
    "\t\t\t\t    \n" +
    "\t\t\t\t</tab>\n" +
    "\t\t\t</tabset>\n" +
    "\t\t\t<!-- Tab panes Container-->\n" +
    "\t\t\t<div class=\"view-container\">\n" +
    "\t    \t\t<div ng-view></div>\n" +
    "\t    \t</div>\n" +
    "\t\t\t</div><!-- End of navTab -->\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/modal.tpl.html',
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


  $templateCache.put('/views/multi-select-modal.html',
    "<!-- Multi select for modal views -->\n" +
    "<multi-select source-list=\"sourceList\" model=\"modal.temp\"></multi-select>"
  );


  $templateCache.put('/views/multi-select.html',
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


  $templateCache.put('/views/ng-view.html',
    "<div class=\"view-container\">\n" +
    "\t<div ng-view></div>\n" +
    "</div>"
  );


  $templateCache.put('/views/option-input.html',
    "<p>This is the option-input view.</p>\n"
  );


  $templateCache.put('/views/price-input.html',
    "<div class=\"input-group\">\n" +
    "  <input name=\"{{ property.name }}\" type=\"text\" class=\"form-control text-right\"\n" +
    "\tid=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"inner.text\" ng-change=\"formatInput()\"\n" +
    " \tng-disabled=\"disableField(mode, property)\"\n" +
    "\tng-pattern=\"validation.pattern()\" ng-required=\"validation.required()\" aria-describedby=\"{{fieldId}}_addon\">\n" +
    "  <span class=\"input-group-addon\" id=\"{{fieldId}}_addon\">&nbsp;<b>{{ currency }}&nbsp;</b></span>\n" +
    "</div>"
  );


  $templateCache.put('/views/raw-boolean-input.html',
    "<div class=\"col-md-12\">\n" +
    "\t<div class=\"radio-inline\">\n" +
    "\t\t<label for=\"{{ fieldId }}-true\">\n" +
    "\t\t\t<input name=\"{{ property.name }}\"type=\"radio\" name=\"{{property.name}}\" ng-value=\"true\" ng-model=\"value.text\" id=\"{{ fieldId }}-true\" ng-disabled=\"disableField(mode, property)\">\n" +
    "\t\t\t{{ true | activeInactive:property:mode | translate }}\n" +
    "\t\t</label>\n" +
    "\t</div>\n" +
    "\t<div class=\"radio-inline\">\n" +
    "\t\t<label for=\"{{ fieldId }}-false\">\n" +
    "\t\t\t<input type=\"radio\" name=\"{{property.name}}\" ng-value=\"false\" ng-model=\"value.text\" id=\"{{ fieldId }}-false\" ng-disabled=\"disableField(mode, property)\">\n" +
    "\t\t\t{{ false | activeInactive:property:mode | translate }}\n" +
    "\t\t</label>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/raw-checkbox-input.html',
    "<div class=\"col-md-12\">\n" +
    "\t<div class=\"checkbox-inline\">\n" +
    "\t\t<label for=\"{{ fieldId }}-true\"> <input name=\"{{ property.name }}\"type=\"checkbox\" ng-value=\"true\" ng-model=\"value.active\" id=\"{{ fieldId }}-true\"> \n" +
    "\t\t\t{{ true | activeInactive:property | translate}}\n" +
    "\t\t</label>\n" +
    "\t</div>\n" +
    "\t<div class=\"checkbox-inline\">\n" +
    "\t\t<label for=\"{{ fieldId }}-false\"> <input name=\"{{ property.name }}\"type=\"checkbox\" ng-value=\"false\" ng-model=\"value.inactive\" id=\"{{ fieldId }}-false\">\n" +
    "\t\t\t{{ false | activeInactive:property | translate}}\n" +
    "\t\t</label>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/raw-color-input.html',
    "<div class=\"col-md-12\">\n" +
    "\t<input name=\"{{ property.name }}\" type=\"color\" class=\"form-control sigma-form-search-input\" id=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" ng-pattern=\"validation.pattern()\" ng-required=\"validation.required()\" maxlength=\"{{ validation.maxlength() }}\">\n" +
    "\t<!-- TODO This is not working (yet) -->\n" +
    "\t<!-- ng-minlength=\"property.minLength\"\n" +
    "\tng-maxlength=\"property.maxLength\" -->\n" +
    "  <!-- <div class=\"input-group-addon bg-invalid\">\n" +
    "  \t<button type=\"button\" class=\"btn btn-link\">\n" +
    "  \t\t<i class=\"glyphicon glyphicon-remove text-bg-invalid\"></i>\n" +
    "  \t</button>\n" +
    "  </div> -->\n" +
    "</div>"
  );


  $templateCache.put('/views/raw-combobox-input.html',
    "<div class=\"col-md-12\">\n" +
    "\t<button type=\"button\" class=\"btn btn-default combobox-button\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" ng-required=\"validation.required()\" data-html=\"0\" ng-options=\"item.key as item.value | translate for item in value.list\" data-animation=\"am-flip-x\" data-placeholder=\"{{ 'combobox.placeholder' | translate }}\" bs-select ng-if=\"!multiple\">\n" +
    "\t  Action <span class=\"caret\"></span>\n" +
    "\t</button>\n" +
    "\t<button type=\"button\" class=\"btn btn-default combobox-button\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" ng-required=\"validation.required()\" data-html=\"0\" ng-options=\"item.key as item.value | translate for item in value.list\" data-multiple=\"{{ multiple }}\" data-animation=\"am-flip-x\" data-placeholder=\"{{ 'combobox.placeholder' | translate }}\" bs-select ng-if=\"multiple\">\n" +
    "\t  Action <span class=\"caret\"></span>\n" +
    "\t</button>\n" +
    "</div>"
  );


  $templateCache.put('/views/raw-complex-input.html',
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


  $templateCache.put('/views/raw-css-input.html',
    "<div ng-class=\"value.text\"></div>"
  );


  $templateCache.put('/views/raw-date-input.html',
    "<div class=\"col-md-12\">\n" +
    "\t<input name=\"{{ property.name }}\" id=\"{{ fieldId }}\" type=\"date\" placeholder=\"yyyy-MM-dd\" ng-model=\"value.text\" name=\"{{property.fieldName}}\"\n" +
    "\t\tclass=\"form-control\" ng-required=\"validation.required()\" ng-disabled=\"disableField(mode, property)\" value=\"{{ value.text }}\">\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"validation\">\n" +
    "\t<div class=\"validation-invalid-date btn-danger\">\n" +
    "\t\t{{\t'message.field-validation.invalid-date' | translate }}\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/raw-date-search-input.html',
    "<div class=\"col-md-12\">\n" +
    "\t<div class=\"padding-cero\">\n" +
    "\t\t<label>{{ 'field.date-search.comparator' | translate }}</label>\n" +
    "\t\t<select name=\"comparator\" ng-model=\"value.date.comparator\"\n" +
    "\t\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-comparator\">\n" +
    "\t\t\t<option value=\"LOWER_THAN\">{{ 'field.date-search.LOWER_THAN' | translate }}</option>\n" +
    "\t\t\t<option value=\"LOWER_EQUALS\">{{ 'field.date-search.LOWER_EQUALS' | translate }}</option>\n" +
    "\t\t\t<option value=\"EQUALS\">{{ 'field.date-search.EQUALS' | translate }}</option>\n" +
    "\t\t\t<option value=\"GREATER_EQUALS\">{{ 'field.date-search.GREATER_EQUALS' | translate }}</option>\n" +
    "\t\t\t<option value=\"GREATER_THAN\">{{ 'field.date-search.GREATER_THAN' | translate }}</option>\n" +
    "\t\t\t<option value=\"BETWEEN\">{{ 'field.date-search.BETWEEN' | translate }}</option>\n" +
    "\t\t</select>\n" +
    "\t</div>\n" +
    "\t<div class=\"padding-cero\">\n" +
    "\t\t<label for=\"{{ fieldId }}-dateSince\">{{ 'field.date-search.date' | translate }}</label>\n" +
    "\t\t<input name=\"{{ property.name }}\"type=\"date\" name=\"date-since\" ng-model=\"value.date.startDate\"\n" +
    "\t\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-dateSince\"\n" +
    "\t</div>\n" +
    "\t<div class=\"padding-cero\" ng-show=\"value.date.comparator == 'BETWEEN'\">\n" +
    "\t\t<label for=\"{{ fieldId }}-dateTo\">{{ 'field.date-search.otherdate' | translate }}</label>\n" +
    "\t\t<input name=\"{{ property.name }}\"type=\"date\" name=\"to\" ng-model=\"value.date.endDate\"\n" +
    "\t\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-dateTo\">\n" +
    "\t</div>\n" +
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


  $templateCache.put('/views/raw-datetime-input.html',
    "<div class=\"col-md-12\">\n" +
    "\t<div class=\"dropdown\">\n" +
    "\t  <a class=\"dropdown-toggle\" id=\"dropdown2\" role=\"button\" data-toggle=\"dropdown\" ng-disabled=\"disableField(mode, property)\" data-target=\"#\" href=\"#\">\n" +
    "\t    <div class=\"input-group\">\n" +
    "\t    \t<div class=\"input-datetimepicker\" ng-model=\"value.text\">\n" +
    "\t\t    \t<input name=\"{{ property.name }}\"id=\"{{ fieldId }}\" type=\"text\" class=\"form-control\" name=\"{{property.fieldName}}\"\n" +
    "\t\t\t\t\t\tplaceholder=\"dd/MM/yyyy HH:mm\" value=\"{{ value.text | date:'dd/MM/yyyy HH:mm' }}\" ng-required=\"validation.required()\" ng-disabled=\"disableField(mode, property)\">\n" +
    "\t\t\t\t<div></div>\n" +
    "\t    \t</div>\n" +
    "\t\t\t<div class=\"input-group-addon\">\n" +
    "\t\t\t\t<button type=\"button\" class=\"btn btn-link\" ng-disabled=\"disableField(mode, property)\"id=\"raw-input-dateHeure-releve-select\">\n" +
    "\t\t\t\t\t<i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "\t\t\t</div>\n" +
    "\t    </div>\n" +
    "\t  </a>\n" +
    "\t  <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\n" +
    "\t    <datetimepicker data-ng-model=\"value.text\" data-datetimepicker-config=\"{ dropdownSelector: '#dropdown2' }\" />\n" +
    "\t  </ul>\n" +
    "\t</div>\n" +
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


  $templateCache.put('/views/raw-file-input.html',
    "<div class=\"col-md-12\">\n" +
    "\t<file-input></file-input>\n" +
    "\t<!-- TODO This is not working (yet) -->\n" +
    "\t<!-- ng-minlength=\"property.minLength\"\n" +
    "\tng-maxlength=\"property.maxLength\" -->\n" +
    "  <!-- <div class=\"input-group-addon bg-invalid\">\n" +
    "  \t<button type=\"button\" class=\"btn btn-link\">\n" +
    "  \t\t<i class=\"glyphicon glyphicon-remove text-bg-invalid\"></i>\n" +
    "  \t</button>\n" +
    "  </div> -->\n" +
    "</div>"
  );


  $templateCache.put('/views/raw-filtered_select-input.html',
    "<p>This is the raw-filtered_select-input view.</p>\n"
  );


  $templateCache.put('/views/raw-image-input.html',
    "<div class=\"col-md-12\">\n" +
    "\t<!-- <input name=\"{{ property.name }}\"type=\"text\" class=\"form-control sigma-form-search-input\" id=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" ng-pattern=\"validation.pattern()\" ng-required=\"validation.required()\" maxlength=\"{{ validation.maxlength() }}\"> -->\n" +
    "\t\n" +
    "\t<img ng-src=\"{{ value.text }}\" width=\"200\" />\n" +
    "</div>"
  );


  $templateCache.put('/views/raw-input.html',
    "<div class=\"form-group mode-{{ mode }} {{ parentField ? 'derived' : '' }} {{(isExtended) ? 'extended' : '' }} {{displayMode}}\" ng-class=\"templating.inputSize\">\n" +
    "\t<label ng-hide=\"property.fieldType[mode] === 'COMPLEX'\" ng-class=\"[templating.labelStyle, templating.labelWeight, templating.labelDecoration]\">{{property.label | translate:extra }}</label>\n" +
    "\t<div class=\"{{ parentField ? 'derived' : '' }}\" ng-class=\"templating.fieldSize\">\n" +
    "\t\t\n" +
    "\t\t<div ng-include=\"contentUrl\" ng-class=\"classFormInput\"></div>\n" +
    "\t</div>\n" +
    "\t<div ng-class=\"templating.validationStyle\" ng-if=\"['COMPLEX', 'TABLE'].indexOf(property.fieldType[mode]) === -1\">\n" +
    "\t\t<div class=\"validation-pattern text-danger\" ng-show=\"!validation.valid_pattern()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{ 'message.field-validation.pattern' | translate }}\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"validation-forbidden-characters text-danger\" ng-show=\"!validation.valid_forbiddenCharacters()\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{ 'message.field-validation.forbidden-characters' | translate }}\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"validation-required text-danger\" ng-show=\"!validation.valid_required()\" >\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{ 'message.field-validation.required' | translate }}\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>\n"
  );


  $templateCache.put('/views/raw-list-input.html',
    "<div class=\"form-group\">\n" +
    "\t<div class=\"padding-cero\" ng-class=\"inLineClass.col1\">\n" +
    "\t\t<label for=\"{{ fieldId }}\">{{property.fieldLabel | translate:extra }}</label>\n" +
    "\t</div>\n" +
    "\t<div class=\"input-group\" ng-class=\"inLineClass.col3\">\n" +
    "\t\t<list-input fields=\"entityFields\" list=\"value.list\" eds-type=\"societe\" disabled-ids=\"[]\"></list-input>\n" +
    "\t</div>\n" +
    "\t<div class=\"row chantier-btn-list\">\n" +
    "\t\t<div class=\"col-md-5\">\n" +
    "\t\t\t<button class=\"btn btn-default\" ng-click=\"openMultiSelect()\" id=\"{{ fieldId }}-add\">{{'message.action.add' | translate}}</button>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/raw-number-input.html',
    "\n" +
    "<input name=\"{{ property.name }}\"type=\"number\"\n" +
    "\tclass=\"form-control sigma-form-search-input sigma-form-simple-search-input\"\n" +
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


  $templateCache.put('/views/raw-number-range-input.html',
    "<div class=\"col-md-12\">\n" +
    "\t<div class=\"padding-cero\">\n" +
    "\t\t<label>{{ 'field.number-range.comparator' | translate }}</label>\n" +
    "\t\t<select name=\"comparator\" ng-model=\"value.range.comparator\"\n" +
    "\t\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-comparator\">\n" +
    "\t\t\t<option value=\"LOWER_THAN\">{{ 'field.number-range.LOWER_THAN' | translate }}</option>\n" +
    "\t\t\t<option value=\"LOWER_EQUALS\">{{ 'field.number-range.LOWER_EQUALS' | translate }}</option>\n" +
    "\t\t\t<option value=\"EQUALS\">{{ 'field.number-range.EQUALS' | translate }}</option>\n" +
    "\t\t\t<option value=\"GREATER_EQUALS\">{{ 'field.number-range.GREATER_EQUALS' | translate }}</option>\n" +
    "\t\t\t<option value=\"GREATER_THAN\">{{ 'field.number-range.GREATER_THAN' | translate }}</option>\n" +
    "\t\t\t<option value=\"BETWEEN\">{{ 'field.number-range.BETWEEN' | translate }}</option>\n" +
    "\t\t</select>\n" +
    "\t</div>\n" +
    "\t<div class=\"padding-cero\">\n" +
    "\t\t<label for=\"{{ fieldId }}-dateSince\">{{ 'field.number-range.number' | translate }}</label>\n" +
    "\t\t<input name=\"{{ property.name }}\" type=\"number\" name=\"from\" ng-model=\"value.range.from\"\n" +
    "\t\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-dateSince\"\n" +
    "\t</div>\n" +
    "\t<div class=\"padding-cero\" ng-show=\"value.range.comparator == 'BETWEEN'\">\n" +
    "\t\t<label for=\"{{ fieldId }}-dateTo\">{{ 'field.number-range.othernumber' | translate }}</label>\n" +
    "\t\t<input name=\"{{ property.name }}\" type=\"number\" name=\"to\" ng-model=\"value.range.to\"\n" +
    "\t\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-dateTo\">\n" +
    "\t</div>\n" +
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


  $templateCache.put('/views/raw-option-input.html',
    "<option-input></option-input>"
  );


  $templateCache.put('/views/raw-password-input.html',
    "<div class=\"col-md-12\">\n" +
    "\t<input name=\"{{ property.name }}\"type=\"password\" class=\"form-control sigma-form-search-input\" id=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" ng-pattern=\"validation.pattern()\" ng-required=\"validation.required()\" maxlength=\"{{ validation.maxlength() }}\" autocomplete=\"off\">\n" +
    "\t<!-- TODO This is not working (yet) -->\n" +
    "\t<!-- ng-minlength=\"property.minLength\"\n" +
    "\tng-maxlength=\"property.maxLength\" -->\n" +
    "  <!-- <div class=\"input-group-addon bg-invalid\">\n" +
    "  \t<button type=\"button\" class=\"btn btn-link\">\n" +
    "  \t\t<i class=\"glyphicon glyphicon-remove text-bg-invalid\"></i>\n" +
    "  \t</button>\n" +
    "  </div> -->\n" +
    "</div>"
  );


  $templateCache.put('/views/raw-pick_list-input.html',
    "<div class=\"col-md-12\">\n" +
    "\t<div class=\"col-md-12 padding-cero\" ng-class=\"inLineClass.col1\">\n" +
    "\t\t<label for=\"{{ fieldId }}\">{{property.fieldLabel |\n" +
    "\t\t\ttranslate:extra }}</label>\n" +
    "\t</div>\n" +
    "\t<div class=\"col-md-12 padding-cero\" ng-class=\"inLineClass.col3\">\n" +
    "\t\t<list-input fields=\"value.fields\" actions=\"property.actions\"\n" +
    "\t\t\tlist=\"value.entity\" property=\"property\" metadata=\"metadata\"\n" +
    "\t\t\tdisabled-ids=\"[]\" dispatch-field-action='dispatchFieldAction'></list-input>\n" +
    "\t</div>\n" +
    "\t<div class=\"col-md-12 no-padding chantier-btn-list\">\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"col-md-1\" ng-if=\"!readonly\">\n" +
    "\t\t\t\t<button class=\"btn btn-default\"\n" +
    "\t\t\t\t\tng-click=\"dispatchFieldAction('add')\" id=\"{{ fieldId }}-add\"\n" +
    "\t\t\t\t\tng-hide=\"disableField(mode, property)\">\n" +
    "\t\t\t\t\t\t<i class=\"glyphicon glyphicon-plus\"></i>\n" +
    "\t\t\t\t\t\t{{ 'message.action.add' | translate }}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col-md-8\">\n" +
    "\t\t\t\t<div ng-show=\"!validation.valid_minlength()\">\n" +
    "\t\t\t\t\t<div class=\"validation-pick-pattern text-danger ng-binding\">\n" +
    "\t\t\t\t\t\t<i class=\"glyphicon glyphicon-remove\"></i> {{\n" +
    "\t\t\t\t\t\t'message.field-validation.array-min-length' | translate:{ elem: 'situation'} }}\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/raw-plain-input.html',
    "<div class=\"col-md-12\">\n" +
    "\t<input name=\"{{ property.name }}\"type=\"text\" class=\"form-control sigma-form-search-input\" id=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" ng-pattern=\"validation.pattern()\" ng-required=\"validation.required()\" maxlength=\"{{ validation.maxlength() }}\" tabindex=\"{{ (index + 1) * 12 }}\">\n" +
    "\t<!-- TODO This is not working (yet) -->\n" +
    "\t<!-- ng-minlength=\"property.minLength\"\n" +
    "\tng-maxlength=\"property.maxLength\" -->\n" +
    "  <!-- <div class=\"input-group-addon bg-invalid\">\n" +
    "  \t<button type=\"button\" class=\"btn btn-link\">\n" +
    "  \t\t<i class=\"glyphicon glyphicon-remove text-bg-invalid\"></i>\n" +
    "  \t</button>\n" +
    "  </div> -->\n" +
    "</div>"
  );


  $templateCache.put('/views/raw-price-input.html',
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


  $templateCache.put('/views/raw-select-input.html',
    "<select-input></select-input>"
  );


  $templateCache.put('/views/raw-table-input.html',
    "<div class=\"col-md-12\">\n" +
    "\t<div class=\"col-md-12 padding-cero\" ng-class=\"inLineClass.col1\">\n" +
    "\t\t<label for=\"{{ fieldId }}\">{{property.fieldLabel |\n" +
    "\t\t\ttranslate:extra }}</label>\n" +
    "\t</div>\n" +
    "\t<div class=\"col-md-12 padding-cero\" ng-class=\"inLineClass.col3\">\n" +
    "\t\t<table-input></table-input>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/raw-textarea-input.html',
    "<textarea \n" +
    "\ttype=\"text\"\n" +
    "\tclass=\"form-control sigma-form-search-input sigma-form-simple-search-input\"\n" +
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


  $templateCache.put('/views/raw-tics-input.html',
    "<tics field=\"property\" entity=\"entity\" value=\"value\"></tics>"
  );


  $templateCache.put('/views/recursive-list-item.html',
    "<li>\n" +
    "\t<div>\n" +
    "\t\t<a href=\"\" ng-click=\"click(item)\">{{ item.label | translate }}</a>\n" +
    "\t\t<i class=\"text-success\" ng-class=\"{ 'glyphicon glyphicon-ok': item.selected && !item.children.length }\"></i>\n" +
    "\t\t<recursive-list list=\"item.children\" on-click-item=\"click\"></recursive-list>\n" +
    "\t</div>\n" +
    "</li>"
  );


  $templateCache.put('/views/recursive-list.html',
    "<ul>\n" +
    "\t<recursive-list-item ng-repeat=\"item in list\" item=\"item\" on-click=\"clickItem\"></recursive-list-item>\n" +
    "</ul>"
  );


  $templateCache.put('/views/result-table.html',
    "<div class=\"col-md-12 search-table-container\" ng-init=\"init()\">\n" +
    "\t<div ng-include=\"contentUrl\"></div>\n" +
    "</div>"
  );


  $templateCache.put('/views/search-pane.html',
    "<div class=\"search-pane\" ng-init=\"init()\">\n" +
    "\t<div class=\"search-form\">\n" +
    "\t\t<h3>{{ 'message.search-filters.title' | translate }}</h3>\n" +
    "\t\t<form role=\"form\">\n" +
    "\t\t\t<div ng-include=\"contentUrl\"></div>\n" +
    "\t\t\t<div class=\"col-md-12 form-group mode-search\">\n" +
    "\t\t\t\t<div class=\"col-md-12 text-right\">\n" +
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


  $templateCache.put('/views/select-input.html',
    "<div class=\"select-input {{(isExtended) ? 'extend' : 'non-extended'}}\" ng-class=\"{ disabled: disableSelect(property) }\" konga-select>\n" +
    "\t<div ng-class=\"{'col-md-6': mode === 'update', 'col-md-12': mode === 'search'}\">\n" +
    "\t\t<div class=\"input-group {{ validation.required() ? 'required' : 'optional' }} {{ value.text.length ? 'valid' : 'invalid' }}\">\n" +
    "\t\t\t<input name=\"{{ property.name }}\"type=\"text\" class=\"sigma-form-search-input form-control\" id=\"{{ fieldId }}-input\" ng-model=\"textinput\" ng-disabled=\"disableField(mode, property)\" ng-pattern=\"validation.pattern()\" ng-required=\"validation.required()\" ng-change=\"writeValue()\" typeahead=\"item.label for item in getElements($viewValue)\" typeahead-on-select=\"formatInput($item, $model, $label)\" tabindex=\"{{ (index + 1) * 12 }}\">\n" +
    "\t\t\t<div class=\"input-group-addon\">\n" +
    "\t\t\t\t<button type=\"button\" class=\"btn btn-link\" ng-disabled=\"disableField(mode, property)\"\n" +
    "\t\t\t\t\tng-click=\"dispatchFieldAction('open-select')\" id=\"{{ fieldId }}-select\">\n" +
    "\t\t\t\t\t<i class=\"glyphicon glyphicon-search\"></i>\n" +
    "\t\t\t\t</button>\n" +
    "\t\t\t\t<!-- <button type=\"button\" class=\"btn btn-link btn-bordered-left\" ng-show=\"showRemove(property)\" ng-click=\"removeField(property)\" id=\"{{ fieldId }}-remove\">\n" +
    "\t\t\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t\t</button> -->\n" +
    "\t\t\t</div>\n" +
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
    "</div>\n" +
    "<div class=\"{{(isExtended) ? 'col-md-2 extend' : 'non-extended'}}\">\n" +
    "\t<span class=\"complex-label-extended\"\n" +
    "\t\tng-show=\"label.length && mode === 'update' && value.isExtended\">({{\n" +
    "\t\tvalue.extended.firstField }}) &nbsp;</span>\n" +
    "</div>\n" +
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


  $templateCache.put('/views/single-select-custom.html',
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


  $templateCache.put('/views/single-select-modal.html',
    "<single-select source-list=\"sourceList\" model=\"modal.temp\"></single-select>"
  );


  $templateCache.put('/views/single-select.html',
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


  $templateCache.put('/views/tabbed-update-user.html',
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


  $templateCache.put('/views/tabbed-update.html',
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


  $templateCache.put('/views/table-cell.html',
    "<div class=\"table-cell\" ng-class=\"styles\">\n" +
    "\t<span class=\"table-cell-content\" ng-show=\"type === 'text'\"></span>\n" +
    "\t<img ng-src=\"{{ content }}\" ng-if=\"type === 'image'\" width=\"{{ image.width }}\" height=\"{{ image.height }}\">\n" +
    "\t<div class=\"{{ content }}\" ng-if=\"type === 'styling'\"></div>\n" +
    "\t<div class=\"{{}}\" ng-if=\"type === 'plain-filtered'\">\n" +
    "\t\t{{ content | customFilter:filter }}\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/views/table-header.html',
    "<div class=\"table-header {{ field.sortable ? 'sortable' : '' }}\" ng-class=\"styles\">\n" +
    "\t<span class=\"header-label\">{{ label | translate:{label: owner} }}</span>\n" +
    "\t<!-- <b ng-class=\"showSorting(field.sorting, true)\"><b ng-class=\"showSorting(field.sorting, false)\"></b></b> -->\n" +
    "\t<span class=\"sorting\" ng-if=\"field.sortable\" ng-hide=\"field.derived\">\n" +
    "\t\t<i class=\"select-sorting sorting-asc glyphicon glyphicon-chevron-up\" ng-click=\"sorting('asc')\" ng-class=\"{ active: sort === 'asc' }\"></i>\n" +
    "\t\t<i class=\"select-sorting sorting-desc glyphicon glyphicon-chevron-down\" ng-click=\"sorting('desc')\" ng-class=\"{ active: sort === 'desc' }\"></i>\n" +
    "\t</span>\n" +
    "</div>"
  );


  $templateCache.put('/views/table-input.html',
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


  $templateCache.put('/views/tics.html',
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


  $templateCache.put('/views/vertical-tabs-element.tp.html',
    "<div class=\"tab-pane\" ng-show=\"selected\" ng-class=\"active\" ng-transclude></div>"
  );


  $templateCache.put('/views/verticaltab.tp.html',
    "<div class=\"tabbable\">\n" +
    "\t<ul class=\"nav nav-pills nav-stacked sigma-nav-vertical col-md-3 no-padding-right\">\n" +
    "\t\t<li ng-repeat=\"tabContent in tabContentList\" ng-class=\"{active:tabContent.selected}\">\n" +
    "\t\t\t<a href=\"\" ng-click=\"select(tabContent)\">{{tabContent.title}}</a>\n" +
    "\t\t</li>\n" +
    "\t</ul>\n" +
    "\t<div class=\"tab-content col-md-offset-3 padding-cero\" ng-transclude></div>\n" +
    "</div>\n"
  );

}]);
