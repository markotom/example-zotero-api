var http = require('http')
    zotero = require('../lib/zotero');

module.exports = function (server) {

  server.get('/list/items', function (req, res) {

    zotero.items(function (err, body) {
      if (err) {
        return res.send(err);
      }

      res.send(body.data);
    });

  });

};
