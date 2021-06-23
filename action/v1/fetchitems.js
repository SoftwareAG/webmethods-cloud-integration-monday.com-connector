const request = require('request');
module.exports = {

  name: "fetchitems",

  title: "Fetch Items",

  description: "",
  version: "v1",

  input:{
    title: "Fetchitems",
    type: "object",
    properties: {
      "boardID":{
        "title": "Board ID",
        "type":"string",
        "lookup":{
          "id": "fetchboards"
        }
      },
      "groupID":{
        "title": "Group ID",
        "type":"string",
        "lookup":{
          "id": "fetchgroups"
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
      body: JSON.stringify({"query": "{boards(ids: "+input.boardID+"){groups(ids:"+input.groupID+"){items{id name group{id title} column_values {id title value} updates{text_body updated_at}}}}}"})
        
        
      
  }, function (error,response, body) {
    
  if (error) {
    return output(error)

    }
	output(null,{responseBody:JSON.parse(body)});
}
)
} 
}
