var pool = require('./db');

function output_db() {
}

module.exports = output_db;

output_db.prototype.getall = function getall(callback) {
  pool.acquire(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('users', function(err, collection) {
      if(err) {
        pool.release(db);
        return callback(err);
      }
      var query = {};
      collection.find().sort({
        id: -1
      }).toArray(function(err, docs) {
        pool.release(db);
        if(err) {
          return callback(err);
        }
        else {
          return callback(null, docs);
        }
      });
    });
  });
}
