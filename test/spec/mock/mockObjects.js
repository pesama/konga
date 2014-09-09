Mock = {};

/**
 * Sequence used to create pseudo guid following sequential order.
 */
Mock.Sequence = 1;

/**
 * Getting arbitrary values for an array.
 */
Mock.getRandomFromArray = function(array)
{
    if (Array.isArray(array))
    {
        var index = Math.round(Math.random() *(array.length-1));
        return array[index];
    } 
};

/**
 * User model object (See ng-model/User)
 */
Mock.User = {
	userId : null,
	idUserAd : null,
	nom : null,
	prenom : null,
	langueId : null,
	telephone : null,
	email : null,
	statut : null,
	obs : null,
	indSms : null,
	indEmail : null,
	ctrOperationnel : null,
	ctrOperats : null,
	roleCoUser : null,
	userCre : null,
	dateCre : null,
	userModif : null,
	dateModif : null,
  
    newMock : function () {
		var localMock = {};
		localMock.userId 	= Mock.Sequence++;
		localMock.idUserAd	= 'ID-' + localMock.userId;
		localMock.nom 		= 'NOM-' + localMock.userId;
		localMock.prenom 	= 'PRENOM-' + localMock.userId;
		localMock.email 	= localMock.prenom + "." + localMock.nom + "@csc.com";
		localMock.statut 	= true;
		// localMock.langueId : null,
		localMock.ctrOperationnel	= Mock.CtrOperat.newMock();
		localMock.ctrOperats		= [ Mock.CtrOperat.newMock() ]; 
		localMock.roleCoUser 		= Mock.RoleCoUser.newMock();		
		return localMock;
	}
};

/**
 * CtrOperat model object (See ng-model/CtrOperat)
 */
Mock.CtrOperat = {
		id : null,
		codeCtrOperat : null,
		libCtrOperat : null,
		niveau : null,
		statut : null,
		obs : null,
		eds : null,
		societes : null,
		chantieres : null,
		agences : null,
		secteurs : null,
		ctrsMecaniques : null,
		userCre : null,
		dateCre : null,
		userModif : null,
		dateModif : null,
		
	    newMock : function () {
			var localMock = {};
			localMock.id 			= Mock.Sequence++;
			localMock.codeCtrOperat	= 'CD-' + localMock.userId;
			localMock.libCtrOperat	= 'LIB-' + localMock.userId;
			localMock.niveau		= 1;
			localMock.statut	 	= true;
			// localMock.langueId : null,
			localMock.eds			= [];
			localMock.societes		= [];
			localMock.secteurs		= [];
			localMock.ctrsMecaniques	= [];			
			return localMock;
		}		
};


/**
 * Role model object (See ng-model/Role)
 */
Mock.Role = {
		idRole : null,
		libRole : null,
		obs : null,
		users : null,
		relActionRoles : null,
		userCre : null,
		dateCre : null,
		userModif : null,
		dateModif : null,

	    newMock : function () {
			var localMock = {};
			localMock.idRole 		= Mock.Sequence++;
			localMock.libRole		= 'ROLE-' + localMock.idRole;
			localMock.users			= [];
			localMock.relActionRoles= [];
			return localMock;
		}		
};

/**
 * RoleCoUser model object (See ng-model/RoleCoUser)
 */
Mock.RoleCoUser = {
		role : null,
		ctrOperat : null,
		userCre : null,
		dateCre : null,
		userModif : null,
		dateModif : null,
		
	    newMock : function () {
			var localMock = {};
			localMock.role		= Mock.Role.newMock();
			localMock.ctrOperat	= Mock.CtrOperat.newMock();
			return localMock;
		}
};

/**
 * Societe model object (See ng-model/Societe)
 */
Mock.Societe = {
		codeInterfaceComptable : null,
		logo : null,
		adresse1 : null,
		adresse2 : null,
		adresse3 : null,
		codePostal : null,
		pays : null,
		ville : null,
		telephone : null,
		fax : null,
		numTva : null,
		numRcs : null,
		siren : null,
		numeroDefenseEntreprise : null,
		devise  : null,
		parentMetier  : null,
		indSocGestion  : null,
		
	    newMock : function () {
			var localMock = {};
			localMock.codeInterfaceComptable = "Code 123";
			localMock.devise  = Mock.Devise.newMock();
			localMock.parentMetier  = Mock.Eds.newMock();
			localMock.indSocGestion = true;
			return localMock;
		}
};

/**
 * TypeEds model object (See ng-model/TypeEds)
 */
Mock.TypeEds = {
		id : null,
		lib : null,
		userCre : null,
		dateCre : null,
		userModif : null,
		dateModif : null,
		
	    newMock : function () {
			var localMock = {};
			localMock.id		= 567;
			localMock.lib		= "Type Eds Test";
			return localMock;
		}
};

/**
 * Eds model object (See ng-model/Eds)
 */
Mock.Eds = {		
		id : null,
		typeEds : null,
		ctrOperats : null,
		codeEds : null,
		libEds : null,
		statut : null,
		obs : null,
		userCre : null,
		dateCre : null,
		userModif : null,
		dateModif : null,
		numOrdre : null,
		
	    newMock : function () {
			var localMock = {};
			localMock.id = 123;
			localMock.typeEds = Mock.TypeEds.newMock();
			localMock.ctrOperats = [ Mock.CtrOperat.newMock() ];
			localMock.codeEds = "123";
			localMock.libEds = "Element de Structure 123";
			localMock.statut = true;
			localMock.numOrdre = 1;
			return localMock;
		}
};

/**
 * Metier model object (See ng-model/Metier)
 * extends Eds
 */
Mock.Metier = {	
		parentIdEds : null,
		
	    newMock : function () {
	    	var localMock = {};
			angular.extend(localMock, Mock.Eds.newMock());
			return localMock;
	    }
};

/**
 * Agence model object (See ng-model/Agence)
 * extends Eds
 */
Mock.Agence = {	
		parentSociete : null,
		
	    newMock : function () {
	    	var localMock = {};
	    	localMock.parentSociete = Mock.Societe.newMock();
			angular.extend(localMock, Mock.Eds.newMock());
	    	// TODO : check there is no parentEds field in back
	    	localMock.parentEds = {};
			angular.extend(localMock.parentEds, Mock.Eds.newMock());
			return localMock;
	    }
};

/**
 * Secteur model object (See ng-model/Secteur)
 * extends Eds
 */
Mock.Secteur = {	
		parentAgence : null,
		
	    newMock : function () {
	    	var localMock = {};
	    	localMock.parentAgence = Mock.Agence.newMock();
			angular.extend(localMock, Mock.Eds.newMock());
	    	// TODO : check there is no parentEds field in back
	    	localMock.parentEds = {};
			angular.extend(localMock.parentEds, Mock.Eds.newMock());
			return localMock;
	    }
};

/**
 * Devise model object (See ng-model/Devise)
 */
Mock.Devise = {	
		codeIso : null,
		libDevise : null,
		symbDevise : null,
		nbrDecimal : null,
		facteurConversion : null,
		userCre : null,
		dateCre : null,
		userModif : null,
		dateModif : null,
		
	    newMock : function () {
	    	var localMock = {};
	    	localMock.codeIso = "EUR";
	    	localMock.libDevise = "Euro";
	    	localMock.symbDevise = 'e';
	    	localMock.nbrDecimal = 3;
	    	localMock.facteurConversion = 1.0;
	    	return localMock;
	    }
};


/**
 * Chantier model object (See ng-model/Chantier)
 * extends Eds
 */
Mock.Chantier = {	
		parentSecteur : null,
		typeChantier : null,
		ctrMecanique : null,
		dateDebut : null,
		dateFin : null,
		adresse1 : null,
		adresse2 : null,
		adresse3 : null,
		codePostal : null,
		ville : null,
		pays : null,
		userCre : null,
		dateCre : null,
		userModif : null,
		dateModif : null,
		
	    newMock : function () {
	    	var localMock = {};
	    	localMock.parentSecteur = Mock.Secteur.newMock();
	    	localMock.typeChantier = "Type Mock";
	    	localMock.dateDebut = 1410165810679;
	    	// TODO : check there is no parentEds field in back
	    	localMock.parentEds = {};
			angular.extend(localMock.parentEds, Mock.Eds.newMock());
	    	return localMock;
	    }
};

/**
 * CtrMecanique model object (See ng-model/CtrMecanique)
 */
Mock.CtrMecanique = {	
		id : null,
		cdCtrMecanique : null,
		societe : null,
		libCtrMecanique : null,
		obs : null,
		statut : null,
		ctrMecanCtrOperat : null,
		userCre : null,
		dateCre : null,
		userModif : null,
		dateModif : null,
		
	    newMock : function () {
	    	var localMock = {};
	    	localMock.id = 789;
	    	localMock.cdCtrMecanique = "789";
	    	localMock.societe = Mock.Societe.newMock();
	    	localMock.libCtrMecanique = 'Centre 789';
	    	localMock.statut = true;
	    	localMock.ctrMecanCtrOperat = [ Mock.CtrMecanCtrOperat.newMock(this) ];
	    	return localMock;
	    }
};

/**
 * CtrMecanCtrOperat model object (See ng-model/CtrMecanCtrOperat)
 */
Mock.CtrMecanCtrOperat = {	
		ctrOperat : null,
		ctrMecanique : null,
		userCre : null,
		dateCre : null,
		userModif : null,
		dateModif : null,
		
	    newMock : function (centre) {
	    	var localMock = {};
	    	localMock.ctrOperat = Mock.CtrOperat.newMock();
	    	localMock.ctrMecanique = centre;
	    	return localMock;
	    }
};


