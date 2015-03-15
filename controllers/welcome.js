module.exports = function (server) {

  // Set main route
  server.get('/', function (req, res) {
    // Render welcome view
    res.render('welcome');
  });

};
