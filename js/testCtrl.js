angular.module('nimsys').controller('TestCtrl',
		['$scope','$rootScope','$localStorage','$http','$location','$window','$httpParamSerializer', function($scope,$rootScope,$localStorage,$http,$location,$window,$httpParamSerializer) {
	
	$scope.msg = [];
	
	
	$scope.pages = [{value: 1, text: '1' },
	                {value: 2, text: '2' },
	                {value: 3, text: '3' }];
	
	
	$scope.limitVisiblePages = 4;
	
//	$scope.numPages = 8;
	
	
	$scope.filteredResults = [{"mainAttr":{"documentId":95290,"code":"UNE-ISO 5636-5:2015","title":"PAPEL Y CARTÓN. DETERMINACIÓN DE LA PERMEANCIA AL AIRE (RANGO MEDIO). PARTE 5. METODO GURLEY","dateEntry":"2015-07-24 00:00:00.0"}},{"mainAttr":{"documentId":95289,"code":"UNE-ISO 5636-3:2015","title":"PAPEL Y CARTÓN. DETERMINACIÓN DE LA PERMEANCIA AL AIRE (RANGO MEDIO). PARTE 3. MÉTODO BENDTSEN","dateEntry":"2015-07-24 00:00:00.0"}},{"mainAttr":{"documentId":93786,"code":"DIN 68861-4:2013","title":"MOBELOBERFLACHEN. TEIL 4: VERHALTEN BEI KRATZBEANSPRUCHUNG. FURNITURE SURFACES,. BEHAVIOUR SCRATCHES","dateEntry":"2015-05-14 00:00:00.0"}}];
	
	
	$scope.results = [{"mainAttr":{"documentId":95290,"code":"UNE-ISO 5636-5:2015","title":"PAPEL Y CARTÓN. DETERMINACIÓN DE LA PERMEANCIA AL AIRE (RANGO MEDIO). PARTE 5. METODO GURLEY","dateEntry":"2015-07-24 00:00:00.0"}},{"mainAttr":{"documentId":95289,"code":"UNE-ISO 5636-3:2015","title":"PAPEL Y CARTÓN. DETERMINACIÓN DE LA PERMEANCIA AL AIRE (RANGO MEDIO). PARTE 3. MÉTODO BENDTSEN","dateEntry":"2015-07-24 00:00:00.0"}},{"mainAttr":{"documentId":93786,"code":"DIN 68861-4:2013","title":"MOBELOBERFLACHEN. TEIL 4: VERHALTEN BEI KRATZBEANSPRUCHUNG. FURNITURE SURFACES,. BEHAVIOUR SCRATCHES","dateEntry":"2015-05-14 00:00:00.0"}},{"mainAttr":{"documentId":93768,"code":"DIN 68861-2:2013","title":"MOBELOBERFLACHEN. TEIL 2. VERHALTEN BEI ABRIEBBEANSPRUCHUNG. FURNITURE SURFACES. BEHAVIOR AT ABRASION","dateEntry":"2015-05-14 00:00:00.0"}},{"mainAttr":{"documentId":33442,"code":"64","title":"PAPEL Y CARTON PARA CONTACTO ALIMENTARIO. DETERMINACIÓN DE LA SOLIDEZ DE PAPELES Y CARTONES TRATADOS CON BLANQUEANTES FLUORESCENTES","dateEntry":"2007-04-11 00:00:00.0"}},{"mainAttr":{"documentId":19640,"code":"648","title":"PAPEL Y CARTON PARA CONTACTO ALIMENTARIO. DETERMINACION DE LA SOLIDEZ DE PAPELES Y CARTONES TRATADOS CON BLANQUEANTES FLUORESCENTES","dateEntry":"2006-05-19 00:00:00.0"}},{"mainAttr":{"documentId":20035,"code":"3175-20035","title":"TEXTILES. MANTENIMIENTO PROFESIONAL, LIMPIEZA EN SECO Y LIMPIEZA EN HUMEDO DE TEJIDOS Y PRENDAS DE VESTIR. PROCEDIMIENTO PARA EL ENSAYO DE RENDIMIENTO CUANDO LA LIMPIEZA Y EL ACABADO EMPLEAN LA LIMPIEZA EN HUMEDO SIMULADA.","dateEntry":"2004-09-21 00:00:00.0"}},{"mainAttr":{"documentId":20178,"code":"13526","title":"EMISIONES DE FUENTES ESTACIONARIAS. DETERMINACION MASICA DE CARBONO ORGANICO GASEOSO TOTAL EN GASES EFLUENTES DE PROCESOS QUE EMPLEAN DISOLVENTES. METODO CONTINUO POR DETECTOR DE IONIZACION DE LLAMA.","dateEntry":"2004-02-10 00:00:00.0"}},{"mainAttr":{"documentId":20512,"code":"10551","title":"ERGONOMIA DEL AMBIENTE TECNICO. EVALUACION DE LA INFLUENCIA DEL AMBIENTE EMPLEANDO ESCALAS DE JUICIO SUBJETIVO","dateEntry":"2002-04-24 00:00:00.0"}},{"mainAttr":{"documentId":22991,"code":"5651","title":"CLEANSING AND WETTING PROCEDURES FOR USE IN THE ASSESSMENT OF THE EFFECT OF CLEANSING AND WETTING ON THE FLAMMABILITY OF TEXTILE FABRICS.","dateEntry":"2000-03-09 00:00:00.0"}},{"mainAttr":{"documentId":22772,"code":"1333-22772","title":"EMBERO (LOVOA KLAINEANA Y SIMILARES).","dateEntry":"2000-03-09 00:00:00.0"}},{"mainAttr":{"documentId":21186,"code":"2431","title":"PINTURAS Y BARNICES. DETERMINACION DEL TIEMPO DE FLUJO EMPLEANDO COPÀS DE FLUJO","dateEntry":"1996-11-29 00:00:00.0"}},{"mainAttr":{"documentId":21612,"code":"68861-21612","title":"MOBELOBERFLACHEN. VERHALTEN BEI CHEMISCHER BEANSPRUCHUNG","dateEntry":"1992-11-02 00:00:00.0"}},{"mainAttr":{"documentId":21611,"code":"68861-21611","title":"MOBELOBERFLACHEN. VERHALTEN BEI KRATZBEANSPRUCHUNG","dateEntry":"1992-11-02 00:00:00.0"}},{"mainAttr":{"documentId":21610,"code":"68861-21610","title":"MOBELOBERFLACHEN. VERHALTEN BEI ABRIEBBEANSPRUCHUNG","dateEntry":"1992-11-02 00:00:00.0"}}];
	
	
	
	$scope.actualizar = function() {
		$scope.filteredResults = [{"mainAttr":{"documentId":95290,"code":"UNE-ISO 5636-5:2015","title":"OTRO NUEVO","dateEntry":"2015-07-24 00:00:00.0"}},{"mainAttr":{"documentId":95289,"code":"UNE-ISO 5636-3:2015","title":"PAPEL Y CARTÓN. DETERMINACIÓN DE LA PERMEANCIA AL AIRE (RANGO MEDIO). PARTE 3. MÉTODO BENDTSEN","dateEntry":"2015-07-24 00:00:00.0"}},{"mainAttr":{"documentId":93786,"code":"DIN 68861-4:2013","title":"MOBELOBERFLACHEN. TEIL 4: VERHALTEN BEI KRATZBEANSPRUCHUNG. FURNITURE SURFACES,. BEHAVIOUR SCRATCHES","dateEntry":"2015-05-14 00:00:00.0"}}];
	}
	
	
	
	$scope.createPages = function(np) {
		$scope.pages = [];
		
		for (var i=0; i<np; i++) {
			$scope.pages.push({value: i+1, text: i+1});
		}
	}


}]);
