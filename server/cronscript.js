var routes = require('./routes.js');

// ping api and email users daily at 12:00pm
request.get('http://neglectedeggplant.azurewebsites.net/getflights', function(req, res) {
  req.send(200);
});
