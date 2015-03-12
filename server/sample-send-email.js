var triggerEmail = require('./components/emails/trigger-email.js');

triggerEmail(
  "hello@richardkho.com",
  {
    origin: "Los Angeles",
    destination: "San Diego",
    price: 123.45,
    carrier: "Virgin America",
    departure: "01/23/16 at 3PM",
    proceedUrl: "http://virginamerica.com"
  },
  {
    success: function(){
    	//Update user in database: set 'sent' to true.
      console.log("!Success!");
    },
    error: function(err){
      console.log("An error occured:", err);
    }
  }
);