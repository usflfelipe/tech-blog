const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: Post.postAttributes,
        include: Post.postInclude,
        order: [['created_at', 'DESC']],
    })
    .then(dbData => {
        // pass a single post object into the homepage template
        const posts = dbData.map(post => post.get({ plain: true}));
        posts.forEach(post => {
            let pUserId = post.user.id;
            post.allow_edit = req.session.loggedIn && (req.session.user_id === pUserId);
        });
        res.render('homepage', { posts, loggedIn: req.session.loggedIn, username: req.session.username });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: Post.postAttributes,
        include: Post.postInclude,
        order: [[{model: Comment}, 'created_at', 'DESC']],
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        // serialize the data
        const post = dbPostData.get({ plain: true });
        post.comments.forEach(comment => {
            let cUserId = comment.user_id;
            comment.allow_edit = req.session.loggedIn && (req.session.user_id === cUserId);
        });


        // pass the data to the template
        res.render('single-post', { post, loggedIn: req.session.loggedIn, username: req.session.username });

    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;