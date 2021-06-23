module.exports = {

  name: "abc",

  label: "Abc",

  version: "v1",

  input: {
    type: "object",
    title: "Abc",
    description: "Short description",
    properties: {
      event: {
        type: "string",
        enum: ["abc"],
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
    "abc": {
      type: "object",
      properties: {

      }
    }
  },

  mock_data: {}, // output of trigger data

  mock_input: {},

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
