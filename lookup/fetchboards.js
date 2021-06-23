const request = require('request');

module.exports = { 

	"name":"fetchboards",
  
	"label":"Fetchboards",
	  // add input data lookup will depend on for
	  // eg: if auth is oauth so add access_token inside auth object-
	  // you can also add other input properties which are mentioned in action/trigger
	  "mock_input": {
		"api_key":"my api key",
		  "auth": { }
	  },
	  "search": false,
	"execute": function (input, options, output){
		// to access auth info use input.auth , eg: input.auth.username
		// and to return output use output callback like this output(null, [{ id : "item_id", value : "Item Title"}])
		// output should be an array of objects containing id and value keys.
	  // your code goes here
		
	  request({
		"url":'https://api.monday.com/v2',
		"method": 'POST',
		"headers": {
			"Content-type": "application/json",
			"Authorization": input.auth.api_key
		},
		"body": JSON.stringify({"query" : "{boards (limit:500){id name}}"})
		
		  
		
	}, function (error,response, body) {
		var results = [];
		if (error) {
	  		return output(error)
  
		  }
		
	 	if (response.statusCode >= 200 && response.statusCode < 400) {
			var responseData = JSON.parse(body);
			var bodydata = responseData.data;
			var lookupResult = {
				results: [],
				next_page: false
			}
			for (var i=0;i<bodydata.boards.length;i++)
				{  
					results.push({
						"id": bodydata.boards[i].id,
						"value": bodydata.boards[i].name
					})
				}
				var pageId = Number(input.page) || 0;
				var MAX_RESULTS = 100
	
				var data = results.slice(((pageId) * MAX_RESULTS), (pageId + 1) * MAX_RESULTS)
				lookupResult.results = data
				if (((pageId + 1) * MAX_RESULTS) >= results.length) {
					lookupResult.next_page = false
				} else {
					lookupResult.next_page = true
				}
			output(null,lookupResult)
				
	}
	else {
		if (response && response.statusCode == 504) {
			return output("Something went wrong. Please try again later.");
		} else {
			if (body && body.message) {
				return output(body.message)
			} else {
				return output(body)
			}
		}
	}
	}

	  )} 
}	  

