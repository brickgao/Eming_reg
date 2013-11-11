var pool = require('./db');

function user_db(info) {
  this.info = info;
}

module.exports = user_db;

user_db.prototype.insert = function insert(callback) {
  var info = this.info;
  pool.acquire(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('users', function(err, collection) {
      if(err) {
        pool.release(db);
        return callback(err);
      }
      collection.ensureIndex('id', {unique: true});
      collection.insert(info, {safe:true}, function(err, info) {
        pool.release(db);
        return callback(err, info);
      });
    });
  });
}

user_db.prototype.update = function update(callback) {
  var id = this.info.id;
  var phonenum = this.info.phonenum;
  pool.acquire(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('users', function(err, collection) {
      if(err) {
        pool.release(db);
        return callback(err);
      }
      collection.update({
        id: id
      }, {
        $set: {
          phonenum: phonenum
        }
      }, function(err, result) {
        pool.release(db);
        if(err) {
          return callback(err);
        }
        return callback(null);
      });
    });
  });
}

user_db.prototype.find = function find(callback) {
  var id = this.info.id;
  pool.acquire(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('users', function(err, collection) {
      if(err) {
        pool.release(db);
        return callback(err);
      }
      collection.findOne({id:id}, function(err, doc) {
        pool.release(db);
        if(doc) {
          return callback(err, doc);
        }
        else {
          return callback(err, null);
        }
      });
    });
  });
}
