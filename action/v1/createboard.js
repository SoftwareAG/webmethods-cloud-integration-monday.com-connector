const request = require('request');
module.exports = {

  name: "createboard",

  title: "Create Board",

  description: "",
  version: "v1",

  input:{
    title: "Createboard",
    type: "object",
    properties: {
      "boardName":{
        "title": "Board Name",
        "type":"string"
      },
      "boardKind":{
        "title": "Board Kind",
        "type":"string",
        "lookup":{
          "id":"boardkind"
        }
      },
      "workspaceID":{
        "title": "Workspace ID",
        "type":"string"
      },
      "templateID":{
        "title": "Template ID",
        "type":"string"
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

    
 //const boardName = +input.boardName+

 /*  const query =JSON.stringify({
    query: `mutation {
      create_board (board_name: "my board tester", board_kind: public, workspace_id:148197, template_id:105719924) {
      id
      }
      }
    `}) */
    var query = `mutation CreateBoard($boardName:String!, $boardKind:BoardKind!, $workspaceID:Int!, $templateID:Int!){
      create_board (board_name:$boardName, board_kind:$boardKind, workspace_id:$workspaceID, template_id:$templateID) {
      id
      }
      }
    `;
    var workspaceID= parseInt(input.workspaceID);
    var templateID= parseInt(input.templateID);
      

    request({
      "url":'https://api.monday.com/v2',
      "method": 'POST',
      "headers": {
          "Content-type": "application/json",
          "Authorization": input.auth.api_key
      },
     
      
      "body":JSON.stringify({query:query,variables:{boardName:input.boardName, boardKind:input.boardKind, workspaceID:workspaceID, templateID:templateID }})
        
      
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
