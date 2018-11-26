const express = require('express');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const config = require('../config/config');

const router = express();

router.post('/register', (req, res) => {

    var encryptedPassword = bcrypt.hashSync(req.body.password);

    User.create({
        Name: req.body.name,
        Email: req.body.email,
        Password: encryptedPassword,
        Ocupation: req.body.ocupation,
        Permission: req.body.permission,
        Team: req.body.team,
    },
    (err, User) => {
        if(err){
            return res.status(500).send("Problem while registering the user.");
        }

        var token = jwt.sign({ id: User._id}, config.secret, { expiresIn: 432000 });

        res.status(200).send({ auth: true, token: token, user: User });
    });
});

router.get('/tokenAuth', (req, res, next) => {

    var token  = req.body.token || req.query.token;
    if(!token){
        return res.status.send('Must pass Token!');
    }

    jwt.verify(token, config.secret, (err, user) => {
        if(err) throw err;

        User.findById({
            id: user._id
        }, (err, user) => {
            if(err) throw err;

            return res.status(200).send({
                user: user,
                token: token
            })
        })
    })
    
});

router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if(err) {
            throw err;
        }

        if(!user){
            return res.status(404).json({
                error: true, 
                message: 'User not found'
            });
        }

        bcrypt.compare(req.body.password, user.password, (err, valid) => {
            if (!valid){
                return res.status(404).json({
                    error: true,
                    message: 'Username or Password is wrong'
                });
            }

            var token = jwt.sign({ id: User._id}, config.secret, { expiresIn: 432000 });

            res.status(200).send({ auth: true, token: token, user: User });
        })
    })
})

router.get('/protected', () => {
    
})



module.exports = router