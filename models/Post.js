const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Comment = require('./Comment.js');
const User = require('./User.js');

class Post extends Model {

    static postAttributes = [
        'id',
        'post_text',
        'title', 
        'created_at'
    ];

    static postInclude = [
        { 
            model: Comment,
            attributes: Comment.commentAttributes,
            include: {
                model: User,
                attributes: ['username']
            },
            order: [['created_at', 'DESC']]
        },
        {
            model: User,
            attributes: ['username', 'id']
        }
    ];
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_text: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type:DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;