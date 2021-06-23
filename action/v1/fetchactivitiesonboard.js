const request = require('request');
module.exports = {

  name: "fetchactivitiesonboard",

  title: "Fetch Activities on Board",

  description: "",
  version: "v1",

  input:{
    title: "Fetchactivitiesonboard",
    type: "object",
    properties: {
      "boardID":{
      "title":"Board ID",
      "type":"string",
      "displayTitle": "Board ID",
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
    request({
   url:'https://api.monday.com/v2',
   method: 'POST',
   headers: {
       "Content-type": "application/json",
       "Authorization": input.auth.api_key
   },
   body: JSON.stringify({"query" : "{boards(ids: "+input.boardID+") {activity_logs {id event data entity user_id}}}"}
   )
}, 
function (error,response, body) {
    
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
