'use strict'
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
    'users',
    {
        UserId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        FirstName: DataTypes.STRING,
        LastName: DataTypes.STRING,
        Username: {
            type: DataTypes.STRING,
            unique: true,
        },
        Password: DataTypes.STRING,
        Email: {
            type: DataTypes.STRING,
            unique: true,
        },
        Admin: {
            defaultValue: false,
            allowNull: false,
            type: DataTypes.BOOLEAN
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        Deleted: {
            defaultValue: false,
            type: DataTypes.BOOLEAN
        }
    },
    {}
    );
    return users;
};