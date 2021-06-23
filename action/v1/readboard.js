module.exports = {

  name: "readboard",

  title: "Readboard",

  description: "",
  version: "v1",

  input:{
    title: "Readboard",
    type: "object",
    properties: {

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

    output(null, { data : "OK"});
  }

}
