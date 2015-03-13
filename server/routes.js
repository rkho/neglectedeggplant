/**
 * Main application routes
 */

'use strict';
var User = require('./db/schema.js');
var errors = require('./components/errors');
var request = require('request') // The express method for requesting data from an API
module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  // Sky Scanner requires a session POST request before you can access their API
  // the sessions options below are required to proceed to data fetching

  // var SkyScannerSessionOptions = {
  //   apiKey: '',
  //   url: 'http://partners.api.skyscanner.net/apiservices/pricing/v1.0',
  //   header: {
  //    'Content-Type': 'application/x-www-form-urlencoded',
  //    'Accept': 'application/json'
  //   },
  //   country: '',
  //   locale: '',
  //   originplace: '',
  //   destinationplace: '',
  //   method : 'GET',
  //   inbounddate: '',
  //   outbounddate: '',
  // };

  //  TODO: change '/postToAPIForFlightData' to the actual URL for our site
  app.get('/getflights', function(req, res) {

    User.findAll().then(function(user) {
      console.log(user);
    }).then(function(){
      res.send(200)
    })

  // POST to Google's QPX API
  // Google QPX options requires only the standard options object
    var key = 'key=' + ourAPIkey;

    // variables must be on the req.body to fill in the origin, destination, data and maxPrice
    var QPXOptions = {
      // Adds our API key to the end of the url for our post to the API
      'url': 'https://www.googleapis.com/qpxExpress/v1/trips/search?' + key,
      'request': {
        'slice': [
          {
            'origin': req.body.origin, // Ex: 'SFO'
            'destination': req.body.destination, // 'LAX'
            'date': req.body.date // '2015-06-01'
          }
        ],
        'passengers': {
          'adultCount': 1, // Will always be one
          'infantInLapCount': 0, // Default other passenger options to 0 for MVP
          'infantInSeatCount': 0,
          'childCount': 0,
          'seniorCount': 0
        },
        'solutions': 5, // We really only need 1 solution for MVP
        'maxPrice': req.body.maxPrice, // 'USD100.00'
        'refundable': false // Default to false
      }
    };

    //  Sends the request to QPX
    request.post(QPXOptions, function(err, res, body) {
      if(err) {
        console.error(err);
      }

      // For now just log out the successful res.body
      console.log(body);
      // TODO: add logic to send an email when a successful response occurs
      // add code here


      // var saleTotal  = response.trips.tripOption[0].pricing[0].saleTotal; //"USD69.00"
      // var budget = user.budget;

      //if (saleTotal === budget) {
        var user = /*...*/;
        user.sent = true;
        user.save().then(function() {
          //send email
        });
      // }
    });


   // POST to Sky Scanner API
   // request.post(SkyScannerSessionOptions, function(err, res, body) {
   //  console.log(body)
   //  var skyScanneroptions = {
   //    apiKey: '',
   //    originairports: '',
   //    destinationairports: '',
   //    url: 'http://partners.api.skyscanner.net/apiservices/pricing/v1.0/{' + res.headers.Location + '}?apiKey={apiKey}'
   //  };
   //  request(skySkanneroptions, function(err, res, body) {

   //  });
   // });

  });
  app.post('/usertodatabase', function(req, res) {

    User.create({
      email: req.body.email,
      origin: req.body.home,
      destination: req.body.destination,
      budget: req.body.budget,
      sent: false
    })
    .then(function(){
      res.status(200);
    });

  });
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  app.route('/getAirportData')
    .get(function(req, res){
      res.sendfile(app.get('appPath') + '/app/airportdata/airports.json');
    })

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
