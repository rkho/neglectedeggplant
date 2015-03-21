/**
 * Main application routes
 */

'use strict';
var User = require('./db/schema.js');
var errors = require('./components/errors');
var request = require('request') // The express method for requesting data from an API
var triggerEmail = require('./components/emails/trigger-email.js');
var daysFromNow = require('./components/days-from-now.js');

// var data = require('/client/app/airportdata/airports.json');
module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  // This route is triggered by Azure web jobs once a day.
  app.get('/getflights', function(req, res) {

    res.send(200);

    User.findAll({ where: { sent: false } }).then(function(users) {
      users.forEach(function(user){

        // POST to Google's QPX API
        // Google QPX options requires only the standard options object
        var key = 'key=' + process.env['GGLQPX_API_KEY'];
        var searchDate = daysFromNow(90);
        var QPXOptions = {
          'slice':[{
                'origin': user.get('origin'), // Ex: 'SFO'
                'destination': user.get('destination'), // 'LAX'
                'date': searchDate // '2015-06-01'
                }],
          'passengers':{ 'adultCount': 1 },
          'maxPrice': 'USD'+user.get('budget'), // 'USD100.00'
          'solutions': 1
        };

        var options = {
          uri: 'https://www.googleapis.com/qpxExpress/v1/trips/search?'+key,
          method: 'POST',
          json: {request: QPXOptions}
        };

        request.post(options, function(err, res, body) {
    
          if(err){ console.log(err); console.log(err.error.errors) }
          
          //For debugging production
          console.log("Checking: ", user.get('email'), user.get('origin'), user.get('destination'), " -> ", user.get('budget'))
          console.log(res.body);
          console.log(res.body.trips);

          if (res.body.trips !== undefined && res.body.trips.tripOption !== undefined){ //Flight found
            
            var flight = res.body.trips.tripOption[0];
            var departure = flight.slice[0].segment[0].leg[0].departureTime.split("T");
            var formattedDeparture = departure[0] + " at " + departure[1].split("-")[0];

            triggerEmail(
              user.get('email'),
              {
                origin: user.get('origin'),
                destination: user.get('destination'),
                price: parseFloat(flight.saleTotal.replace("USD","")).toFixed(2),
                carrier: flight.slice[0].segment[0].flight.carrier,
                departure: formattedDeparture,
                proceedUrl: 'https://www.google.com/flights/#search;f='+user.get('origin')+';t='+user.get('destination')+';d='+searchDate+';tt=o'
              },
              {
                success: function(){
                  //Mark 'sent' as true so the user only gets one email.
                  console.log("Send email!", user.get('email'), parseFloat(flight.saleTotal.replace("USD","")).toFixed(2));
                  user.set('sent', true).save();
                },
                error: function(err){
                  console.log(err);
                }
              }
            );
                      
          }else{
            console.log("no flights found");
          }

        });
      
      });
      
    });

  });

  // Create new user from form submission.
  app.post('/usertodatabase', function(req, res) {

    User.create({
      email: req.body.email,
      origin: req.body.home,
      destination: req.body.destination,
      budget: req.body.budget,
      sent: false
    })
    .then(function(){
      res.send(200);
    });

  });

  // If we hit this URL, the server logs it's IP.
  app.get('/remotedetails', function(req, res) {
    res.send(200);
    
    request.get({ uri: "http://ip-api.com/json"}, function(err, res, body) {
      console.log(res.body);
    });

  });
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // This will get the airport JSON data and return it to the user during a search.
  app.route('/getAirportData')
    .get(function(req, res){
      res.sendfile(app.get('appPath') + '/app/airportdata/airports.json');
    })

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile((app.get('appPath') + '/index.html'), req.query);
    });
};
