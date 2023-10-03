const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User.js');
const Post = require('./Post.js');


class Comment extends Model {
    static commentAttributes = [
        'id',
        'comment_text',
        'post_id', 
        'user_id', 
        'created_at'
    ];

    static commentIncludeUser = [
        {
            model: User,
            attributes: ['username', 'id']
        }
    ];
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the comment must be at least one character long
                len: [1]
            }
        },
        user_id: {
            type:DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type:DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;