var config  = require('./config'),
    express = require('express'),
    server  = express();

// Static files
server.use(express.static(__dirname + '/public'));

// List Routes
require('./routes/list')(server);

server.listen(process.env.PORT || 3000, function () {
  console.log('Server listening at %s', process.env.PORT || 3000);
});
