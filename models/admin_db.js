var pool = require('./db');

function admin_db() {
}

module.exports = admin_db;

admin_db.prototype.find = function find(callback) {
  pool.acquire(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('admin', function(err, collection) {
      if(err) {
        pool.release(db);
        return callback(err);
      }
      collection.findOne({username: 'admin'}, function(err, doc) {
        pool.release(db);
        if(doc) {
          return callback(err, doc.passwd);
        }
        else {
          return callback(err, null);
        }
      });
    });
  });
}

