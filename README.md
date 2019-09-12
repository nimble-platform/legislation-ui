# Regulation and legislation system of AIDIMME (UI)
This repository contains a UI for searching documents related to norms, laws and sectorial reports

## Obtain Source
The code of this repository represents a public frontend to access the documents stored in the regulation and legislation system managed by AIDIMME. The UI mainly consists of a collection of HTML, CSS and Javascript files implemented through frameworks and plugins such as AngularJS, Bootstrap 4 and JQuery, as well as additional libraries to cover the main functionalities of the frontend.

## How to run
The code can be cloned or downloaded from this repository without including the Javascript dependencies, which are managed through bower (https://bower.io). After installing bower, the command "bower install" installs all the project dependencies listed in the "bower.json" file. The downloaded files should be located under a folder named "bower_components" in order they to be reachable from the HTML files. Afterwards this, the whole project can be placed in a public web folder of a web server (i.e.: Apache Server, Apache Tomcat, IIS, JBoss, Glassfish).

## API access and Authentication mode
In the file 'js/loginFactory.js' it is implemented the factory 'UrlService'. This includes the following properties:
* root: the base URL where the server application hosting the API is running
* authMode: if its value is 'nimble', then the login is done through the nimble identity service. If its value is 'internal', then the login is done by the default authentication service provided by the API.
* nimbleIdentityServiceUrl: the url of the nimble login identity service

```javascript
angular.module('nimsys').factory('UrlService', function() {
	var props = {
		root : 'http://localhost:8080/nimsys',
		authMode : 'nimble', /* [internal | nimble] */
		nimbleIdentityServiceUrl: 'https://fmp-nimble.salzburgresearch.at/api/identity/login'
	};
	return {
		props
	};
});
```

The API manages an AuthenticationFilter class that filters the API requests in the server validating the authentication token provided by the user. The requests to the services of the API may include the parameter 'authMode' indicating if the the sent token is an internal or nimble generated token. By default, the authMode is set to internal.

## CORS and authentication
This issue may depend on the integration. The code is designed in order to allow access to the services to those permitted origins. Besides this, the access to the services are secured with an authentication filter. Actually the combination of both mechanisms is under testing, so maybe some adaptations could be required on server and client sides to enable a succesful access. It is needed to provide the domain where the frontend is published to give it access in the server side enabling the CORS.


## Development of alternative UI
The UI code included in this repository represents an example of frontend to access the documentation system of AIDIMME. However, the API defined and deployed in the web server enables the creation of any other custom frontend to access the system.

## Further actions
- The multilinguality functionality (English and Spanish by the moment) is under development.
- The downloading of documents is still under testing so further internal server authentications are currently involved.
- The code is actually subject to change to cover further functionalities as well as fixing detected bugs.
