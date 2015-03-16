var config = require('../config');

module.exports = function (server, zotero) {

  // List collection items
  server.get('/list', function (req, res) {
    // Get collections items from Zotero
    zotero.getItems(function(err, items) {
      // Render list view with items
      res.render('list', { items: items });
    });
  });

  // Create new item
  server.get('/create', function (req, res) {
    // Set item object
    var item = {
      'itemType' : 'book',
      'title' : 'My Book',
      'creators' : [
        {
          'creatorType' : 'author',
          'firstName' : 'Marco',
          'lastName' : 'Godínez'
        }
      ],
      'url' : 'http://github.com/markotom',
      'tags' : ['book', 'example'],
      'collections' : [config.zotero.collection]
    };

    // Create item from Zotero
    zotero.create('item', [item], function(err, data) {
      if (err) {
        return res.send(err).status(500);
      }

      res.send(data);
    });
  });

};
