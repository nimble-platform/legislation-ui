angular.module('nimsys').controller('DocDetailsCtrl',
		['$scope','$rootScope','$localStorage','$http','$location','$window','$httpParamSerializer','$stateParams','UrlService', function($scope,$rootScope,$localStorage,$http,$location,$window,$httpParamSerializer,$stateParams,UrlService) {
	
	$scope.msg = [];
	
	$rootScope.user = $localStorage.user;
	$rootScope.sLan = localStorage.getItem('nimsysLan');
	
	$scope.optionsDocumentType = [{value: '0', label: 'Regulation'},
	                              {value: '1', label: 'Legislation'},
	                              {value: '2', label: 'Patent'},
	                              {value: '3', label: 'Sectorial report'}];
	
	$scope.selectedDocumentType = []; /* INT */	

	
	/* DETAILS OF DOCUMENT */
	$scope.selectedDocument = [];

	
	$scope.init = function () {
		var docType = $stateParams.docType;
		$scope.selectedDocumentType = docType;
		
		var idDoc = $stateParams.idDoc;
		$scope.loadDocumentDetails(idDoc);
	};
	

	$scope.loadDocumentDetails = function(idDoc) {
		$scope.selectedDocumentId = idDoc;
		$("body").addClass("loading");
		
		var docType = $scope.selectedDocumentType;
		var attrList = $scope.fillAttrbsToRetrieve(docType);

		var url = UrlService.props.root + "/rest/document/get/" + idDoc + "/" + attrList;
		
		var req = {
			method: 'GET',
			url: url,
//			headers: {
//				'Authorization': 'Bearer ' + $scope.user.token
//			},
			params: {
				'aToken': 'Bearer ' + $scope.user.token,
				'authMode': UrlService.props.authMode
			}
		}
		
		$http(req).then(function (success){
			$scope.selectedDocument = success.data;
			console.log("Document data:" + JSON.stringify(success.data));
    		$scope.msg = "Document loaded succesfully!";
    		
    		$('#alert-success').show();
    		$('#alert-error').hide();
    		
    		/* Make visible the chunk of properties associated to the selectedDocumentType */
    		$('#cardDocumentDetails').fadeIn('slow');
    		$scope.setVisibleDetailsChunk(docType);

    		$("body").removeClass("loading");

    	},function (error){
    		if (error.data != null)
    			$scope.msg = error.data.description;
    		else 
    			$scope.msg = error.message;
    		
    		$('#alert-success').hide();
    		$('#alert-error').show();
    		$("body").removeClass("loading");
    	});
		
		$('#cardDocumentDetails').fadeIn('slow');
	};
	
	
	$scope.fillAttrbsToRetrieve = function(docType) {
		
		var attrList = "";

		switch(docType) {
		    case "0":
		    	//Regulation		    	
		    	attrList = "regulationType,regulationNumber,descriptors," +
		    			"technicalCommittee,editingDate,numOfPages,language,country,identifyEN";
		        break;
		    case "1":
		    	//Legislation
		    	attrList = "descriptors,legalAssessment,link,country,publicationDate,documentOrigin";
		        break;
		    case "2":
		    	//Patent
		    	attrList = "descriptors,date";
		        break;
		    case "3":
		    	//Report
		    	attrList = "authors,dateOfDocument,country,descriptors";
		        break;
		    default:
		    	break;
//		    code,title,description,dateEntry,dateUpdate ARE MAINATTR
		}
		
		return attrList;
	};
	
	
	$scope.setVisibleDetailsChunk = function (docType) {
		
		for (i = 0; i < 4; i++) {
			$('#detailsChunk' + i).addClass('d-none');
		}
		
		$('#detailsChunk' + docType).removeClass('d-none');
	};
	
	
	$scope.formatOutDate = function(date) {
		/*
		 * Dates returned from server are formatted "yyyy-mm-dd hh:MM:ss"
		 * They should be converted to var dateFormat = "dd-mm-yyyy"
		 */
		var posBlank = date.indexOf(" ");
		if (posBlank != -1) {
			date = date.substring(0, posBlank);
		}

		const [year, month, day] = date.split("-");
		
	    var dateOut = dateFormat;
	    var dateOut = dateOut.replace("yyyy", year);
	    var dateOut = dateOut.replace("mm", month);
	    var dateOut = dateOut.replace("dd", day);

		return dateOut;
	};
	
	
	$scope.$on('$viewContentLoaded', function(){
		$('#wrapper').localize();
	});

}]);
