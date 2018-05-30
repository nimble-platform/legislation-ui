# Regulation and legislation system of AIDIMME (UI)
This repository contains a UI for searching documents related to norms, laws and sectorial reports

## Obtain Source
The code of this repository represents a public frontend to access the documents stored in the system managed by AIDIMME. This can be downloaded and located in a public folder in any web server. This UI consists mainly of a collection of HTML and Javascript files with strong dependencies to frameworks and plugins such as AngularJS, Bootstrap v4, JQuery and additional specific ones covering the main UI functionalities.

## How to run
Once the code is downloaded, this should be placed in a folder under a public web folder of any server (i.e.: Apache Server, Apache Tomcat, IIS, JBoss, Glassfish).

## API access
The code points to the URL where the server application is running. This server application contains the API that enables the UI exploiting the main services, such as authentication, search documents or get document details. This URL is specified in the top of the file "js/loginFactory.js", in the defined service:

```javascript
angular.module('nimsys').factory('UrlService', function() {
	return {
		root : 'http://83.136.188.223/nimsys'
	};
});
```

## CORS and authentication
This issue may depend on the integration. The code is designed in order to allow access to the services to those permitted origins. Besides this, the access to the services are secured with an authentication filter. Actually the combination of both mechanisms is under testing, so maybe some adaptations could be required on server and client sides to enable a succesful access. It is needed to provide the domain where the frontend is published to give it access in the server side enabling the CORS.


## Development of alternative UI
The UI code included in this repository represents an example of client frontend to access the documentation system of AIDIMME. However, the API defined and deployed in the web server enables the creation of any other custom frontend to access the system.

## Further actions
- The multilanguage functionality (English and Spanish by the moment) is under development.
- The management of specific date properties depending on the document type is pending implementation.
- The downloading of documents is still under testing.
- The code is actually subject to change to cover further funcitonalities and fix detected bugs.
