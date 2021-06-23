const request = require('request');

module.exports = {

  name: "fetchboardviews",

  title: "Fetch Board Views",

  description: "",
  version: "v1",

  input:{
    title: "Fetchboardviews",
    type: "object",
    properties: {
      "boardID":{
        "title": "Board ID",
        "type":"string",
        "lookup":{
          "id": "fetchboards"
        }
      }

    }
  },

  output: {
    title: "output",
  	type: "object",
  	properties: {
  }
  },

  mock_input:{
    "api_key":"my api key"
  },

  execute: function(input, output){
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here
    request({
      url:'https://api.monday.com/v2',
      method: 'POST',
      headers: {
          "Content-type": "application/json",
          "Authorization": input.auth.api_key
      },
      body: JSON.stringify({"query":"{boards (ids: "+input.boardID+") {views {id name type} }}"})
      
  }, function (error,response, body) {
    
    if (error) {
      return output(error)
  
      }
      if (response.statusCode >= 200 && response.statusCode < 400) {
        output(null,{responseBody:JSON.parse(body)})}
        else {
          return output(body)
        };
  }
  )
  } 
  }
  