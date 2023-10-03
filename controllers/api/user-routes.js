const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const { doDelete } = require('./api-utils.js');

// GET /api/users
router.get('/', (req, res) => {

    // Access our User model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_text', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
        ],
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users
router.post('/', (req, res) => {
    // don't check that the user is logged in (i.e. don't use withAuth) when we are creating the user for the first time

    // expected { username: 'thename', password: 'apassword' }
    User.create({
        attributes: { exclude: ['password'] }, 
        username: req.body.username,
        password: req.body.password
    })
        .then(dbData => {
            req.session.save(() => {
                req.session.user_id = dbData.id;
                req.session.username = dbData.username;
                req.session.loggedIn = true;
                res.json({ user: dbData, message: 'You are now logged in!' });
            });
        })
        .catch(err => {
            //This will send different alerts for the user when signup fails
              if(err.errors[0].validatorKey === 'len'){
                  res.status(500).send({ message: "Password needs to be at least 4 characters long."})
              }
              else if(err.errors[0].validatorKey === 'not_unique'){
                  res.status(500).send({ message: `An account with user name ${err.errors[0].value} already exists`})
              }
              else{
                  res.status(500).send({ message: 'Failed to Signup'});
              }
          });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbData => {
        if (!dbData) {
            res.status(400).json({ message: 'Either the user name or the password is incorrect' });
            return;
        }

        // Verify password
        const validPassword = dbData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Either the user name or the password is incorrect' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbData.id;
            req.session.username = dbData.username;
            req.session.loggedIn = true;
            res.json({ user: dbData, message: 'You are now logged in!' });
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy( () => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expected { username: 'thename', password: 'apassword' }

    // if req.body has exact key/value pairs to match the model, you can just use req.body instead
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbData => {
            if (!dbData[0]) {
                res.status(404).json({ message: 'No user found this this id' });
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    doDelete(model, req.params.id, res);
});

module.exports = router;