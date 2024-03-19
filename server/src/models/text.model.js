const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.connection");


const Text = sequelize.define('text', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    text: {
        type: DataTypes.TEXT,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

Text.sync({ alter: true });

module.exports = Text;