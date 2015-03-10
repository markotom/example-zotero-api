var config = require('../config')
    Zotero = require('zotero');

var zotero = Zotero({
  user: config.zotero.user,
  key: config.zotero.key
});

module.exports = zotero;
