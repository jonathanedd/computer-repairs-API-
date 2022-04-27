const { DataTypes } = require('sequelize');

const repairs = db.define('repair', {
    id: {
        primaryKey: true,
        outoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending'
    },
    userId: {}
});

module.exports = { repairs };