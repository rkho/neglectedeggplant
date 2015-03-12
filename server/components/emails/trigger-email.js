/*******************************************
 Builds and sends a HTML email to the user.
********************************************

Parameters:
  - Recipient {String}: User email address - E.g. johndoe@gmail.com.
  - Flight Data {Object}:
      origin: {String} - E.g. LAX / Los Angeles.
      destination: {String} - E.g. SAN / San Diego.
      price: {Float} - E.g. 123.45.
      carrier: {String} - E.g. Virgin America.
      departure: {String} - E.g. Saturday, 5th June at 10:30AM.
      proceedUrl: {String} - Where the CTA button sends the user.
  - Callbacks {Object}: An object containing 'success' and 'error' properties pointing to functions. 

Example usage:

triggerEmail(
  "johndoe@gmail.com",
  {
    origin: "Los Angeles",
    destination: "San Diego",
    price: 123.45,
    carrier: "Virgin America",
    departure: "01/23/16 at 3PM"
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

var sendgrid  = require('sendgrid')(process.env['SENDGRID_API_USER'], process.env['SENDGRID_API_PW']);
var fs = require('fs');

var triggerEmail = function(recipient, emailData, callbacks){

  //Open template.html
  fs.readFile(__dirname + "/template.html", function(err, data){
  
    if (err) callbacks.error("Couldn't read template.html");
    
    var template = data.toString();

    //Replace template variables with our data
    for (key in emailData){
      var re = new RegExp('{{ ' + key + ' }}', 'g');
      template = template.replace(re, emailData[key]);
    }

    //Send the email
    sendgrid.send({
      to:       recipient,
      from:     'notifications@wayfare.com',
      subject:  'We found a flight!',
      html:     template
    }, function(err, json) {
      
      if (err){

        //Trigger error callback
        //This handles errors from SendGrid (including invalid email addresses)
        callbacks.error(err);

      }else{

        if (json.message === "success"){

          //Trigger success callback
          callbacks.success();
        
        };

      };

    });
      
  });

};

module.exports = triggerEmail;