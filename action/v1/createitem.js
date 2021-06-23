const request = require('request');
module.exports = {

  name: "createitem",

  title: "Create Item",

  description: "",
  version: "v1",

  input:{
    title: "Createitem",
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
        
      },

      "itemName":{
        "title": "Item Name",
        "type":"string"        
        }
      },

    
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

      var query = `mutation CreateItem($boardID:Int!, $groupID:String!, $itemName:String!){
        create_item (board_id: $boardID, group_id: $groupID, item_name: $itemName) {
        id
        }
        }`;
    
    var boardID=parseInt(input.boardID);

    request({
      "url":'https://api.monday.com/v2',
      "method": 'POST',
      "headers": {
          "Content-type": "application/json",
          "Authorization": input.auth.api_key
      },

      
      "body":JSON.stringify({query:query,variables:{boardID:boardID, groupID:input.groupID, itemName:input.itemName }})
        
      
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
