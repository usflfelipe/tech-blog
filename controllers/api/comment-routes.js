const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const { doDelete } = require('./api-utils.js');

// /api/comments
router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

// /api/comments
router.post('/', withAuth, (req, res) => {
    // check the session
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

// /api/comments/1
router.delete('/:id', withAuth, (req, res) => {
    doDelete(Comment, req.params.id, res);
});

module.exports = router;