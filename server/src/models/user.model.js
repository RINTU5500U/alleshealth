const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.connection");

const user = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    }
})

user.sync({ alter: true });

module.exports = user;