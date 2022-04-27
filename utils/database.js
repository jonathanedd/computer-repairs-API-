const { Sequelize } = require('sequelize');

//connect to database
const db = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '92171002',
    database: 'computer-repairs',
    logging: false
});

module.exports = { db }