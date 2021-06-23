const request = require('request');
module.exports = {

  name: "fetchboard",

  label: "Fetch Board",

  version: "v1",

  input: {
    type: "object",
    title: "Fetch Board",
    description: "Short description",
    properties: {
      "boardID":{
        "title":"Board ID",
        "type":"string",
        "displayTitle": "Board ID",
        "lookup":{
          "id": "fetchboards"
        }
  
      },
      event: {
        type: "string",
        enum: ["fetchboard"],
        isExecute: true
      },
      polling: {
        type: "boolean",
        default: true,
        options: {
          hidden: true
        }
      }
    }
  },

  output: {
    "fetchboard": {
      type: "object",
      properties: {

      }
    }
  },

  mock_data: {}, // output of trigger data

  mock_input: {
    "api_key":"my api key"
  },

  getUserData: function (input, options, output) {
    // will be called when testing trigger before it is created
    // return the actual data from your service which will be used for
    // creating output schema and it should be flat output json
    return output(null, []);
  },

  execute: function (input, options, output) {
    // will be called every 5 minutes
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, [{ mykey : "key", value : "My Val"}])
    // output should be an array of objects or an empty array.

    // your code here

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

    output(null, []);

  },

  activate: function (input, options, output) {
    // this function will be called whenever user activate or reactivates flow
    // to access auth info use input.auth , eg: input.auth.username
    // you can use this function to reset your cursor or timestamp

    // your code goes here

    output(null, true);
  },

  validate: function (input, options, output) {
    // will be called when trigger is created 1st time
    // to access auth info use input.auth , eg: input.auth.username
    // to successfully validate auth info and other parameter provided by user call output(null, true)
    // in case auth or other info is invalid, prevent creating trigger by sending error output("Username or password is invalid")

    // your code goes here

    output(null, true);
  }
}
