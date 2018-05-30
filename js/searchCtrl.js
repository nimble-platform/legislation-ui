angular.module('nimsys').controller('SearchCtrl',
		['$scope','$rootScope','$localStorage','$http','$location','$window','$httpParamSerializer','$state', 'UrlService', function($scope,$rootScope,$localStorage,$http,$location,$window,$httpParamSerializer,$state,UrlService) {
	
	$scope.msg = [];
	
	$rootScope.user = $localStorage.user;
	$rootScope.sLan = localStorage.getItem('nimsysLan');
	
	$scope.search = [];
	
	$scope.search.mainAttr = [];
	$scope.search.specAttr = [];
	
	$scope.ormode = false;
	
//	$scope.optionsDocumentType = [{value: '0', label: 'Regulation'},{value: '1', label: 'Legislation'},{value: '2', label: 'Patent'},{value: '3', label: 'Sectorialreport'}];
	
	$scope.selectedDocumentType = []; /* INT */	
	
	/* RESULTS OF SEARCH */
	$scope.results = [];
	$scope.limit = [];
	
	$scope.filteredResults = [];
	$scope.currentPage = 1;
	$scope.numPerPage = 5;
	$scope.numVisiblePages = 8; /*max-size*/
	$scope.pagText = [];
	
	$scope.refresh = 0;

	$scope.selectedNumPages = [];
	$scope.maxTitleLength = 140; /*max visible chars of title in results*/
	
	$scope.sortByAttr = "dateEntry";
	$scope.optionsAttrbsToSortBy = ['dateEntry', 'code', 'title'];
	
	/* PATENT OPTIONS */
	$scope.optionsGeographicScope = [];
	$scope.optionsCountriesOfInterest = [];
	
	/* DETAILS OF DOCUMENT */
	$scope.selectedDocument = [];
	$scope.selectedDocumentId = "";
	$scope.downloadLink = "";


	angular.element(document).ready(function () {
		$scope.setVisibleCard("0");
    });
	
	
	$scope.init = function () {
		$scope.search.mainAttr.code = "";
		$scope.search.mainAttr.title = "";
		$scope.search.specAttr.regulationType = "UNE";
		$scope.search.specAttr.regulationNumber = "63";
		
		
//		$scope.sLan = localStorage.getItem('nimsysLan');
	};

	
	$scope.searchDocuments = function() {

		$('#cardDocumentDetails').fadeOut('slow');
		$('#alert-success').hide();
		$('#alert-error').hide();

		$("body").addClass("loading");
		
		var url = UrlService.root + "/rest/search/query";
		
		$scope.avoidEmptyParams();

		var queryMainAttr = {
			documentType: $scope.search.mainAttr.documentType,
			code: $scope.search.mainAttr.code,
			title: $scope.search.mainAttr.title,
			description: $scope.search.mainAttr.description
		};
		
		if (($scope.search.mainAttr.dateEntryFrom != null) && ($scope.search.mainAttr.dateEntryTo != null)) {
			$scope.search.mainAttr.dateEntryFromConv = $scope.convDate($scope.search.mainAttr.dateEntryFrom);
			$scope.search.mainAttr.dateEntryToConv = $scope.convDate($scope.search.mainAttr.dateEntryTo);
			
			queryMainAttr.dateEntry = $scope.search.mainAttr.dateEntryFromConv + "," + $scope.search.mainAttr.dateEntryToConv;
		}
		
		var querySpecAttr = $scope.setSpecAttr($scope.selectedDocumentType);
		
		var qs1 = $httpParamSerializer(queryMainAttr);
		var qs2 = $httpParamSerializer(querySpecAttr);
		var qs = "?" + qs1 + "&" + qs2;
		
		if ($scope.ormode) {
			qs += "&ormode=" + $scope.ormode;
		}
		
		var req = {
			method: 'GET',
			url: url + qs,
//			headers: {
//				'Authorization': 'Bearer ' + $scope.user.token
//			},
			params: {
				'aToken': 'Bearer ' + $scope.user.token
			}
		}
		
		console.log("QueryString: " + url + qs);
		
		$http(req).then(function (success){
			$scope.results = success.data;
			console.log("Search results:" + JSON.stringify($scope.results));

    		$scope.changeRefresh();

    		if ($scope.results.length > 0) {
    			$scope.msg = $scope.results.length + " documents found!";
    			$('#cardResults').fadeIn('slow');
    			$scope.scrollToResults();
    		} else {
    			$scope.msg = "No documents found :(";
    		}
    		
    		$('#alert-success').show();
    		$('#alert-error').hide();
    		$("body").removeClass("loading");
    		
    	},function (error){
    		if (error.data != null)    		
    			$scope.msg = error.data.message;
    		else 
    			$scope.msg = error.message;
    		
    		$('#alert-success').hide();
    		$('#alert-error').show();
    		$("body").removeClass("loading");
    	});
	}
	
	
	$scope.setSpecAttr = function(docType) {
		var querySpecAttr;
		switch(docType) {
		    case "0":
		    	//Regulation
		    	querySpecAttr = {
					regulationType: $scope.search.specAttr.regulationType,
					regulationNumber: $scope.search.specAttr.regulationNumber,
					descriptors: $scope.search.specAttr.descriptors0
				};
		        break;
		    case "1":
		    	//Legislation
		    	querySpecAttr = {
		    		descriptors: $scope.search.specAttr.descriptors1
		    	};
		        break;
		    case "2":
		    	//Patent
		    	querySpecAttr = {
		    		patentCode: $scope.search.specAttr.patentCode,
		    		company: $scope.search.specAttr.company,
		    		scope: $scope.search.specAttr.scope,
		    		countriesOfInterest: $scope.search.specAttr.countriesOfInterest,
		    		descriptors: $scope.search.specAttr.descriptors2
	    		};
		        break;
		    case "3":
		    	//Report
		    	querySpecAttr = {
		    		authors: $scope.search.specAttr.authors,
		    		country: $scope.search.specAttr.country,
		    		descriptors: $scope.search.specAttr.descriptors3
	    		};
		    	if (($scope.search.specAttr.dateOfDocumentFrom != null) && ($scope.search.specAttr.dateOfDocumentTo != null)) {
					$scope.search.specAttr.dateOfDocumentFromConv = $scope.convDate($scope.search.specAttr.dateOfDocumentFrom);
					$scope.search.specAttr.dateOfDocumentToConv = $scope.convDate($scope.search.specAttr.dateOfDocumentTo);
					
					querySpecAttr.dateOfDocument = $scope.search.specAttr.dateOfDocumentFromConv + "," + $scope.search.specAttr.dateOfDocumentToConv;
				}
		        break;
		    default:
		    	break;
		}
		return querySpecAttr;
	};
	
	
	$scope.convDate = function(date) {
		/* get positions of yyyy, mm and dd in format */
		var posy = dateFormat.indexOf("yyyy");
		var year = date.substring(posy, posy+4);

		var posm = dateFormat.indexOf("mm");
		var month = date.substring(posm, posm+2);

		var posd = dateFormat.indexOf("dd");
		var day = date.substring(posd, posd+2);

		return year + "-" + month + "-" + day;
	}

	
	$scope.setVisibleCard = function (docType) {
		$scope.selectedDocumentType = docType;
		
		$('#cardResults').fadeOut('slow');
		$('#cardDocumentDetails').fadeOut('slow');
		$scope.results = [];
		$scope.filteredResults = [];
		
		$('#cardContainer .card').hide();
		$('.btn-group .btn').removeClass('btn-nimblered');
		$('.btn-group .btn').addClass('btn-secondary');
		switch(docType) {
		    case "0":
		    	$scope.search.mainAttr.documentType = "Regulation";
		    	$('#cardAttr0').fadeIn('slow');
		    	$('#btn0').removeClass('btn-secondary');
		    	$('#btn0').addClass('btn-nimblered');
		        break;
		    case "1":
		    	$scope.search.mainAttr.documentType = "Legislation";
		    	$('#cardAttr1').fadeIn('slow');
		    	$('#btn1').removeClass('btn-secondary');
		    	$('#btn1').addClass('btn-nimblered');
		        break;
		    case "2":
		    	$scope.search.mainAttr.documentType = "Patent";
		    	$('#cardAttr2').fadeIn('slow');
		    	$('#btn2').removeClass('btn-secondary');
		    	$('#btn2').addClass('btn-nimblered');
		    	
		    	/* Load dropdown options */
		    	$scope.loadPatentOptions();
		        break;
		    case "3":
		    	$scope.search.mainAttr.documentType = "Report";
		    	$('#cardAttr3').fadeIn('slow');
		    	$('#btn3').removeClass('btn-secondary');
		    	$('#btn3').addClass('btn-nimblered');
		        break;
		    default:
		    	break;
		}
	};
	
	
	/*
	 * NORMATIVA
	 */
	
	/*
	 * LEGISLACION
	 */
	
	/*
	 * PATENTES
	 */
	$scope.loadPatentOptions = function() {
		
		$("body").addClass("loading");
		
		var url = UrlService.root + "/rest/patentoptions/get";
		
		var req = {
			method: 'GET',
			url: url,
//			headers: {
//				'Authorization': 'Bearer ' + $scope.user.token
//			},
			params: {
				'aToken': 'Bearer ' + $scope.user.token
			}
		}
		
		$http(req).then(function (success){
			console.log(success.data);
			
			$scope.optionsGeographicScope = success.data.optionsGeographicScope;
			$scope.optionsCountriesOfInterest = success.data.optionsCountriesOfInterest;
			
			$scope.msg = "Patent options succesfully loaded!";
    		$('#alert-success').show();
    		$('#alert-error').hide();
    		
    		$("body").removeClass("loading");
    	},function (error){
    		if (error.data != null)    		
    			$scope.msg = error.data.message;
    		else 
    			$scope.msg = error.message;
    		$('#alert-success').hide();
    		$('#alert-error').show();
    		
    		$("body").removeClass("loading");
    	});
		
	}
	
	
	
	/*
	 * INFORMES SECTORIALES
	 */
	

	
	/*
	 * RESULTS OF SEARCH
	 */
	$scope.pageCount = function () {
        return Math.ceil($scope.results.length / $scope.numPerPage);
    };
	
	$scope.$watch('refresh', function() {
	    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
	    , end = begin + $scope.numPerPage;
	    
	    $scope.filteredResults = $scope.results.slice(begin, end);
	});

	$scope.$watch('currentPage + numPerPage', function() {
	    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
	    , end = begin + $scope.numPerPage;
	    
	    $scope.filteredResults = $scope.results.slice(begin, end);
	});
	
	$scope.$watch('numPerPage', function() {
	    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
	    , end = begin + $scope.numPerPage;
	    
	    $scope.filteredResults = $scope.results.slice(begin, end);
	});
	
	$scope.changeRefresh = function() {
		if ($scope.refresh == 0) {
			$scope.refresh = 1;
		} else {
			$scope.refresh = 0;
		}
	}
	
	$scope.changeNumPages = function() {
		$scope.numPerPage = Number($scope.selectedNumPages);
	}
	
	$scope.scrollToResults = function() {
		$('html, body').animate({
	        scrollTop: $("#cardResults").offset().top
	    }, 1000);
	}
	
	
	$scope.scrollToSearch = function() {
		$('#cardResults').fadeOut('slow');
		$('#cardDocumentDetails').fadeOut('slow');
		$('#alert-success').hide();
		$('#alert-error').hide();
		window.scrollTo(0, 0);
	}
	
	
	$scope.scrollToDetails = function() {
		$('html, body').animate({
	        scrollTop: $("#cardDocumentDetails").offset().top
	    }, 1000);
	}

	
	$scope.loadDocumentDetails = function(idDoc) {
		$scope.selectedDocumentId = idDoc;
		$("body").addClass("loading");
		
		var docType = $scope.selectedDocumentType;
		var attrList = $scope.fillAttrbsToRetrieve(docType);

		var url = UrlService.root + "/rest/document/get/" + idDoc + "/" + attrList;
		console.log (url);
		
		var req = {
			method: 'GET',
			url: url,
//			headers: {
//				'Authorization': 'Bearer ' + $scope.user.token
//			},
			params: {
				'aToken': 'Bearer ' + $scope.user.token
			}
		}
		
		$http(req).then(function (success){
			$scope.selectedDocument = success.data;
			console.log("Document details:" + JSON.stringify(success.data));
    		$scope.msg = "Document loaded succesfully!";
    		
    		/* Fix some properties */
    		$scope.downloadLink = $scope.generateDownloadLink(idDoc, $scope.selectedDocument.specAttr.urldocu, docType);

    		
    		$scope.scrollToDetails();
    		
    		$('#alert-success').show();
    		$('#alert-error').hide();
    		
    		/* Make visible the chunk of properties associated to the selectedDocumentType */
    		$('#cardDocumentDetails').fadeIn('slow');
    		$scope.setVisibleDetailsChunk(docType);

    		$("body").removeClass("loading");

    	},function (error){
    		if (error.data != null)
    			$scope.msg = error.data.message;
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
	
	
	$scope.openDocumentTab = function (docType, idDoc) {
		var url = $state.href('docDetails', {docType: docType, idDoc: idDoc});
		window.open(url,'_blank');
	};
	

	$scope.sortResults = function() {
		
		var data = $scope.results;
		
		data.sort(function(a, b) {
		    return a.mainAttr[$scope.sortByAttr] > b.mainAttr[$scope.sortByAttr];
		});
		
		data.sort();
		console.log(JSON.stringify(data, 0, 4));
		
		// The table of results should reloaded
		$scope.results = data;
		$scope.changeRefresh();		
	}

	
	$scope.avoidEmptyParams = function() {
		
		$scope.search.mainAttr.dateEntryFrom = $scope.makeNullIfEmpty($scope.search.mainAttr.dateEntryFrom);
		$scope.search.mainAttr.dateEntryTo = $scope.makeNullIfEmpty($scope.search.mainAttr.dateEntryTo);

		$scope.search.mainAttr.code = $scope.makeNullIfEmpty($scope.search.mainAttr.code);
		$scope.search.mainAttr.title = $scope.makeNullIfEmpty($scope.search.mainAttr.title);
		$scope.search.mainAttr.description = $scope.makeNullIfEmpty($scope.search.mainAttr.description);
		
		$scope.search.dateEntryFromConv = $scope.makeNullIfEmpty($scope.search.dateEntryFromConv);
		$scope.search.dateEntryToConv = $scope.makeNullIfEmpty($scope.search.dateEntryToConv);

		$scope.search.specAttr.regulationType = $scope.makeNullIfEmpty($scope.search.specAttr.regulationType);
		$scope.search.specAttr.regulationNumber = $scope.makeNullIfEmpty($scope.search.specAttr.regulationNumber);
		
		$scope.search.specAttr.descriptors0 = $scope.makeNullIfEmpty($scope.search.specAttr.descriptors0);
		$scope.search.specAttr.descriptors1 = $scope.makeNullIfEmpty($scope.search.specAttr.descriptors1);
		$scope.search.specAttr.patentCode = $scope.makeNullIfEmpty($scope.search.specAttr.patentCode);
		$scope.search.specAttr.company = $scope.makeNullIfEmpty($scope.search.specAttr.company);
		$scope.search.specAttr.scope = $scope.makeNullIfEmpty($scope.search.specAttr.scope);
		$scope.search.specAttr.countriesOfInterest = $scope.makeNullIfEmpty($scope.search.specAttr.countriesOfInterest);
		$scope.search.specAttr.descriptors2 = $scope.makeNullIfEmpty($scope.search.specAttr.descriptors2);
		$scope.search.specAttr.authors = $scope.makeNullIfEmpty($scope.search.specAttr.authors);
		
		$scope.search.specAttr.dateOfDocumentFrom = $scope.makeNullIfEmpty($scope.search.specAttr.dateOfDocumentFrom);
		$scope.search.specAttr.dateOfDocumentTo = $scope.makeNullIfEmpty($scope.search.specAttr.dateOfDocumentTo);

		$scope.search.specAttr.country = $scope.makeNullIfEmpty($scope.search.specAttr.country);
		$scope.search.specAttr.descriptors3 = $scope.makeNullIfEmpty($scope.search.specAttr.descriptors3);
	};
	
	
	$scope.makeNullIfEmpty = function(param) {
		
		if ((param == "") || (param == "--") || (param == undefined)) {
			return null;
		} else {
			return param;
		}
	};
	
	
	$scope.truncateText = function(text) {
		if (text.length > $scope.maxTitleLength) {
			var myTruncatedText = text.substring(0,$scope.maxTitleLength);
			return myTruncatedText + "...";
		} else {
			return text;
		}
	};
	
	
	$scope.formatOutDate = function(date) {
		/*
		 * Dates returned from server are formatted "yyyy-mm-dd hh:MM:ss"
		 * They should be converted to var dateFormat = "dd-mm-yyyy"
		 */
		if (date != null && date != undefined) {		
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
		} else {
			return "";
		}
	};
	
	
	$scope.generateDownloadLink = function(idDoc, urldocu, docType) {
		
		var path = "";
		
		switch(docType) {
		    case "0":
		    	/* Normative */
		    	path = "AdaptingDocuments\\Conocimiento%5CFondo+Documental%5CNormativa\\";
		    	
		        break;
		    case "1":
		    	/* Legislation */
		    	
		        break;
		    case "3":
		    	/* Report */
		    	path = "AdaptingDocuments\\Conocimiento%5CFondo+Documental%5CInformes+Sectoriales\\";
		    	
		        break;
		    default:
		    	break;
		}
		
		var dl = "http://aidimadocs.aidima.es/AdaptingDocuments/adminis/busqueda/DescargaDocumento.asp" +
			"?IdDocumento=" + idDoc + "&doc=" + urldocu + "&path=" + path;
		
		if (urldocu == null) {
			return "empty";
		}

		return dl;
	}
	
	
	$scope.showDocumentType = function(docType) {
		
		switch(docType) {
		    case "0":
		    	return "Normative";
		        break;
		    case "1":
		    	return "Legislation";
		        break;
		    case "2":
		    	return "Patent";
		        break;
		    case "3":
		    	return "Report";
		        break;
		    default:
		    	break;
		}
	};
	
	
	$scope.$on('$viewContentLoaded', function(){

	    $('.container').localize();
	    
	    /* Translate pagination buttons */
		$scope.pagText.first = i18next.t('search.pagination.first');
		$scope.pagText.last = i18next.t('search.pagination.last');
		$scope.pagText.previous = i18next.t('search.pagination.previous');
		$scope.pagText.next = i18next.t('search.pagination.next');
	});

}]);
