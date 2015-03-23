var triggerSMS = require('./components/sms/trigger-sms.js');

triggerSMS(
  "15555555555",
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
      console.log("Success!");
    },
    error: function(err){
      console.log("An error occured:", err);
    }
  }
);
