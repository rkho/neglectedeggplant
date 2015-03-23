/*******************************************
 Sends an SMS text to the user.
********************************************

Parameters:
  - RecipientPhone {String}: User phone number - E.g. 1(555)555-5555.
  - Flight Data {Object}:
      origin: {String} - E.g. LAX / Los Angeles.
      destination: {String} - E.g. SAN / San Diego.
      price: {Float} - E.g. 123.45.
      carrier: {String} - E.g. Virgin America.
      departure: {String} - E.g. Saturday, 5th June at 10:30AM.
      proceedUrl: {String} - Where the CTA button sends the user.
  - Callbacks {Object}: An object containing 'success' and 'error' properties pointing to functions.

Example usage:

triggerSMS(
  "johndoe@gmail.com",
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

*******************************************/

var twilio  = require('twilio')(process.env['TWILIO_ACCOUNT_SID'], process.env['TWILIO_AUTH_TOKEN']);

var triggerSMS = function(recipientPhone, smsData, callbacks){

    var messageBody = 'Greetings from Wayfare! We found a flight from '
                  + smsData.origin + ' to ' + smsData.destination + ' for ' + smsData.price + '. '
                  + 'To book a flight with ' + smsData.carrier + ' departing at ' + smsData.departure +
                  + ' visit ' + smsData.proceedUrl;

    //Send an SMS text message
    client.sendMessage({

        to:     recipientPhone, // Any number Twilio can deliver to
        from:   process.env['TWILIO_PHONE_NUMBER'], // A number you bought from Twilio and can use for outbound communication
        body:   messageBody// body of the SMS message

    }, function(err, responseData) { //this function is executed when a response is received from Twilio

        if (!err) { // "err" is an error received during the request, if any

            // "responseData" is a JavaScript object containing data received from Twilio.
            // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
            // http://www.twilio.com/docs/api/rest/sending-sms#example-1

            console.log(responseData.from); // outputs your Twilio phone number
            console.log(responseData.body); // outputs messageBody

            //Trigger success callback
            callbacks.success();
        }
    });

module.exports = triggerEmail;
