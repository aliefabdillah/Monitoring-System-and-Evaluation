// eslint-disable-next-line import/no-extraneous-dependencies
const { Sequelize } = require('sequelize');
const pg = require('pg');
const config = require('./sequelize.config.js');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    dialectModule: pg,
  },
);

module.exports = sequelize;
