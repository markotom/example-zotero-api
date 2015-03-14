var config  = require('./config'),
    express = require('express'),
    cons    = require('consolidate'),
    server  = express();

// Set template engine
server.engine('html', cons.swig);
server.set('view engine', 'html');
server.set('views', __dirname + '/views');

// Static files
server.use(express.static(__dirname + '/public'));

// Set public bower components
server.use('/components', express.static(__dirname + '/bower_components'));

// Controllers
require('./controllers/welcome')(server);

server.listen(process.env.PORT || 3000, function () {
  console.log('Server listening at %s', process.env.PORT || 3000);
});
