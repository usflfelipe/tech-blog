const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const { doDelete } = require('./api-utils');
const withAuth = require('../../utils/auth');

// get all posts:
router.get('/', (req, res) => {
    Post.findAll({
        attributes: Post.postAttributes,
        order: [['created_at', 'DESC']],
        include: Post.postInclude
    })
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: Post.postAttributes,
        include: Post.postInclude,
        order: [[{model: Comment}, 'created_at', 'DESC']],

    })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/posts/id
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_text: req.body.post_text
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbData => {
            if (!dbData[0]) {
                res.status(404).json({ message: 'No post found this this id' });
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    doDelete(Post, req.params.id, res);
});

module.exports = router;