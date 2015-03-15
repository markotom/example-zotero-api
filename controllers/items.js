module.exports = function (server, zotero) {

  // List collection items
  server.get('/list', function (req, res) {
    // Get collections items from Zotero
    zotero.getItems(function(err, items) {
      // Render list view with items
      res.render('list', { items: items });
    });
  });

};
