var config  = require('./config'),
    express = require('express'),
    zotero  = require('./lib/zotero'),
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

// Creating a new instance of Zotero
var zotero = new Zotero({
  user: config.zotero.user,
  key: config.zotero.key,
  collection: config.zotero.collection
});

// Controllers
require('./controllers/welcome')(server);
require('./controllers/items')(server, zotero);

server.listen(process.env.PORT || 3000, function () {
  console.log('Server listening at %s', process.env.PORT || 3000);
});
