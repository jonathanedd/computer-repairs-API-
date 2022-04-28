const { DataTypes } = require('sequelize');

const { db } = require('../utils/database')

const Repairs = db.define('repair', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.DATE,
        allowNull:false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = {  Repairs };