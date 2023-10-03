const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// definee table columns and configuration
User.init(
    {
        // define an id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        // define a username column
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },

        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                // this means the password must be at least four characters long
                len: [4]
            }
        },
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }

        },

        // pass in our imported sequelize connection (the direct connection to our database
        sequelize,
        // suppress automatic creation of createdAt/updatedAt timestamp fields
        timestamps: false,
        // suppress pluralization of database table name
        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `comment_text` instead of `commentText`)
        underscored: true,
        // make our model name stay lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;