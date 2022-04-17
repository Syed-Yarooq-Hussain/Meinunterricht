'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('inserted_history', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    title: 'string',
    year: 'int',
  })
};

exports.down = function (db) {
  return db.dropTable('inserted_history')
};

exports._meta = {
  "version": 1
};
