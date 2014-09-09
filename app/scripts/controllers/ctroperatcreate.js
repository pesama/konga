'use strict';

/**
 * @ngdoc function
 * @name sigmaNgApp.controller:CtroperatcreateCtrl
 * @description
 * # CtroperatcreatectrlCtrl
 * Controller of the sigmaNgApp
 */
angular.module('sigmaNgApp')
  .controller('CtroperatcreateCtrl', function ($scope, $routeParams, $rootScope, api, scaffold, common) {
	  
	$scope.selectedIds = {};
	$scope.entity = {};
	var entityType = $routeParams.entityType;
	// Get the local endpoint
	var localEndpoint = api.getLocalEndpoint(entityType);	

	if (typeof $rootScope.createCtrOperat == 'undefined') {	
		//Request loader
		$rootScope.operations.requestLoading('create_' + entityType);
		//Get all references data call
		$rootScope.ctrOperatCreationData = localEndpoint.getAllReferences({}, function () {
			//Free Loader
			$rootScope.operations.freeLoading('create_' + entityType);
		});
		$rootScope.createCtrOperat = true;
	}


    var metadata = $scope.entityMetadata = common.read('metadata');
    $scope.entityMetadata = common.getMetadata(metadata, entityType);

    $scope.selectedElements = {societes:[], agences: [], secteurs: [], chantieres: [], ctrsMecaniques : []};	
    
	$scope.selectedEds = {
			societes:$scope.entityMetadata.societes, 
			agences: $scope.entityMetadata.agences, 
			secteurs:  $scope.entityMetadata.secteurs, 
			chantieres: $scope.entityMetadata.chantieres, 
			ctrsMecaniques : $scope.entityMetadata.ctrsMecaniques
	};
	
	$scope.societeFields = [
		{fieldKey : 'code', fieldLabel : 'Code société'}, 
		{fieldKey : 'libelle', fieldLabel : 'label societe'}
	];
	
	$scope.agenceFields = [
		{fieldKey : 'parentEds.code', fieldLabel : 'Code societe'},
		{fieldKey : 'parentEds.libelle', fieldLabel : 'Label societe'},
		{fieldKey : 'code', fieldLabel : 'Code agence'}, 
		{fieldKey : 'libelle', fieldLabel : 'label agence'}
	];
	
	$scope.secteursFields = [
		{fieldKey : 'parentEds.parentEds.code', fieldLabel : 'Code societe'},
		{fieldKey : 'parentEds.parentEds.libelle', fieldLabel : 'Label societe'},
		{fieldKey : 'parentEds.code', fieldLabel : 'Code agence'},
		{fieldKey : 'parentEds.libelle', fieldLabel : 'Label agence'},
		{fieldKey : 'code', fieldLabel : 'Code secteur'}, 
		{fieldKey : 'libelle', fieldLabel : 'label secteur'}
	];

	$scope.ctrMecaniqueFields = [
		{fieldKey : 'codeSO', fieldLabel : 'Code societe'},
		{fieldKey : 'libelleSO', fieldLabel : 'Label societe'},
		{fieldKey : 'codeCtr', fieldLabel : 'Code centre mécanique'}, 
		{fieldKey : 'libelleCtr', fieldLabel : 'label centre mécanique'}
	];

	$scope.chantieresFields = [
		{fieldKey : 'parentEds.parentEds.parentEds.code', fieldLabel : 'Code societe'},
		{fieldKey : 'parentEds.parentEds.parentEds.libelle', fieldLabel : 'Label societe'},
		{fieldKey : 'parentEds.parentEds.code', fieldLabel : 'Code agence'},
		{fieldKey : 'parentEds.parentEds.libelle', fieldLabel : 'Label agence'},
		{fieldKey : 'parentEds.code', fieldLabel : 'Code secteur'},
		{fieldKey : 'parentEds.libelle', fieldLabel : 'Label secteur'},
		{fieldKey : 'code', fieldLabel : 'Code chantier'}, 
		{fieldKey : 'libelle', fieldLabel : 'label chantier'}
	];

	var selectedSecteurChild = function (listIds) {
		var chantierList = $rootScope.ctrOperatCreationData.chantieres;
		var selectedChildren = {};
		for (var i = 0; i < chantierList.length; i++) {
			if (listIds[chantierList[i].parentEds.id]) {
				selectedChildren[chantierList[i].id] = true;
			}
		}
		$scope.selectedIds.chantieres = selectedChildren;
	};

	var selectedAgenceChild = function (listIds) {
		var secteurList = $rootScope.ctrOperatCreationData.secteurs;
		var selectedChildren = {};
		var selectedSecteur = ($scope.selectedElements.secteurs)? $scope.selectedElements.secteurs: [];
		for (var i = 0; i < secteurList.length; i++) {
			if (listIds[secteurList[i].parentEds.id]) {
				selectedChildren[secteurList[i].id] = true;
				for (var j = selectedSecteur.length -1; j >=0; j--) {
					if (selectedSecteur[j].id === secteurList[i].id) {
						selectedSecteur[j].selected = false;
						selectedSecteur.splice(j,1);
					}
				}
			}
		}
		$scope.selectedIds.secteurs = selectedChildren;
		selectedSecteurChild(selectedChildren);
	};

	var selectedSocieteChild = function (listIds) {
		var agencesList = $rootScope.ctrOperatCreationData.agences;
		var ctrsMecaniquesList = $rootScope.ctrOperatCreationData.ctrsMecaniques;
		var selectedAgenceChildren = {};
		var selectedCtrMecaniqueChildren = {};
		var selectedAgence = ($scope.selectedElements.agences)? $scope.selectedElements.agences: [];
		var selectedCtrsMecaniques = ($scope.selectedElements.ctrsMecaniques)? $scope.selectedElements.ctrsMecaniques: [];
		for (var i = 0; i < agencesList.length; i++) {
			if (listIds[agencesList[i].parentEds.id]) {
				selectedAgenceChildren[agencesList[i].id] = true;
				for (var j = selectedAgence.length-1; j >=0; j--) {
					if (selectedAgence[j].id === agencesList[i].id) {
						selectedAgence[j].selected = false;
						selectedAgence.splice(j,1);
					}
				}
			}
		}
		
		for (var i = 0; i < ctrsMecaniquesList.length; i++) {
			if (listIds[ctrsMecaniquesList[i].idSO]) {
				selectedCtrMecaniqueChildren[ctrsMecaniquesList[i].id] = true;
				for (var j = selectedCtrsMecaniques.length-1; j >=0; j--) {
					if (selectedCtrsMecaniques[j].id === ctrsMecaniquesList[i].id) {
						selectedCtrsMecaniques[j].selected = false;
						selectedCtrsMecaniques.splice(j,1);
					}
				}
			}
		}
		$scope.selectedIds.agences = selectedAgenceChildren;
		selectedAgenceChild(selectedAgenceChildren);
		$scope.selectedIds.ctrsMecaniques = selectedCtrMecaniqueChildren;
	};

	var concatObjectList = function (list1, list2) {
		angular.forEach(list1, function (item, key) {
			if (item) {
				list2[key] = item;
			}
		});
		return list2;
	};
	
	$scope.setSelectedElements = function (entityTypeSelected, selectedElements) {
		var listIds = [];
		for (var i = 0; i < selectedElements.length; i++) {
			listIds[selectedElements[i].id]=true;
		}

		switch (entityTypeSelected) {
			case 'societes':
				selectedSocieteChild(listIds);
				$scope.selectedIds.societes = {};
			break;
			case 'agences':
				if ($scope.selectedIds.agences) {
					var listAgence = angular.copy($scope.selectedIds.agences);
					listIds = concatObjectList(listIds, listAgence);
				}
				selectedAgenceChild(listIds);
			break;
			case 'secteurs':
				if ($scope.selectedIds.secteurs) {
					var listSecteur = angular.copy($scope.selectedIds.secteurs);
					listIds = concatObjectList(listIds, listSecteur);
				}
				selectedSecteurChild(listIds);
			break;
		}
		$scope.selectedElements[entityTypeSelected] = 	selectedElements;
		$scope.pageData.entity[entityTypeSelected] = [];

		for (var i = 0; i < selectedElements.length; i++) {
			$scope.pageData.entity[entityTypeSelected].push(selectedElements[i].id);
		}
	};
	
	$scope.setSelectedAllElements = function (edsType) {
		var selectedElements = $scope.selectedElements[edsType];

		// TODO Same code setSelectedElements
		var listIds = [];
		for (var i = 0; i < selectedElements.length; i++) {
			listIds[selectedElements[i].id]=true;
		}

		switch (edsType) {
			case 'societes':
				selectedSocieteChild(listIds);
				$scope.selectedIds.societes = {};
				break;
			case 'agences':
				if ($scope.selectedIds.agences) {
					var listAgence = angular.copy($scope.selectedIds.agences);
					listIds = concatObjectList(listIds, listAgence);
				}
				selectedAgenceChild(listIds);
				break;
			case 'secteurs':
				if ($scope.selectedIds.secteurs) {
					var listSecteur = angular.copy($scope.selectedIds.secteurs);
					listIds = concatObjectList(listIds, listSecteur);
				}
				selectedSecteurChild(listIds);
				break;
		}
		$scope.selectedElements[edsType] = 	selectedElements;
		$scope.pageData.entity[edsType] = [];

		for (var i = 0; i < selectedElements.length; i++) {
			$scope.pageData.entity[edsType].push(selectedElements[i].id);
		}
	};

	$scope.validateDefault = function () {
		$scope.entity = angular.copy($scope.pageData.entity);
	};
	
	$scope.cancelDefault = function () {		
	};
	
	$scope.validate = function () {
		angular.forEach($scope.selectedElements, function (item, key) {
			$scope.entity[key] = item;
		});
		// $scope.entity.selectedElements = angular.copy($scope.selectedElements);
	};

	$scope.cancel = function () {
		console.log('Cancel !!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	};
  });
