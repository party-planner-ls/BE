const knex = require("knex");

//* import knex configuration
const knexConfig = require("../knexfile");

//* create and export database/knex connection
module.exports = knex(knexConfig.development);
