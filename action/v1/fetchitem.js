const request = require('request');
module.exports = {

  name: "fetchitem",

  title: "Fetch Item",

  description: "",
  version: "v1",

  input:{
    title: "Fetchitem",
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
        "type":"string",
        "lookup":{
          "id": "fetchgroups"
      }
        },
      "itemID":{
        "title": "Item ID",
        "type":"string",
        "lookup":{
          "id": "fetchitems"
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
      body: JSON.stringify({"query": "{boards (ids: "+input.boardID+"){groups(ids:"+input.groupID+"){items(ids:"+input.itemID+"){id name group{id title} state column_values{id title value} updates{text_body updated_at}}}}}"})
        
        
      
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
  