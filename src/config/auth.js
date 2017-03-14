// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

  'facebookAuth': {
    'clientID': '630724287121611', // your App ID
    'clientSecret': '39b0e9bbb91cdb757f264099dff78b0b', // your App Secret
    'callbackURL': 'http://localhost:3000/auth/facebook/callback'
  },

  // 'twitterAuth' : {
  //     'consumerKey'       : 'your-consumer-key-here',
  //     'consumerSecret'    : 'your-client-secret-here',
  //     'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
  // },

  // 'googleAuth' : {
  //     'clientID'      : 'your-secret-clientID-here',
  //     'clientSecret'  : 'your-client-secret-here',
  //     'callbackURL'   : 'http://localhost:8080/auth/google/callback'
  // }

};