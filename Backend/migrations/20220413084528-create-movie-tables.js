'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('movies', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    title: 'string',
    year: 'string',
    imdbID: 'string',
    type: 'string',
    poster: 'string',
    director: 'string',
    plot: 'string'
  })
    
};

exports.down = function (db) {
  return db.dropTable('movies')
    .then(
      function (result) {
        db.dropTable('movie_detail');
      }
    );
};

exports._meta = {
  "version": 1
};
